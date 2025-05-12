from flask import Flask, send_from_directory, request, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
import os
import threading
import json
import traceback
from .simulation import run_simulation
from .ai_summary import generate_ai_summary
from .pdf_report import generate_pdf_report
from .utils import download_logo

app = Flask(__name__, static_folder='static')
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

os.makedirs(os.path.join(os.path.dirname(__file__), 'static'), exist_ok=True)
os.makedirs(os.path.join(os.path.dirname(__file__), 'static', 'plots'), exist_ok=True)
simulation_results = {}

@socketio.on('start_simulation')
def handle_start_simulation(data):
    print('[INFO] Received start_simulation event')
    if isinstance(data, str):
        try:
            data = json.loads(data)
        except json.JSONDecodeError:
            print('[ERROR] Failed to parse JSON data')
            socketio.emit('error', {"message": "Invalid JSON data"})
            return
    try:
        start_year = int(data['start_year'])
        end_year = int(data['end_year'])
        rabbits = int(data['rabbits'])
        wolves = int(data['wolves'])
        alpha = float(data['alpha'])
        beta = float(data['beta'])
        gamma = float(data['gamma'])
        delta = float(data['delta'])
    except (KeyError, ValueError) as e:
        print(f'[ERROR] Invalid simulation parameters: {str(e)}')
        socketio.emit('error', {"message": f"Invalid parameters: {str(e)}"})
        return
    print(f'[INFO] Starting simulation: {start_year}-{end_year}, rabbits={rabbits}, wolves={wolves}, alpha={alpha}, beta={beta}, gamma={gamma}, delta={delta}')
    threading.Thread(target=download_logo, daemon=True).start()
    def run_simulation_thread():
        try:
            results = run_simulation(
                start_year, end_year, rabbits, wolves, alpha, beta, gamma, delta, socketio
            )
            simulation_results['results'] = results
            simulation_results['params'] = data
            print('[INFO] Generating AI summary')
            try:
                summary = generate_ai_summary(results)
            except Exception as e:
                print(f'[ERROR] AI summary generation failed: {str(e)}')
                summary = "AI summary could not be generated. Please check the simulation results manually."
            print('[INFO] Generating final PDF report')
            try:
                pdf_path = generate_pdf_report(
                    results, 
                    summary, 
                    data, 
                    results.get('execution_time'),
                    results.get('cores_used'),
                    results.get('performance_data')
                )
                pdf_url = f"http://localhost:5000/static/report.pdf"
                print(f'[INFO] PDF report ready at {pdf_url}')
                socketio.emit('pdf_ready', {
                    "pdfUrl": pdf_url,
                    "executionTime": results.get('execution_time'),
                    "cores": results.get('cores_used')
                })
            except Exception as e:
                print(f'[ERROR] PDF generation failed: {str(e)}')
                traceback.print_exc()
                socketio.emit('error', {"message": f"PDF generation failed: {str(e)}"})
        except Exception as e:
            error_msg = str(e)
            traceback_str = traceback.format_exc()
            print(f'[ERROR] Simulation failed: {error_msg}')
            print(f'[ERROR] Traceback: {traceback_str}')
            socketio.emit('error', {"message": f"Simulation failed: {error_msg}"})
    threading.Thread(target=run_simulation_thread, daemon=True).start()

@app.route('/')
def index():
    return "Predator-Prey Simulation API is running. Connect via Socket.IO."

@app.route('/static/<path:filename>')
def serve_static(filename):
    print(f'[INFO] Serving static file: {filename}')
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f'[INFO] Starting server on port {port}')
    socketio.run(app, host='0.0.0.0', port=port, debug=True) 
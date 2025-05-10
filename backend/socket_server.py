import socketio
from simulator import run_simulation
from pdf_generator import generate_pdf_report
from ai_summary import generate_ai_summary
import os
import json
import traceback

# Store simulation results for PDF generation
simulation_results = {}

def init_socketio(socketio):
    print('[INFO] Initializing Socket.IO event handlers')
    
    @socketio.on('start_simulation')
    def handle_start_simulation(data):
        print('[INFO] Received start_simulation event')
        
        # Safely parse JSON if it's a string
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
                print('[INFO] Generating AI summary (mock)')
                summary = "AI summary could not be generated. Please check the simulation results manually."

            print('[INFO] Generating final PDF report')
            try:
                pdf_path = generate_pdf_report(results, summary, data)
                pdf_url = f"http://localhost:5000/static/report.pdf"
                print(f'[INFO] PDF report ready at {pdf_url}')
                socketio.emit('pdf_ready', {"pdfUrl": pdf_url})
            except Exception as e:
                print(f'[ERROR] PDF generation failed: {str(e)}')
                socketio.emit('error', {"message": f"PDF generation failed: {str(e)}"})
                
        except Exception as e:
            error_msg = str(e)
            traceback_str = traceback.format_exc()
            print(f'[ERROR] Simulation failed: {error_msg}')
            print(f'[ERROR] Traceback: {traceback_str}')
            socketio.emit('error', {"message": f"Simulation failed: {error_msg}"})
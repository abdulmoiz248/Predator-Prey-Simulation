from flask import Flask, send_from_directory
from flask_socketio import SocketIO
import os
from socket_server import init_socketio
import json

app = Flask(__name__, static_folder='static')
socketio = SocketIO(app, cors_allowed_origins="*")

# Initialize socket events
def register_socketio():
    print('[INFO] Registering Socket.IO events')
    init_socketio(socketio)

register_socketio()

@app.route('/static/<path:filename>')
def serve_static(filename):
    print(f'[INFO] Serving static file: {filename}')
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f'[INFO] Starting server on port {port}')
    socketio.run(app, host='0.0.0.0', port=port) 
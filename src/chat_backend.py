from flask import Flask, request, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
from g4f.client import Client
from flask_socketio import SocketIO, send, emit
import random

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'  # Change to a real secret in production
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

client = Client()

user_names = {}

@socketio.on('connect')
def handle_connect():
    user_id = request.sid
    user_name = f'User{random.randint(1000, 9999)}'
    user_names[user_id] = user_name
    emit('assign_name', {'name': user_name}, room=user_id)

@socketio.on('disconnect')
def handle_disconnect():
    user_id = request.sid
    print(f'User disconnected: {user_id}')
    del user_names[user_id]

@socketio.on('message')
def handle_message(data):
    user_id = request.sid
    data['name'] = user_names.get(user_id, 'Unknown')
    emit('message', data, broadcast=True, include_self=False)

# Existing AI assistant endpoint
@app.route('/ask-assistant', methods=['POST'])
def ask_assistant():
    current_conversation = request.json.get('conversation')
    if not current_conversation:
        return jsonify({"error": "No conversation provided"}), 400

    # Adjusted to use 'name' instead of 'role'
    conversation_text = "\n".join([f"{msg['name']}: {msg['content']}" for msg in current_conversation])
    prompt = f"Give 5 suggestions for User A to reply based on the following conversation:\n{conversation_text}\nSuggestions:"

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": prompt}]
    )
    suggestion = response.choices[0].message.content
    suggestions = suggestion.strip().split('\n')

    return jsonify({"suggestions": suggestions})

if __name__ == "__main__":
    socketio.run(app, debug=True)

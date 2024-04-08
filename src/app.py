# # app.py (Flask Server)

# from flask import Flask, request, jsonify
# import sqlite3

# app = Flask(__name__)

# # Function to validate user credentials
# def validate_user(username, password):
#     # Connect to the database
#     conn = sqlite3.connect('users.db')
#     cursor = conn.cursor()

#     # Query the database for the user
#     cursor.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
#     user = cursor.fetchone()

#     # Close the database connection
#     conn.close()

#     return user is not None

# # Route for handling login requests
# @app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     username = data['username']
#     password = data['password']

#     if validate_user(username, password):
#         return jsonify({'success': True, 'message': 'User validated'})
#     else:
#         return jsonify({'success': False, 'message': 'Invalid credentials'})

# if __name__ == '__main__':
#     app.run(debug=True)

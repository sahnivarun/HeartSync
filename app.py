# app.py (Flask Server)

from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import base64
import os


app = Flask(__name__)
CORS(app) 

# Function to validate user credentials
def validate_user(username, password):
    # Connect to the database
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    # Query the database for the user
    cursor.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
    user = cursor.fetchone()

    # Close the database connection
    conn.close()

    return user is not None

# Route for handling login requests
@app.route('/login', methods=['GET','POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    if validate_user(username, password):
        return jsonify({'success': True, 'message': 'User validated'})
    else:
        return jsonify({'success': False, 'message': 'Invalid credentials'})

# Function to add a new user to the database
def add_user(username, password, image_path, name, sex, age, location, status, orientation, body_type, diet, drinks, drugs, education, ethnicity, height, income, job, offspring, pets, religion, sign, smokes, speaks, essay0, essay1, essay2, essay3, essay4, essay5, essay6, essay7, essay8, essay9, last_online):
    # Connect to the database
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    # Insert the new user into the database
    cursor.execute("INSERT INTO users (username, password, name, image_path, sex, age, location, status, orientation, body_type, diet, drinks, drugs, education, ethnicity, height, income, job, offspring, pets, religion, sign, smokes, speaks, essay0, essay1, essay2, essay3, essay4, essay5, essay6, essay7, essay8, essay9, last_online) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", (username, password, name, image_path, sex, age, location, status, orientation, body_type, diet, drinks, drugs, education, ethnicity, height, income, job, offspring, pets, religion, sign, smokes, speaks, essay0, essay1, essay2, essay3, essay4, essay5, essay6, essay7, essay8, essay9, last_online))

    # Commit changes and close the database connection
    conn.commit()
    conn.close()

# Route for handling join requests
@app.route('/join', methods=['POST'])
def join():
    data = request.get_json()
    username = data['username']
    password = data['password']
    name = data['name']
    sex = data['sex']
    age = data['age']
    location = data['location']
    status = data['status']
    orientation = data['orientation']
    body_type = data['body_type']
    diet = data['diet']
    drinks = data['drinks']
    drugs = data['drugs']
    education = data['education']
    ethnicity = data['ethnicity']
    height = data['height']
    income = data['income']
    job = data['job']
    offspring = data['offspring']
    pets = data['pets']
    religion = data['religion']
    sign = data['sign']
    smokes = data['smokes']
    speaks = data['speaks']
    essay0 = data['essay0']
    essay1 = data['essay1']
    essay2 = data['essay2']
    essay3 = data['essay3']
    essay4 = data['essay4']
    essay5 = data['essay5']
    essay6 = data['essay6']
    essay7 = data['essay7']
    essay8 = data['essay8']
    essay9 = data['essay9']
    last_online = data['last_online']
    image_data = data['image']

    # Decode base64 image data
    image_binary = base64.b64decode(image_data)

    # Save the image locally with the username as the filename
    image_path = os.path.join('C:\\Users\\Varun Sahni\\Documents\\heart-sync-app\\images', f"{username}.png")
    with open(image_path, 'wb') as f:
        f.write(image_binary)

    if validate_user(username, password):
        return jsonify({'success': False, 'message': 'User already exists'})
    else:
        add_user(username, password, name, image_path, sex, age, location, status, orientation, body_type, diet, drinks, drugs, education, ethnicity, height, income, job, offspring, pets, religion, sign, smokes, speaks, essay0, essay1, essay2, essay3, essay4, essay5, essay6, essay7, essay8, essay9, last_online)
        return jsonify({'success': True, 'message': 'User added successfully'})

if __name__ == '__main__':
    app.run(debug=True)

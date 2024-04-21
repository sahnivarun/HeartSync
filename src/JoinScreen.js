import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function JoinScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const navigate = useNavigate(); // Import useNavigate hook

    const handleJoin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/join', {
                username,
                password,
                age
            });

            const { success, message } = response.data;

            // Update response message state
            setResponseMessage(message);

            // Show dialog box based on the response
            if (success) {
                window.alert('Congratulations, You have been registered!');
                navigate('/main'); // Navigate to MainScreen
            } else {
                window.alert('A user with similar details already exists.');
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('Error occurred. Please try again.'); // Set error message
        }
    };


    return (
        <div className="join-container">
            <h1>Join HeartSync</h1>
            <form onSubmit={handleJoin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Join</button>
            </form>
        </div>
    );
}

export default JoinScreen;


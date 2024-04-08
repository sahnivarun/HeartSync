import React, { useState } from 'react';
import './Login.css'; // Importing CSS file for styling
import axios from 'axios';

function Login() {
  //const [showLoginScreen, setShowLoginScreen] = useState(false); // State to track if login screen should be displayed
  const [showLoginScreen, setShowLoginScreen] = useState(false); // State to track if login screen should be displayed
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleJoin = () => {
    // Add logic for joining
    console.log('Join button clicked');
    // You can implement the logic for joining here
  };

  const handleSignIn = () => {
    // Add logic for signing in
    console.log('Sign In button clicked');
    // You can implement the logic for signing in here
    setShowLoginScreen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/login',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.success) {
        // User validated, update state to show authenticated message
        setIsAuthenticated(true);
        setErrorMessage('');
      } else {
        // Invalid credentials, update state to show error message
        setIsAuthenticated(false);
        setErrorMessage('Invalid credentials!');
      }
    } catch (error) {
      console.error('Error:', error);
      // Update state to show error message
      setIsAuthenticated(false);
      setErrorMessage('Error validating user. Please try again.');
    }
  };
  
  return (
    <div className="login-container">
      <head>
        <title>HeartSync | Dating, Make Friends & Meet New People</title> {/* Set tab name */}
        <link rel="shortcut icon" type="image/png" href="favicon.png" /> {/* Set favicon */}
      </head>
      <div className="login-content">
      <h1>HeartSync</h1> {/* Name of the app */}
      <p className="tagline">Sync your heartbeats together</p> {/* Tagline */}
      <h2>Make the first move</h2> {/* Bold text */}
      <p>Start meeting new people in your area! If you already have an account, sign in to use HeartSync.</p> {/* Line of text */}
        <div className="buttons-container">
          <button type="button" onClick={handleJoin}>Join Now</button> {/* Join button */}
          <button type="button" onClick={handleSignIn}>Sign In</button> {/* Sign In button */}
        </div>
        {/* Conditionally render the login screen or next screen based on authentication */}
        {showLoginScreen && !isAuthenticated && <LoginScreen handleSubmit={handleSubmit} />}
        {isAuthenticated && <p>User details validated</p>}
        {!isAuthenticated && errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}
// Component for the login screen
function LoginScreen() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    try {
        const response = await axios.post(
            'http://127.0.0.1:5000/login',
            { username, password },
            { headers: { 'Content-Type': 'application/json' } }
        );
        if (response.data.success) {
            // User validated, navigate to the next screen or perform desired action
            console.log('User validated');
        } else {
            // Invalid credentials, display error message
            console.log('Invalid credentials');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

  return (
      <div className="login-screen">
          <p>Enter your registered username and password</p>
          <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" required />

              <br /> {/* Line break to separate username and password fields */}

              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />

              <br /> {/* Line break to separate username and password fields */}
              <button type="submit">Submit</button>
          </form>
      </div>
  );
}

  export default Login;
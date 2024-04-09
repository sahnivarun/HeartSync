import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import heartLogo from './heart.png';
import MainScreen from './MainScreen';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        // Logic for handling login
        setIsLoggedIn(true);
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={heartLogo} className="App-logo" alt="heart logo" />
                {/* Conditional rendering based on login status */}
                {isLoggedIn ? <MainScreen /> : <Login onLogin={handleLogin} />} {/* Pass handleLogin function */}
            </header>
        </div>
    );
}

export default App;

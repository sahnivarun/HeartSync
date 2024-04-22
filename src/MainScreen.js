// MainScreen.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function MainScreen() {
    const location = useLocation();
    const username = location.state.username;

    return (
        <div>
            <h1>Welcome, {username}!</h1>
        </div>
    );
}

export default MainScreen;

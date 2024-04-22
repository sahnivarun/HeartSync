// MainScreen.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function MainScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const username = location.state.username;

    const handleUpdatePreferences = () => {
        navigate('/preferences', { state: { username } });
    };

    //username is here, we need to card using this username and filter columns

    return (
        <div>
            <h1>Welcome, {username}!</h1>
            <button onClick={handleUpdatePreferences} style={{ position: 'absolute', top: '10px', right: '10px' }}>Update Your Preferences</button>
        </div>
    );
}

export default MainScreen;

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

    const handleInbox = () => {
        navigate('/inbox', { state: { username } });
    };   
    
    const handleShowProfiles = () => {
        navigate('/showprofiles', { state: { username } });
    };      

    return (
        <div>
            <h1>Welcome, {username}!</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={handleUpdatePreferences}>
                    Update Your Preferences
                </button>
                <button onClick={handleInbox}>
                    Inbox
                </button>
                <button onClick={handleShowProfiles}>
                    Show Profiles
                </button>                
            </div>
        </div>
    );
}

export default MainScreen;

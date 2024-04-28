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
    
    const handleChoice = () => {
        navigate('/choice', { state: { username } });
    };       

    return (
        <div>
            <h1>Welcome, {username}!</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={handleUpdatePreferences}>
                    Must Haves
                </button>
                <div style={{ width: '10px', height: '20px', alignSelf: 'center' }} />
                <button onClick={handleInbox}>
                    Inbox
                </button>
                <div style={{ width: '10px', height: '20px', alignSelf: 'center' }} />
                <button onClick={handleShowProfiles}>
                    Show Profiles
                </button>                
                <div style={{ width: '10px', height: '20px', alignSelf: 'center' }} />
                <button onClick={handleChoice}>
                    Matchmaker's Choice
                </button>                  
            </div>
        </div>
    );
}

export default MainScreen;

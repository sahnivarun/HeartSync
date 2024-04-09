import React from 'react';
import './App.css';
import Login from './Login';
import MainScreen from './MainScreen';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import heartLogo from './heart.png';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <img src={heartLogo} className="App-logo" alt="heart logo" />
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/login" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/main" element={<MainScreen />} />
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;

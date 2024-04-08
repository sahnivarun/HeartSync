import React from 'react';
import './App.css';
import Login from './Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import heartLogo from './heart.png';
import MainScreen from './MainScreen';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={heartLogo} className="App-logo" alt="heart logo" />
        <Login />
      </header>
    </div>
  );
}

export default App;

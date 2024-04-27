import React from 'react';
import Inbox from './Inbox';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Chat from './Chat';
import Choice from './choice'; 

function App() {

  const centeredStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center'
  };    

  return (
    <Router>
      <div style = {centeredStyle}>
        <h1>Chat Application</h1>
        {/* Navigation Link to Choice Page */}
        <Link to="/choice"><button>Go to Choice</button></Link>
        <Link to="/Chat"><button>Go to Chat</button></Link>
        <Link to="/inbox"><button>Go to Inbox</button></Link>
        {/* Setup the Router and Routes */}
        <Routes>
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/chat" element={<Chat />} /> {/* Chat route */}
        <Route path="/choice" element={<Choice />} /> {/* Choice route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

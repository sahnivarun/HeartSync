import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connect to the Socket.IO server
const socket = io.connect('http://localhost:5000');

function Chat() {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        socket.on('assign_name', (data) => {
            setUserName(data.name);
        });

        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('assign_name');
            socket.off('message');
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;
    
        // Create a message object including the user's name and input
        const message = { name: `${userName} (you)`, content: userInput };
    
        // Add the message to the local state to immediately show it on the sender's screen
        setMessages((prevMessages) => [...prevMessages, message]);
    
        // Emit the message to the server to be broadcasted to other users
        // Emit without appending "(you)" so other users don't see this annotation
        socket.emit('message', { name: userName, content: userInput });
    
        // Clear the user input after sending the message
        setUserInput('');
    };

    const askAssistant = () => {
      fetch('http://localhost:5000/ask-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conversation: messages }),
      })
      .then(response => response.json())
      .then(data => {
        setSuggestions(data.suggestions);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };

    // Function to handle suggestion selection
    const handleSuggestionClick = (suggestion) => {
      setUserInput(suggestion);
      setSuggestions([]);
    };

    return (
        <div>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>
                        <b>{msg.name === userName ? `${msg.name} (you)` : msg.name}:</b> {msg.content}
                    </li>
                ))}
            </ul>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
            <button onClick={askAssistant}>Ask HeartSynch Assistant ❤️</button>
            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li key={index} style={{ cursor: 'pointer' }} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Chat;

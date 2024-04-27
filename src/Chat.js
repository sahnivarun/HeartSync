import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { format, parseISO } from 'date-fns'; // Importing necessary functions

const socket = io.connect('http://localhost:5000');

function Chat({ otherUser, current, initialMessages }) {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Only set initial messages if the messages array is empty
        if (messages.length === 0) {
            const formattedInitialMessages = initialMessages.map(msg => ({
                ...msg,
                name: msg.sender, // Ensure this is consistent
                timestampFormatted: format(parseISO(msg.timestamp), 'd MMMM p')
            }));
            setMessages(formattedInitialMessages);
        }
    
        socket.on('assign_name', (data) => {
            setUserName(data.name);
        });
    
        socket.on('message', (message) => {
            console.log('Received message:', message);
            if (message.name === otherUser || message.name === userName) {
                message.timestampFormatted = format(parseISO(message.timestamp), 'd MMMM p');
                // Check if the message is already in the state to avoid duplication
                if (!messages.find(m => m.timestamp === message.timestamp && m.content === message.content)) {
                    setMessages(prevMessages => [...prevMessages, message]);
                }
            }
        });
    
        return () => {
            socket.off('assign_name');
            socket.off('message');
        };
    }, [otherUser, userName, initialMessages, messages]);


    const formattedConversation = messages.map(msg => ({
        name: msg.name,
        message: msg.content || msg.message,  // Fallback to `message` if `content` is undefined
        timestamp: msg.timestamp,
        sender: msg.sender
    }));

    const sendMessage = (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;
    
        const message = { 
            name: current, 
            content: userInput, 
            timestamp: new Date().toISOString(),
            receiver: otherUser // Assuming 'otherUser' is the receiver
        };
        message.timestampFormatted = format(parseISO(message.timestamp), 'd MMMM p');
    
        setMessages((prevMessages) => [...prevMessages, message]);
    
        // Emit the message to the server to be broadcasted to other users
        socket.emit('message', { name: userName, content: userInput, timestamp: message.timestamp });
    
        // Save the conversation via API call
        fetch('http://localhost:5000/saveconversation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                User1: current,
                User2: otherUser,
                Timestamp: message.timestamp,
                Message: userInput
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Save successful:', data);
        })
        .catch(error => {
            console.error('Error saving conversation:', error);
        });
    
        // Clear the user input after sending the message
        setUserInput('');
    };

    const askAssistant = () => {
        fetch('http://localhost:5000/ask-assistant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ conversation: formattedConversation }),
        })
        .then(response => response.json())
        .then(data => {
            setSuggestions(data.suggestions);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleSuggestionClick = (suggestion) => {
        setUserInput(suggestion);
        setSuggestions([]);
    };

    return (
        <div>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
            {messages.map((msg, index) => (
                msg.content ? (
                    <li key={index}>
                        <span>({msg.timestampFormatted})</span>
                        <b> {msg.name}: </b> {msg.content}
                    </li>
                ) : null
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
                <ul style={{ listStyleType: 'none', padding: 0 }}>
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

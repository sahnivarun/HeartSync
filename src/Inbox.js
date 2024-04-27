import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';  // Import format and parseISO functions

function Inbox() {
    const currentUser = "15";  // Set the current user
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);  // State to store messages

    useEffect(() => {
        // Fetch the conversation partners
        axios.get(`http://localhost:5000/conversations?username=${currentUser}`)
            .then(response => {
                setUsers(response.data.conversations_with);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    const inboxStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    };

    const boxStyle = {
        width: '1000px',
        height: '800px',
        border: '2px solid black',
        display: 'flex'
    };

    const userListStyle = {
        flex: 1,
        borderRight: '2px solid black',
        padding: '10px'
    };

    const messageAreaStyle = {
        flex: 4,
        padding: '10px'
    };

    const handleUserClick = (otherUser) => {
        console.log(`Fetching messages between User1: ${currentUser} and User2: ${otherUser}`);
        axios.get(`http://localhost:5000/messages?User1=${currentUser}&User2=${otherUser}`)
            .then(response => {
                // Set the messages into the state
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching messages: ', error);
            });
    };

    return (
        <div style={inboxStyle}>
            <h1>Conversations</h1>
            <div style={boxStyle}>
                <div style={userListStyle}>
                <h2>Your Matches</h2>                    
                    {users.map((user, index) => (
                        <div key={index} style={{ padding: '10px', border: '1px solid grey', marginBottom: '5px', cursor: 'pointer' }}
                             onClick={() => handleUserClick(user)}>
                            {user}
                        </div>
                    ))}
                </div>
                <div style={messageAreaStyle}>
                    {/* Display messages here */}
                    {messages.map((msg, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            ({format(parseISO(msg.timestamp), 'dd MMMM p')}) {msg.sender}: {msg.message}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Inbox;

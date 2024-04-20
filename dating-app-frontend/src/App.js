import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  useEffect(() => {
    // Fetch profiles from your server
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:5001/profiles');
      setProfiles(response.data.profiles);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const handleLike = async (userId) => {
    try {
      console.log("User ID ", userId);
      await axios.post('http://localhost:5001/like', { userId: 3, likedUserId: userId, liked: true });
      setCurrentProfileIndex(currentProfileIndex + 1);
    } catch (error) {
      console.error('Error liking profile:', error);
    }
  };

  const handleDislike = async (userId) => {
    try {
      await axios.post('http://localhost:5001/dislike', { userId: 3, likedUserId: userId, liked: false });
      setCurrentProfileIndex(currentProfileIndex + 1);
    } catch (error) {
      console.error('Error disliking profile:', error);
    }
  };

  return (
    <div className="app">
      {profiles.length > 0 && currentProfileIndex < profiles.length && (
        <div className="profile-card">
          <img className="profile-image" src={profiles[currentProfileIndex].avatar} alt={profiles[currentProfileIndex].name} />
          <h2 className="profile-name">{profiles[currentProfileIndex].age}</h2>
          <p className="profile-bio">{profiles[currentProfileIndex].sex}</p>
          <p className="profile-bio">{profiles[currentProfileIndex].status}</p>
          <div className="actions">
            <button className="button like-button" onClick={() => handleLike(profiles[currentProfileIndex].id)}>
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button className="button dislike-button" onClick={() => handleDislike(profiles[currentProfileIndex].id)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            {/* <button className="button report-button">
              <FontAwesomeIcon icon={faExclamationCircle} />
            </button> */}
          </div>
        </div>
      )}
      {currentProfileIndex >= profiles.length && <p>No more profiles</p>}
    </div>
  );
};

export default App;
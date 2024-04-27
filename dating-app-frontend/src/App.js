// App.js

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
      <div className="profile-card-container">
      {profiles.length > 0 && currentProfileIndex < profiles.length && (
        <div className="profile-card">
          <div className="profile-section">
            <img className="profile-image" src={profiles[currentProfileIndex].avatar} alt={profiles[currentProfileIndex].name} />
            <h2 className="profile-name">{profiles[currentProfileIndex].name}</h2>
            <hr className="divider" />
            <p className="about-title">About</p>
            <p className="profile-bio">{profiles[currentProfileIndex].essay0}</p>
          </div>
          <div className="profile-section">
            <hr className="divider" />
            <p className="about-title">Personal Information</p>
            {profiles[currentProfileIndex].age && (
              <p><strong>Age:</strong> {profiles[currentProfileIndex].age}</p>
            )}
            {profiles[currentProfileIndex].location && (
              <p><strong>Location:</strong> {profiles[currentProfileIndex].location}</p>
            )}
            {profiles[currentProfileIndex].status && (
              <p><strong>Status:</strong> {profiles[currentProfileIndex].status}</p>
            )}
          </div>
          <div className="profile-section">
            <hr className="divider" />
            <p className="about-title">Physical Attributes</p>
            {profiles[currentProfileIndex].sex && (
              <p><strong>Sex:</strong> {profiles[currentProfileIndex].sex}</p>
            )}
            {profiles[currentProfileIndex].orientation && (
              <p><strong>Orientation:</strong> {profiles[currentProfileIndex].orientation}</p>
            )}
            {profiles[currentProfileIndex].body_type && (
              <p><strong>Body Type:</strong> {profiles[currentProfileIndex].body_type}</p>
            )}
            {profiles[currentProfileIndex].height && (
              <p><strong>Height:</strong> {profiles[currentProfileIndex].height}</p>
            )}
          </div>
          <div className="profile-section">
            <hr className="divider" />
            <p className="about-title">Lifestyle</p>
            {profiles[currentProfileIndex].diet && (
              <p><strong>Diet:</strong> {profiles[currentProfileIndex].diet}</p>
            )}
            {profiles[currentProfileIndex].drinks && (
              <p><strong>Drinks:</strong> {profiles[currentProfileIndex].drinks}</p>
            )}
            {profiles[currentProfileIndex].drugs && (
              <p><strong>Drugs:</strong> {profiles[currentProfileIndex].drugs}</p>
            )}
            {profiles[currentProfileIndex].smokes && (
              <p><strong>Smoking:</strong> {profiles[currentProfileIndex].smokes}</p>
            )}
          </div>
          <div className="profile-section">
            <hr className="divider" />
            <p className="about-title">Background</p>
            {profiles[currentProfileIndex].education && (
              <p><strong>Education:</strong> {profiles[currentProfileIndex].education}</p>
            )}
            {profiles[currentProfileIndex].job && (
              <p><strong>Job:</strong> {profiles[currentProfileIndex].job}</p>
            )}
            {profiles[currentProfileIndex].ethnicity && (
              <p><strong>Ethnicity:</strong> {profiles[currentProfileIndex].ethnicity}</p>
            )}
            {profiles[currentProfileIndex].religion && (
              <p><strong>Religion:</strong> {profiles[currentProfileIndex].religion}</p>
            )}
          </div>
          <div className="profile-section">
            <hr className="divider" />
            <p className="about-title">Interests & Preferences</p>
            {profiles[currentProfileIndex].offspring && (
              <p><strong>Offspring:</strong> {profiles[currentProfileIndex].offspring}</p>
            )}
            {profiles[currentProfileIndex].pets && (
              <p><strong>Pets:</strong> {profiles[currentProfileIndex].pets}</p>
            )}
            {profiles[currentProfileIndex].speaks && (
              <p><strong>Languages Spoken:</strong> {profiles[currentProfileIndex].speaks}</p>
            )}
            {profiles[currentProfileIndex].sign && (
              <p><strong>Zodiac Sign:</strong> {profiles[currentProfileIndex].sign}</p>
            )}
          </div>
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
    </div>
  );
};

export default App;
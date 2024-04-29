// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
//
// function Profile() {
//     const location = useLocation();
//     const username = location.state.username;
//
//     const [userDetails, setUserDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//         const fetchUserDetails = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/user/${username}`);
//                 const { success, user } = response.data;
//
//                 if (success) {
//                     setUserDetails(user);
//                     setLoading(false);
//                 } else {
//                     setError('Failed to fetch user details');
//                     setLoading(false);
//                 }
//             } catch (error) {
//                 setError('Error fetching user details');
//                 setLoading(false);
//             }
//         };
//
//         fetchUserDetails();
//     }, [username]);
//
//     if (loading) {
//         return <div>Loading...</div>;
//     }
//
//     if (error) {
//         return <div>Error: {error}</div>;
//     }
//
//     if (!userDetails) {
//         return <div>User not found</div>;
//     }
//
//     return (
//         <div>
//             <h2>User Profile</h2>
//             <p>Username: {userDetails.username}</p>
//             <p>Password: {userDetails.password}</p>
//             <p>Name: {userDetails.name}</p>
//             <p>Image Path: {userDetails.image_path}</p>
//             <p>Age: {userDetails.age}</p>
//             <p>Status: {userDetails.status}</p>
//             <p>Sex: {userDetails.sex}</p>
//             <p>Orientation: {userDetails.orientation}</p>
//             <p>Body Type: {userDetails.body_type}</p>
//             <p>Diet: {userDetails.diet}</p>
//             <p>Drinks: {userDetails.drinks}</p>
//             <p>Drugs: {userDetails.drugs}</p>
//             <p>Education: {userDetails.education}</p>
//             <p>Ethnicity: {userDetails.ethnicity}</p>
//             <p>Height: {userDetails.height}</p>
//             <p>Income: {userDetails.income}</p>
//             <p>Job: {userDetails.job}</p>
//             <p>Last Online: {userDetails.last_online}</p>
//             <p>Location: {userDetails.location}</p>
//             <p>Offspring: {userDetails.offspring}</p>
//             <p>Pets: {userDetails.pets}</p>
//             <p>Religion: {userDetails.religion}</p>
//             <p>Sign: {userDetails.sign}</p>
//             <p>Smokes: {userDetails.smokes}</p>
//             <p>Speaks: {userDetails.speaks}</p>
//             <p>Essay 0: {userDetails.essay0}</p>
//             <p>Essay 1: {userDetails.essay1}</p>
//             <p>Essay 2: {userDetails.essay2}</p>
//             <p>Essay 3: {userDetails.essay3}</p>
//             <p>Essay 4: {userDetails.essay4}</p>
//             <p>Essay 5: {userDetails.essay5}</p>
//             <p>Essay 6: {userDetails.essay6}</p>
//             <p>Essay 7: {userDetails.essay7}</p>
//             <p>Essay 8: {userDetails.essay8}</p>
//             <p>Essay 9: {userDetails.essay9}</p>
//         </div>
//     );
// }
//
// export default Profile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Profile() {
    const location = useLocation();
    const username = location.state.username;

    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [randomImage, setRandomImage] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/user/${username}`);
                const { success, user } = response.data;

                if (success) {
                    setUserDetails(user);
                    setLoading(false);
                } else {
                    setError('Failed to fetch user details');
                    setLoading(false);
                }
            } catch (error) {
                setError('Error fetching user details');
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [username]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userDetails) {
        return <div>User not found</div>;
    }

    const handleRandomImage = async () => {
        try {
            const response = await axios.get('http://localhost:5000/random-image');
            const { success, random_image_url } = response.data;

            if (success) {
                setRandomImage(random_image_url);
            } else {
                setError('Failed to fetch random image');
            }
        } catch (error) {
            setError('Error fetching random image');
        }
    };


    return (
        <div>
            <h2>User Profile</h2>
            {/* Display user details here */}

            {/* Button to fetch random image */}
            <button onClick={handleRandomImage}>Get Random Image</button>

            {/* Display random image */}
            {randomImage && <img src={randomImage} alt="Random Man" />}
        </div>
    );
}

export default Profile;

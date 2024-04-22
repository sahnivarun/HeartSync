// import React from 'react';
// import { useLocation } from 'react-router-dom';
//
// function Preferences() {
//     const location = useLocation();
//     const username = location.state.username;
//
//     return (
//         <div>
//             <h1>Who are you looking for, {username}?</h1>
//         </div>
//     );
// }
//
// export default Preferences;
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Preferences() {
    const location = useLocation();
    const navigate = useNavigate();
    const username = location.state.username;

    const handleSubmit = () => {
        navigate('/main', { state: { username } });
    };

    return (
        <div>
            <h1>Who are you looking for, {username}?</h1>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default Preferences;


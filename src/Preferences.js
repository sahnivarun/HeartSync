import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Preferences() {
    const location = useLocation();
    const navigate = useNavigate();
    const username = location.state.username;

    const [target_age_min, setTargetAgeMin] = useState('');
    const [target_age_max, setTargetAgeMax] = useState('');
    const [target_sex, setTargetSex] = useState('');
    const [target_status, setTargetStatus] = useState('');
    const [target_orientation, setTargetOrientation] = useState('');
    const [target_drinks, setTargetDrinks] = useState('');
    const [target_drugs, setTargetDrugs] = useState('');
    const [target_ethnicity, setTargetEthnicity] = useState('');
    const [target_height, setTargetHeight] = useState('');
    const [target_income, setTargetIncome] = useState('');
    const [target_offspring, setTargetOffspring] = useState('');
    const [target_pets, setTargetPets] = useState('');
    const [target_religion, setTargetReligion] = useState('');
    const [target_smokes, setTargetSmokes] = useState('');

    const [responseMessage, setResponseMessage] = useState('');
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/user/${username}`);
                const { success, user } = response.data;

                if (success) {
                    setTargetAgeMin(user.target_age_min || '');
                    setTargetAgeMax(user.target_age_max || '');
                    setTargetSex(JSON.parse(user.target_sex || '[]'));
                    setTargetStatus(JSON.parse(user.target_status || '[]'));
                    setTargetOrientation(JSON.parse(user.target_orientation || '[]'));
                    setTargetDrinks(JSON.parse(user.target_drinks || '[]'));
                    setTargetDrugs(JSON.parse(user.target_drugs || '[]'));
                    setTargetEthnicity(JSON.parse(user.target_ethnicity || '[]'));
                    setTargetHeight(user.target_height || '');
                    setTargetIncome(user.target_income || '');
                    setTargetOffspring(JSON.parse(user.target_offspring || '[]'));
                    setTargetPets(JSON.parse(user.target_pets || '[]'));
                    setTargetReligion(JSON.parse(user.target_religion || '[]'));
                    setTargetSmokes(JSON.parse(user.target_smokes || '[]'));
                } else {
                    console.error('Failed to fetch user details');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [username]);


    const handleOrientationChange = (value) => {
        // Toggle the value in the target_orientation state variable
        setTargetOrientation((prevOrientation) => {
            // Check if the value is already present in the state
            if (prevOrientation.includes(value)) {
                // Remove the value from the state if it exists
                return prevOrientation.filter((item) => item !== value);
            } else {
                // Add the value to the state if it doesn't exist
                return [...prevOrientation, value];
            }
        });
    };

    const handleStatusChange = (value) => {
        setTargetStatus((prevStatus) => {
            if (prevStatus.includes(value)) {
                return prevStatus.filter((item) => item !== value);
            } else {
                return [...prevStatus, value];
            }
        });
    };

    const handleDrinksChange = (value) => {
        setTargetDrinks((prevDrinks) => {
            if (prevDrinks.includes(value)) {
                return prevDrinks.filter((item) => item !== value);
            } else {
                return [...prevDrinks, value];
            }
        });
    };

    const handleDrugsChange = (value) => {
        setTargetDrugs((prevDrugs) => {
            if (prevDrugs.includes(value)) {
                return prevDrugs.filter((item) => item !== value);
            } else {
                return [...prevDrugs, value];
            }
        });
    };

    const handleEthnicityChange = (value) => {
        setTargetEthnicity((prevEthnicity) => {
            if (prevEthnicity.includes(value)) {
                return prevEthnicity.filter((item) => item !== value);
            } else {
                return [...prevEthnicity, value];
            }
        });
    };

    const handleOffspringChange = (value) => {
        setTargetOffspring((prevOffspring) => {
            if (prevOffspring.includes(value)) {
                return prevOffspring.filter((item) => item !== value);
            } else {
                return [...prevOffspring, value];
            }
        });
    };

    const handlePetsChange = (value) => {
        setTargetPets((prevPets) => {
            if (prevPets.includes(value)) {
                return prevPets.filter((item) => item !== value);
            } else {
                return [...prevPets, value];
            }
        });
    };

    const handleReligionChange = (value) => {
        setTargetReligion((prevReligion) => {
            if (prevReligion.includes(value)) {
                return prevReligion.filter((item) => item !== value);
            } else {
                return [...prevReligion, value];
            }
        });
    };

    const handleSmokesChange = (value) => {
        setTargetSmokes((prevSmokes) => {
            if (prevSmokes.includes(value)) {
                return prevSmokes.filter((item) => item !== value);
            } else {
                return [...prevSmokes, value];
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/preference', {
                username,
                target_age_min,
                target_age_max,
                target_sex,
                target_status,
                target_orientation,
                target_drinks,
                target_drugs,
                target_ethnicity,
                target_height,
                target_income,
                target_offspring,
                target_pets,
                target_religion,
                target_smokes
            });

            const { success, message } = response.data;

            // Update response message state
            setResponseMessage(message);

            // Show dialog box based on the response
            if (success) {
                window.alert('Congratulations, We got your preferences!');
                navigate('/main', { state: { username } });

            } else {
                window.alert('Facing some issue in saving the preferences.');
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('Error occurred. Please try again.'); // Set error message
        }
    };

    return (
        <div className="join-container">
            <h1>Who are you looking for, {username}?</h1>
            <form onSubmit={handleSubmit}>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="field" style={{ display: "flex", alignItems: "center" }}>
                        <label htmlFor="target_sex" style={{ marginRight: "10px" }}>Sex<span>*</span>:</label>
                        <ul className="options" style={{ display: "flex", listStyle: "none", padding: 0 }}>
                            <li style={{ marginRight: "10px" }}>
                                <input type="checkbox" id="male" name="target_sex" value="male" onChange={(e) => setTargetSex(e.target.value)} />
                                <label htmlFor="male" style={{ fontSize: "0.9em" }}>Male</label>
                            </li>
                            <li style={{ marginRight: "10px" }}>
                                <input type="checkbox" id="female" name="target_sex" value="female" onChange={(e) => setTargetSex(e.target.value)} />
                                <label htmlFor="female" style={{ fontSize: "0.9em" }}>Female</label>
                            </li>
                            <li>
                                <input type="checkbox" id="nonbinary" name="target_sex" value="nonbinary" onChange={(e) => setTargetSex(e.target.value)} />
                                <label htmlFor="nonbinary" style={{ fontSize: "0.9em" }}>Nonbinary</label>
                            </li>
                        </ul>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <div className="field" style={{ display: "flex", alignItems: "center" }}>
                        <label htmlFor="age_range" style={{ marginRight: "10px" }}>Age Range<span>*</span>:</label>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input
                                type="number"
                                id="target_age_min"
                                value={target_age_min}
                                onChange={(e) => setTargetAgeMin(e.target.value)}
                                min="18"
                                placeholder="Min"
                                style={{ marginRight: "10px" }}
                            />
                            <span>-</span>
                            <input
                                type="number"
                                id="target_age_max"
                                value={target_age_max}
                                onChange={(e) => setTargetAgeMax(e.target.value)}
                                min={target_age_min} // Ensure max age is greater than or equal to min age
                                placeholder="Max"
                                style={{ marginLeft: "10px" }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="field" style={{ display: "flex", alignItems: "center" }}>
                        <label htmlFor="orientation" style={{ marginRight: "10px" }}>Orientation<span>*</span>:</label>
                        <ul className="options" style={{ display: "flex", listStyle: "none", padding: 0 }}>
                            <li style={{ marginRight: "10px" }}>
                                <input
                                    type="checkbox"
                                    id="straight"
                                    value="Straight"
                                    onChange={(e) => handleOrientationChange(e.target.value)}
                                />
                                <label htmlFor="straight" style={{ fontSize: "0.9em" }}>Straight</label>
                            </li>
                            <li style={{ marginRight: "10px" }}>
                                <input
                                    type="checkbox"
                                    id="gay"
                                    value="Gay"
                                    onChange={(e) => handleOrientationChange(e.target.value)}
                                />
                                <label htmlFor="gay" style={{ fontSize: "0.9em" }}>Gay</label>
                            </li>
                            <li style={{ marginRight: "10px" }}>
                                <input
                                    type="checkbox"
                                    id="bisexual"
                                    value="Bisexual"
                                    onChange={(e) => handleOrientationChange(e.target.value)}
                                />
                                <label htmlFor="bisexual" style={{ fontSize: "0.9em" }}>Bisexual</label>
                            </li>
                            <li style={{ marginRight: "10px" }}>
                                <input
                                    type="checkbox"
                                    id="lesbian"
                                    value="Lesbian"
                                    onChange={(e) => handleOrientationChange(e.target.value)}
                                />
                                <label htmlFor="lesbian" style={{ fontSize: "0.9em" }}>Lesbian</label>
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    id="asexual"
                                    value="Asexual"
                                    onChange={(e) => handleOrientationChange(e.target.value)}
                                />
                                <label htmlFor="asexual" style={{ fontSize: "0.9em" }}>Asexual</label>
                            </li>
                        </ul>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="field" style={{ display: "flex", alignItems: "center" }}>
                        <label htmlFor="status" style={{ marginRight: "10px" }}>Status<span>*</span>:</label>
                        <ul className="options" style={{ display: "flex", listStyle: "none", padding: 0 }}>
                            <li style={{ marginRight: "10px" }}>
                                <input
                                    type="checkbox"
                                    id="single"
                                    value="single"
                                    onChange={(e) => handleStatusChange(e.target.value)}
                                />
                                <label htmlFor="single" style={{ fontSize: "0.9em" }}>Single</label>
                            </li>
                            <li style={{ marginRight: "10px" }}>
                                <input
                                    type="checkbox"
                                    id="seeing-someone"
                                    value="seeing someone"
                                    onChange={(e) => handleStatusChange(e.target.value)}
                                />
                                <label htmlFor="seeing-someone" style={{ fontSize: "0.9em" }}>Seeing Someone</label>
                            </li>
                            <li>
                                <input
                                    type="checkbox"
                                    id="married"
                                    value="married"
                                    onChange={(e) => handleStatusChange(e.target.value)}
                                />
                                <label htmlFor="married" style={{ fontSize: "0.9em" }}>Married</label>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="field categorical" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <label htmlFor="drinks" style={{ marginRight: "10px" }}>Drinks:</label>
                    <ul className="options" style={{ display: "flex", listStyle: "none", padding: 0 }}>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="socially"
                                value="socially"
                                onChange={(e) => handleDrinksChange(e.target.value)}
                            />
                            <label htmlFor="socially" style={{ fontSize: "0.9em" }}>Socially</label>
                        </li>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="often"
                                value="often"
                                onChange={(e) => handleDrinksChange(e.target.value)}
                            />
                            <label htmlFor="often" style={{ fontSize: "0.9em" }}>Often</label>
                        </li>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="not-at-all"
                                value="not at all"
                                onChange={(e) => handleDrinksChange(e.target.value)}
                            />
                            <label htmlFor="not-at-all" style={{ fontSize: "0.9em" }}>Not at all</label>
                        </li>
                        <li>
                            <input
                                type="checkbox"
                                id="rarely"
                                value="rarely"
                                onChange={(e) => handleDrinksChange(e.target.value)}
                            />
                            <label htmlFor="rarely" style={{ fontSize: "0.9em" }}>Rarely</label>
                        </li>
                    </ul>
                </div>

                <div className="field categorical" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <label htmlFor="drugs" style={{ marginRight: "10px" }}>Drugs:</label>
                    <ul className="options" style={{ display: "flex", listStyle: "none", padding: 0 }}>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="never"
                                value="never"
                                onChange={(e) => handleDrugsChange(e.target.value)}
                            />
                            <label htmlFor="never" style={{ fontSize: "0.9em" }}>Never</label>
                        </li>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="sometimes"
                                value="sometimes"
                                onChange={(e) => handleDrugsChange(e.target.value)}
                            />
                            <label htmlFor="sometimes" style={{ fontSize: "0.9em" }}>Sometimes</label>
                        </li>
                        <li>
                            <input
                                type="checkbox"
                                id="often"
                                value="often"
                                onChange={(e) => handleDrugsChange(e.target.value)}
                            />
                            <label htmlFor="often" style={{ fontSize: "0.9em" }}>Often</label>
                        </li>
                    </ul>
                </div>

                <div className="field categorical" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <label htmlFor="ethnicity" style={{ marginRight: "10px" }}>Ethnicity:</label>
                    <ul className="options" style={{ display: "flex", listStyle: "none", padding: 0 }}>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="asian"
                                value="Asian"
                                onChange={(e) => handleEthnicityChange(e.target.value)}
                            />
                            <label htmlFor="asian" style={{ fontSize: "0.9em" }}>Asian</label>
                        </li>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="american"
                                value="American"
                                onChange={(e) => handleEthnicityChange(e.target.value)}
                            />
                            <label htmlFor="american" style={{ fontSize: "0.9em" }}>American</label>
                        </li>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="hispanic-latino"
                                value="Hispanic/Latino"
                                onChange={(e) => handleEthnicityChange(e.target.value)}
                            />
                            <label htmlFor="hispanic-latino" style={{ fontSize: "0.9em" }}>Hispanic/Latino</label>
                        </li>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="black"
                                value="Black"
                                onChange={(e) => handleEthnicityChange(e.target.value)}
                            />
                            <label htmlFor="black" style={{ fontSize: "0.9em" }}>Black</label>
                        </li>
                        <li>
                            <input
                                type="checkbox"
                                id="other"
                                value="Other"
                                onChange={(e) => handleEthnicityChange(e.target.value)}
                            />
                            <label htmlFor="other" style={{ fontSize: "0.9em" }}>Other</label>
                        </li>
                    </ul>
                </div>

                <div className="field" style={{ marginTop: "20px" }}>
                    <label htmlFor="height">Height:</label>
                    <input
                        type="number"
                        id="target_height"
                        value={target_height}
                        onChange={(e) => setTargetHeight(e.target.value)}
                    />
                    <span style={{ marginLeft: "5px" }}>Inches</span>
                </div>

                <div className="field" style={{ marginTop: "40px" }}>
                    <label htmlFor="income">Income:</label>
                    <input
                        type="number"
                        id="target_income"
                        value={target_income}
                        onChange={(e) => setTargetIncome(e.target.value)}
                    />
                    <span style={{ marginLeft: "5px" }}>$ per annum</span>
                </div>

                <div className="field categorical" style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <label htmlFor="offspring" style={{ marginRight: "10px" }}>Offspring:</label>
                    <ul className="options" style={{ display: "flex", listStyle: "none", padding: 0 }}>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="doesnt-want-kids"
                                value="Doesn't want kids"
                                onChange={(e) => handleOffspringChange(e.target.value)}
                            />
                            <label htmlFor="doesnt-want-kids" style={{ fontSize: "0.9em" }}>Doesn't want kids</label>
                        </li>
                        <li>
                            <input
                                type="checkbox"
                                id="wants-kids"
                                value="Wants kids"
                                onChange={(e) => handleOffspringChange(e.target.value)}
                            />
                            <label htmlFor="wants-kids" style={{ fontSize: "0.9em" }}>Wants kids</label>
                        </li>
                    </ul>
                </div>

                <div className="field categorical" style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <label htmlFor="pets" style={{ marginRight: "10px" }}>Pets:</label>
                    <ul className="options" style={{ display: "flex", listStyle: "none", padding: 0 }}>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="likes-cats"
                                value="Likes cats"
                                onChange={(e) => handlePetsChange(e.target.value)}
                            />
                            <label htmlFor="likes-cats" style={{ fontSize: "0.9em" }}>Likes cats</label>
                        </li>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="likes-dogs"
                                value="Likes dogs"
                                onChange={(e) => handlePetsChange(e.target.value)}
                            />
                            <label htmlFor="likes-dogs" style={{ fontSize: "0.9em" }}>Likes dogs</label>
                        </li>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="likes-other-pet"
                                value="Likes some other pet"
                                onChange={(e) => handlePetsChange(e.target.value)}
                            />
                            <label htmlFor="likes-other-pet" style={{ fontSize: "0.9em" }}>Likes some other pet</label>
                        </li>
                        <li>
                            <input
                                type="checkbox"
                                id="dislikes-pets"
                                value="Dislikes pets"
                                onChange={(e) => handlePetsChange(e.target.value)}
                            />
                            <label htmlFor="dislikes-pets" style={{ fontSize: "0.9em" }}>Dislikes pets</label>
                        </li>
                    </ul>
                </div>

                <div className="field categorical" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <label htmlFor="smokes" style={{ marginRight: "10px" }}>Smokes:</label>
                    <ul className="options" style={{ display: "flex", listStyle: "none", padding: 0 }}>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="often"
                                value="Often"
                                onChange={(e) => handleSmokesChange(e.target.value)}
                            />
                            <label htmlFor="often" style={{ fontSize: "0.9em" }}>Often</label>
                        </li>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="not-at-all"
                                value="Not at all"
                                onChange={(e) => handleSmokesChange(e.target.value)}
                            />
                            <label htmlFor="not-at-all" style={{ fontSize: "0.9em" }}>Not at all</label>
                        </li>
                        <li>
                            <input
                                type="checkbox"
                                id="rarely"
                                value="Rarely"
                                onChange={(e) => handleSmokesChange(e.target.value)}
                            />
                            <label htmlFor="rarely" style={{ fontSize: "0.9em" }}>Rarely</label>
                        </li>
                    </ul>
                </div>

                <div className="field categorical" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <label htmlFor="religion" style={{ marginRight: "10px" }}>Religion:</label>
                    <ul className="options" style={{ display: "flex", listStyle: "none", padding: 0 }}>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="buddhist"
                                value="Buddhist"
                                onChange={(e) => handleReligionChange(e.target.value)}
                            />
                            <label htmlFor="buddhist" style={{ fontSize: "0.9em" }}>Buddhist</label>
                        </li>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="sikh"
                                value="Sikh"
                                onChange={(e) => handleReligionChange(e.target.value)}
                            />
                            <label htmlFor="sikh" style={{ fontSize: "0.9em" }}>Sikh</label>
                        </li>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="catholic"
                                value="Catholic"
                                onChange={(e) => handleReligionChange(e.target.value)}
                            />
                            <label htmlFor="catholic" style={{ fontSize: "0.9em" }}>Catholic</label>
                        </li>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="christian"
                                value="Christian"
                                onChange={(e) => handleReligionChange(e.target.value)}
                            />
                            <label htmlFor="christian" style={{ fontSize: "0.9em" }}>Christian</label>
                        </li>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="hindu"
                                value="Hindu"
                                onChange={(e) => handleReligionChange(e.target.value)}
                            />
                            <label htmlFor="hindu" style={{ fontSize: "0.9em" }}>Hindu</label>
                        </li>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="jewish"
                                value="Jewish"
                                onChange={(e) => handleReligionChange(e.target.value)}
                            />
                            <label htmlFor="jewish" style={{ fontSize: "0.9em" }}>Jewish</label>
                        </li>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="muslim"
                                value="Muslim"
                                onChange={(e) => handleReligionChange(e.target.value)}
                            />
                            <label htmlFor="muslim" style={{ fontSize: "0.9em" }}>Muslim</label>
                        </li>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="spiritual"
                                value="Spiritual"
                                onChange={(e) => handleReligionChange(e.target.value)}
                            />
                            <label htmlFor="spiritual" style={{ fontSize: "0.9em" }}>Spiritual</label>
                        </li>
                        <li style={{ marginRight: "10px" }}>
                            <input
                                type="checkbox"
                                id="agnostic"
                                value="Agnostic"
                                onChange={(e) => handleReligionChange(e.target.value)}
                            />
                            <label htmlFor="agnostic" style={{ fontSize: "0.9em" }}>Agnostic</label>
                        </li>
                        <li>
                            <input
                                type="checkbox"
                                id="atheist"
                                value="Atheist"
                                onChange={(e) => handleReligionChange(e.target.value)}
                            />
                            <label htmlFor="atheist" style={{ fontSize: "0.9em" }}>Atheist</label>
                        </li>
                    </ul>
                </div>

                <button type="submit">Join</button>
            </form>
        </div>
    );
}

export default Preferences;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function JoinScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('');
    const [orientation, setOrientation] = useState('');
    const [body_type, setbody_type] = useState('');
    const [diet, setDiet] = useState('');
    const [drinks, setDrinks] = useState('');
    const [drugs, setDrugs] = useState('');
    const [education, setEducation] = useState('');
    const [ethnicity, setEthnicity] = useState('');
    const [height, setHeight] = useState('');
    const [income, setIncome] = useState('');
    const [job, setJob] = useState('');
    const [offspring, setOffspring] = useState('');
    const [pets, setPets] = useState('');
    const [religion, setReligion] = useState('');
    const [sign, setSign] = useState('');
    const [smokes, setSmokes] = useState('');
    const [speaks, setSpeaks] = useState('');
    const [essay0, setEssay0] = useState('');
    const [essay1, setEssay1] = useState('');
    const [essay2, setEssay2] = useState('');
    const [essay3, setEssay3] = useState('');
    const [essay4, setEssay4] = useState('');
    const [essay5, setEssay5] = useState('');
    const [essay6, setEssay6] = useState('');
    const [essay7, setEssay7] = useState('');
    const [essay8, setEssay8] = useState('');
    const [essay9, setEssay9] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const navigate = useNavigate(); // Import useNavigate hook

    const handleJoin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/join', {
                username,
                password,
                sex,
                age,
                location,
                status,
                orientation,
                body_type,
                diet,
                drinks,
                drugs,
                education,
                ethnicity,
                height,
                income,
                job,
                offspring,
                pets,
                religion,
                sign,
                smokes,
                speaks,
                essay0,
                essay1,
                essay2,
                essay3,
                essay4,
                essay5,
                essay6,
                essay7,
                essay8,
                essay9
            });

            const { success, message } = response.data;

            // Update response message state
            setResponseMessage(message);

            // Show dialog box based on the response
            if (success) {
                window.alert('Congratulations, You have been registered!');
                navigate('/main'); // Navigate to MainScreen
            } else {
                window.alert('A user with similar details already exists.');
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('Error occurred. Please try again.'); // Set error message
        }
    };


    return (
        <div className="join-container">
            <h1>Join HeartSync</h1>
            <form onSubmit={handleJoin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="field" style={{ display: "flex", alignItems: "center" }}>
                        <label htmlFor="sex" style={{ marginRight: "10px" }}>Sex<span>*</span>:</label>
                        <ul className="options" style={{ display: "flex", listStyle: "none", padding: 0 }}>
                            <li style={{ marginRight: "10px" }}>
                                <input type="radio" id="male" name="sex" value="male" required />
                                <label htmlFor="male" style={{ fontSize: "0.9em" }}>Male</label>
                            </li>
                            <li style={{ marginRight: "10px" }}>
                                <input type="radio" id="female" name="sex" value="female" required />
                                <label htmlFor="female" style={{ fontSize: "0.9em" }}>Female</label>
                            </li>
                            <li>
                                <input type="radio" id="nonbinary" name="sex" value="nonbinary" required />
                                <label htmlFor="nonbinary" style={{ fontSize: "0.9em" }}>Nonbinary</label>
                            </li>
                        </ul>
                    </div>
                </div>

                <div>
                    <div className="field">
                        <label htmlFor="age">Age<span>*</span> <span style={{ fontSize: "0.6em" }}>(Should be greater than 18)</span>:</label>
                        <input
                            type="number"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                            min="18"
                        />
                    </div>

                    <div style={{ marginTop: "20px" }}>
                        <div className="field">
                            <label htmlFor="location">Location<span>*</span>:</label>
                            <input
                                type="text"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="field" style={{ display: "flex", alignItems: "center" }}>
                    <label htmlFor="orientation" style={{ marginRight: "10px" }}>Orientation<span>*</span>:</label>
                    <ul className="options" style={{ display: "flex", listStyle: "none", padding: 0 }}>
                        <li style={{ marginRight: "10px" }}>
                            <input type="radio" id="straight" name="orientation" value="Straight" required />
                            <label htmlFor="straight" style={{ fontSize: "0.9em" }}>Straight</label>
                        </li>
                        <li style={{ marginRight: "10px" }}>
                            <input type="radio" id="gay" name="orientation" value="Gay" required />
                            <label htmlFor="gay" style={{ fontSize: "0.9em" }}>Gay</label>
                        </li>
                        <li style={{ marginRight: "10px" }}>
                            <input type="radio" id="bisexual" name="orientation" value="Bisexual" required />
                            <label htmlFor="bisexual" style={{ fontSize: "0.9em" }}>Bisexual</label>
                        </li>
                        <li style={{ marginRight: "10px" }}>
                            <input type="radio" id="lesbian" name="orientation" value="Lesbian" required />
                            <label htmlFor="lesbian" style={{ fontSize: "0.9em" }}>Lesbian</label>
                        </li>
                        <li>
                            <input type="radio" id="asexual" name="orientation" value="Asexual" required />
                            <label htmlFor="asexual" style={{ fontSize: "0.9em" }}>Asexual</label>
                        </li>
                    </ul>
                </div>

                <div>
                    <div className="field">
                        <label htmlFor="status">Status<span>*</span>:</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="">--Select--</option>
                            <option value="single">Single</option>
                            <option value="seeing someone">Seeing Someone</option>
                            <option value="married">Married</option>
                        </select>
                    </div>

                    <div className="field categorical" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                        <label htmlFor="body_type" style={{ marginRight: "10px" }}>Body Type:</label>
                        <select
                            id="body_type"
                            value={body_type}
                            onChange={(e) => setbody_type(e.target.value)}
                            // required
                        >
                            <option value="">--Select--</option>
                            <option value="a little extra">A Little Extra</option>
                            <option value="average">Average</option>
                            <option value="thin">Thin</option>
                            <option value="athletic">Athletic</option>
                            <option value="fit">Fit</option>
                            <option value="skinny">Skinny</option>
                            <option value="curvy">Curvy</option>
                            <option value="full figured">Full Figured</option>
                            <option value="jacked">Jacked</option>
                            <option value="prefer not to say">Prefer Not to Say</option>
                            <option value="overweight">Overweight</option>
                        </select>
                    </div>

                    <div className="field categorical" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                        <label htmlFor="diet" style={{ marginRight: "10px" }}>Diet:</label>
                        <select
                            id="diet"
                            value={diet}
                            onChange={(e) => setDiet(e.target.value)}
                            // required
                        >
                            <option value="">--Select--</option>
                            <option value="anything">Anything</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="vegan">Vegan</option>
                            <option value="other">Other</option>
                            <option value="halal">Halal</option>
                            <option value="kosher">Kosher</option>
                        </select>
                    </div>

                    <div className="field categorical" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                        <label htmlFor="drinks" style={{ marginRight: "10px" }}>Drinks:</label>
                        <select
                            id="drinks"
                            value={drinks}
                            onChange={(e) => setDrinks(e.target.value)}
                            // required
                        >
                            <option value="">--Select--</option>
                            <option value="socially">Socially</option>
                            <option value="often">Often</option>
                            <option value="not at all">Not at all</option>
                            <option value="rarely">Rarely</option>
                        </select>
                    </div>


                    <div className="field categorical" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                        <label htmlFor="drugs" style={{ marginRight: "10px" }}>Drugs:</label>
                        <select
                            id="drugs"
                            value={drugs}
                            onChange={(e) => setDrugs(e.target.value)}
                            // required
                        >
                            <option value="">--Select--</option>
                            <option value="never">Never</option>
                            <option value="sometimes">Sometimes</option>
                            <option value="often">Often</option>
                        </select>
                    </div>

                    <div className="field categorical" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                        <label htmlFor="education" style={{ marginRight: "10px" }}>Education:</label>
                        <select
                            id="education"
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                            // required
                        >
                            <option value="">--Select--</option>
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="Graduate">Graduate</option>
                            <option value="High School">High School</option>
                            <option value="prefer not to say">Prefer Not to Say</option>
                        </select>
                    </div>

                    <div className="field categorical" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                        <label htmlFor="ethnicity" style={{ marginRight: "10px" }}>Ethnicity:</label>
                        <select
                            id="ethnicity"
                            value={ethnicity}
                            onChange={(e) => setEthnicity(e.target.value)}
                            // required
                        >
                            <option value="">--Select--</option>
                            <option value="Asian">Asian</option>
                            <option value="American">American</option>
                            <option value="Hispanic/Latino">Hispanic/Latino</option>
                            <option value="Black">Black</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="field" style={{ marginTop: "20px" }}>
                        <label htmlFor="height">Height:</label>
                        <input
                            type="number"
                            id="height"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>

                    <div className="field" style={{ marginTop: "20px" }}>
                        <label htmlFor="income">Income:</label>
                        <input
                            type="number"
                            id="income"
                            value={income}
                            onChange={(e) => setIncome(e.target.value)}
                        />
                    </div>

                    <div className="field" style={{ marginTop: "20px" }}>
                        <label htmlFor="job">Job:</label>
                        <input
                            type="text"
                            id="job"
                            value={job}
                            onChange={(e) => setJob(e.target.value)}
                        />
                    </div>


                    <div className="field categorical" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                        <label htmlFor="offspring" style={{ marginRight: "10px" }}>Offspring:</label>
                        <select
                            id="offspring"
                            value={offspring}
                            onChange={(e) => setOffspring(e.target.value)}
                            // required
                        >
                            <option value="">--Select--</option>
                            <option value="Doesn't want kids">Doesn't want kids</option>
                            <option value="Wants kids">Wants kids</option>
                        </select>
                    </div>

                    <div className="field categorical" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                        <label htmlFor="pets" style={{ marginRight: "10px" }}>Pets:</label>
                        <select
                            id="pets"
                            value={pets}
                            onChange={(e) => setPets(e.target.value)}
                            // required
                        >
                            <option value="">--Select--</option>
                            <option value="Likes cats">Likes cats</option>
                            <option value="Likes dogs">Likes dogs</option>
                            <option value="Likes some other pet">Likes some other pet</option>
                            <option value="Dislikes pets">Dislikes pets</option>
                        </select>
                    </div>

                    <div className="field categorical" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                        <label htmlFor="religion" style={{ marginRight: "10px" }}>Religion:</label>
                        <select
                            id="religion"
                            value={religion}
                            onChange={(e) => setReligion(e.target.value)}
                            // required
                        >
                            <option value="">--Select--</option>
                            <option value="Buddhist">Buddhist</option>
                            <option value="Sikh">Sikh</option>
                            <option value="Catholic">Catholic</option>
                            <option value="Christian">Christian</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Jewish">Jewish</option>
                            <option value="Muslim">Muslim</option>
                            <option value="Spiritual">Spiritual</option>
                            <option value="Agnostic">Agnostic</option>
                            <option value="Atheist">Atheist</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="field categorical" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                        <label htmlFor="sign" style={{ marginRight: "10px" }}>Sign:</label>
                        <select
                            id="sign"
                            value={sign}
                            onChange={(e) => setSign(e.target.value)}
                            // required
                        >
                            <option value="">--Select--</option>
                            <option value="Aries">Aries</option>
                            <option value="Taurus">Taurus</option>
                            <option value="Gemini">Gemini</option>
                            <option value="Cancer">Cancer</option>
                            <option value="Leo">Leo</option>
                            <option value="Virgo">Virgo</option>
                            <option value="Libra">Libra</option>
                            <option value="Scorpio">Scorpio</option>
                            <option value="Sagittarius">Sagittarius</option>
                            <option value="Capricorn">Capricorn</option>
                            <option value="Aquarius">Aquarius</option>
                            <option value="Pisces">Pisces</option>
                        </select>
                    </div>

                    <div className="field categorical" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                        <label htmlFor="smokes" style={{ marginRight: "10px" }}>Smokes:</label>
                        <select
                            id="smokes"
                            value={smokes}
                            onChange={(e) => setSmokes(e.target.value)}
                            // required
                        >
                            <option value="">--Select--</option>
                            <option value="Often">Often</option>
                            <option value="Not at all">Not at all</option>
                            <option value="Rarely">Rarely</option>
                        </select>
                    </div>

                    <div className="field" style={{ marginTop: "20px" }}>
                        <label htmlFor="speaks">Speaks:</label>
                        <input
                            type="text"
                            id="speaks"
                            value={speaks}
                            onChange={(e) => setSpeaks(e.target.value)}
                        />
                    </div>

                    <div className="field" style={{ marginTop: "20px", marginBottom: "1px", width: "50%", margin: "auto", display: "flex", alignItems: "center" }}>
                        <label htmlFor="essay0" style={{ marginRight: "20px", width: "40%", textAlign: "right", fontSize: "0.7em" }}>Tell us about yourself:</label>
                        <textarea
                            id="essay0"
                            value={essay0}
                            onChange={(e) => setEssay0(e.target.value)}
                            rows="4"
                            style={{ width: "60%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", resize: "vertical" }}
                        ></textarea>
                    </div>

                    <div className="field" style={{ marginTop: "21px", marginBottom: "1px", width: "50%", margin: "auto", display: "flex", alignItems: "center" }}>
                        <label htmlFor="essay1" style={{ marginRight: "20px", width: "40%", textAlign: "right", fontSize: "0.7em" }}>Describe Your daily routine:</label>
                        <textarea
                            id="essay1"
                            value={essay1}
                            onChange={(e) => setEssay1(e.target.value)}
                            rows="4"
                            style={{ width: "60%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", resize: "vertical" }}
                        ></textarea>
                    </div>

                    <div className="field" style={{ marginTop: "22px", marginBottom: "1px", width: "50%", margin: "auto", display: "flex", alignItems: "center" }}>
                        <label htmlFor="essay2" style={{ marginRight: "20px", width: "40%", textAlign: "right", fontSize: "0.7em" }}>What are you good at:</label>
                        <textarea
                            id="essay2"
                            value={essay2}
                            onChange={(e) => setEssay2(e.target.value)}
                            rows="4"
                            style={{ width: "60%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", resize: "vertical" }}
                        ></textarea>
                    </div>

                    <div className="field" style={{ marginTop: "23px", marginBottom: "1px", width: "50%", margin: "auto", display: "flex", alignItems: "center" }}>
                        <label htmlFor="essay3" style={{ marginRight: "20px", width: "40%", textAlign: "right", fontSize: "0.7em" }}>Describe your appearance:</label>
                        <textarea
                            id="essay3"
                            value={essay3}
                            onChange={(e) => setEssay3(e.target.value)}
                            rows="4"
                            style={{ width: "60%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", resize: "vertical" }}
                        ></textarea>
                    </div>

                    <div className="field" style={{ marginTop: "24px", marginBottom: "1px", width: "50%", margin: "auto", display: "flex", alignItems: "center" }}>
                        <label htmlFor="essay4" style={{ marginRight: "20px", width: "40%", textAlign: "right", fontSize: "0.7em" }}>Describe your hobbies:</label>
                        <textarea
                            id="essay4"
                            value={essay4}
                            onChange={(e) => setEssay4(e.target.value)}
                            rows="4"
                            style={{ width: "60%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", resize: "vertical" }}
                        ></textarea>
                    </div>

                    <div className="field" style={{ marginTop: "25px", marginBottom: "1px", width: "50%", margin: "auto", display: "flex", alignItems: "center" }}>
                        <label htmlFor="essay5" style={{ marginRight: "20px", width: "40%", textAlign: "right", fontSize: "0.7em" }}>Describe things you cannot live without:</label>
                        <textarea
                            id="essay5"
                            value={essay5}
                            onChange={(e) => setEssay5(e.target.value)}
                            rows="4"
                            style={{ width: "60%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", resize: "vertical" }}
                        ></textarea>
                    </div>

                    <div className="field" style={{ marginTop: "26px", marginBottom: "1px", width: "50%", margin: "auto", display: "flex", alignItems: "center" }}>
                        <label htmlFor="essay6" style={{ marginRight: "20px", width: "40%", textAlign: "right", fontSize: "0.7em" }}>What do you think about when idle:</label>
                        <textarea
                            id="essay6"
                            value={essay6}
                            onChange={(e) => setEssay6(e.target.value)}
                            rows="4"
                            style={{ width: "60%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", resize: "vertical" }}
                        ></textarea>
                    </div>

                    <div className="field" style={{ marginTop: "31px", marginBottom: "4px", width: "50%", margin: "auto", display: "flex", alignItems: "center" }}>
                        <label htmlFor="essay7" style={{ marginRight: "20px", width: "40%", textAlign: "right", fontSize: "0.7em" }}>What do you do on Friday evening:</label>
                        <textarea
                            id="essay7"
                            value={essay7}
                            onChange={(e) => setEssay7(e.target.value)}
                            rows="4"
                            style={{ width: "60%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", resize: "vertical" }}
                        ></textarea>
                    </div>

                    <div className="field" style={{ marginTop: "35px", marginBottom: "4px", width: "50%", margin: "auto", display: "flex", alignItems: "center" }}>
                        <label htmlFor="essay8" style={{ marginRight: "20px", width: "40%", textAlign: "right", fontSize: "0.7em" }}>Tell us some interesting fact about you:</label>
                        <textarea
                            id="essay8"
                            value={essay8}
                            onChange={(e) => setEssay8(e.target.value)}
                            rows="4"
                            style={{ width: "60%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", resize: "vertical" }}
                        ></textarea>
                    </div>

                    <div className="field" style={{ marginTop: "39px", marginBottom: "1px", width: "50%", margin: "auto", display: "flex", alignItems: "center" }}>
                        <label htmlFor="essay9" style={{ marginRight: "20px", width: "40%", textAlign: "right", fontSize: "0.7em" }}>Who should swipe you right:</label>
                        <textarea
                            id="essay9"
                            value={essay9}
                            onChange={(e) => setEssay9(e.target.value)}
                            rows="4"
                            style={{ width: "60%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", resize: "vertical" }}
                        ></textarea>
                    </div>












                </div>

                <button type="submit">Join</button>
            </form>
        </div>
    );
}

export default JoinScreen;


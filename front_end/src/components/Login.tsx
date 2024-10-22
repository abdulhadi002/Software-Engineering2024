import React, { useState } from 'react';
import '../styles/Login.css';

const Login = ({ checkUserCredentials }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        checkUserCredentials(username, password);
    };

    return (
        <div className="container">
            <div className="header">
                <button className="app-title">BLUE-BOOTH</button>
                <div className="icons">
                    <button className="bluetooth-icon"></button>
                    <button className="profile-icon"></button>
                </div>
            </div>

            <div className="login-section">
                <h2>Login / Registrering</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="username">Brukernavn</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="password">Passord</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="forgot-password">
                        <a href="#">Glemt passord?</a>
                    </div>

                    <div className="button-container">
                        <button type="submit" className="register-button">Registrer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

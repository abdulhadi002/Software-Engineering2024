import React, { useState } from 'react';
import '../styles/Login.css';
import { LoginInformation } from '../components/types';


interface LoginProps {
    checkUserCredentials: (credentials: LoginInformation) => void;
}

const Login: React.FC<LoginProps> = ({ checkUserCredentials }) => {
    const [credentials, setCredentials] = useState<LoginInformation>({
        userName: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        checkUserCredentials(credentials);
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
                        <label htmlFor="userName">Brukernavn</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={credentials.userName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="password">Passord</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
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

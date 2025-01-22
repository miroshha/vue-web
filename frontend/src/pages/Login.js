import React, {useEffect, useState} from 'react';
import '../assets/styles/Main.css';
import '../assets/styles/Login.css';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import "react-datepicker/dist/react-datepicker.css";
import ErrorPage from "./Error";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false); // Состояние чекбокса
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние чекбокса

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true)
        }
    }, []);

    if (isLoggedIn) {
        return <ErrorPage title="Error 405" message="You are already logged in"/>
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 123123'
                },
                body: JSON.stringify({ email, password, rememberMe }),
            });
            const data = await response.json()
            if (response.ok) {
                const { token, _id } = data;
                localStorage.setItem('token', token);
                localStorage.setItem('user_id', _id);

                window.location.href = '/';
            } else {
                setError(data.message)
            }

        } catch (err) {
            console.error(err)
        }
    };

    return (
        <div className="container">
            <Navbar/>
            <div className="login-main-container">
                <div className="login-container">
                    <div className="login-main">
                        <div className="login-form-text">
                            <h1>Welcome back</h1>
                            <h3>Please enter your account details</h3>
                        </div>
                        <div className="login-form-main">
                            <form className="login-form" onSubmit={handleLogin}>
                                <div className="login-form-buttons">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <div className="login-under-form">
                                        <div className="checkbox-container">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={rememberMe}
                                                    onChange={(e) => setRememberMe(e.target.checked)}
                                                />
                                                <span className="custom-checkbox"></span>
                                            </label>
                                            <p>Remember me</p>
                                        </div>
                                        <a href="#">Forgot your password?</a>
                                    </div>
                                    {error && <p className="error-login">{error}</p>}
                                </div>
                                <div className="login-buttons">
                                    <button type="submit">Login</button>
                                    <p>or</p>
                                    <button type="button">
                                        Registration via Google <i className="google-icon fa-brands fa-google"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="login-image">
                        <h1 className="large-text login-image-text-l">Fiore®</h1>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Login;
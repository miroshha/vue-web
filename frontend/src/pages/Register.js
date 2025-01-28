import React, {useEffect, useState} from 'react';
import '../assets/styles/Main.css';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import '../assets/styles/Register.css'
import ErrorPage from "./Error";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
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

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3030/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_BACKEND_TOKEN}`
                },
                body: JSON.stringify({ email, password, name }),
            });
            const data = await response.json()
            console.log(data)
            if (response.ok) {
                const { token, _id } = data;
                await fetch(`http://localhost:3030/api/users/${_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.REACT_APP_BACKEND_TOKEN}`,
                        'User-Token': `Bearer ${token}`
                    }
                }).then(async response => {
                    const data = await response.json()
                    localStorage.setItem('user', JSON.stringify(data))
                }).catch(err => {
                    console.error(err)
                })
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
            <div className="register-main-container">
                <div className="register-container">
                    <div className="register-main">
                        <div className="register-form-text">
                            <h1>Registration</h1>
                            <h3>Please create your account</h3>
                        </div>
                        <div className="register-form-main">
                            <form className="register-form" onSubmit={handleRegister}>
                                <div className="register-form-buttons">
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
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    {error && <p className="error-login">{error}</p>}
                                </div>
                                <div className="register-buttons">
                                    <button type="submit">Submit</button>
                                    <p>or</p>
                                    <button type="button">
                                        Registration via Google <i className="google-icon fa-brands fa-google"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="register-image">
                        <h1 className="large-text register-image-text-l">Fiore®</h1>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Register;
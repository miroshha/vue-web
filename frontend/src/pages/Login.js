import React, { useState } from 'react';
import '../assets/styles/Main.css';
import '../assets/styles/Login.css';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import "react-datepicker/dist/react-datepicker.css";

const Login = () => {
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
                            <form className="login-form">
                                <input type="email" placeholder="Email" required/>
                                <input type="password" placeholder="Password" required/>
                                <div className="login-under-form">
                                    <div className="checkbox-container">
                                        <label>
                                            <input type="checkbox"/>
                                            <span className="custom-checkbox"></span>
                                        </label>
                                        <p>Remember me</p>
                                    </div>
                                    <a href="#">Forgot your password?</a>
                                </div>
                            </form>
                            <div className="login-buttons">
                                <button type="submit">Login</button>
                                <p>or</p>
                                <button type="submit">
                                    Registration via Google <i className="google-icon fa-brands fa-google"></i>
                                </button>
                            </div>
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

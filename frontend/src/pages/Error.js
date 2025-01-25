import React, {useEffect, useState} from 'react';
import '../assets/styles/Main.css';
import '../assets/styles/ErrorPage.css';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

const ErrorPage = ({ title = "Error", message = "Something went wrong" }) => {
    return (
        <div className="container">
            <Navbar />
            <div className="error-container">
                <div className="error-content">
                    <i className="fa-solid fa-bomb"></i>
                    <h1 className="error-title">{title}</h1>
                    <p className="error-message">{message}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ErrorPage;
import React from 'react';
import '../assets/styles/HomePage.css'; // For styling
import Navbar from '../components/Navbar.js';

const HomePage = () => {
    return (
        <div className="homepage-container">
            <Navbar />
            <div className="homepage-content">
                <h1>Welcome to our website!</h1>
                <p>Our website is under construction. Please check back later.</p>
            </div>
        </div>
    );
};

export default HomePage;
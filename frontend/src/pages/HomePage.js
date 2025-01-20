import React from 'react';
import '../assets/styles/HomePage.css';
import '../assets/styles/Main.css'
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

const HomePage = () => {
    return (
        <div className="container">
            <Navbar />
            <div className="homepage-image">
                <img src="https://i.imgur.com/yRV7OEq.png" alt="main fiore"/>
                <h1 className="image-text image-text-l">Fiore®</h1>
            </div>
            <div className="homepage-text">
                <p className="homepage-text-h first-text">Beauty that's</p>
                <p className="homepage-text-h second-text">accessible</p>
            </div>
            <Footer/>
        </div>
    );
};

export default HomePage;
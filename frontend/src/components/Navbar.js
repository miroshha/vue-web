import React, { useState } from 'react';
import '../assets/styles/Navbar.css'; // Для стилей
import '../../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
        document.documentElement.classList.toggle('dark-theme', !isDarkTheme);
    };

    return (
        <div className="navbar-container">
            <div className="navbar-links">
                <a href="/"><i className="fa-solid fa-bars"></i> Main</a>
                <a href="#"><i className="fa-regular fa-building"></i> For business</a>
            </div>
            <div className="navbar-buttons">
                <button className="change-theme" onClick={toggleTheme}>
                    <i className={`fa-regular ${isDarkTheme ? 'fa-sun' : 'fa-moon'}`}></i>
                </button>
                <a href="/login">
                    <i className="fa-regular fa-user"></i>
                </a>
            </div>
        </div>
    );
};

export default Navbar;

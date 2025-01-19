import React from 'react';
import '../assets/styles/Navbar.css'; // For styling
import '../../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = () => {
    return (
        <div className="navbar-container">
            <div className="navbar-links">
                <a href="#"><i className="fa-solid fa-bars"></i> Menu</a>
                <a href="#"><i className="fa-regular fa-building"></i> For business</a>
            </div>
            <div className="navbar-buttons">
                <button className="theme-button"><i className="fa-regular fa-moon"></i></button>
                <button className="login-button"><i className="fa-regular fa-user"></i>
            </button>
        </div>
</div>
    );
};

export default Navbar;
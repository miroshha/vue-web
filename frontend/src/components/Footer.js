import React from 'react';
import '../assets/styles/Footer.css'; // For styling
import '../../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="for-business">
                    <p>For business</p>
                    <ul>
                        <li><a href="#">For partners</a></li>
                        <li><a href="#">Support</a></li>
                        <li><a href="#">Status</a></li>
                    </ul>
                </div>
                <div className="social-media">
                    <p>Find us on social media</p>
                    <ul>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">TikTok</a></li>
                        <li><a href="#">Facebook</a></li>
                    </ul>
                </div>
                <div className="legal-information">
                    <p>Legal information</p>
                    <ul>
                        <li><a href="#">Privacy policy</a></li>
                        <li><a href="#">User agreement</a></li>
                        <li><a href="#">Terms of use</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
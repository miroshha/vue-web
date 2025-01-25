import React, {useEffect} from 'react';
import '../assets/styles/Main.css';
import '../assets/styles/Dashboard.css';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

const Dashboard = () => {
    return (
        <div className="container">
            <Navbar />
                <div className="dashboard-container">
                    {
                        localStorage.getItem('user') ? (
                            <div className="dashboard-content">
                                <h1 className="dashboard-title">Dashboard</h1>
                                <div className="dashboard-info">
                                    <p className="dashboard-info-item">Name: {JSON.parse(localStorage.getItem('user')).name}</p>
                                    <p className="dashboard-info-item">Email: {JSON.parse(localStorage.getItem('user')).email}</p>
                                    <p className="dashboard-info-item">Role: {JSON.parse(localStorage.getItem('user')).role}</p>
                                </div>
                            </div>
                        ) : null
                    }
                </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
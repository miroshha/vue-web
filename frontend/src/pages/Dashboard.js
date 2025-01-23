import React, {useEffect} from 'react';
import '../assets/styles/Main.css';
import '../assets/styles/Dashboard.css';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import "react-datepicker/dist/react-datepicker.css";


const Dashboard = () => {

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('user_id');
        await fetch(`http://localhost:3001/api/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 123123`,
                'User-Token': `Bearer ${token}`
            }
        }).then(async response => {
            const data = await response.json()
            localStorage.setItem('user', JSON.stringify(data))
        }).catch(err => {
            console.error(err)
        })
    }
    useEffect(() => {
        fetchData();
    }, []);

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
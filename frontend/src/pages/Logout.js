import React, {useEffect, useState} from 'react';
import '../assets/styles/Main.css';
import ErrorPage from "./Error";

const Logout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние чекбокса
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            localStorage.removeItem('token');
            setIsLoggedIn(false)
            const theme = localStorage.getItem('theme');
            localStorage.clear();
            if (theme) {
                localStorage.setItem('theme', theme);
            }
            window.location.href = document.referrer;
        }
    }, []);

    if (!token && !isLoggedIn) {
        return <ErrorPage title="Error 405" message="You are not logged in"/>
    }

};

export default Logout;
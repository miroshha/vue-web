import React, {useEffect, useState} from 'react';
import '../assets/styles/Navbar.css'; // Для стилей
import '../../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import DropdownMenu from "./DropdownMenu";

const Navbar = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null); // Для привязки меню

    // Сохранение текущей темы в localStorage и изменение класса на <html>
    const toggleTheme = () => {
        const newTheme = !isDarkTheme;
        setIsDarkTheme(newTheme);
        if (newTheme) {
            document.documentElement.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    };

    // Управление состоянием меню
    const handleMenuClick = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget); // Привязка меню к кнопке
    };

    const handleMenuClose = () => {
        setAnchorEl(null); // Закрытие меню
    };

    return (
        <div className="navbar-container">
            <div className="navbar-links">
                <a href="#" onClick={handleMenuClick}>
                    <i className="fa-solid fa-bars"></i> Menu
                </a>
                <a href="#"><i className="fa-regular fa-building"></i> For business</a>
            </div>
            <div className="navbar-buttons">
                {
                    localStorage.getItem('token') ? (
                        <a href="/dashboard">
                            <i className="fa-regular fa-user"></i>
                            Welcome back, {JSON.parse(localStorage.getItem('user')).name}
                        </a>
                    ) : null
                }
                <button className="change-theme" onClick={toggleTheme}>
                    <i className={`fa-regular ${localStorage.getItem('theme') === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                </button>
            </div>
            <DropdownMenu
                anchorEl={anchorEl}
                onOpen={handleMenuClick}
                onClose={handleMenuClose}
            />
        </div>
    );
};

export default Navbar;

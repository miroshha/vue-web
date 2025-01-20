import React, { useState } from 'react';
import HomePage from './pages/HomePage.js';

const App = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
        document.documentElement.classList.toggle('dark-theme', theme === 'light');
    };

    return (
        <div className={`app-container ${theme}`}>
            <HomePage toggleTheme={toggleTheme} />
        </div>
    );
};

export default App;

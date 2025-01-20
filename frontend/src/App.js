import React, { useState } from 'react';
import HomePage from './pages/HomePage.js';

const App = () => {
    const [theme, setTheme] = useState('light');

    const date = new Date()
    return (
        <div className={`app-container ${theme}`}>
            <HomePage time={date} />
        </div>
    );
};

export default App;

import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from './pages/Home.js';
import Login from './pages/Login.js';

const App = () => {

    const date = new Date()
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home time={date} />} />
                <Route path="/login" element={ <Login /> } />
            </Routes>
        </Router>
    );
};

export default App;

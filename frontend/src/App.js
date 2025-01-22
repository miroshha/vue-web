import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Logout from "./pages/Logout";
import {createTheme, ThemeProvider} from "@mui/material";


const App = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    // Загрузка текущей темы из localStorage при монтировании компонента
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkTheme(true);
            document.documentElement.classList.add('dark-theme');
        }
    }, []);

    const theme = createTheme({
        typography: {
            fontFamily: "Clash Grotesk Variable, sans-serif",
        },
    });

    const date = new Date()
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home time={date} />} />
                    <Route path="/login" element={ <Login /> } />
                    <Route path="/logout" element={ <Logout /> } />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;

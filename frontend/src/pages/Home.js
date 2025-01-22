import React, {useState} from 'react';
import '../assets/styles/HomePage.css';
import '../assets/styles/Main.css';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import Carousel from '../components/Carousel.js';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Home = ({ time }) => {
    const [selectedDate, setSelectedDate] = useState(time || null); // Состояние для выбранной даты

    // Обработчик изменения даты
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="container">
            <Navbar/>
            <div className="main-container">
                <div className="homepage-image">
                    <h1 className="large-text image-text-l">Fiore®</h1>
                </div>
                <div className="homepage-text">
                    <p className="homepage-text-h first-text">Beauty that's</p>
                    <p className="homepage-text-h second-text">accessible</p>
                </div>
                <div className="homepage-buttons">
                    <div className="procedures">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" className="procedures-search" placeholder="Procedures"/>
                    </div>
                    <div className="datetime">
                        <i className="fa-regular fa-calendar"></i>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            showTimeSelect
                            dateFormat="Pp"
                            placeholderText="Date and time"
                            customInput={<input className="datetime-local" readOnly/>}
                        />
                    </div>
                    <div className="location">
                        <i className="fa-solid fa-location-dot"></i>
                        <input type="text" className="location-search" placeholder="Location"/>
                    </div>
                </div>
            </div>
            <div className="middle-container">
                <Carousel />
            </div>
            <Footer/>
        </div>
    );
};

export default Home;

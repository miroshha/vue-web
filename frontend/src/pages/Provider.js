import React, { useEffect, useState } from 'react';
import '../assets/styles/Main.css';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import '../assets/styles/Provider.css';
import { useParams } from "react-router-dom";
const infoArray = {
    "Free Wi-Fi": '<i class="fa-solid fa-wifi"></i>',
    "Parking": '<i class="fa-solid fa-square-parking"></i>',
    "Accessible for disabled": '<i class="fa-solid fa-wheelchair"></i>',
    "Kids' play area": '<i class="fa-solid fa-gamepad"></i>',
    "Reservations available": '<i class="fa-solid fa-calendar"></i>',
    "Outdoor seating": '<i class="fa-solid fa-couch"></i>',
    "Card payment": '<i class="fa-solid fa-credit-card"></i>',
    "Cash payment": '<i class="fa-solid fa-money-bill"></i>',
    "Smoking area": '<i class="fa-solid fa-smoking"></i>',
}

const Provider = () => {
    const { id } = useParams();
    const [business, setBusiness] = useState(null);
    const [services, setServices] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const cachedBusiness = localStorage.getItem(`business_${id}`);
        const cachedServices = localStorage.getItem(`services_${id}`);
        const cachedReviews = localStorage.getItem(`reviews_${id}`);

        if (cachedBusiness) {
            const businessData = JSON.parse(cachedBusiness);
            setBusiness(businessData.data);
            checkStatus(businessData);
        } else {
            fetchBusiness();
        }

        if (cachedServices) {
            setServices(JSON.parse(cachedServices));
        } else {
            fetchService();
        }

        if (cachedReviews) {
            setReviews(JSON.parse(cachedReviews));
        } else {
            fetchReviews();
        }

        if (cachedBusiness && cachedServices && cachedReviews) {
            setLoading(false);
        }
    }, [id]);

    const fetchBusiness = async () => {
        const cachedBusiness = localStorage.getItem(`business_${id}`);
        const cacheLifetime = 1000 * 60 * 5; // Время жизни кеша: 5 минут

        if (cachedBusiness) {
            const { data, timestamp } = JSON.parse(cachedBusiness);

            // Если данные не устарели, используем их
            if (Date.now() - timestamp < cacheLifetime) {
                setBusiness(data);
                checkStatus(data);
                return;
            }
        }

        // Если данных нет или они устарели, выполняем запрос
        try {
            const response = await fetch(`http://localhost:3030/api/provider/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_BACKEND_TOKEN}`,
                },
            });
            const data = await response.json();
            setBusiness(data);

            // Сохраняем свежие данные в кеш
            localStorage.setItem(
                `business_${id}`,
                JSON.stringify({ data: data, timestamp: Date.now() })
            );
            checkStatus(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchService = async () => {
        try {
            const response = await fetch(`http://localhost:3030/api/provider/${id}/services`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_BACKEND_TOKEN}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setServices(data);
                localStorage.setItem(`services_${id}`, JSON.stringify(data)); // Кэшируем данные
            } else {

            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserName = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3030/api/users/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_BACKEND_TOKEN}`,
                },
            });
            if (response.ok) {
                const { name } = await response.json();
                return name;
            } else {
                console.error(`Failed to fetch user name for userId: ${userId}`);
                return "Unknown User";
            }
        } catch (error) {
            console.error(`Error fetching user name for userId: ${userId}`, error);
            return "Unknown User";
        }
    };

    const fetchReviews = async () => {
        const cacheLifetime = 1000 * 60 * 5; // Cache for 5 minutes
        const cachedReviews = localStorage.getItem(`reviews_${id}`);

        if (cachedReviews) {
            const { data, timestamp } = JSON.parse(cachedReviews);

            if (Date.now() - timestamp < cacheLifetime) {
                setReviews(Array.isArray(data) ? data : []); // Ensure data is an array
                return;
            }
        }

        try {
            const response = await fetch(`http://localhost:3030/api/review/provider/${id}?limit=5`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_BACKEND_TOKEN}`,
                },
            });

            if (response.ok) {
                const reviewsData = await response.json();

                // Fetch user names for each review
                const reviewsWithUserNames = await Promise.all(
                    reviewsData.map(async (review) => {
                        const userName = await fetchUserName(review.userId);
                        return { ...review, userName };
                    })
                );

                setReviews(reviewsWithUserNames);
                localStorage.setItem(
                    `reviews_${id}`,
                    JSON.stringify({ data: reviewsWithUserNames, timestamp: Date.now() })
                );
            } else {
                console.error("Failed to fetch reviews");
                setReviews([]); // Fallback to empty array
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
            setReviews([]); // Fallback to empty array
        }
    };

    const checkStatus = (businessData) => {
        if (!businessData || !businessData.workingHours) {
            setStatus("Working hours data not available");
            return;
        }
        const now = new Date();
        const dayNames = [
            "sunday",
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
        ];
        const today = dayNames[now.getDay()];
        const currentTime = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
        const workingHours = businessData.workingHours;
        const {open, close} = workingHours[today];

        // Проверяем текущее время
        if (open && close) {
            if (currentTime >= open && currentTime < close) {
                setStatus(`Open until ${close}`);
            } else {
                // Найти следующий рабочий день
                let nextDayIndex = (now.getDay() + 1) % 7;
                while (!workingHours[dayNames[nextDayIndex]].open) {
                    nextDayIndex = (nextDayIndex + 1) % 7;
                }
                const nextDay = dayNames[nextDayIndex];
                const nextOpenTime = workingHours[nextDay].open;
                const statusT =
                    `Closed. Opens on ${nextDay.charAt(0).toUpperCase() + nextDay.slice(1)} at ${nextOpenTime}`
                setStatus(statusT);
            }
        } else {
            setStatus("Closed today");
        }
    };

    if (loading) {
        return (
            <div className="container">
                <Navbar />
                <div className="provider-main-container">
                    {/* Спиннер загрузки */}
                    <div className="spinner"></div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="container">
            <Navbar />
            <div className="provider-main-container">
                <div className="provider-main-info">
                    <h2 className="provider-name">{business.name}</h2>
                    <div className="header-content">
                        <img src={business.header_image} alt="provider-image"/>
                        <div className="provider-reviews">
                            <h3>Reviews</h3>
                            <div className="reviews-container">
                                {Array.isArray(reviews.data) && reviews.data.length === 0 ? (
                                    <p>No reviews available</p>
                                ) : (
                                    reviews.data.map((review) => (
                                        <div className="review" key={review._id}>
                                            <div className="review-text">
                                                <div className="review-name-cont">
                                                    <p className="review-text-name">{review.userName}</p>
                                                    <div className="review-rating">
                                                    <span className="review-star">
                                                        {Array.from({ length: 5 }).map((_, index) => {
                                                            if (index < Math.floor(review.rating)) {
                                                                return <i key={index} className="fa-solid fa-star rating-filled"></i>;
                                                            } else if (index === Math.floor(review.rating) && review.rating % 1 >= 0.5) {
                                                                return <i key={index} className="fa-solid fa-star-half-stroke rating-half"></i>;
                                                            } else {
                                                                return <i key={index} className="fa-regular fa-star"></i>;
                                                            }
                                                        })}
                                                    </span>
                                                    </div>
                                                </div>
                                                <p className="review-text-description">{review.description}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>;
                        </div>
                    </div>
                </div>
                <div className="middle-content">
                    <div className="provider-main-interaction">
                        <div className="provider-button">
                            <a href={localStorage.getItem('token') ? `/booking/${business._id}` : '/login'}
                               className="provider-to-book">Book now</a>
                        </div>
                        <div className="provider-text">
                            <p className="provider-open-until">
                                <i className="fa-regular fa-clock"></i>
                                {status}
                            </p>
                            <p className="provider-addess">
                                <i className="fa-regular fa-compass"></i>
                                {business.location}
                            </p>
                        </div>
                    </div>
                    <div className="provider-left-content">
                        <div className="provider-container">
                            <div className="provider-services">
                                <h3>Services</h3>
                                {
                                    services && services.length === 0 ? (
                                        <p className="services-error">No services available</p>
                                    ) : (
                                        services.map(s => (
                                            <div className="service-price-duration" key={s.id}>
                                                <p className="service-description">
                                                    {s.description}
                                                </p>
                                                <div className="price-content">
                                                    <p className="service-duration">{s.duration} min</p>
                                                    <p className="service-price">
                                                        {s.discount ? (
                                                            <>
                                                                <span className="original-price">{s.price} €</span>
                                                                <span className="discounted-price">{s.discount} €</span>
                                                            </>
                                                        ) : (
                                                            <span>{s.price} €</span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    )
                                }
                            </div>
                        </div>
                        <div className="provider-container provider-about-us">
                            <h3>About us</h3>
                            <div className="about-us-container">
                                <p className="about-us-description">{business.description}</p>
                                <div className="map">
                                    <iframe
                                        className="map-iframe"
                                        title="map"
                                        src={`https://www.google.com/maps?q=${encodeURIComponent(business.location)}&output=embed`}
                                        allowFullScreen=""
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="provider-container provider-staff">
                            <h3>Staff</h3>
                            <div className="staff-container">
                                <div className="staff">
                                    <div className="staff-image">
                                        <img
                                            src="https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg"
                                            alt="staff"/>
                                    </div>
                                    <div className="staff-text">
                                        <p className="staff-text-name">John Doe</p>
                                        <p className="staff-text-description">Barber</p>
                                    </div>
                                </div>
                                <div className="staff">
                                    <div className="staff-image">
                                        <img
                                            src="https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg"
                                            alt="staff"/>
                                    </div>
                                    <div className="staff-text">
                                        <p className="staff-text-name">John Doe</p>
                                        <p className="staff-text-description">Barber</p>
                                    </div>
                                </div>
                                <div className="staff">
                                    <div className="staff-image">
                                        <img
                                            src="https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg"
                                            alt="staff"/>
                                    </div>
                                    <div className="staff-text">
                                        <p className="staff-text-name">John Doe</p>
                                        <p className="staff-text-description">Barber</p>
                                    </div>
                                </div>
                                <div className="staff">
                                    <div className="staff-image">
                                        <img
                                            src="https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg"
                                            alt="staff"/>
                                    </div>
                                    <div className="staff-text">
                                        <p className="staff-text-name">John Doe</p>
                                        <p className="staff-text-description">Barber</p>
                                    </div>
                                </div>
                                <div className="staff">
                                    <div className="staff-image">
                                        <img
                                            src="https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg"
                                            alt="staff"/>
                                    </div>
                                    <div className="staff-text">
                                        <p className="staff-text-name">John Doe</p>
                                        <p className="staff-text-description">Barber</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="provider-container provider-working-hours">
                            <div className="provider-working-hours-left">
                                <h3>Working hours</h3>
                                <div className="provider-working-hours-content">
                                    {
                                        business?.workingHours &&
                                        Object.keys(business.workingHours).map((key, index) => {
                                            const isToday = new Date().getDay() === index - 6; // Проверяем, является ли текущий день
                                            const isClosed = business.workingHours[key].open == null || business.workingHours[key].close == null; // Проверяем, закрыто ли

                                            return (
                                                <div className="provider-hours-container" key={index}>
                                                    <div className="provider-open-status-week">
                                                        <div
                                                            className={`provider-open-status ${isClosed ? "status-closed" : "status-open"}`}
                                                        ></div>
                                                        <p
                                                            className={`hours-week-day ${isToday ? "provider-today" : ""}`}
                                                        >
                                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                                        </p>
                                                    </div>
                                                    <p className={`hours-timing ${isToday ? "provider-today" : ""}`}>
                                                        {isClosed ? "Closed" : `${business.workingHours[key].open} - ${business.workingHours[key].close}`}
                                                    </p>
                                                </div>
                                            );
                                        })
                                    }

                                </div>
                            </div>
                            <div className="provider-add-info-right">
                                <h3>Additional information</h3>
                                <div className="add-info-container">
                                    {(!business?.additional_information || business.additional_information.length === 0) ? (
                                        <p>No additional information</p>
                                    ) : (
                                        business.additional_information.map((el, index) => (
                                            <div className="add-info-list" key={index}>
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: infoArray[el] ? infoArray[el] : '<i class="fa-solid fa-list-ul"></i>',
                                                    }}
                                                />
                                                <p>{el}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Provider;

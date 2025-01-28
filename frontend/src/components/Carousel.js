import React, { useEffect, useRef, useState } from 'react';
import "../assets/styles/Carousel.css";

const Carousel = () => {
    const [cards, setCards] = useState([]);
    const [categories, setCategories] = useState([]);
    const [width, setWidth] = useState(0);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const fetchCards = async () => {
            console.log(__dirname+'/./../../.env')
            console.log(process.env)
            try {
                const response = await fetch('http://localhost:3030/api/provider', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.REACT_APP_BACKEND_TOKEN}`
                    }
                });
                const data = await response.json();
                console.log(data)
                setCards(data);  // Сохраняем полученные данные в состояние
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };

        fetchCards();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3030/api/category', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.REACT_APP_BACKEND_TOKEN}`
                    }
                });
                const data = await response.json();
                const transformedCategories = data.map((item) => ({
                    id: item._id,
                    name: item.name,
                }));
                setCategories(transformedCategories);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const prev = document.querySelector(".prev");
        const next = document.querySelector(".next");
        const carousel = document.querySelector(".carousel-container");
        const track = document.querySelector(".track");

        let width = carousel.offsetWidth;
        setWidth(width); // Устанавливаем ширину в состояние

        const handleResize = () => {
            width = carousel.offsetWidth;
            setWidth(width); // Обновляем ширину при изменении размера окна
        };

        window.addEventListener("resize", handleResize);

        const handleNextClick = (e) => {
            e.preventDefault();
            setIndex(prevIndex => {
                const newIndex = prevIndex + 1;
                if (track.offsetWidth - newIndex * width < newIndex * width) {
                    next.classList.add("hide");
                }
                prev.classList.add("show");
                track.style.transform = `translateX(${newIndex * -width}px)`;
                return newIndex;
            });
        };

        const handlePrevClick = () => {
            setIndex(prevIndex => {
                const newIndex = prevIndex - 1;
                if (newIndex === 0) {
                    prev.classList.remove("show");
                }
                next.classList.remove("hide");
                track.style.transform = `translateX(${newIndex * -width}px)`;
                return newIndex;
            });
        };

        next.addEventListener("click", handleNextClick);
        prev.addEventListener("click", handlePrevClick);

        // Очистка обработчиков событий при размонтировании компонента
        return () => {
            window.removeEventListener("resize", handleResize);
            next.removeEventListener("click", handleNextClick);
            prev.removeEventListener("click", handlePrevClick);
        };
    }, [width]);


    return (
        <div className="carousel-container">
            <div className="inner-carousel">
                <div className="track">
                    {cards.length === 0 ? (
                        <div>Загрузка...</div> // Сообщение, если данные еще не загружены
                    ) : (
                        cards.map((card, index) => (
                            <a href={`/provider/${card._id}`} className="provider-link">
                                <div key={index} className="card">
                                    <div className="card-image-container">
                                        <img src={card.logo} alt="provider image"/>
                                    </div>
                                    <div className="card-content">
                                        <div className="card-header">
                                            <h3 className="card-title">{card.name}</h3>
                                            {
                                                categories.map((category) => {
                                                    if (category.id === card.category) {
                                                        return <span key={category.id}
                                                                     className="category">{category.name}</span>;
                                                    }
                                                })
                                            }
                                        </div>
                                        <p className="card-description">{card.description}</p>
                                        <div className="card-rating">
                                            <span className="rating">{card.rating}</span>
                                            <span className="star">
                                            {Array.from({length: 5}).map((_, index) => {
                                                if (index < Math.floor(card.rating)) {
                                                    return <i key={index}
                                                              className="fa-solid fa-star rating-filled"></i>;
                                                } else if (index === Math.floor(card.rating) && card.rating % 1 >= 0.5) {
                                                    return <i key={index}
                                                              className="fa-solid fa-star-half-stroke rating-half"></i>;
                                                } else {
                                                    return <i key={index} className="fa-regular fa-star"></i>;
                                                }
                                            })}
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))
                    )}
                </div>
                <div className="nav">
                    <button className="prev"><i className="fa-solid fa-reply"></i></button>
                    <button className="next"><i className="fa-solid fa-share"></i></button>
                </div>

            </div>
        </div>
    );
};

export default Carousel;

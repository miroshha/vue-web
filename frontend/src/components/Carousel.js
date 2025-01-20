import React, { useEffect, useRef, useState } from 'react';
import "../assets/styles/Carousel.css"; // Подключаем стиль для карусели (если есть)

const Carousel = () => {
    const [width, setWidth] = useState(0);
    const [index, setIndex] = useState(0);

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
                    <div className="card-container">
                        <div className="card card1"></div>
                    </div>
                    <div className="card-container">
                        <div className="card card2"></div>
                    </div>
                    <div className="card-container">
                        <div className="card card3"></div>
                    </div>
                    <div className="card-container">
                        <div className="card card4"></div>
                    </div>
                    <div className="card-container">
                        <div className="card card5"></div>
                    </div>
                    <div className="card-container">
                        <div className="card card6"></div>
                    </div>
                    <div className="card-container">
                        <div className="card card7"></div>
                    </div>
                    <div className="card-container">
                        <div className="card card8"></div>
                    </div>
                    <div className="card-container">
                        <div className="card card9"></div>
                    </div>
                    <div className="card-container">
                        <div className="card card10">1</div>
                    </div>
                    <div className="card-container">
                        <div className="card card11">1</div>
                    </div>
                    <div className="card-container">
                        <div className="card card12">12</div>
                    </div>
                </div>
                <div className="nav">
                    <button className="prev"><i className="fas fa-arrow-left fa-2x"></i></button>
                    <button className="next"><i className="fas fa-arrow-right fa-2x"></i></button>
                </div>
            </div>
        </div>
    );
};

export default Carousel;

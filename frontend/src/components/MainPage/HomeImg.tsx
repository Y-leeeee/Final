import React, { useEffect, useState } from "react";
import "./HomeImg.css";

const slides = [
  "images/food1.jpg",
  "images/food2.jpg",
  "images/food3.jpg",
  "images/food4.jpg",
  "images/food5.jpg",
  "images/food6.jpg",
  "images/food7.jpg",
];

const HomeImg: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 300);

    return () => clearInterval(sliderInterval);
  }, []);

  return (
    <div className="slider-container">
      <img src="/images/logo.png" alt="Logo" className="logo" />
      <h2 className="home-text">Cook your favorite Korean dish </h2>
      <div className="img-container" id="img">
        <img src={slides[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
      </div>
    </div>
  );
};

export default HomeImg;

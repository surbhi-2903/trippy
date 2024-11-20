import React from "react";
import "./slider.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const StaysSlider = ({ images }) => {
  const settings = {
    infinite: true,
    dots: true,
    arrows: false,
    // fade: true,
    // fadeSpeed:1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  return (
    <div className="stayscard">
      <Slider {...settings}>
        {images.map((item) => {
          return (
            <div className="staywrap" key={item.id}>
              <Link>
                <h3>{item.name}</h3>
                <img src={item.img} alt="na" />
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default StaysSlider;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./stylefile.scss";
import { Link } from "react-router-dom";
const Slider2 = ({ images }) => {
  const settings = {
    infinite: true,
    dots: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div className="destinationsslider">
      <Slider {...settings} className="slidercarousel">
        {images.map((item) => {
          return (
            <div className="comment" key={item.CityId}>
              <Link to={`/city/:${item.CityId}`}>
                <div className="tdimage">
                  <img src={`/images/Citiesimg/${item.CItyImg}`} />
                </div>
                <div className="about">
                  <span>{item.CityName}</span>
                  {/* <span>{item.cityRatings}</span> */}
                </div>
                <hr />
                <p>{item.CityDesc}</p>
                <button className="aboutbutton">Know More</button>
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Slider2;

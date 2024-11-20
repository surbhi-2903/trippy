import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const StaysSlider = ({ images }) => {
  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  ///images/CategoryPackage/Maldives.avif
  //to={`/city/:${item.CityId}`}
  return (
    <div className="card">
      <Slider {...settings}>
        {images.map((item) => (
          <div className="wrap" key={item.catId}>
            <Link to={`/packagecat/:${item.catId}`}>
              <img src={`/images/CategoryPackage/${item.CatImg}`} />
              <div className="about">
                <span>{item.CatName}</span>
              </div>
              <hr />
              <p>{item.CatAbout}</p>
              <button className="aboutbutton">Know More</button>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default StaysSlider;

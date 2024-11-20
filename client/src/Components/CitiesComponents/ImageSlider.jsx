import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";
import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ImageSlider = ({ images }) => {
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
  // ,

  // "options":{
  //   "allowedHosts":["localhost",".localhost"],
  //   "proxy":"http://localhost:8800/api/"
  //   }

  return (
    <>
      {/* <div className="tag">
				<h1>Image Gallery</h1>
			</div> */}
      <div className="card">
        <Slider {...settings}>
          {images.map((item) => (
            <div className="wrap" key={item.CityId}>
              <Link to={`/city/:${item.CityId}`}>
                <img src={`/images/Citiesimg/${item.CItyImg}`} />
                <div className="about">
                  <span>{item.CityName}</span>
                </div>
                <hr />
                <p>{item.CityDesc}</p>
                <button className="aboutbutton">Know More</button>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};
export default ImageSlider;

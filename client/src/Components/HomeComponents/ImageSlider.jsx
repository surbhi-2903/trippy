import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";
import * as React from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";

const ImageSlider = ({ images }) => {
  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  const handleClick = () => {
    setTimeout(() => {
      toast("Directed to Cities ", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }, 0);
  };
  var divlink = document.getElementById("link");
  var icon = document.getElementById("i");
  if (icon) {
    icon.addEventListener("dblclick", function () {
      icon.style.transform = "translate(-50%,-50%) scale(1)";
      icon.style.opacity = 0.8;
      setTimeout(function () {
        icon.style.opacity = 0;
      }, 800);
      setTimeout(function () {
        icon.style.transform = "translate(-50%,-50%) scale(0)";
      }, 1000);
    });
  }
  return (
    <>
      {/* <div className="tag">
				<h1>Image Gallery</h1>
			</div> */}
      <div className="card">
        <Slider {...settings}>
          {images.map((item) => (
            <div className="wrapcity" key={item.CityId} onClick={handleClick}>
              <Link to="/cities" className="link" id="link">
                <img
                  src={`/images/Citiesimg/${item.CItyImg}`}
                  // onClick={handleClick}
                />
                <div className="about">
                  <span>{item.CityName}</span>
                  {/* <span>{item.cityRatings}</span> */}
                </div>
                <hr />
                <p>{item.CityDesc}</p>
                <Link to={`/city/:${item.CityId}`}>
                  <button className="aboutbutton">Know More</button>
                </Link>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};
export default ImageSlider;

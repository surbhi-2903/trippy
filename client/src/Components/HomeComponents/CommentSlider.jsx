import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider2.scss";
const CommentSlider = ({ comments }) => {
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
    <div className="commentslider">
      <Slider {...settings} className="slidercarousel">
        {comments.map((item) => {
          return (
            <div className="comment">
              <p>{item.Feedback}</p>
              {/* <p>{item.ratings}</p> */}
              <div className="commentuser">
                <div
                  style={{
                    borderRadius: "50%",
                    borderColor: "white",
                    borderStyle: "solid",
                  }}
                >
                  <img
                    className="commentuserphoto"
                    src={`../uploads/${item.UserImg}`}
                  />
                </div>
                <span className="commentusername">{item.Username}</span>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default CommentSlider;

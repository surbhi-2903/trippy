import React from "react";
import "./stays.scss";
import { Link } from "react-router-dom";

const Stays = ({ images }) => {
  return (
    <>
      <div className="stayscards">
        {images.map((item) => {
          return (
            <div className="staycard">
              <Link to={`/city/:${item.CityId}`}>
                <h3>{item.CityName}</h3>
                <img src={`/images/Citiesimg/${item.CItyImg}`} alt="na" />
              </Link>
            </div>
            //to={`/city/:${item.CityId}`
          );
        })}
      </div>
      <div className="staystext">
        <p>Cities</p>
      </div>
    </>
  );
};

export default Stays;

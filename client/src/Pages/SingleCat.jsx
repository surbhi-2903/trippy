import React, { useEffect, useState } from "react";
import "./Singlecat.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";
const SingleCat = () => {
  const location = useLocation().pathname.split("/")[2];
  console.log(location);
  const [arr, setarr] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/cities/packagecat/${location}`
        );
        console.log(res.data);
        setarr(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const [name, setName] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [speed, setSpeed] = useState("");
  const [weather, setWeather] = useState("");
  useEffect(() => {
    const Apikey = "9e9deb5246f07d039b1d1a5ab90ed36f";
    const url = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
    const checkweather = async () => {
      arr.length ? console.log("Name:", arr[0].CatName) : console.log("wait");
      try {
        const res = await axios.get(
          url + `&appid=${Apikey}` + `&q=${arr[0].CatName}`
        );
        // console.log("weather:", res.data);
        setWeather(res.data.weather[0].main);
        setName(res.data.name);
        setTemperature(res.data.main.temp + " °C");
        setHumidity(res.data.main.humidity + "%");
        setSpeed(res.data.wind.speed + "km/h");
        // console.log(res.data.main.temp + " °C");
        // console.log(res.data.main.humidity + "%");
        // console.log();
      } catch (err) {
        console.log(err);
      }
    };
    arr.length ? checkweather() : console.log("none");
  }, [arr]);
  return (
    <div className="singlepage">
      <header>
        <img
          src={arr.length ? `/images/CategoryPackage/${arr[0].CatImg}` : " "}
        />
        {/* <img src=" " /> */}

        <div className="info">
          <h3>{arr.length ? arr[0].CatName : "wait"}</h3>
          <h5>{arr.length ? arr[0].CatTitle : "wait"}</h5>
          {/* <h3>helo</h3> */}

          <p>
            {arr.length ? arr[0].CatAbout : "wait"}
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                  ex amet alias? Repellendus voluptates sapiente quisquam eius
                  sit, id impedit animi assumenda nesciunt ipsam iure expedita
                  debitis omnis dolores magnam dolore distinctio quas modi a
                  atque molestias deleniti perferendis? Nemo delectus
                  voluptatibus corporis at facere eius molestias ut ipsam aut! */}
          </p>
        </div>
      </header>
      <div class="wrapy animate pop" style={{marginBottom:"100px",width:"800px",marginTop:"-40px",left:"-100px"}}>
        <div class="overlay">
          <div class="overlay-content animate slide-left delay-2">
            <h1 class="animate slide-left pop delay-4">Weather</h1>
            <p
              class="animate slide-left pop delay-5 para"
              style={{
                color: "white",
                marginBottom: "2.5rem",
                fontSize: "25px",
              }}
            >
              City: <em>{name}</em>
            </p>
          </div>
          <div class="image-content animate slide delay-5"></div>
          <div class="dots animate">
            <div class="dot animate slide-up delay-6"></div>
            <div class="dot animate slide-up delay-7"></div>
            <div class="dot animate slide-up delay-8"></div>
          </div>
        </div>
        <div class="text">
          <p className="para">
            {/* <img
              class="inset"
              src="https://assets.codepen.io/4787486/oak_1.jpg"
              alt=""
            /> */}
            <b> AVERAGE TEMPERATURE:</b> {temperature}
          </p>
          <p className="para">
            <b>HUMIDITY: </b>
            {humidity}
          </p>
          <p className="para">
            <b>WEATHER:</b> {weather}
          </p>
          <p className="para">
            <b>WIND SPEED: </b>
            {speed}
          </p>
          <p className="para">
            <b>Check the weather before you pack your bag😊</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleCat;

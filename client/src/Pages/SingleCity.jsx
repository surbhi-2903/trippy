import "./SingleCity.scss";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SingleCityslider from "../Components/CitiesComponents/SingleCityslider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { Button } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/authContext";
//tabs
//dialog

const SingleCity = () => {
  const [cityvalues, setCityvalues] = useState([]);
  const [place, setPlace] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const location = useLocation().pathname.split("/")[2];
  const [userlikesave, setUserlikesave] = useState([]);
  const [name, setName] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [speed, setSpeed] = useState("");
  const [weather, setWeather] = useState("");
  // console.log(location);
  var cityid = location.split(":");
  // console.log(cityid[1])
  var cityidint = parseInt(cityid[1], 10);
  useEffect(() => {
    window.scrollTo(0, 0);
    const getValues = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/city/${location}`
        );
        console.log(res.data);
        setCityvalues(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getLikesandsaves = async () => {
      try {
        // console.log(currentUser.Userid, cityidint);
        const res = await axios.get(
          "http://localhost:8800/api/posts/getfromcitiesanduser",
          {
            params: {
              userid: currentUser.Userid,
              cityid: cityidint,
            },
          }
        );
        console.log(res);
        setUserlikesave(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getLikesandsaves();
    getValues();
    const llurl =
      "http://api.positionstack.com/v1/forward?access_key=86770e12280befd9456aa7ada151a415&query=Hyderabad";
    const getlatitude = async () => {
      try {
        const res = await axios.get(llurl);
        console.log("latlong", res.data);
        console.log(typeof res.data);
        // console.log("latlong", res.data[0].latitude);
        // console.log("latlong", res.data[0].longitude);
      } catch (err) {
        console.log(err);
      }
    };
    getlatitude();
  }, []);
  useEffect(() => {
    const Apikey = "9e9deb5246f07d039b1d1a5ab90ed36f";
    const url = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
    const checkweather = async () => {
      cityvalues.length
        ? console.log("cityname:", cityvalues[0].CityName)
        : console.log("not");
      try {
        const res = await axios.get(
          url + `&appid=${Apikey}` + `&q=${cityvalues[0].CityName}`
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
    cityvalues.length ? checkweather() : console.log("none");
  }, [cityvalues]);
  const handleLikeClick = () => {
    const like = document.getElementById("fav");
    setTimeout(function () {
      like.style.transform = `scale(1.3)`;
    }, 0);
    setTimeout(function () {
      like.style.transform = `scale(1)`;
    }, 200);
    if (like.style.color === "white") {
      like.style.color = "red";
      const addliketotable = async () => {
        try {
          console.log(currentUser.Userid, parseInt(cityid[1], 10));
          const res = await axios.post(
            "http://localhost:8800/api/posts/likestocitiesanduser",
            {
              params: {
                userid: currentUser.Userid,
                cityid: cityidint,
              },
            }
          );
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      };
      addliketotable();
    } else {
      like.style.color = "white";
      setTimeout(function () {
        like.style.transform = `scale(1.3)`;
      }, 0);
      setTimeout(function () {
        like.style.transform = `scale(1)`;
      }, 200);
      const removelikefromtable = async () => {
        try {
          const res = await axios.post(
            "http://localhost:8800/api/posts/deletelikesfromcitiesanduser",
            {
              params: {
                userid: currentUser.Userid,
                cityid: cityidint,
              },
            }
          );
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      };
      removelikefromtable();
    }
  };
  // ? (like.style.color = "white")
  // : (like.style.color = "red");

  const handleSaveClick = () => {
    const like = document.getElementById("save");
    setTimeout(function () {
      like.style.transform = `scale(1.3)`;
    }, 0);
    setTimeout(function () {
      like.style.transform = `scale(1)`;
    }, 200);
    if (like.style.color === "white") {
      like.style.color = "red";
      const addsavetotable = async () => {
        try {
          // console.log(currentUser.Userid, parseInt(cityid[1], 10));
          const res = await axios.post(
            "http://localhost:8800/api/posts/savestocitiesanduser",
            {
              params: {
                userid: currentUser.Userid,
                cityid: cityidint,
              },
            }
          );
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      };
      addsavetotable();
    } else {
      setTimeout(function () {
        like.style.transform = `scale(1.3)`;
      }, 0);
      setTimeout(function () {
        like.style.transform = `scale(1)`;
      }, 200);
      like.style.color = "white";
      const removesavefromtable = async () => {
        try {
          const res = await axios.post(
            "http://localhost:8800/api/posts/deletesavesfromcitiesanduser",
            {
              params: {
                userid: currentUser.Userid,
                cityid: cityidint,
              },
            }
          );
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      };
      removesavefromtable();
    }
  };
  return (
    <div className="citypage">
      <header>
        <img
          src={
            cityvalues.length
              ? `/images/Citiesimg/${cityvalues[0].CItyImg}`
              : " "
          }
        />
        {userlikesave.length ? (
          userlikesave[0].Liked ? (
            <FavoriteIcon
              id="fav"
              className="i"
              onClick={handleLikeClick}
              style={{ color: "red" }}
            />
          ) : (
            <FavoriteIcon
              id="fav"
              className="i"
              onClick={handleLikeClick}
              style={{ color: "white" }}
            />
          )
        ) : (
          <FavoriteIcon
            id="fav"
            className="i"
            onClick={handleLikeClick}
            style={{ color: "white" }}
          />
        )}
        {userlikesave.length ? (
          userlikesave[0].Saved ? (
            <TurnedInNotIcon
              id="save"
              className="i"
              onClick={handleSaveClick}
              style={{ color: "red" }}
            />
          ) : (
            <TurnedInNotIcon
              id="save"
              className="i"
              onClick={handleSaveClick}
              style={{ color: "white" }}
            />
          )
        ) : (
          <TurnedInNotIcon
            id="save"
            className="i"
            onClick={handleSaveClick}
            style={{ color: "white" }}
          />
        )}
        {/* <TurnedInNotIcon id="save" className="i" onClick={handleSaveClick} /> */}
        {/* <img src=" " /> */}

        <div className="info">
          <h3>{cityvalues.length ? cityvalues[0].CityName : "wait"}</h3>
          {/* <h3>helo</h3> */}

          <p style={{ color: "white" }}>
            {cityvalues.length ? cityvalues[0].CityAbout : "wait"}
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                  ex amet alias? Repellendus voluptates sapiente quisquam eius
                  sit, id impedit animi assumenda nesciunt ipsam iure expedita
                  debitis omnis dolores magnam dolore distinctio quas modi a
                  atque molestias deleniti perferendis? Nemo delectus
                  voluptatibus corporis at facere eius molestias ut ipsam aut! */}
          </p>
        </div>
      </header>
      {/* <div className="weatherinfo"> */}
      {/* <div className="weather">
          <h1>{name}</h1>
          <h2>AVERAGE TEMPERATURE: {temperature}</h2>
          <h2>HUMIDITY: {humidity}</h2>
          <h2>WEATHER: {weather}</h2>
          <h2>WIND SPEED: {speed}</h2>
          <p>Check the weather before you pack your bag😊</p>
        </div> */}
      {/* AIzaSyDCmh3aAKX41VLCsFFefFBMynmkApfoL9k */}
      {/* <div className="location"></div> */}
      {/* </div> */}
      <div className="singlecitywrap">
        <div className="wrapx">
          <div class="cardx">
            <img
              src="https://images.unsplash.com/photo-1656618020911-1c7a937175fd?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTc1MzQyNTE&ixlib=rb-1.2.1&q=80"
              alt=""
            />
            <div class="card-content">
              <h2>Best Time To Visit</h2>
              <p>
                <b>
                  {cityvalues.length ? cityvalues[0].CityVisitTime : "Loading"}
                </b>
              </p>
            </div>
          </div>
        </div>
        <div class="wrapy animate pop">
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
      <div className="citydetails">
        <h3>Most Loved Places</h3>
        <div>
          <SingleCityslider images={cityvalues} />
        </div>
      </div>
      {/* <div className="timetovisit">
              
      </div> */}
      {/* <div className="flights">
        <h3>Book your trip to {cityvalues.length ? cityvalues[0].CityName : "wait"}</h3>

        <div className="flight">
          <h5 style={{ paddingBottom: "20px" }}>
            From <span style={{ color: "red" }}>Bhopal</span>
          </h5>
          <Accordion
            sx={{
              backgroundColor: "grey",
              marginBottom: "30px",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ color: "white", fontSize: "20px" }}>
                Train to Secunderabad Jn
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{
                  color: "white",
                  fontSize: "15px",
                  backgroundColor: "",
                }}
              >
                12h 55m . One way
                <Button variant="contained" sx={{ marginLeft: "40px" }}>
                  Book Now
                </Button>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ backgroundColor: "grey" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography sx={{ color: "white", fontSize: "20px" }}>
                Cab to Indore, then flight to Hyderabad Airport{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{
                  color: "white",
                  fontSize: "15px",
                  backgroundColor: "",
                }}
              >
                6h 8m . One way{" "}
                <Button variant="contained" sx={{ marginLeft: "40px" }}>
                  Book Now
                </Button>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div> */}
      <div className="places">
        <h3>Stay in {cityvalues.length ? cityvalues[0].CityName : "wait"}</h3>
        <div className="placeforstay">
          <Accordion
            sx={{
              backgroundColor: "grey",
              marginBottom: "30px",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ color: "white", fontSize: "20px" }}>
                CHECK OUT HOTELS
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{
                  color: "black",
                  fontSize: "15px",
                  backgroundColor: "white",
                  paddingLeft: "30px",
                  marginBottom: "15px",
                  borderWidth: "3px",
                  borderStyle: "solid",
                  borderColor: "black",
                }}
              >
                HOTEL1..
                <a
                  href={cityvalues.length ? cityvalues[0].Hotel1 : "wait"}
                  target="_blank"
                >
                  <button style={{ marginLeft: "100px" }}>BOOK NOW</button>
                </a>
              </Typography>
              <Typography
                sx={{
                  color: "black",
                  fontSize: "15px",
                  backgroundColor: "white",
                  paddingLeft: "30px",
                  marginBottom: "15px",
                  borderWidth: "3px",
                  borderStyle: "solid",
                  borderColor: "black",
                }}
              >
                HOTEL2..
                <a
                  href={cityvalues.length ? cityvalues[0].Hotel2 : "wait"}
                  target="_blank"
                >
                  <button style={{ marginLeft: "100px" }}>BOOK NOW</button>
                </a>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="aboutcity">
        <h2>
          More About {cityvalues.length ? cityvalues[0].CityName : "wait"}
        </h2>
        <div className="abouts">
          <h5>{cityvalues.length ? cityvalues[0].CityTitle : "wait"}</h5>
          <p>{cityvalues.length ? cityvalues[0].CityDesc : "wait"}</p>
        </div>
        {/* <div className="abouts">
          <h5>Hyderabad Overview</h5>
          <div className="abouttable ">
            <ul>
              <li>State</li>
              <li>Tourist Places in Hyderabad </li>
              <li>Restaurants in Hyderabad</li>
              <li>Hyderabad is famous for</li>
            </ul>

            <ul>
              <li>Telangana</li>
              <li>
                Hussain Sagar Lake, Chowmahalla Palace, Golconda Fort Near
                Hyderabad, Qutb Shahi Tombs, Salar Jung Museum
              </li>
              <li>
                Kismet, Govind Ki Bandi, Dakshin Mandapa Restaurant, Paradise,
                Chichas
              </li>
              <li>Heritage, Food & Culture, Memorable Experiences</li>
            </ul>
          </div>
        </div> */}
        {/* <div className="abouts">
          <h5>
            Best Time to Visit{" "}
            {cityvalues.length ? cityvalues[0].CityName : "City"}
          </h5>
          <p>{cityvalues.length ? cityvalues[0].CityVisitTime : "Loading"}</p>
        </div> */}
        <div className="abouts">
          <h5>
            What are the things to see and do in{" "}
            {cityvalues.length ? cityvalues[0].CityName : "City"}?{" "}
          </h5>
          <p>{cityvalues.length ? cityvalues[0].CityThings : "Loading"}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleCity;

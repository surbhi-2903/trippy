import { useEffect, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Context/authContext";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./Home.scss";
import SearchIcon from "@mui/icons-material/Search";
import ImageSlider from "../Components/HomeComponents/ImageSlider";
import CommentSlider from "../Components/HomeComponents/CommentSlider";
import Stays from "../Components/HomeComponents/Stays";
const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [userdata, setUserdata] = useState([]);
  const location = useLocation();
  const [Cityarrtr, setCityarr] = useState([]);
  const [packages, setPackages] = useState([]);
  const [allcity, setAllcity] = useState([]);
  const [usercomment, setUsercomment] = useState([]);
  useEffect(() => {
    // console.log(currentUser);
    window.scrollTo(0, 0);
    const fetchfeedback = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/auth/getfeedbacks"
        );
        console.log(res.data);
        setUsercomment(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchfeedback();
    const fetchuserdata = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/auth/getusers");
        console.log("user ", res.data);
        setUserdata(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchuserdata();
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/cities/", {
          params: { category: "TopRecommends" },
        });
        setCityarr(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchPackages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/cities/packages"
        );
        setPackages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchCities = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/cities/allcity");
        // console.log(res.data);
        setAllcity(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    fetchPackages();
    fetchCities();
  }, []);
  const arr = [
    {
      id: "1",
      cityName: "Taj Mahal",
      cityRatings: "⭐⭐⭐⭐🌟",
      aboutCity:
        "Located on the banks of Yamuna, Agra is best known for the iconic taj mahal",
      src: "/images/places/Agra.jpg",
    },
    {
      id: "2",
      cityName: "Lotus Temple",
      cityRatings: "⭐⭐⭐⭐🌟",
      aboutCity:
        " The Lotus Temple (also known as Kamal Mandir) in Delhi is a matchless architectural marvel and ",
      src: "/images/places/lotustemple.jpg",
    },
    {
      id: "3",
      cityName: "Victoria Memorial",
      cityRatings: "⭐⭐⭐⭐🌟",
      aboutCity:
        "The Victoria Memorial or Victoria Palace Kolkata is much more than an iconic landmark or a historical building in the city",
      src: "/images/places/victorialmemorial1.jpg",
    },
    {
      id: "4",
      cityName: "Howrah Bridge",
      cityRatings: "⭐⭐⭐⭐🌟",
      aboutCity:
        " The beautiful Rabindra Setu which connects Kolkata to Howrah has today become an icon of Bengal's history, culture",
      src: "/images/places/howrahbridge1.jpg",
    },
  ];
  const comments = [
    {
      comment:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim laboriosam nemo doloribus dolor numquam assumenda dolorem magni nisi ad debitis?",
      ratings: "3",
    },
    {
      comment:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim laboriosam nemo doloribus dolor numquam assumenda dolorem magni nisi ad debitis?",
      ratings: "4",
    },
    {
      comment:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim laboriosam nemo doloribus dolor numquam assumenda dolorem magni nisi ad debitis?",
      ratings: "5",
    },
    {
      comment:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim laboriosam nemo doloribus dolor numquam assumenda dolorem magni nisi ad debitis?",
      ratings: "5",
    },
    {
      comment:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim laboriosam nemo doloribus dolor numquam assumenda dolorem magni nisi ad debitis?",
      ratings: "4",
    },
  ];

  useEffect(() => {
    const track = document.getElementById("image-track");
    const mousedown = document.getElementById("homephotogallery");
    if (mousedown) {
      console.log("useeffect");
      mousedown.addEventListener("mousedown", (event) => {
        track.dataset.mouseDownAt = event.clientX;
      });
      mousedown.addEventListener("mousemove", (event) => {
        if (track.dataset.mouseDownAt === "0") return;
        const mouseDelta =
            parseFloat(track.dataset.mouseDownAt) - event.clientX,
          maxDelta = window.innerWidth / 2;
        let percentage = (mouseDelta / maxDelta) * -100,
          nextPercentage =
            parseFloat(track.dataset.prevPercentage) + percentage;
        track.dataset.percentage = nextPercentage;
        nextPercentage = Math.min(nextPercentage, 0);
        nextPercentage = Math.max(nextPercentage, -100);
        // track.style.transform = `translate(${nextPercentage}%,-50%)`;
        track.animate(
          { transform: `translate(${nextPercentage}%,-50%)` },
          { duration: 1200, fill: "forwards" }
        );
        for (const image of track.getElementsByClassName("image")) {
          image.animate(
            {
              objectPosition: `${100 + nextPercentage}% center`,
            },
            { duration: 1200, fill: "forwards" }
          );
        }
      });
      mousedown.addEventListener("mouseup", () => {
        track.dataset.mouseDownAt = "0";
        track.dataset.prevPercentage = track.dataset.percentage;
      });
    }
  }, []);
  const [feedback, setFeedback] = useState("");
  const handlefeedbacksubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/givefeedback",
        { params: { feedback: feedback, user: currentUser.Userid } }
      );
      setFeedback("");
      console.log(res.data);
      toast.success(res.data, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="homecontainer">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* <Link to="/authorization">
        {" "}
        <button onClick={Logout}>Logout</button>
        <div id="welcomeMessage" style={{display:"none"}}>
          Welcome to the Home Page!
        </div>
      </Link> */}
      <div className="searchbar">
        {/* <SearchIcon className="searchicon" />
        <input placeholder="Search cities" className="Homesearch"></input> */}
      </div>
      <div className="recommended">
        <div className="recommendedcards">
          <ImageSlider images={Cityarrtr} />
        </div>
        <div className="recommendedtext">
          <h2 style={{ textAlign: "left" }}>
            Recommended
            <br /> places to visit
          </h2>
          <p className="spanone">
            100+ <span>Destination</span>
          </p>
          <p className="spanone">
            100+ <span>Tourist</span>
          </p>
          <p className="spanone">
            100+ <span>Hotels</span>
          </p>
          <Link to="/cities/">
            <button>Discover More</button>
          </Link>
        </div>
      </div>
      <div className="services">
        {/* <video
          className="servicesvideo"
          autoPlay={true}
          loop={true}
          muted={true}
        >
          <source src="/videos/video2.mp4" type="video/mp4"/>
        </video> */}
        <h2 className="serviceshead" style={{ textAlign: "left" }}>
          What Services we provide
        </h2>
        <div className="servicenames">
          <div className="servicename">
            <div className="service">
              <h3> 1. Travel Destinations </h3>
              <p>Explore the rich history and culture of India!!</p>
            </div>
            <div className="service">
              <h3> 2. Post Sharing </h3>
              <p>
                Connect with others and discover new content with our vast
                network of users!!
              </p>
            </div>
            <div className="service">
              <h3> 3. Accomodation </h3>
              <p>Book your stay today !!</p>
            </div>
          </div>
          <div className="servicephotos">
            {packages.map((item) => {
              return (
                <Link to={`/package/:${item.PackageId}`}>
                  <div className="image" key={item.PackageId}>
                    <h3>{item.PackageName}</h3>
                    <img src={`/images/Packages/${item.PackageImg}`}></img>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="homestays">
        <h2 className="homestayshead">Travel Beyond Boundaries with us</h2>
        <div className="homestayscards">
          <Stays images={allcity} />
        </div>
      </div>
      {/* <div className="photogalleryheading">WELCOME TO PHOTOGALLERY</div>
      <div className="homephotogallery" id="homephotogallery">
        <div
          className="image-track"
          id="image-track"
          data-mouse-down-at="0"
          data-prev-percentage="0"
        >
          <img
            className="image"
            src="/images/tourists/tourist2.avif"
            alt="na"
            draggable="false"
          />
          <img
            className="image"
            src="../images/register1.avif"
            alt="na"
            draggable="false"
          />
          <img
            className="image"
            src="/images/register2.avif"
            alt="na"
            draggable="false"
          />
          <img
            className="image"
            src="/images/register3.avif"
            alt="na"
            draggable="false"
          />
          <img
            className="image"
            src="/images/register4.avif"
            alt="na"
            draggable="false"
          />
          <img
            className="image"
            src="/images/tourists/tourist10.jpg"
            alt="na"
            draggable="false"
          />
          <img
            className="image"
            src="/images/tourists/tourist9.jpg"
            alt="na"
            draggable="false"
          />
          <img
            className="image"
            src="/images/tourists/tourist8.jpg"
            alt="na"
            draggable="false"
          />
          <img
            className="image"
            src="/images/tourists/tourist7.jpg"
            alt="na"
            draggable="false"
          />
          <img
            className="image"
            src="/images/tourists/tourist6.jpg "
            alt="na"
            draggable="false"
          />
          <img
            className="image"
            src="/images/tourists/tourist5.jpg"
            alt="na"
            draggable="false"
          />
          <img
            className="image"
            src="/images/tourists/tourist4.avif"
            alt="na"
            draggable="false"
          />
          <img
            className="image"
            src="/images/tourists/tourist3.avif "
            alt="na"
            draggable="false"
          />
          <img
            className="image"
            src="/images/tourists/tourist2.avif "
            alt="na"
            draggable="false"
          />
        </div>
      </div> */}

      <div className="homecomments">
        <h3>Here our client says about us</h3>
        <div className="comments">
          <CommentSlider comments={usercomment} />
        </div>
      </div>
      <div className="servicesfeedback">
        <video
          className="servicesvideo"
          autoPlay={true}
          loop={true}
          muted={true}
        >
          <source src="/videos/video2.mp4" type="video/mp4" />
        </video>
        <h2
          className="serviceshead"
          style={{
            textAlign: "left",
            padding: "0px 30px",
            marginTop: "10px",
          }}
        >
          Give us your feedback!!
        </h2>
        <div className="servicenames">
          <div className="servicename">
            <div className="service">
              <p>Your opinion is valuable to us !!</p>
            </div>
            <div className="service">
              <input
                className="feedbackinput"
                value={feedback}
                onChange={(event) => {
                  setFeedback(event.target.value);
                }}
                placeholder="Enter your feedback here!!"
              ></input>
            </div>
            <div className="service">
              <button onClick={handlefeedbacksubmit}>Submit</button>
            </div>
          </div>
          <div className="servicephotos">
            <div class="card__collection clear-fix">
              {userdata.map((item) => {
                return (
                  <div class="cards cards--two">
                    <img
                      src={`../uploads/${item.UserImg}`}
                      class="img-responsive"
                      alt="Cards Image"
                    />
                    <span class="cards--two__rect"></span>
                    <span class="cards--two__tri"></span>
                    <p>{item.Username}</p>
                    <ul class="cards__list">
                      <li>
                        <i class="fab fa-facebook-f"></i>
                      </li>
                      <li>
                        <i class="fab fa-twitter"></i>
                      </li>
                      <li>
                        <i class="fab fa-instagram"></i>
                      </li>
                      <li>
                        <i class="fab fa-linkedin-in"></i>
                      </li>
                    </ul>
                  </div>
                );
              })}

              {/* <div class="cards cards--three">
                <img
                  src="https://images.unsplash.com/photo-1480408144303-d874c5e12201?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=575213599ae24b3dbdfd84be79425c50&auto=format&fit=crop&w=634&q=80"
                  class="img-responsive"
                  alt=""
                />
                <span class="cards--three__rect-1">
                  <span class="shadow-1"></span>
                  <p>Chris Levnon</p>
                </span>
                <span class="cards--three__rect-2">
                  <span class="shadow-2"></span>
                </span>
                <span class="cards--three__circle"></span>
                <ul class="cards--three__list">
                  <li>
                    <i class="fab fa-facebook-f"></i>
                  </li>
                  <li>
                    <i class="fab fa-twitter"></i>
                  </li>
                  <li>
                    <i class="fab fa-linkedin-in"></i>
                  </li>
                </ul>
              </div> */}
            </div>
            {/* <img
              className="image"
              src="https://images.unsplash.com/photo-1696484863977-7f7feb9a2adf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfFM0TUtMQXNCQjc0fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=900&q=60"
            ></img>
            <img
              className="image"
              src="https://images.unsplash.com/photo-1673647827167-ff136e59a645?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fFM0TUtMQXNCQjc0fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=900&q=60"
            ></img>
            <img
              className="image"
              src="https://images.unsplash.com/photo-1696513301944-90abb561b935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfFM0TUtMQXNCQjc0fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=900&q=60"
            ></img>
            <img
              className="image"
              src="https://images.unsplash.com/photo-1675159585282-d86b52c7f65d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDM1fFM0TUtMQXNCQjc0fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
            ></img>
            <img
              className="image"
              src="https://images.unsplash.com/photo-1695755656490-74ddf32eeff5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQ2fFM0TUtMQXNCQjc0fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
            ></img>
            <img
              className="image"
              src="https://media.istockphoto.com/id/1480345541/photo/businesswoman-using-phone-online-banking-artificial-intelligence-and-communication-network-on.webp?s=170667a&w=0&k=20&c=8mVCcJhQoJMSmKH1PtvgkyBBnwxOJ9QttVgn9iE-TxA="
            ></img>
            <img
              className="image"
              src="https://images.unsplash.com/photo-1696484994990-08e391ed2f99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
            ></img>
            <img
              className="image"
              src="https://images.unsplash.com/photo-1696484958150-ae2a11fd0449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
            ></img> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;

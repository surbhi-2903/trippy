import React, { useEffect, useState } from "react";
import "./Cities.scss";
import ImageSlider from "../Components/CitiesComponents/ImageSlider";
import Slider2 from "../Components/CitiesComponents/Slider2";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
const Cities = () => {
  const location = useLocation();
  // console.log(location);
  const [Cityarrtr, setCityarr] = useState([]);
  const [Cityarrm, setCityarrm] = useState([]);
  const [Cityarrtd, setCityarrtd] = useState([]);
  const [Cityarrni, setCityarrni] = useState([]);
  const [Cityarrsi, setCityarrsi] = useState([]);

  const categoryarr = [
    "TopRecommends",
    "Museums",
    "TopDestinations",
    "NorthIndia",
    "SouthIndia",
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData1 = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/cities/", {
          params: { category: categoryarr[0] },
        });
        setCityarr(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchData2 = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/cities/", {
          params: { category: categoryarr[1] },
        });
        setCityarrm(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchData3 = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/cities/", {
          params: { category: categoryarr[2] },
        });
        setCityarrtd(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchData4 = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/cities/", {
          params: { category: categoryarr[3] },
        });
        setCityarrni(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchData5 = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/cities/", {
          params: { category: categoryarr[4] },
        });
        setCityarrsi(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData1();
    fetchData2();
    fetchData3();
    fetchData4();
    fetchData5();
  }, []);
  return (
    <div className="cities">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="topdestinations">
        <h2>Top Recommends</h2>
        <div className="recommendedcards">
          <ImageSlider images={Cityarrtr} />
        </div>
      </div>
      <div className="topdestinations">
        <h2>Museums in India</h2>
        <div className="recommendedcards">
          <ImageSlider images={Cityarrm} />
        </div>
      </div>
      <div className="topdestinations">
        <h2>Top Destinations of Month in India</h2>
        <div className="recommendedcards" style={{ height: "100%" }}>
          <Slider2 images={Cityarrtd} />
        </div>
      </div>
      <div className="topdestinations" style={{ marginTop: "250px" }}>
        <h2> Destinations in North India</h2>
        <div className="recommendedcards">
          <ImageSlider images={Cityarrni} />
        </div>
      </div>
      <div className="topdestinations">
        <h2> Destinations in South India</h2>
        <div className="recommendedcards">
          <ImageSlider images={Cityarrsi} />
        </div>
      </div>
    </div>
  );
};

export default Cities;

import React, { useEffect, useState } from "react";
import "./SingleCityPlace.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";

const SingleCityPlace = () => {
  const location = useLocation().pathname.split("/")[2];
  const [arr, setArr] = useState([]);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/city/singlecity/${location}`
        );
        console.log(res.data);
        setArr(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="singleplace">
      <header>
        <img src={arr.length ? `/images/PlacesImg/${arr[0].PlaceImg}` : " "} />
        {/* <img src=" " /> */}

        <div className="info">
          <h3>{arr.length ? arr[0].PlaceName : "wait"}</h3>
          {/* <h5>{arr.length ? arr[0].CatTitle : "wait"}</h5> */}
          {/* <h3>helo</h3> */}

          <p>
            {arr.length ? arr[0].PlaceDesc : "wait"}
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                  ex amet alias? Repellendus voluptates sapiente quisquam eius
                  sit, id impedit animi assumenda nesciunt ipsam iure expedita
                  debitis omnis dolores magnam dolore distinctio quas modi a
                  atque molestias deleniti perferendis? Nemo delectus
                  voluptatibus corporis at facere eius molestias ut ipsam aut! */}
          </p>
        </div>
      </header>
    </div>
  );
};

export default SingleCityPlace;

import React, { useEffect, useState } from "react";
import "./Category.scss";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Category = () => {
  const [category, setCategory] = useState([]);
  const location = useLocation();
  const value = location.pathname.split("/");
  useEffect(() => {
    const message = () => {
      toast.success(`Landed to ${category[0].PackageName}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    };
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/cities/package/${value[2]}`
        );
        console.log(res.data);
        setCategory(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="categorypage">
      <ToastContainer
        position="top-center"
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
      <header>
        <img
          src={
            category.length
              ? `/images/CategoryPackage/${category[0].CatImg}`
              : " "
          }
        />
        {/* <img src=" " /> */}

        <div className="info">
          <h3>{category.length ? category[0].CatName : "wait"}</h3>
          {/* <h3>helo</h3> */}

          <p>
            {category.length ? category[0].CatAbout : "wait"}
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ex
            amet alias? Repellendus voluptates sapiente quisquam eius sit, id
            impedit animi assumenda nesciunt ipsam iure expedita debitis omnis
            dolores magnam dolore distinctio quas modi a atque molestias
            deleniti perferendis? Nemo delectus voluptatibus corporis at facere
            eius molestias ut ipsam aut! */}
          </p>
        </div>
      </header>
      <div className="categoryplaces">
        {category.map((item) => {
          return (
            <div className="wrap" key={item.catId}>
              <Link to={`/packagecat/:${item.catId}`} className="link">
                <img src={`/images/CategoryPackage/${item.CatImg}`} />
                <div className="about">
                  <span>{item.CatName}</span>
                </div>
                <hr />
                <p>{item.CatAbout}</p>
                <button className="aboutbutton">Know More</button>
                {/* <span>{item.cityRatings}</span> */}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;

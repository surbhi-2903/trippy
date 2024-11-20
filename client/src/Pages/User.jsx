import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./User.scss";
import { AuthContext } from "../Context/authContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const User = () => {
  const [value, setValue] = React.useState(0);
  const [posts, setPosts] = useState([]);
  const [favcities, setFavCities] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchuserdata = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/auth/getoneuser",
          {
            params: { userid: currentUser.Userid },
          }
        );
        // console.log("hello");
        // console.log("user ", res.data);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/posts/", {
          params: { Userid: currentUser.Userid },
        });
        // console.log("values", res.data);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getFavcities = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/cities/getfavcity",
          {
            params: { userid: currentUser.Userid },
          }
        );
        setFavCities(res.data);
        // console.log("fav", res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchuserdata();
    getFavcities();
    fetchData();
  }, []);
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const arr = [
    {
      id: "1",
      title: "surbhi",
      desc: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem similique nemo ea consectetur nobis fugiat rem laborum natus tenetur aperiam. ",
    },
    {
      id: "12",
      title: "surbhi",
      desc: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem similique nemo ea consectetur nobis fugiat rem laborum natus tenetur aperiam. ",
    },
    {
      id: "3",
      title: "surbhi",
      desc: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem similique nemo ea consectetur nobis fugiat rem laborum natus tenetur aperiam. ",
    },
    {
      id: "4",
      title: "surbhi",
      desc: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem similique nemo ea consectetur nobis fugiat rem laborum natus tenetur aperiam. ",
    },
  ];
  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:8800/api/upload",
        formData
      );
      return res.data.filename;
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    setFile(imgUrl);
    console.log(imgUrl);
    console.log(title, textvalue, imgUrl);
    try {
      const res = await axios.post("http://localhost:8800/api/posts/", {
        title,
        textvalue,
        img: file.name,
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userid: currentUser.Userid,
      });
      toast.success("Post uploaded!!", {
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
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };
  const handleimageclick = (postimage) => {
    console.log("postimage", postimage);
    const getimage = document.getElementById("full-screen");
    setTimeout(function () {
      getimage.innerHTML = `<img src="/uploads/${postimage}" alt="" />`;
      getimage.style.display = "flex";
    }, 100);
    setTimeout(function () {
      getimage.style.display = "none";
    }, 5000);
  };
  const { Logout, currentUser } = useContext(AuthContext);
  // console.log(currentUser);
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || "");
  const [textvalue, setTextValue] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [showEdit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(!showEdit);
  };
  const [username, setUsername] = useState("");
  const [userabout, setuserabout] = useState("");
  const handleProfileSave = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/setprofile",
        {
          params: {
            username: username,
            userabout: userabout,
            userid: currentUser.Userid,
          },
        }
      );
      console.log(res.data);
      setUsername("");
      setuserabout("");
      toast.success(res.data, {
        position: "top-center",
        autoClose: 2000,
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
    <div className="userdiv">
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
      <div className="userheader">
        <div className="header">
          <div className="headerimg">
            <img src={`../uploads/${currentUser.UserImg}`} alt="userimage" />
            <h3>{currentUser.Username}</h3>
            <div className="socialicons">
              <i class="fa-brands fa-facebook-f fb"></i>
              <i class="fa-brands fa-twitter x"></i>
              <i class="fa-brands fa-instagram insta"></i>
              <i class="fa-brands fa-youtube utube"></i>
            </div>
          </div>
          <div className="userdetails">
            <div className="detail">
              <h3>UserName : {user.length ? user[0].UserUsername : ""}</h3>
              <h3>About : {user.length ? user[0].UserAbout : ""}</h3>
              <h3>Email : {currentUser.UseremailId}</h3>
              <h3>Hometown : {currentUser.UserHomeTown}</h3>
            </div>
            <div className="buttons">
              <button className="logoutbutton edit" onClick={handleEdit}>
                Edit Profile
              </button>
              {showEdit && (
                // <div className="box">
                //   {/* Content of the box */}
                //   This is the box content.
                //   <input className="profileedit" type="text" placeholder="Username" />
                //   <input className="profileedit" type="text" placeholder="About" />
                // </div>
                <div className="box animate pop">
                  <h2>Edit Profile</h2>
                  <CloseIcon
                    sx={{ position: "absolute", right: "25px", top: "25px" }}
                    onClick={handleEdit}
                  />
                  <div class="input-container">
                    <input
                      type="text"
                      placeholder="Username "
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                  <div class="input-container">
                    <input
                      type="text"
                      placeholder="About "
                      value={userabout}
                      onChange={(e) => {
                        setuserabout(e.target.value);
                      }}
                    />
                  </div>
                  <button class="ok-button" onClick={handleProfileSave}>
                    SAVE
                  </button>
                </div>
              )}
              <Link to="/">
                <button onClick={Logout} className="logoutbutton">
                  Logout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="posts">
        <div className="userpost">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange2}
                aria-label="basic tabs example"
              >
                <Tab
                  label=" My Posts"
                  {...a11yProps(0)}
                  style={{ marginLeft: "200px" }}
                />
                <Tab label="Favourites" {...a11yProps(1)} />
                <Tab label=" Saved" {...a11yProps(2)} />
                <Tab label=" Write " {...a11yProps(3)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0} className="tabpanel">
              <div className="userposts">
                {posts.map((post) => (
                  <div className="postscontainer">
                    <div className="fullscreenuser" id="full-screen"></div>
                    <div class="postcard">
                      <div
                        class="image"
                        onClick={() => {
                          handleimageclick(post.PostImg);
                        }}
                      >
                        <img src={`/uploads/${post.PostImg}`} />
                      </div>
                      <div class="content">
                        <h3>{post.PostTitle}</h3>
                        <p>{getText(post.PostDesc)}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {/* {posts.map((post) => {
                  return (
                    <article class="card card--1">
                      <div
                        class="card__img"
                        style={{
                          backgroundImage: `url('/uploads/${post.PostImg}')`,
                        }}
                      ></div>
                      <a href="#" class="card_link">
                        <div
                          class="card__img--hover"
                          style={{
                            backgroundImage: `url('/uploads/${post.PostImg}')`,
                          }}
                        ></div>
                      </a>
                      <div class="card__info">
                        <span class="card__category">
                          {" "}
                          Posted {moment(post.Date).fromNow()}
                        </span>
                        <h3 class="card__title">{post.PostTitle}</h3>
                        <span class="card__by">
                          by{" "}
                          <a href="#" class="card__author" title="author">
                            {currentUser.Username}
                          </a>
                        </span>
                      </div>
                    </article>
                  );
                })} */}
              </div>
            </CustomTabPanel>
            <CustomTabPanel
              value={value}
              index={1}
              style={{ padding: "30px", marginBottom: "30px" }}
            >
              <div className="cards">
                {favcities.map((item) => {
                  if (item.Liked) {
                    return (
                      <div
                        className="staycard"
                        style={{ padding: "20px", height: "500px" }}
                      >
                        <Link to={`/city/:${item.CityId}`}>
                          <h3>{item.CityName}</h3>
                          <img
                            src={`/images/Citiesimg/${item.CItyImg}`}
                            alt="na"
                          />
                        </Link>
                      </div>
                      //to={`/city/:${item.CityId}`
                    );
                  } else return;
                })}
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <div className="cards">
                {favcities.map((item) => {
                  if (item.Saved) {
                    return (
                      <div
                        className="staycard"
                        style={{ padding: "20px", height: "500px" }}
                      >
                        <Link to={`/city/:${item.CityId}`}>
                          <h3>{item.CityName}</h3>
                          <img
                            src={`/images/Citiesimg/${item.CItyImg}`}
                            alt="na"
                          />
                        </Link>
                      </div>
                      //to={`/city/:${item.CityId}`
                    );
                  } else return;
                })}
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <div className="content">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <input
                  style={{ display: "none" }}
                  type="file"
                  // name=""
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label
                  className="file"
                  htmlFor="file"
                  style={{
                    backgroundColor: "transparent",
                    color: "darkblue",
                    fontWeight: "700",
                    position: "absolute",
                    right: "50px",
                    top: "614px",
                    padding: "7px",
                    cursor: "pointer",
                  }}
                >
                  Upload Image
                </label>
                <div className="editorContainer">
                  <ReactQuill
                    className="editor"
                    theme="snow"
                    value={textvalue}
                    onChange={setTextValue}
                  />
                </div>
                <div className="postbuttondiv">
                  <button
                    onClick={handleChange}
                    className="postbutton"
                    style={{
                      backgroundColor: "transparent",
                      color: "red",
                      borderRadius: "0px",
                      borderColor: "red",
                      borderWidth: "2px",
                      fontSize: "18px",
                      padding: "10px",
                      position: "absolute",
                      right: "60px",
                      top: "1080px",
                    }}
                  >
                    UPLOAD
                  </button>
                </div>
              </div>
            </CustomTabPanel>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default User;

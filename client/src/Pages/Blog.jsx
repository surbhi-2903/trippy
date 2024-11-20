import React, { useContext, useEffect, useState } from "react";
import "./Blog.scss";
import axios from "axios";
import { AuthContext } from "../Context/authContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import moment from "moment";
const Blog = () => {
  const [allposts, setAllposts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [checkliked, setCheckliked] = useState([]);
  // console.log(currentUser);
  var likes = 0;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/posts/blogs");
        // console.log(res.data);
        setAllposts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const checkliked = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/api/posts/getlikedposts",
          { params: { userid: currentUser.Userid } }
        );
        // console.log(res.data);
        setCheckliked(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    checkliked();
  }, []);
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  const handleLikeClick = (postid) => {
    const value = `like${postid}`;
    const like = document.getElementById(value);
    setTimeout(function () {
      like.style.transform = `scale(1.3)`;
    }, 0);
    setTimeout(function () {
      like.style.transform = `scale(1)`;
    }, 200);
    console.log(like.style.color);
    if (like.style.color == "white") {
      like.style.color = "red";
      // like.style.zIndex = "300";
      console.log("adding", postid);
      const addlikestouserandposts = async () => {
        console.log(currentUser.Userid, postid);
        try {
          const res = await axios.post(
            "http://localhost:8800/api/posts/likespostsandusers",
            { params: { userid: currentUser.Userid, postid: postid } }
          );
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      const addlikes = async () => {
        try {
          const res = await axios.post(
            "http://localhost:8800/api/posts/addlikestoposts",
            { params: { postid: postid } }
          );
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      const fetchData = async () => {
        try {
          const res = await axios.get("http://localhost:8800/api/posts/blogs");
          console.log("increasinglikes");
          setAllposts(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      addlikestouserandposts();
      addlikes();
      fetchData();
    } else {
      console.log("removing", postid);
      like.style.color = "white";
      setTimeout(function () {
        like.style.transform = `scale(1.3)`;
      }, 0);
      setTimeout(function () {
        like.style.transform = `scale(1)`;
      }, 200);
      const removefrompostsanduser = async () => {
        try {
          const res = await axios.post(
            "http://localhost:8800/api/posts/removelikefrompostsanduser",
            {
              params: { postid: postid },
            }
          );
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      const removelikes = async () => {
        try {
          const res = await axios.post(
            "http://localhost:8800/api/posts/removelikefrompost",
            { params: { postid: postid } }
          );
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      const fetchData = async () => {
        try {
          const res = await axios.get("http://localhost:8800/api/posts/blogs");
          console.log("decreasing likes");
          setAllposts(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      removefrompostsanduser();
      removelikes();
      fetchData();
    }
  };
  const handleimageclick = (postimage, postdesc) => {
    console.log("postimage", postimage);
    const getimage = document.getElementById("full-screen");
    setTimeout(function () {
      getimage.innerHTML = `<img src="/uploads/${postimage}" alt="" /> 
      ${postdesc}`;
      getimage.style.display = "flex";
    }, 100);
    setTimeout(function () {
      getimage.style.display = "none";
    }, 4000);
  };
  return (
    <>
      <h1 className="heading">Posts</h1>
      {/* <h1>This is a Block-Level Heading</h1> */}
      <div class="container">
        <div className="fullscreen" id="full-screen"></div>
        {allposts.map((post) => {
          return (
            <article class="pcard card--1" id="pcard">
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
                  onClick={() => {
                    handleimageclick(post.PostImg, post.PostDesc);
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
                    {post.Username}
                  </a>
                </span>
                {checkliked.length ? (
                  (() => {
                    const isPostIdLiked = checkliked.some(
                      (item) => item.postid === post.PostId
                    );

                    return isPostIdLiked ? (
                      <FavoriteIcon
                        className="likepost"
                        id={`like${post.PostId}`}
                        onClick={() => handleLikeClick(post.PostId)}
                        style={{
                          fontSize: "40px",
                          color: "red",
                          zIndex: "100",
                        }}
                      />
                    ) : (
                      <FavoriteIcon
                        className="likepost"
                        id={`like${post.PostId}`}
                        onClick={() => handleLikeClick(post.PostId)}
                        style={{
                          fontSize: "40px",
                          color: "white",
                          zIndex: "20",
                        }}
                      />
                    );
                  })()
                ) : (
                  // <></>
                  <FavoriteIcon
                    className="likepost"
                    // {likes=${post.PostId}}
                    id={`like${post.PostId}`}
                    onClick={() => handleLikeClick(post.PostId)}
                    style={{
                      fontSize: "40px",
                      color: "white",
                    }}
                  />
                )}

                <span className="likecount">{post.Likes}</span>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};

export default Blog;

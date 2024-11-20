import "./SideNavbar.scss";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ArticleIcon from "@mui/icons-material/Article";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../Context/authContext";
const SideNavbar = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    if (open) setOpen(false);
    else setOpen(true);
  };
  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    const openarrow = document.getElementById("arrowopen");
    const closearrow = document.getElementById("arrowclose");
    const navcontainer = document.getElementById("navcontainer");
    const navuser = document.getElementById("navuser");
    const navoptions = document.getElementById("navoptions");
    openarrow.addEventListener("click", () => {
      console.log("by", open);
      navcontainer.classList.add("large");
      navuser.classList.add("large");
      navoptions.classList.add("large");
    });
    closearrow.addEventListener("click", () => {
      console.log("hello", open);
      navcontainer.classList.remove("large");
      navuser.classList.remove("large");
      navoptions.classList.remove("large");
    });
  }, [open]);

  return (
    <div className="navcontainer" id="navcontainer">
      <video className="navvideo" autoPlay={true} loop={true} muted={true}>
        <source src="/videos/video4.mp4" type="video/mp4"></source>
      </video>
      <div className="navwrapper">
        <Link to="/user">
          <div className="navuser" id="navuser">
            <img src={`../uploads/${currentUser.UserImg}`} alt="na" type="image/jpg/webp" className="navuserimg"></img>
            <span className="navusername">{currentUser.Username}</span>
          </div>
        </Link>
        <hr />
        <div className="navoptions" id="navoptions">
          <Link to="/home">
            <span className="navoption">
              <span className="navoptionicon">
                <HomeIcon style={{ fontSize: "30px", color: "white" }} />
              </span>
              <p>Home</p>
            </span>
          </Link>
          <Link to="/cities">
            <span className="navoption">
              <span className="navoptionicon">
                <LocationCityIcon
                  style={{ fontSize: "30px", color: "white" }}
                />
              </span>
              <p>Cities</p>
            </span>
          </Link>
          <Link to="/stays">
            <span className="navoption">
              <span className="navoptionicon">
                <ApartmentIcon style={{ fontSize: "30px", color: "white" }} />
              </span>
              <p>Hotels</p>
            </span>
          </Link>
          <Link to="/blog">
            <span className="navoption">
              <span className="navoptionicon">
                <ArticleIcon style={{ fontSize: "30px", color: "white" }} />
              </span>
              <p>Blog</p>
            </span>
          </Link>
        </div>
      </div>

      {open ? (
        <>
          <ArrowBackIosIcon
            style={{
              position: "absolute",
              color: "white",
              top: "50%",
              left: "93%",
              opacity: "1",
              cursor: "pointer",
            }}
            id="arrowclose"
            onClick={handleClick}
          />
          <ArrowForwardIosIcon
            style={{
              position: "absolute",
              color: "black",
              top: "1%",
              left: "100%",
              opacity: "0",
              cursor: "pointer",
            }}
            id="arrowopen"
            // onClick={handleClick}
          />
        </>
      ) : (
        <>
          <ArrowBackIosIcon
            style={{
              position: "absolute",
              color: "black",
              top: "50%",
              left: "93 %",
              opacity: "0",
              cursor: "pointer",
            }}
            id="arrowclose"
            // onClick={handleClick}
          />
          <ArrowForwardIosIcon
            style={{
              position: "absolute",
              color: "black",
              top: "1.5%",
              left: "100%",
              opacity: "1",
              cursor: "pointer",
            }}
            id="arrowopen"
            onClick={handleClick}
          />
        </>
      )}
    </div>
  );
};
export default SideNavbar;

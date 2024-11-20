import "./Container.scss";
import SideNavbar from "../SideNavbar";
import Header from "../Header";
import Footer from "../Footer";
import Main from "../Main";
import Error from "../../Pages/Error";
const getuseris = () => {
  const uservalue = localStorage.getItem("user");
  // console.log(typeof uservalue);
  // console.log(uservalue);
  // if (uservalue === "null") console.log("yes");
  // else console.log("no");
  return uservalue;
};
const Container = () => {
  return (
    <div className="maincontainer">
      {getuseris() === "null" ? (
        <Error />
      ) : (
        <>
          {" "}
          <SideNavbar />
          <Main />
        </>
      )}
    </div>
  );
};
export default Container;

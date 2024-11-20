import { Outlet } from "react-router-dom";
import SideNavbar from "../SideNavbar";
import "./Container2.scss";
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
    <div className="maincontainer2">
       {getuseris() === "null" ? (
        <Error />
      ) : (
        <>
          {" "}
          <SideNavbar style={{flex:"2"}} />
          <Outlet style={{ flex: "8" }} />
        </>
      )}
      
    </div>
  );
};
export default Container;

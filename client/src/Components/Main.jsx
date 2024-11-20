import Home from "../Pages/Home";
import Footer from "./Footer";
import Header from "./Header";
import "./Main.scss"
import { Outlet } from "react-router-dom";

const Main=()=>{
    return <div className="mainwrapper">
        <Header />
        <Outlet/>
        <Footer/>
    </div>
}
export default Main;
import {
  createBrowserRouter,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import SideNavbar from "./Components/SideNavbar";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import { ToastContainer } from "react-toastify";
import Container from "./Components/ContainerComponents/Container";
import Cities from "./Pages/Cities";
import Stays from "./Pages/Stays";
import User from "./Pages/User";
import Blog from "./Pages/Blog";
import Container2 from "./Components/ContainerComponents/Container2";
import SingleCity from "./Pages/SingleCity";
import SingleStay from "./Pages/SingleStay";
import Category from "./Pages/Category";
import SingleCat from "./Pages/SingleCat";
import SingleCityPlace from "./Pages/SingleCityPlace";
import Error from "./Pages/Error";
import { useEffect } from "react";

const checkuser = () => {
  const userispresent = localStorage.getItem("user");
  // console.log("locastorage",localStorage.getItem("user"));
  console.log(userispresent);
  return userispresent;
};
const Layout = () => {
  return (
    <>
      <Container />
    </>
  );
};
const Layout2 = () => {
  return <Container2 />;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    //for pages with url including /home,/cities,/stays the root path will be rendering Layout component.
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/cities",
        element: <Cities />,
      },
      {
        path: "/stays",
        element: <Stays />,
      },
    ],
  },
  {
    //for url including /city/:id,/stay/:id etc the root path will render Layout2 component.
    path: "/",
    element: <Layout2 />,
    children: [
      {
        path: "/city/:id",
        element: <SingleCity />,
      },
      {
        path: "/stay/:id",
        element: <SingleStay />,
      },
      {
        path: "/package/:id",
        element: <Category />,
      },
      {
        path: "/packagecat/:id",
        element: <SingleCat />,
      },
      {
        path: "/cityplace/:id",
        element: <SingleCityPlace />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
    ],
  },
]);
const router2 = createBrowserRouter([
  {
    path: "/",
    element: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
  // const userispresent = checkuser();
  // useEffect(()=>{})
  // (userispresent != null) ? (

  //    return <RouterProvider router={router}></RouterProvider>)
  // ) : (
  //   return <RouterProvider router={router2}></RouterProvider>
  // );
  // const checklogin = localStorage.getItem("user");
  // console.log(checklogin);
  // // console.log(userispresent);
  // return checklogin === null
  //   ? (console.log("notlogin"),
  //     (<RouterProvider router={router}></RouterProvider>))
  //   : (console.log("login"),
  //     console.log(checklogin),
  //     (<RouterProvider router={router2}></RouterProvider>));
};
export default App;


Int16Arra 

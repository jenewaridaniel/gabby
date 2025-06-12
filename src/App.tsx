import { useState, useEffect } from "react";
import Homepage from "../src/pages/Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContactUs from "./ContactFolder/Contactus";
// import Signup from "./auth/Signup";
// import Login from "./auth/Login";
import Terms from "./T&C/Terms";
import Privacy from "./T&C/Privacy";
import Experiences from "./utilis/Experiences";
import Dashboard from "../src/DashBoard/Dashboard";
import Story from "../src/utilis/Story";
import Rooms from "./pages/Rooms";
import Diner from './pages/Diner'
import Admin from './Admin/Admin'
import BookingSystem from "./Function/BookingSystem";
import BookingDetails from "./Function/BookingDetails";

// protected routes //


const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const ROUTER = {
    LANDING: "/",
    CONTACTUS: "/contact-us",
    // SIGNUP: "/auth/signup",
    // LOGIN: "/auth/login",
    TERMS: "/terms",
    ROOMS: '/rooms',
    DINING: '/dining',
    PRIVACY: "/privacy",
    DASHBOARD: "/dashboard/:uid",
    EXP: "/experiences",
    ADMIN:'/admin',
    BOOKING:'/booking',
    STORY: "/story",
    BOOKINGDETAILS: '/booking/details'
  };

  const router = createBrowserRouter([
    { path: ROUTER.LANDING, element: <Homepage /> },
    { path: ROUTER.CONTACTUS, element: <ContactUs /> },
    {path:ROUTER.ADMIN, element:<Admin/>},
    {path:ROUTER.BOOKING, element:<BookingSystem/>},
    {path:ROUTER.BOOKINGDETAILS, element:<BookingDetails/>},
    // { path: ROUTER.SIGNUP, element: <Signup /> },
    // { path: ROUTER.LOGIN, element: <Login /> },
    { path: ROUTER.TERMS, element: <Terms /> },
    { path: ROUTER.PRIVACY, element: <Privacy /> },
    { path: ROUTER.EXP, element: <Experiences /> },
    { path: ROUTER.ROOMS, element: <Rooms /> },
    { path: ROUTER.DINING, element: <Diner /> },
    { path: ROUTER.STORY, element: <Story /> },
    { path: ROUTER.DASHBOARD, element: <Dashboard /> },
  ]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </div>
  );
};

export default App;

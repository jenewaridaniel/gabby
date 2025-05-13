import { useState, useEffect } from "react";
import Homepage from "../src/pages/Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContactUs from "./ContactFolder/Contactus";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Terms from "./T&C/Terms";
import Privacy from "./T&C/Privacy";
import Experiences from "./utilis/experiences";
import Dashboard from '../src/DashBoard/Dashboard'

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const ROUTER = {
    LANDING: "/",
    CONTACTUS: "/contact-us",
    SIGNUP: "/auth/signup",
    LOGIN: "/auth/login",
    TERMS: "/terms",
    PRIVACY: "/privacy",
    DASHBOARD: "/dashboard",
    EXP:'/experiences'
  };

  const router = createBrowserRouter([
    { path: ROUTER.LANDING, element: <Homepage /> },
    { path: ROUTER.CONTACTUS, element: <ContactUs /> },
    { path: ROUTER.SIGNUP, element: <Signup /> },
    { path: ROUTER.LOGIN, element: <Login /> },
    { path: ROUTER.TERMS, element: <Terms /> },
    { path: ROUTER.PRIVACY, element: <Privacy /> },
    {path: ROUTER.EXP, element: <Experiences/>},
    { path: ROUTER.DASHBOARD, element: <Dashboard /> },
  ]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
        <div
        className="loader "
        >
        </div>

        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </div>
  );
};

export default App;

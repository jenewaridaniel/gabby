import Homepage from "../src/pages/Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContactUs from "./ContactFolder/Contactus";
import Signup from "./auth/Signup";
import Login from "./auth/Login";

const App = () => {
  const ROUTER = {
    LANDING: "/",
    CONTACTUS: "/contact-us",
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login'
  };

  // routung the pages//
  const router = createBrowserRouter([
    {path: ROUTER.LANDING,element:<Homepage/>},
    {path: ROUTER.CONTACTUS,element:<ContactUs/>},
    {path: ROUTER.SIGNUP,element:<Signup/>},
    {path: ROUTER.LOGIN,element:<Login/>},
  ]);

  return <div>
    <RouterProvider router={router}/>
  </div>;
};

export default App;

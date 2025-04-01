import Homepage from "../src/pages/Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContactUs from "./ContactFolder/Contactus";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Terms from "./T&C/Terms";
import Privacy from "./T&C/Privacy";

const App = () => {
  const ROUTER = {
    LANDING: "/",
    CONTACTUS: "/contact-us",
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    TERMS: '/terms',
    PRIVACY:'/privacy'
  };

  // routung the pages//
  const router = createBrowserRouter([
    {path: ROUTER.LANDING,element:<Homepage/>},
    {path: ROUTER.CONTACTUS,element:<ContactUs/>},
    {path: ROUTER.SIGNUP,element:<Signup/>},
    {path: ROUTER.LOGIN,element:<Login/>},
    {path: ROUTER.TERMS,element:<Terms/>},
    {path: ROUTER.PRIVACY,element:<Privacy/>},
  ]);

  return <div>
    <RouterProvider router={router}/>
  </div>;
};

export default App;

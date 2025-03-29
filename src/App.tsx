import Homepage from "../src/pages/Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContactUs from "./ContactFolder/Contactus";

const App = () => {
  const ROUTER = {
    LANDING: "/",
    CONTACTUS: "/contact-us",
  };

  // routung the pages//
  const router = createBrowserRouter([
    {path: ROUTER.LANDING,element:<Homepage/>},
    {path: ROUTER.CONTACTUS,element:<ContactUs/>},


  ]);

  return <div>
    <RouterProvider router={router}/>
  </div>;
};

export default App;

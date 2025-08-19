import { useState, useEffect } from "react";
import Homepage from "../src/pages/Homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContactUs from "./ContactFolder/Contactus";
import Terms from "./T&C/Terms";
import Privacy from "./T&C/Privacy";
import Experiences from "./utilis/Experiences";
import Dashboard from "../src/DashBoard/Dashboard";
import Story from "../src/utilis/Story";
import Rooms from "./pages/Rooms";
import Diner from "./pages/Diner";
import Admin from "./Admin/Admin";
import BookingSystem from "./Function/BookingSystem";
import BookingDetails from "./Function/BookingDetails";
import NotFound from "./utilis/NotFound";
import { ArrowUp } from "lucide-react";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const ROUTER = {
    LANDING: "/",
    CONTACTUS: "/contact-us",
    TERMS: "/terms",
    ROOMS: "/rooms",
    DINING: "/dining",
    PRIVACY: "/privacy",
    DASHBOARD: "/dashboard/:uid",
    EXP: "/experiences",
    ADMIN: "/admin",
    BOOKING: "/booking",
    STORY: "/story",
    BOOKINGDETAILS: "/booking/details",
    NOTFOUND: "*",
  };

  const router = createBrowserRouter([
    { path: ROUTER.LANDING, element: <Homepage /> },
    { path: ROUTER.CONTACTUS, element: <ContactUs /> },
    { path: ROUTER.ADMIN, element: <Admin /> },
    { path: ROUTER.BOOKING, element: <BookingSystem /> },
    { path: ROUTER.BOOKINGDETAILS, element: <BookingDetails /> },
    { path: ROUTER.TERMS, element: <Terms /> },
    { path: ROUTER.PRIVACY, element: <Privacy /> },
    { path: ROUTER.EXP, element: <Experiences /> },
    { path: ROUTER.ROOMS, element: <Rooms /> },
    { path: ROUTER.DINING, element: <Diner /> },
    { path: ROUTER.STORY, element: <Story /> },
    { path: ROUTER.DASHBOARD, element: <Dashboard /> },
    { path: ROUTER.NOTFOUND, element: <NotFound /> },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5s

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {isLoading ? (
        // Loader shown ONLY once at first load
        <div className="h-screen flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <RouterProvider router={router} />
          {showScrollTop && (

            <button
              onClick={scrollToTop}
              className="fixed bottom-5 flex justify-center items-center right-6 w-12 h-12 p-3 bg-orange-600 text-white rounded-full shadow-lg hover:bg-gray-700 transition"
            >
              <ArrowUp/>
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default App;

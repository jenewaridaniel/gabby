import Carousel from "../Carousel/Carousel";
import pool from "../assets/swiming.jpg";
import ContactUs from "../utilis/Contactus";
import Dining from "./Dining";
import Gallery from "./Gallery";
import Recreational from "./Recreational";

const Homepage = () => {
  return (
    <div>
      <Carousel />

      <div className="text-center py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight uppercase mb-2 text-gray-800">
          Welcome to{" "}
          <span className="text-amber-600 hover:text-amber-700 transition-colors">
            Gabby's Hotels
          </span>
        </h1>
        <p className="text-base tracking-wider md:text-lg text-gray-600 font-light mt-2">
          Where luxury meets unforgettable stays
        </p>
      </div>

      {/* About us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <img
              src={pool}
              className="w-full h-auto rounded-lg shadow-xl object-cover transition-all duration-300 hover:shadow-2xl"
              alt="Luxury pool at Gabby Hotels"
            />
          </div>

          {/* Text Content Section */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="space-y-2 ">
              <h2 className="text-sm font-semibold tracking-widest  text-amber-600 uppercase">
                About Gabby's Hotels
              </h2>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">
                Where Luxury Meets Unforgettable Hospitality
              </h1>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Nestled in the heart of the city, Gabby's Hotels redefines luxury
              accommodation with our impeccable service, world-class amenities,
              and attention to every detail. Since 2025, we've been creating
              extraordinary experiences for discerning travelers through our
              exquisite{" "}
              <span className="font-medium text-amber-600">indoor lounge</span>{" "}
              with curated cocktails and our breathtaking{" "}
              <span className="font-medium text-amber-600">outdoor lounge</span>{" "}
              featuring panoramic city views and poolside serenity.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-100 rounded-full">
                  <svg
                    className="w-5 h-5 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">24/7 Accomdation</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-100 rounded-full">
                  <svg
                    className="w-5 h-5 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">Night club & Skybar</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-100 rounded-full">
                  <svg
                    className="w-5 h-5 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">Gourmet Dining</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-100 rounded-full">
                  <svg
                    className="w-5 h-5 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">Private Events</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-100 rounded-full">
                  <svg
                    className="w-5 h-5 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700">Restaurant</span>
              </div>
            </div>

            <button className="mt-6 px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg">
              Discover Our Story
            </button>
          </div>
        </div>
      </div>
      <Gallery/>

      <div className=" py-6">
        <Recreational/>
      </div>

      <div className=" py-4">
        <Dining/>
      </div>

      {/* CONTACT US */}
      <div className=" py-4">
        <ContactUs/>
      </div>
    </div>
  );
};

export default Homepage;

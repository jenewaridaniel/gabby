import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import resort from "../assets/resort.jpg";
import bed from "../assets/bed.jpg";
import parlour from "../assets/parlour.jpg";

const Carousel = () => {
  const slides = [
    {
      image: resort,
      title: "Unmatched Luxury Bliss",
      subtitle:
        "Stay in luxury, indulge in world-class amenities, and soak in breathtaking views",
      cta: "Explore Our Rooms",
    },
    {
      image: bed,
      title: "Your Private Paradise",
      subtitle:
        "Discover our exclusive resort with pristine beaches and infinity pools",
      cta: "View Resort Features",
    },
    {
      image: parlour,
      title: "Gourmet Experiences",
      subtitle: "Savor award-winning cuisine from our world-renowned chefs",
      cta: "Discover Dining",
    },
  ];

  return (
    <div className="pt-20">
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        autoplay={{ delay: 6000 }}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[80vh] min-h-[500px] overflow-hidden">
              {/* Background image with dark overlay */}
              <img
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                src={slide.image}
              />
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

              {/* Content container */}
              <div className="absolute inset-0 flex items-center justify-center md:justify-start px-6 text-white">
                <div className="max-w-2xl mx-auto md:mx-24 text-center md:text-left">
                  {/* Main heading with animation */}
                  <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    {slide.title}
                  </motion.h1>

                  {/* Subheading */}
                  <motion.p
                    className="text-sm md:text-lg mb-8 leading-relaxed max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {slide.subtitle}
                  </motion.p>

                  {/* CTA Button */}
                  <motion.button
                    className="px-8 py-4  justify-center bg-amber-600 hover:bg-amber-700 text-white font-medium tracking-wider rounded-sm transition-all duration-300 hover:shadow-lg flex items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {slide.cta}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Scrolling indicator - only show on first slide */}
              {index === 0 && (
                <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-8 h-8 text-white"
                  >
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg> */}
                  </motion.div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;

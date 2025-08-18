import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import resort from "../assets/resort.jpg";
import bed from "../assets/bed.jpg";
import parlour from "../assets/parlour.jpg";

const Carousel = () => {
  
  const slides = [
    {
      image: resort,
      title: "Dream. Relax. Repeat",
      subtitle: "Luxury So Good, You’ll Never Want to Leave",
      cta: "Our Rooms",
      link:'/rooms'
    },
    {
      image: bed,
      title: "Your Private Paradise",
      subtitle: "Discover our exclusive resort with pristine beaches and infinity pools",
      cta: "Resort Features",
      link:'/rooms'
    },
    {
      image: parlour,
      title: "Gourmet Experiences",
      subtitle: "Savor award-winning cuisine from our world-renowned chefs",
      cta: "Discover Dining",
      link:'/dining'
    },
  ];

  return (
    <div className="pt-16">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass: "custom-bullet",
          bulletActiveClass: "custom-bullet-active",
        }}
        className="mySwiper"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[80vh] min-h-[500px] overflow-hidden">
              {/* Background image with dark overlay */}
              <motion.img
                className="w-full h-full object-cover object-center"
                src={slide.image}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Content container */}
              <div className="absolute inset-0 flex items-center justify-center md:justify-start px-6 text-white">
                <div className="max-w-2xl mx-auto md:mx-24 text-left">
                  {/* Main heading with animation */}
                  <motion.h1
                    className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    {slide.title}
                  </motion.h1>

                  {/* Subheading */}
                  <motion.p
                    className="text-sm md:text-lg mb-8 leading-relaxed max-w-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    {slide.subtitle}
                  </motion.p>

                  {/* CTA Button */}
                  <a href={slide.link}>

                  <motion.button
                    className="px-6 py-4 text-sm md:text-lg justify-center bg-amber-600 hover:bg-amber-700 text-white font-medium tracking-wider rounded-full transition-all duration-300 hover:shadow-lg flex items-center gap-2"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {slide.cta}
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      initial={{ x: -5 }}
                      animate={{ x: 0 }}
                      transition={{ 
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1.2
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </motion.svg>
                  </motion.button>
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        
        {/* Custom pagination container */}
        <div className="custom-pagination absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10"></div>
      </Swiper>

      
      
    </div>
  );
};

export default Carousel;
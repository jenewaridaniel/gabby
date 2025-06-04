import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import badge from "../assets/badge.png";

const BookingSystem = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in effect
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setIsModalOpen(false), 300); // Wait for fade-out
    }, 11000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseModal = () => {
    setIsVisible(false);
    setTimeout(() => setIsModalOpen(false), 300); // Wait for fade-out
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  const badgeVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div>
      {/* Modal with Motion animations */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            variants={backdropVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            exit="hidden"
          >
            {/* Cancel button (X icon) - Now outside the modal div */}
            <button
              onClick={handleCloseModal}
              className="absolute top-6 right-6 text-white hover:text-gray-200 transition-colors bg-black/30 backdrop-blur-sm rounded-full p-2"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <motion.div
              className="bg-white p-8 rounded-xl shadow-2xl relative max-w-md w-full mx-4"
              variants={modalVariants}
            >
              <motion.div className="flex flex-col items-center space-y-6">
                {/* Badge image with coming up animation */}
                <motion.div
                  variants={badgeVariants}
                  animate={isVisible ? "visible" : "hidden"}
                  className="animate-pulse"
                >
                  <img
                    src={badge}
                    className="w-52 lg:w-72"
                    alt="Special offer badge"
                  />
                </motion.div>

                <motion.h1
                  variants={contentVariants}
                  className="text-3xl font-bold text-center text-gray-800"
                >
                  Your Perfect Stay Awaits
                </motion.h1>

                <motion.p
                  variants={contentVariants}
                  className="text-gray-600 text-center"
                >
                  Exclusive offer just for you! Book now and get 15% off your
                  stay.
                </motion.p>

                {/* Action buttons */}
                <motion.div
                  variants={contentVariants}
                  className="flex space-x-4 w-full"
                >
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 py-3 px-6 bg-gray-200 text-sm hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors duration-200"
                  >
                    Maybe Later
                  </button>
                  <button className="flex-1 py-3 px-6 bg-amber-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
                    Book Now
                  </button>
                </motion.div>

                {/* Small disclaimer text */}
                <motion.p
                  variants={contentVariants}
                  className="text-xs text-gray-400 text-center"
                >
                  Limited time offer. Terms and conditions apply.
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-screen flex justify-center items-center">
        <h1 className="text-4xl font-bold">Hi, Traveller</h1>
      </div>
    </div>
  );
};

export default BookingSystem;

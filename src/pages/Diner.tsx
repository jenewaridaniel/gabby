
import { motion } from "framer-motion";
import {
  FiClock,
  FiCoffee,
  FiBookOpen,
  FiChevronDown,

} from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import Footer from "../utilis/Footer";
import { Link } from "react-router-dom";

const Diner = () => {


  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Absolutely incredible dining experience. The atmosphere is perfect for special occasions.",
      date: "2 weeks ago",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment:
        "Outstanding service and ambiance. Perfect for both business dinners and romantic dates.",
      date: "1 month ago",
    },
    {
      id: 3,
      name: "Emma Williams",
      rating: 5,
      comment:
        "The attention to detail is remarkable. Every visit feels like a special celebration.",
      date: "3 weeks ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <div
        className="relative h-[70vh] overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Eat Fresh and Healthy
            </h1>
            <p className="text-md text-white max-w-2xl mx-auto mb-8">
              A perfect blend of bold, tasty flavors
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/dining">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-8 rounded-full text-lg "
                >
                  Book Here
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>

        <Link to="/">
          <div className="absolute z-10 left-0 top-0 p-5">
            <IoMdArrowBack className="text-gray-50 text-3xl" />
          </div>
        </Link>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <FiChevronDown className="text-3xl" />
        </motion.div>
      </div>

      {/* Introduction */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              A Culinary Journey
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Our restaurant celebrates the art of fine dining with exceptional
              service, carefully curated ambiance, and an unwavering commitment
              to culinary excellence. Each visit is designed to create memorable
              experiences that linger long after your meal ends.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8  transition-shadow duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center text-white mb-6 mx-auto">
              <FiCoffee className="text-2xl" />
            </div>
            <h3 className="font-bold text-gray-800 text-xl text-center mb-4">
              Fine Dining
            </h3>
            <p className="text-gray-600 text-center">
              Experience exceptional cuisine crafted with premium ingredients
              and served in an elegant atmosphere perfect for special occasions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8   duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center text-white mb-6 mx-auto">
              <FiBookOpen className="text-2xl" />
            </div>
            <h3 className="font-bold text-gray-800 text-xl text-center mb-4">
              Private Events
            </h3>
            <p className="text-gray-600 text-center">
              Host your celebrations in our private dining rooms with
              personalized service and customized experiences for groups of
              20-50 guests.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-8 transition-shadow duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center text-white mb-6 mx-auto">
              <FiClock className="text-2xl" />
            </div>
            <h3 className="font-bold text-gray-800 text-xl text-center mb-4">
              Premium Service
            </h3>
            <p className="text-gray-600 text-center">
              Our trained staff provides attentive, professional service
              ensuring every detail of your dining experience exceeds
              expectations.
            </p>
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Voices of Delight
            </h3>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
              Discover why our guests keep returning for unforgettable culinary
              experiences that transform meals into cherished memories.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl  border border-gray-100 transition-all duration-300 ">
                  {/* Quote icon */}
                  <div className="absolute -top-4 left-6 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                  </div>

                  {/* Rating stars */}
                  <div className="flex items-center mb-5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? "text-amber-500 fill-current"
                            : "text-gray-300"
                        }`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {testimonial.rating}/5
                    </span>
                  </div>

                  {/* Testimonial text */}
                  <p className="text-gray-700 mb-6 leading-relaxed relative">
                    <span className="absolute -left-2 -top-2 text-amber-500 text-3xl font-serif">
                      "
                    </span>
                    {testimonial.comment}
                  </p>

                  {/* Author info */}
                  <div className="flex items-center pt-4 border-t border-gray-100">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.date}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-4">
              Ready to create your own memorable experience?
            </p>
            <button className="px-6 py-3 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors duration-300 ">
              Reserve Your Table
            </button>
          </motion.div>
        </div>
      </div>

      {/* Reservation CTA */}
      <div className="py-24 bg-gray-100 md:m-10 rounded-3xl relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready for an Exceptional Experience?
            </h3>
            <p className="text-lg mb-8 text-gray-700 max-w-2xl mx-auto">
              Reserve your table today and discover why discerning diners choose
              us for their most important celebrations and memorable evenings.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <a href="/booking">
                <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-full text-lg">
                  Make Reservation
                </button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Diner;

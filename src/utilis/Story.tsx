import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import Footer from '../utilis/Footer'
import { FaUmbrellaBeach, FaCocktail } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";


const Story = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="py-6 sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100"
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="/">
            <motion.img
              src={logo}
              alt="Gabby's Boutique Hotel Logo"
              className="h-12 object-contain"
              whileHover={{ scale: 1.03 }}
            />
          </a>
          <motion.h1
            className="text-2xl font-medium tracking-tight"
            whileHover={{ scale: 1.01 }}
          >
            Our Story
          </motion.h1>
        </div>
      </motion.header>

      {/* Hero Section - Cleaner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-[60vh] min-h-[400px] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
        <div
          className="w-full h-full bg-[url('https://www.v8hotel.de/fileadmin/_processed_/4/4/csm_DSC01349_bb23e74aad.jpg')] bg-cover bg-center bg-no-repeat"
          aria-label="Luxury hotel lobby"
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-16 px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-medium text-white mb-4">
              The Gabby's Legacy
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="h-0.5 bg-amber-400 mx-auto mb-6"
            ></motion.div>
            <p className="text-lg text-gray-100">
              Crafting unforgettable experiences since 2025
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Story Content - Simplified */}
      <main className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Main Story Block */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-medium text-gray-900 mb-6">
            Our Beginnings
          </h3>
          
          <div className="space-y-5 text-gray-600">
            <p>
              Founded in 2025 in Port Harcourt, Gabby's Boutique Hotel began as a 
              passion project by hospitality visionary Gabriel Johnson. What started 
              as a modest 12-room guesthouse has blossomed into one of Rivers State's 
              premier luxury destinations.
            </p>
            <p>
              Inspired by the vibrant culture of the Niger Delta, Gabby's was designed 
              to offer an intimate, personalized hospitality experience unlike any other 
              in the region. Our commitment to excellence has earned us recognition as 
              the "Best Boutique Hotel in Southern Nigeria" for three consecutive years.
            </p>
          </div>
        </motion.div>

        {/* Feature Cards - Minimal */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Vision Card */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-6 rounded-lg"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-amber-50 rounded-lg mr-3">
                <FaUmbrellaBeach className="text-amber-600" />
              </div>
              <h4 className="text-lg font-medium text-gray-900">
                Our Vision
              </h4>
            </div>
            <p className="text-gray-600 text-sm">
              Redefining luxury hospitality by blending modern comforts with authentic 
              local charm, creating experiences that celebrate our cultural heritage.
            </p>
          </motion.div>

          {/* Milestone Card */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-6 rounded-lg"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-amber-50 rounded-lg mr-3 text-center min-w-[42px]">
                <span className="text-amber-700 font-medium">2025</span>
              </div>
              <h4 className="text-lg font-medium text-gray-900">
                Grand Opening
              </h4>
            </div>
            <p className="text-gray-600 text-sm">
              Welcomed our first guests with a ceremony attended by Port Harcourt's 
              leaders, featuring local artists and culinary masters.
            </p>
          </motion.div>

          {/* Experience Card */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-6 rounded-lg"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-amber-50 rounded-lg mr-3">
                <FaCocktail className="text-amber-600" />
              </div>
              <h4 className="text-lg font-medium text-gray-900">
                Signature Experience
              </h4>
            </div>
            <p className="text-gray-600 text-sm">
              Our rooftop lounge blends local ingredients with international mixology, 
              paired with panoramic city views and live jazz performances.
            </p>
          </motion.div>
        </div>

        {/* Quote Section - Clean */}
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 p-10 bg-gray-100 rounded-xl text-gray-900"
        >
          <blockquote className="text-xl italic mb-6 leading-relaxed">
            "True hospitality is about creating spaces where guests feel they truly 
            belong. At Gabby's, we don't just host visitors - we welcome them into 
            our family."
          </blockquote>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-700 rounded-full mr-4"></div>
            <div>
              <p className="font-medium">Gabriel Johnson</p>
              <p className="text-gray-300 text-sm">Founder & CEO</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section - Subtle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-xl font-medium text-gray-900 mb-5">
            Experience Our Story
          </h3>
          <a href="/booking">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-amber-600 text-white font-medium rounded-full flex items-center mx-auto text-sm"
            >
              Book Your Stay <FiChevronRight className="ml-2" />
            </motion.button>
          </a>
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Story;
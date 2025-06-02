import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import Footer from '../utilis/Footer'
import { FaUmbrellaBeach, FaCocktail, FaHeart } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

const Story = () => {
  return (
    <div className="min-h-screen bg-amber-50/10">
      {/* Header Section */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-50 text-gray-800 py-6  sticky top-0 z-50"
      >

        <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="/">
        <motion.img
            src={logo}
            alt="Gabby's Boutique Hotel Logo"
            className="h-14 object-contain"
            whileHover={{ scale: 1.05 }}
          />
        </a>
         
          <motion.h1
            className="text-3xl font-serif font-bold tracking-wider"
            whileHover={{ scale: 1.02 }}
          >
            Our Heritage
          </motion.h1>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[70vh] min-h-[500px] overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/75 transparent z-10"></div>
        <div
          className="w-full h-full bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945')] bg-cover bg-center bg-no-repeat"
          aria-label="Luxury hotel lobby"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center px-6">
            <motion.h2
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-6xl font-serif font-bold text-amber-50 drop-shadow-2xl mb-6"
            >
              The Gabby's Legacy
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="h-1 bg-amber-400 mx-auto mb-8"
            ></motion.div>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-xl text-amber-100 max-w-2xl mx-auto"
            >
              Crafting unforgettable experiences since 2025
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Story Content */}
      <main className="container mx-auto px-6 py-16 max-w-5xl">
        {/* Main Story Block */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 p-8 md:p-10 bg-white rounded-xl shadow-xl border-l-4 border-amber-500"
        >
          <div className="flex items-center mb-8">
            <div className="p-3 bg-amber-100 rounded-full mr-4">
              <FaHeart className="text-amber-600 text-2xl" />
            </div>
            <h3 className="text-3xl font-serif font-bold text-amber-800">
              Our Humble Beginnings
            </h3>
          </div>

          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-gray-700">
              Founded in 2025 in the heart of Port Harcourt, Gabby's Boutique
              Hotel and Lounge began as a passion project by hospitality
              visionary Gabriel Johnson. What started as a modest 12-room
              guesthouse has blossomed into one of Rivers State's premier luxury
              destinations.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Inspired by the vibrant culture of the Niger Delta and the
              cosmopolitan energy of Port Harcourt, Gabby's was designed to
              offer an intimate, personalized hospitality experience unlike any
              other in the region. Our commitment to excellence has earned us
              recognition as the "Best Boutique Hotel in Southern Nigeria" for
              three consecutive years.
            </p>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Vision Card */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-amber-500"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-amber-100 rounded-lg mr-4">
                <FaUmbrellaBeach className="text-amber-600 text-xl" />
              </div>
              <h4 className="text-xl font-serif font-semibold text-amber-800">
                Our Vision
              </h4>
            </div>
            <p className="text-gray-700">
              To redefine luxury hospitality in Southern Nigeria by blending
              modern comforts with authentic local charm, creating unforgettable
              experiences that celebrate our rich cultural heritage.
            </p>
          </motion.div>

          {/* Milestone Card */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-amber-500"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-amber-100 rounded-lg mr-4 text-center min-w-[50px]">
                <span className="text-amber-700 font-bold text-xl">2025</span>
              </div>
              <h4 className="text-xl font-serif font-semibold text-amber-800">
                Grand Opening
              </h4>
            </div>
            <p className="text-gray-700">
              Welcomed our first guests in March 2025 with a ribbon-cutting
              ceremony attended by Port Harcourt's business and cultural
              leaders, featuring a showcase of local artists and culinary
              masters.
            </p>
          </motion.div>

          {/* Experience Card */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-amber-500"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-amber-100 rounded-lg mr-4">
                <FaCocktail className="text-amber-600 text-xl" />
              </div>
              <h4 className="text-xl font-serif font-semibold text-amber-800">
                Signature Experience
              </h4>
            </div>
            <p className="text-gray-700">
              Our rooftop lounge became famous for craft cocktails blending
              local ingredients with international mixology, paired with
              panoramic city views and live jazz performances under the stars.
            </p>
          </motion.div>
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-50 text-gray-950 p-12 rounded-2xl shadow-2xl mb-16"
        >
          <blockquote className="text-2xl italic font-serif mb-6 leading-relaxed">
            "True hospitality is about creating spaces where guests don't just
            stay, but where they feel they truly belong. At Gabby's, we don't
            just host visitors - we welcome them into our family."
          </blockquote>
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
            <div>
              <p className="font-serif font-semibold text-lg">
                Gabriel Johnson
              </p>
              <p className="text-gray-900">Founder & CEO</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-serif font-bold text-amber-800 mb-6">
            Experience Our Story Firsthand
          </h3>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#B45309" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-amber-700 text-white font-medium rounded-full shadow-lg flex items-center mx-auto"
          >
            Book Your Stay <FiChevronRight className="ml-2" />
          </motion.button>
        </motion.div>
      </main>

      {/* Footer */}
        <Footer/>
    </div>
  );
};

export default Story;

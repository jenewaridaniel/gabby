import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import Footer from "../utilis/Footer";
import { FaUmbrellaBeach, FaCocktail, FaAward, FaHeart } from "react-icons/fa";
import { FiChevronRight, FiStar } from "react-icons/fi";
import swim from "./../assets/swim.jpg";

const Story = () => {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Minimal Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="py-6 sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.img
              src={logo}
              alt="Gabby's Boutique Hotel Logo"
              className="h-12 object-contain"
              whileHover={{ rotate: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            />
          </motion.a>
          <motion.h1
            className="text-2xl font-light tracking-wider text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Our Story
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
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
        <motion.div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          aria-label="Luxury hotel lobby"
          style={{ backgroundImage: `url(${swim})` }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-16 px-6 max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-center"
          >
            <motion.h2
              className="text-4xl md:text-6xl font-light text-white mb-6 tracking-tight"
              variants={fadeInUp}
            >
              The Gabby's Legacy
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="h-0.5 bg-amber-400 mx-auto mb-6"
            />
            <motion.p
              className="text-xl text-gray-100 font-light"
              variants={fadeInUp}
            >
              Crafting unforgettable experiences since 2025
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Story Content */}
      <main className="container mx-auto px-6 py-20 max-w-5xl">
        {/* Main Story Block */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <motion.h3
            className="text-3xl font-light text-gray-900 mb-8 tracking-wide"
            variants={fadeInUp}
          >
            Our Beginnings
          </motion.h3>

          <motion.div
            className="space-y-6 text-gray-700 text-lg leading-relaxed"
            variants={fadeInUp}
          >
            <p>
              Founded in 2025 in Port Harcourt, Gabby's Boutique Hotel began as
              a passion project by hospitality visionary Gabriel Johnson. What
              started as a modest 12-room guesthouse has blossomed into one of
              Rivers State's premier luxury destinations.
            </p>
            <p>
              Inspired by the vibrant culture of the Niger Delta, Gabby's was
              designed to offer an intimate, personalized hospitality experience
              unlike any other in the region. Our commitment to excellence has
              earned us recognition as the "Best Boutique Hotel in Southern
              Nigeria" for three consecutive years.
            </p>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Vision Card */}
          <motion.div
            variants={scaleIn}
            className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl border border-amber-100 flex flex-col items-center text-center"
            whileHover={{
              y: -8,
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            <motion.div
              className="p-4 bg-amber-100 rounded-full mb-6"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaUmbrellaBeach className="text-amber-600 text-2xl" />
            </motion.div>
            <h4 className="text-xl font-medium text-gray-900 mb-3">
              Our Vision
            </h4>
            <p className="text-gray-600">
              Redefining luxury hospitality by blending modern comforts with
              authentic local charm.
            </p>
          </motion.div>

          {/* Milestone Card */}
          <motion.div
            variants={scaleIn}
            className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center"
            whileHover={{
              y: -8,
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            <motion.div
              className="p-4 bg-gray-200 rounded-full mb-6 text-2xl font-medium text-gray-700"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              2025
            </motion.div>
            <h4 className="text-xl font-medium text-gray-900 mb-3">
              Grand Opening
            </h4>
            <p className="text-gray-600">
              Welcomed our first guests with a ceremony attended by Port
              Harcourt's leaders and local artists.
            </p>
          </motion.div>

          {/* Experience Card */}
          <motion.div
            variants={scaleIn}
            className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl border border-amber-100 flex flex-col items-center text-center"
            whileHover={{
              y: -8,
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            <motion.div
              className="p-4 bg-amber-100 rounded-full mb-6"
              whileHover={{ rotate: -15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaCocktail className="text-amber-600 text-2xl" />
            </motion.div>
            <h4 className="text-xl font-medium text-gray-900 mb-3">
              Signature Experience
            </h4>
            <p className="text-gray-600">
              Our rooftop lounge blends local ingredients with international
              mixology and live jazz.
            </p>
          </motion.div>

          {/* Awards Card */}
          <motion.div
            variants={scaleIn}
            className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center"
            whileHover={{
              y: -8,
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            <motion.div
              className="p-4 bg-gray-200 rounded-full mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaAward className="text-gray-700 text-2xl" />
            </motion.div>
            <h4 className="text-xl font-medium text-gray-900 mb-3">
              Recognition
            </h4>
            <p className="text-gray-600">
              Awarded "Best Boutique Hotel in Southern Nigeria" for three
              consecutive years.
            </p>
          </motion.div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20 p-12 bg-gradient-to-r from-amber-50 to-amber-100/30 rounded-3xl border border-amber-200 relative overflow-hidden"
        >
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 bg-amber-200/20 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-300/20 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <blockquote className="text-2xl italic text-gray-800 mb-8 leading-relaxed relative z-10">
            "True hospitality is about creating spaces where guests feel they
            truly belong. At Gabby's, we don't just host visitors we welcome
            them into our family."
          </blockquote>
          {/* <div className="flex items-center relative z-10">
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full mr-4 flex items-center justify-center text-white font-bold text-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              G
            </motion.div>
            <div>
              <p className="font-medium text-gray-900">Gabriel Johnson</p>
              <p className="text-amber-700 text-sm">Founder & CEO</p>
            </div>
          </div> */}
        </motion.div>

        {/* Values Section */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h3
            className="text-3xl font-light text-gray-900 mb-12 text-center tracking-wide"
            variants={fadeInUp}
          >
            Our Core Values
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="text-center p-6"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.7 }}
              >
                <FaHeart className="text-amber-600 text-xl" />
              </motion.div>
              <h4 className="text-xl font-medium text-gray-900 mb-3">
                Authenticity
              </h4>
              <p className="text-gray-600">
                We stay true to our roots while embracing innovation.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FiStar className="text-amber-600 text-2xl" />
              </motion.div>
              <h4 className="text-xl font-medium text-gray-900 mb-3">
                Excellence
              </h4>
              <p className="text-gray-600">
                We pursue perfection in every detail of our service.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaUmbrellaBeach className="text-amber-600 text-xl" />
              </motion.div>
              <h4 className="text-xl font-medium text-gray-900 mb-3">
                Community
              </h4>
              <p className="text-gray-600">
                We celebrate and support our local culture and people.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.h3
            className="text-3xl font-light text-gray-900 mb-6 tracking-wide"
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Become Part of Our Story
          </motion.h3>
          <motion.p
            className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg"
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Experience the unique blend of luxury and authenticity that defines
            Gabby's.
          </motion.p>
          <a href="/booking">
            <motion.button
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-orange-600 text-white font-medium rounded-full flex items-center mx-auto text-base tracking-wide"
            >
              Book Your Stay <FiChevronRight className="ml-2 text-lg" />
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

import { motion } from "framer-motion";
import exp from "../assets/exp.jpeg";
import {
  ArrowRightIcon,
  MapPinIcon,
  StarIcon,
  WifiIcon,
  UtensilsIcon,
  SunIcon,
  MoonIcon,
  SparklesIcon,
  HeartIcon,
  UsersIcon,
} from "lucide-react";
import {Link} from "react-router-dom";
import Footer from "../utilis/Footer"

const Experiences = () => {
  const experiences = [
    {
      title: "Luxury Spa Retreat",
      description:
        "Indulge in our premium spa treatments blending traditional Nigerian techniques with modern wellness practices.",
      icon: <SunIcon className="w-8 h-8 text-amber-600" />,
      gradient: "from-amber-50 to-orange-50",
      border: "border-amber-200",
    },
    {
      title: "Gourmet Dining",
      description:
        "Savor exquisite Nigerian fusion cuisine at our award-winning restaurant with locally-sourced ingredients.",
      icon: <UtensilsIcon className="w-8 h-8 text-amber-600" />,
      gradient: "from-amber-50 to-rose-50",
      border: "border-amber-200",
    },
    {
      title: "Rooftop Lounge",
      description:
        "Unwind at our stylish rooftop lounge with panoramic views of Port-Harcourt and signature cocktails.",
      icon: <MoonIcon className="w-8 h-8 text-amber-600" />,
      gradient: "from-blue-50 to-indigo-50",
      border: "border-blue-200",
    },
    {
      title: "Business Center",
      description:
        "State-of-the-art facilities for business travelers with high-speed internet and meeting rooms.",
      icon: <WifiIcon className="w-8 h-8 text-amber-600" />,
      gradient: "from-gray-50 to-blue-50",
      border: "border-gray-200",
    },
  ];

  const testimonials = [
    {
      name: "Adebayo Johnson",
      role: "Business Traveler",
      comment:
        "The perfect blend of Nigerian hospitality and modern luxury. The rooftop lounge became my evening sanctuary.",
      rating: 5,
      avatar: "AJ",
    },
    {
      name: "Chioma Eze",
      role: "Honeymooner",
      comment:
        "The spa treatments were divine! We loved the traditional massage techniques combined with aromatic oils.",
      rating: 5,
      avatar: "CE",
    },
    {
      name: "Emeka Okoro",
      role: "Food Critic",
      comment:
        "The jollof rice at Gabby's is the best I've had in Port-Harcourt. The chef's twist on local dishes is exceptional.",
      rating: 4,
      avatar: "EO",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const hoverCard = {
    rest: { y: 0, scale: 1 },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  };

  return (
    <div className="bg-gradient-to-br from-amber-50/30 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
     
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <img
            src={exp}
            className="w-full h-full object-cover"
            alt="Luxury hotel experience"
          />
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 z-20 pb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-light text-white mb-6 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover Gabby's Experiences
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="h-0.5 bg-amber-400 mx-auto mb-6"
            />
            <motion.p
              className="text-xl text-amber-100 font-light max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Immerse yourself in luxury with our unique offerings that blend
              Nigerian heritage with contemporary elegance
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="rest"
              whileHover="hover"
              variants={hoverCard}
              className={`bg-gradient-to-br ${experience.gradient} rounded-2xl border-2 ${experience.border} p-8 relative overflow-hidden group`}
            >
              {/* Animated background element */}
              <motion.div
                className="absolute -right-4 -top-4 w-20 h-20 bg-white/20 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5,
                }}
              />

              <motion.div
                className="mb-6 relative z-10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {experience.icon}
              </motion.div>

              <h3 className="text-xl font-semibold text-gray-800 mb-4 relative z-10">
                {experience.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed relative z-10">
                {experience.description}
              </p>

              <motion.button
                className="flex items-center text-amber-700 font-medium relative z-10 group"
                whileHover={{ x: 5 }}
              >
                Learn more
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRightIcon className="ml-2 w-4 h-4" />
                </motion.div>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Experience */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-center gap-12"
          >
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center mb-4"
              >
                <SparklesIcon className="w-6 h-6 mr-2 text-amber-300" />
                <span className="text-amber-200 font-medium">
                  Signature Experience
                </span>
              </motion.div>

              <h2 className="text-4xl font-light mb-6 tracking-tight">
                Nigerian Dining Journey
              </h2>

              <p className="text-amber-100 mb-8 text-lg leading-relaxed">
                Our chef curates a 7-course tasting menu that takes you on a
                culinary journey through Nigeria's diverse regions, paired with
                premium local spirits and wines.
              </p>

              <div className="space-y-4 mb-8">
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <StarIcon className="w-5 h-5 mr-3 text-amber-300" />
                  <span>Reservations required 48 hours in advance</span>
                </motion.div>
                <motion.div
                  className="flex items-center"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <MapPinIcon className="w-5 h-5 mr-3 text-amber-300" />
                  <span>Available at our main restaurant daily from 7pm</span>
                </motion.div>
              </div>

              <motion.button
                className="px-8 py-4 bg-white text-amber-700 font-medium rounded-full flex items-center hover:bg-amber-50 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Dining Experience
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </motion.button>
            </div>

            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative rounded-2xl overflow-hidden border-4 border-amber-500/30"
              >
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"
                    alt="Nigerian dining experience"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                  <motion.h3
                    className="text-2xl font-semibold text-white mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    "A Taste of Nigeria"
                  </motion.h3>
                  <motion.p
                    className="text-amber-200"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    Our most requested experience
                  </motion.p>
                </div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-amber-500 text-white px-4 py-2 rounded-full flex items-center text-sm font-medium"
                  initial={{ scale: 0, rotate: -10 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
                >
                  <HeartIcon className="w-4 h-4 mr-1" />
                  Guest Favorite
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-light text-gray-800 mb-4 tracking-tight">
            Voices of Our Guests
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-0.5 bg-amber-400 mx-auto mb-6"
          />
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Hear from travelers who have experienced Gabby's unique blend of
            Nigerian hospitality and boutique luxury
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-white to-gray-50/50 p-8 rounded-2xl border-2 border-gray-100 relative overflow-hidden group"
              whileHover={{ y: -5 }}
            >
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-100/20 rounded-bl-full" />

              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <StarIcon
                      className={`w-5 h-5 mr-1 ${
                        i < testimonial.rating
                          ? "text-amber-500 fill-amber-500"
                          : "text-gray-300"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>

              <motion.p
                className="text-gray-600 italic mb-8 leading-relaxed relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              >
                "{testimonial.comment}"
              </motion.p>

              <div className="border-t border-gray-200 pt-6 flex items-center">
                <motion.div
                  className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4"
                  whileHover={{ scale: 1.1 }}
                >
                  {testimonial.avatar}
                </motion.div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-amber-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <UsersIcon className="w-8 h-8" />
          </motion.div>

          <h1 className="text-4xl text-gray-800 font-light mb-6 tracking-tight">
            Ready to Experience Gabby's?
          </h1>

          <motion.p
            className="text-gray-800 mb-8 text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Book your stay now and discover why we're Port-Harcourt's premier
            boutique hotel destination
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/booking">
              <motion.button
                className="px-8 py-4 bg-amber-600 text-white font-medium rounded-full hover:bg-amber-700 transition-colors duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Your Stay
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </motion.button>
            </Link>

            <Link  to="/contact-us">
              <motion.button
                className="px-8 py-4 border-2 border-amber-600 text-amber-600 font-medium rounded-full hover:bg-white hover:text-gray-900 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default Experiences;

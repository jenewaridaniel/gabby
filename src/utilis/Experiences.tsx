import { motion } from "framer-motion";
import exp from '../assets/exp.jpeg'
import {
  ArrowRightIcon,
  MapPinIcon,
  StarIcon,
  WifiIcon,
  UtensilsIcon,
  CoffeeIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react";

const Experiences = () => {
  const experiences = [
    {
      title: "Luxury Spa Retreat",
      description:
        "Indulge in our premium spa treatments blending traditional Nigerian techniques with modern wellness practices.",
      icon: <SunIcon className="w-8 h-8 text-amber-600" />,
    },
    {
      title: "Gourmet Dining",
      description:
        "Savor exquisite Nigerian fusion cuisine at our award-winning restaurant with locally-sourced ingredients.",
      icon: <UtensilsIcon className="w-8 h-8 text-amber-600" />,
    },
    {
      title: "Rooftop Lounge",
      description:
        "Unwind at our stylish rooftop lounge with panoramic views of Lagos and signature cocktails.",
      icon: <MoonIcon className="w-8 h-8 text-amber-600" />,
    },
    {
      title: "Business Center",
      description:
        "State-of-the-art facilities for business travelers with high-speed internet and meeting rooms.",
      icon: <WifiIcon className="w-8 h-8 text-amber-600" />,
    },
  ];

  const testimonials = [
    {
      name: "Adebayo Johnson",
      role: "Business Traveler",
      comment:
        "The perfect blend of Nigerian hospitality and modern luxury. The rooftop lounge became my evening sanctuary.",
      rating: 5,
    },
    {
      name: "Chioma Eze",
      role: "Honeymooner",
      comment:
        "The spa treatments were divine! We loved the traditional massage techniques combined with aromatic oils.",
      rating: 5,
    },
    {
      name: "Emeka Okoro",
      role: "Food Critic",
      comment:
        "The jollof rice at Gabby's is the best I've had in Port-Harcourt. The chef's twist on local dishes is exceptional.",
      rating: 4,
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="bg-amber-50">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Discover Gabby's Experiences
            </h1>
            <p className="text-xl text-amber-200 max-w-2xl mx-auto">
              Immerse yourself in luxury with our unique offerings that blend
              Nigerian heritage with contemporary elegance
            </p>
          </motion.div>
        </div>
        <div className="absolute inset-0  bg-cover ">
            <img src={exp} className="w-full " alt="" />
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="mb-4">{experience.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {experience.title}
                </h3>
                <p className="text-gray-600 mb-4">{experience.description}</p>
                <button className="flex items-center text-amber-600 font-medium">
                  Learn more <ArrowRightIcon className="ml-2 w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Experience */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-center gap-12"
          >
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">
                Signature Nigerian Dining Experience
              </h2>
              <p className="text-amber-100 mb-6 text-lg">
                Our chef curates a 7-course tasting menu that takes you on a
                culinary journey through Nigeria's diverse regions, paired with
                premium local spirits and wines.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <StarIcon className="w-5 h-5 mr-2" />
                  <span>Reservations required 48 hours in advance</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="w-5 h-5 mr-2" />
                  <span>Available at our main restaurant daily from 7pm</span>
                </div>
              </div>
              <button className="mt-8 px-6 py-3 bg-white text-amber-600 font-bold rounded-lg hover:bg-amber-50 transition-colors duration-300">
                Book Dining Experience
              </button>
            </div>
            <div className="lg:w-1/2">
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative rounded-xl overflow-hidden shadow-2xl"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                    alt="Nigerian dining experience"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-xl font-bold text-white">
                    "A Taste of Nigeria"
                  </h3>
                  <p className="text-amber-200">
                    Our most requested experience
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            What Our Guests Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from travelers who have experienced Gabby's unique blend of
            Nigerian hospitality and boutique luxury
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? "text-amber-500 fill-amber-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">
                "{testimonial.comment}"
              </p>
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                <p className="text-amber-600 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center px-4"
        >
          <h2 className="text-3xl font-bold mb-6">
            Ready to Experience Gabby's?
          </h2>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
            Book your stay now and discover why we're Port-Harcourt' premier boutique
            hotel destination
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition-colors duration-300">
              Book Your Stay
            </button>
            <button className="px-8 py-3 border border-white text-white font-bold rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-300">
              Contact Us
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Experiences;

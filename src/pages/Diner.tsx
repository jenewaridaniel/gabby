// Diner.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiStar,
  FiClock,
  FiCoffee,
  FiDroplet,
  FiHeart,
  FiBookOpen,
  FiChevronDown,
} from "react-icons/fi";
import Footer from "../utilis/Footer";

type Dish = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  origin: "Nigerian" | "English" | "Fusion";
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
};

const Diner = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeDish, setActiveDish] = useState<Dish | null>(null);
  const [showMenu, setShowMenu] = useState(true);
  const [showSpecials, setShowSpecials] = useState(true);

  // Format currency in Naira
  const formatNaira = (amount: number) => {
    return amount.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  // Sample dishes
  const dishes: Dish[] = [
    {
      id: 1,
      name: "Jollof Rice with Grilled Chicken",
      description:
        "West African classic rice dish cooked in rich tomato sauce, served with succulent grilled chicken",
      price: 6500,
      category: "main",
      origin: "Nigerian",
      popular: true,
    },
    {
      id: 2,
      name: "Fish and Chips",
      description:
        "Beer-battered cod with triple-cooked chips, mushy peas and tartar sauce",
      price: 7500,
      category: "main",
      origin: "English",
    },
    {
      id: 3,
      name: "Suya Skewers",
      description:
        "Spicy grilled beef skewers with peanut spice rub, served with fresh onions and tomatoes",
      price: 4500,
      category: "starter",
      origin: "Nigerian",
      spicy: true,
      popular: true,
    },
    {
      id: 4,
      name: "Beef Wellington",
      description:
        "Prime beef tenderloin wrapped in mushroom duxelles and puff pastry",
      price: 12500,
      category: "main",
      origin: "English",
    },
    {
      id: 5,
      name: "Pounded Yam & Egusi Soup",
      description:
        "Traditional Nigerian staple with melon seed soup and assorted meats",
      price: 6800,
      category: "main",
      origin: "Nigerian",
    },
    {
      id: 6,
      name: "Yorkshire Pudding with Suya Beef",
      description: "English classic with Nigerian spiced beef filling",
      price: 5200,
      category: "starter",
      origin: "Fusion",
      popular: true,
    },
    {
      id: 7,
      name: "Sticky Toffee Pudding",
      description:
        "Classic English dessert with dates, toffee sauce and vanilla ice cream",
      price: 4200,
      category: "dessert",
      origin: "English",
    },
    {
      id: 8,
      name: "Chin Chin Cheesecake",
      description:
        "Creamy cheesecake with Nigerian fried dough crust and palm wine caramel",
      price: 4800,
      category: "dessert",
      origin: "Fusion",
      popular: true,
    },
    {
      id: 9,
      name: "Pepper Soup",
      description: "Spicy Nigerian broth with goat meat and traditional herbs",
      price: 5500,
      category: "starter",
      origin: "Nigerian",
      spicy: true,
    },
    {
      id: 10,
      name: "Afternoon Tea Selection",
      description:
        "Assorted finger sandwiches, scones with clotted cream, and miniature pastries",
      price: 8500,
      category: "dessert",
      origin: "English",
    },
    {
      id: 11,
      name: "Plantain & Black Pudding",
      description:
        "Fried sweet plantain with English black pudding and pepper sauce",
      price: 5800,
      category: "starter",
      origin: "Fusion",
    },
    {
      id: 12,
      name: "Zobo Panna Cotta",
      description:
        "Italian dessert with Nigerian hibiscus infusion and coconut crumble",
      price: 4500,
      category: "dessert",
      origin: "Fusion",
    },
    {
      id: 13,
      name: "Chapman Cocktail",
      description: "Nigerian classic with mixed fruits, grenadine and soda",
      price: 3500,
      category: "drink",
      origin: "Nigerian",
    },
    {
      id: 14,
      name: "Gin & Zobo Tonic",
      description: "Premium gin with hibiscus-infused tonic and citrus",
      price: 4800,
      category: "drink",
      origin: "Fusion",
      popular: true,
    },
    {
      id: 15,
      name: "Pimm's Royal",
      description: "Classic English summer cocktail with seasonal fruits",
      price: 4200,
      category: "drink",
      origin: "English",
    },
  ];

  // Filter dishes by category
  const filteredDishes =
    activeCategory === "all"
      ? dishes
      : dishes.filter((dish) => dish.category === activeCategory);

  // View dish details
  const viewDishDetails = (dish: Dish) => {
    setActiveDish(dish);
  };

  // Close dish details
  const closeDishDetails = () => {
    setActiveDish(null);
  };

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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Nigerian-English Fusion Dining
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto mb-8">
              Experience the perfect blend of traditional Nigerian flavors with
              classic English cuisine
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-8 rounded-full text-lg shadow-lg"
              >
                Reserve a Table
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white font-medium py-3 px-8 rounded-full text-lg"
              >
                View Menu
              </motion.button>
            </div>
          </motion.div>
        </div>

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
              Our menu celebrates the rich culinary traditions of Nigeria and
              England, creating unique fusion dishes that tell a story of
              cultural harmony. From spicy Nigerian classics to refined English
              favorites, each dish is crafted with locally sourced ingredients
              and authentic techniques.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center text-white mb-3">
                  <FiClock className="text-2xl" />
                </div>
                <h3 className="font-bold text-gray-800">Opening Hours</h3>
                <p className="text-gray-600">Mon-Sat: 11am - 10pm</p>
                <p className="text-gray-600">Sunday: 12pm - 8pm</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center text-white mb-3">
                  <FiCoffee className="text-2xl" />
                </div>
                <h3 className="font-bold text-gray-800">Sunday Brunch</h3>
                <p className="text-gray-600">Every Sunday 12pm - 4pm</p>
                <p className="text-gray-600">Live Jazz & Bottomless Mimosas</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center text-white mb-3">
                  <FiBookOpen className="text-2xl" />
                </div>
                <h3 className="font-bold text-gray-800">Private Dining</h3>
                <p className="text-gray-600">Special events & celebrations</p>
                <p className="text-gray-600">Capacity: 20-50 guests</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Menu Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-16">
          <div
            className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 flex justify-between items-center cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Our Menu
            </h2>
            <motion.div
              animate={{ rotate: showMenu ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiChevronDown className="text-white text-2xl" />
            </motion.div>
          </div>

          {showMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6">
                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {[
                    { id: "all", name: "All Dishes" },
                    { id: "starter", name: "Starters" },
                    { id: "main", name: "Main Courses" },
                    { id: "dessert", name: "Desserts" },
                    { id: "drink", name: "Drinks" },
                  ].map((category) => (
                    <motion.button
                      key={category.id}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-6 py-3 rounded-full transition-all ${
                        activeCategory === category.id
                          ? "bg-amber-500 text-white"
                          : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                      }`}
                    >
                      {category.name}
                    </motion.button>
                  ))}
                </div>

                {/* Dishes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredDishes.map((dish) => (
                    <motion.div
                      key={dish.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ y: -10 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-amber-100"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">
                              {dish.name}
                            </h3>
                            <div className="flex items-center mt-1">
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  dish.origin === "Nigerian"
                                    ? "bg-green-100 text-green-800"
                                    : dish.origin === "English"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-purple-100 text-purple-800"
                                }`}
                              >
                                {dish.origin}
                              </span>
                              {dish.popular && (
                                <span className="ml-2 flex items-center text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                                  <FiStar className="mr-1" /> Popular
                                </span>
                              )}
                              {dish.spicy && (
                                <span className="ml-2 flex items-center text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                  <FiDroplet className="mr-1" /> Spicy
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-amber-600">
                            {formatNaira(dish.price)}
                          </div>
                        </div>

                        <p className="text-gray-600 my-4">{dish.description}</p>

                        <div className="flex justify-between items-center mt-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => viewDishDetails(dish)}
                            className="text-amber-600 hover:text-amber-700 font-medium"
                          >
                            View Details
                          </motion.button>
                          <div className="bg-white rounded-full p-2 shadow-md cursor-pointer">
                            <FiHeart className="text-gray-600 hover:text-red-500 transition-colors" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Chef's Special */}
        <div className="bg-gradient-to-r from-amber-50 to-white rounded-3xl p-8 md:p-12 border border-amber-200 mb-16">
          <div
            className="flex justify-between items-center cursor-pointer mb-6"
            onClick={() => setShowSpecials(!showSpecials)}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
              Chef's Special
            </h3>
            <motion.div
              animate={{ rotate: showSpecials ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiChevronDown className="text-amber-600 text-2xl" />
            </motion.div>
          </div>

          {showSpecials && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3 flex justify-center">
                  <div className="relative">
                    <div className="w-64 h-64 rounded-full flex items-center justify-center overflow-hidden border-4 border-amber-500 shadow-lg">
                      <img
                        src="https://www.shutterstock.com/image-photo/african-american-chef-uniform-on-600nw-556163941.jpg"
                        alt="Chef Adebayo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-4 left-0 right-0 mx-auto bg-amber-500 text-white px-6 py-2 rounded-full text-sm font-medium w-max shadow-md">
                      Chef Adebayo
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <blockquote className="text-gray-600 text-lg italic mb-6 border-l-4 border-amber-500 pl-4 py-2">
                    "My passion is creating dishes that honor both my Nigerian
                    heritage and my training in classic English cuisine. The
                    fusion of flavors creates something truly magical that can't
                    be found anywhere else."
                  </blockquote>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-amber-100">
                      <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                        <FiStar className="text-amber-500 mr-2" />
                        Today's Special
                      </h4>
                      <p className="text-amber-600 font-bold mb-1">
                        Plantain Wellington
                      </p>
                      <p className="text-gray-600 text-sm">
                        Ripe plantain wrapped in puff pastry with spiced beef
                        filling, served with palm wine reduction
                      </p>
                      <div className="text-amber-600 font-bold mt-3">
                        {formatNaira(6200)}
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-amber-100">
                      <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                        <FiStar className="text-amber-500 mr-2" />
                        Chef's Recommendation
                      </h4>
                      <p className="text-amber-600 font-bold mb-1">
                        Jollof Risotto
                      </p>
                      <p className="text-gray-600 text-sm">
                        Creamy Italian risotto cooked with traditional Jollof
                        spices and topped with grilled prawns
                      </p>
                      <div className="text-amber-600 font-bold mt-3">
                        {formatNaira(7800)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Fusion Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-8 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Nigerian Flavors
              </h3>
              <p className="mb-4">
                Experience the rich, bold flavors of traditional Nigerian
                cuisine with dishes like:
              </p>
              <ul className="list-disc pl-5 mb-6">
                <li>Jollof Rice - the celebrated West African staple</li>
                <li>Suya - spicy grilled meat skewers</li>
                <li>Egusi Soup - hearty melon seed stew</li>
                <li>Pepper Soup - aromatic spicy broth</li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-amber-600 font-medium py-2 px-6 rounded-full"
              >
                Explore Nigerian Dishes
              </motion.button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                English Traditions
              </h3>
              <p className="mb-4">
                Savor the classic comfort of English cuisine with our
                interpretations of:
              </p>
              <ul className="list-disc pl-5 mb-6">
                <li>Beef Wellington - the ultimate celebration dish</li>
                <li>Fish and Chips - crispy beer-battered cod</li>
                <li>Afternoon Tea - elegant finger sandwiches and scones</li>
                <li>Sticky Toffee Pudding - decadent caramel dessert</li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 font-medium py-2 px-6 rounded-full"
              >
                Explore English Dishes
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Dish Detail Modal */}
      {activeDish && (
        <motion.div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={closeDishDetails}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    {activeDish.name}
                  </h3>
                  <div className="flex items-center">
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        activeDish.origin === "Nigerian"
                          ? "bg-green-100 text-green-800"
                          : activeDish.origin === "English"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {activeDish.origin}
                    </span>
                    {activeDish.popular && (
                      <span className="ml-2 flex items-center text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                        <FiStar className="mr-1" /> Popular
                      </span>
                    )}
                    {activeDish.spicy && (
                      <span className="ml-2 flex items-center text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full">
                        <FiDroplet className="mr-1" /> Spicy
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-3xl font-bold text-amber-600">
                  {formatNaira(activeDish.price)}
                </div>
              </div>

              <p className="text-gray-600 mb-8 text-lg">
                {activeDish.description}
              </p>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  Ingredients
                </h4>
                <p className="text-gray-600">
                 
                  {activeDish.origin === "Nigerian"
                    ? "Fresh tomatoes, onions, peppers, traditional spices, locally sourced meats"
                    : activeDish.origin === "English"
                    ? "Premium cuts of meat, seasonal vegetables, herbs, cream, butter"
                    : "A blend of Nigerian spices with English cooking techniques, fresh local produce"}
                </p>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  Pairing Suggestions
                </h4>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-amber-700 font-medium">Wine Pairing:</p>
                  <p className="text-gray-600 mb-3">
                    South African Chenin Blanc
                  </p>

                  <p className="text-amber-700 font-medium">
                    Cocktail Pairing:
                  </p>
                  <p className="text-gray-600 mb-3">Gin & Zobo Tonic</p>

                  <p className="text-amber-700 font-medium">Non-Alcoholic:</p>
                  <p className="text-gray-600">Hibiscus Ginger Fizz</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-amber-500 hover:bg-amber-600  text-white py-3 px-6 rounded-full font-medium text-center"
                >
                  Add to Order
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 border border-amber-500 text-amber-500 hover:bg-amber-50 py-3 px-6 rounded-full font-medium"
                  onClick={closeDishDetails}
                >
                  Back to Menu
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Reservation CTA */}
      <div className="py-24 bg-gradient-to-r from-amber-500 to-amber-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Reserve Your Table
            </h3>
            <p className="text-xl mb-8 text-amber-100 max-w-2xl mx-auto">
              Experience our unique fusion dining in an elegant atmosphere with
              impeccable service
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button className="bg-white hover:bg-gray-100 text-amber-600 font-bold py-4 px-8 rounded-full text-lg shadow-lg">
                Book Now
              </button>
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

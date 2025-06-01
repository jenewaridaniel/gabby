// Rooms.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiStar,
  FiHeart,
  FiMapPin,
  FiWifi,
  FiCoffee,
  FiUsers,
  FiDroplet,
  FiTv,
  FiSun,
} from "react-icons/fi";

// Define types for TypeScript
type RoomFeature = {
  name: string;
  icon: JSX.Element; 
};

type RoomType = {
  id: number;
  title: string;
  description: string;
  price: number;
  size: string;
  bedType: string;
  image: string;
  features: RoomFeature[];
  popular?: boolean;
};

const Rooms = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeRoom, setActiveRoom] = useState<RoomType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Updated room data with real Nigerian hotel images
  const roomTypes: RoomType[] = [
    {
      id: 1,
      title: "Deluxe Lagos View",
      description:
        "Spacious room with breathtaking views of Lagos Lagoon, featuring a king-sized bed and luxurious amenities.",
      price: 85000,
      size: "45 m²",
      bedType: "King Size",
      image:
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
      features: [
        { name: "Lagoon View", icon: <FiDroplet /> },
        { name: "Free WiFi", icon: <FiWifi /> },
        { name: "Breakfast", icon: <FiCoffee /> },
        { name: "2 Guests", icon: <FiUsers /> },
      ],
      popular: true,
    },
    {
      id: 2,
      title: "Executive Abuja Suite",
      description:
        "Elegant suite with separate living area, perfect for business travelers or extended stays in Nigeria's capital.",
      price: 125000,
      size: "75 m²",
      bedType: "King Size",
      image:
        "https://images.unsplash.com/photo-1592229505726-ca121043fa5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
      features: [
        { name: "City View", icon: <FiMapPin /> },
        { name: "Free WiFi", icon: <FiWifi /> },
        { name: "Breakfast", icon: <FiCoffee /> },
        { name: "4 Guests", icon: <FiUsers /> },
      ],
    },
    {
      id: 3,
      title: "Presidential Suite",
      description:
        "The epitome of luxury with panoramic views, private balcony, and premium furnishings.",
      price: 250000,
      size: "120 m²",
      bedType: "King Size",
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
      features: [
        { name: "Panoramic View", icon: <FiMapPin /> },
        { name: "Free WiFi", icon: <FiWifi /> },
        { name: "Premium Breakfast", icon: <FiCoffee /> },
        { name: "6 Guests", icon: <FiUsers /> },
      ],
    },
    {
      id: 4,
      title: "Garden Terrace Room",
      description:
        "Charming room with private terrace overlooking our lush tropical gardens and pool area.",
      price: 95000,
      size: "50 m²",
      bedType: "Queen Size",
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
      features: [
        { name: "Garden View", icon: <FiDroplet /> },
        { name: "Free WiFi", icon: <FiWifi /> },
        { name: "Breakfast", icon: <FiCoffee /> },
        { name: "2 Guests", icon: <FiUsers /> },
      ],
      popular: true,
    },
    {
      id: 5,
      title: "Family Suite",
      description:
        "Spacious suite designed for families, with separate bedrooms and kid-friendly amenities.",
      price: 150000,
      size: "85 m²",
      bedType: "2 Queen Beds",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
      features: [
        { name: "City View", icon: <FiMapPin /> },
        { name: "Free WiFi", icon: <FiWifi /> },
        { name: "Breakfast", icon: <FiCoffee /> },
        { name: "6 Guests", icon: <FiUsers /> },
      ],
    },
    {
      id: 6,
      title: "Honeymoon Suite",
      description:
        "Romantic retreat with champagne on arrival, jacuzzi, and private balcony overlooking the ocean.",
      price: 195000,
      size: "65 m²",
      bedType: "King Size",
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
      features: [
        { name: "Ocean View", icon: <FiDroplet /> },
        { name: "Free WiFi", icon: <FiWifi /> },
        { name: "Breakfast", icon: <FiCoffee /> },
        { name: "2 Guests", icon: <FiUsers /> },
      ],
    },
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter rooms based on category
  const filteredRooms =
    selectedCategory === "all"
      ? roomTypes
      : roomTypes.filter((room) =>
          selectedCategory === "popular"
            ? room.popular
            : selectedCategory === "suites"
            ? room.title.toLowerCase().includes("suite")
            : room.title.toLowerCase().includes(selectedCategory)
        );

  // View room details
  const viewRoomDetails = (room: RoomType) => {
    setActiveRoom(room);
  };

  // Close room details
  const closeRoomDetails = () => {
    setActiveRoom(null);
  };

  // Format Naira prices
  const formatNaira = (amount: number) => {
    return amount.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div
        className="relative h-[70vh] overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 "></div>
        <div className="absolute inset-0 bg-black/80 z-10"></div>

        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Luxury Nigerian Retreats
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto mb-8">
              Experience Nigeria's finest accommodations with breathtaking views
              and authentic hospitality
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-8 rounded-full text-lg shadow-lg"
            >
              Book Your Stay
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Rooms Content */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Discover Your Perfect Escape
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Each of our Nigerian-inspired rooms and suites offers a unique blend
            of luxury and local charm
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-2 rounded-full transition-all ${
              selectedCategory === "all"
                ? "bg-amber-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Rooms
          </button>
          <button
            onClick={() => setSelectedCategory("popular")}
            className={`px-6 py-2 rounded-full transition-all ${
              selectedCategory === "popular"
                ? "bg-amber-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Popular Choices
          </button>
          <button
            onClick={() => setSelectedCategory("suites")}
            className={`px-6 py-2 rounded-full transition-all ${
              selectedCategory === "suites"
                ? "bg-amber-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Suites
          </button>
          <button
            onClick={() => setSelectedCategory("ocean")}
            className={`px-6 py-2 rounded-full transition-all ${
              selectedCategory === "ocean"
                ? "bg-amber-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Ocean View
          </button>
        </motion.div>

        {/* Rooms Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 animate-pulse" />
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover"
                  />
                  {room.popular && (
                    <div className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <FiStar className="mr-1" /> Popular
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md cursor-pointer">
                    <FiHeart className="text-gray-600 hover:text-red-500 transition-colors" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {room.title}
                    </h3>
                    <div className="text-amber-500 flex items-center">
                      <FiStar className="fill-current" />
                      <FiStar className="fill-current" />
                      <FiStar className="fill-current" />
                      <FiStar className="fill-current" />
                      <FiStar className="fill-current" />
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <span className="mr-4 flex items-center">
                      <FiUsers className="mr-1" />{" "}
                      {
                        room.features.find((f) => f.name.includes("Guests"))
                          ?.name
                      }
                    </span>
                    <span className="flex items-center">
                      <FiMapPin className="mr-1" /> {room.size}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {room.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm bg-slate-100 px-3 py-1 rounded-full"
                      >
                        {feature.icon}
                        <span className="ml-1">{feature.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-gray-800">
                        {formatNaira(room.price)}
                      </span>
                      <span className="text-gray-600"> / night</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => viewRoomDetails(room)}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full transition-colors"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Featured Amenities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-24 bg-gradient-to-r from-green-50 to-amber-50 rounded-2xl p-8 md:p-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Authentic Nigerian Experiences
            </h3>
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
              We provide exceptional amenities to ensure your stay is
              comfortable and memorable.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: <FiWifi size={32} />, name: "High-Speed WiFi" },
                { icon: <FiCoffee size={32} />, name: "Nigerian Breakfast" },
                { icon: <FiDroplet size={32} />, name: "Luxury Spa" },
                { icon: <FiTv size={32} />, name: "Smart TV" },
                { icon: <FiUsers size={32} />, name: "24/7 Concierge" },
                { icon: <FiSun size={32} />, name: "Rooftop Pool" },
                { icon: <FiMapPin size={32} />, name: "Local Tours" },
                { icon: <FiHeart size={32} />, name: "Cultural Experiences" },
              ].map((amenity, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center"
                >
                  <div className="bg-white p-4 rounded-full text-amber-500 mb-3 shadow-md">
                    {amenity.icon}
                  </div>
                  <span className="text-gray-700 font-medium">
                    {amenity.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Room Detail Modal */}
      {activeRoom && (
        <motion.div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={closeRoomDetails}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-96">
              <img
                src={activeRoom.image}
                alt={activeRoom.title}
                className="w-full h-full object-cover rounded-t-2xl"
              />
              <button
                onClick={closeRoomDetails}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
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

              {activeRoom.popular && (
                <div className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                  <FiStar className="mr-1" /> Popular Choice
                </div>
              )}
            </div>

            <div className="p-8">
              <div className="flex flex-wrap justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    {activeRoom.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <span className="mr-4 flex items-center">
                      <FiUsers className="mr-1" />{" "}
                      {
                        activeRoom.features.find((f) =>
                          f.name.includes("Guests")
                        )?.name
                      }
                    </span>
                    <span className="flex items-center">
                      <FiMapPin className="mr-1" /> {activeRoom.size}
                    </span>
                  </div>
                </div>

                <div className="text-3xl font-bold text-amber-500">
                  {formatNaira(activeRoom.price)}
                  <span className="text-lg text-gray-600"> / night</span>
                </div>
              </div>

              <p className="text-gray-600 mb-8">{activeRoom.description}</p>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  Room Features
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {activeRoom.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="text-amber-500 mr-2">{feature.icon}</div>
                      <span>{feature.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-full font-medium text-center"
                >
                  Book Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 border border-amber-500 text-amber-500 hover:bg-amber-50 py-3 px-6 rounded-full font-medium"
                >
                  Save for Later
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* CTA Section */}
      <div
        className="relative py-24 text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-amber-900/90"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for an Authentic Nigerian Experience?
            </h3>
            <p className="text-xl mb-8 text-amber-100">
              Experience luxury Nigerian hospitality at its finest
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg">
                Book Your Room Today
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;

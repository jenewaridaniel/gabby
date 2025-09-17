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

  FiHome,
  FiDroplet as FiShower,
  FiWind,
  FiLock,
  FiMonitor,
  FiZap,
} from "react-icons/fi";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase"; 

// Define types for TypeScript
type RoomType = {
  id: string;
  number: string;
  type: string;
  description: string;
  price: number;
  capacity: number;
  imageUrl: string;
  amenities: string[];
  status?: string;
};

const Rooms = () => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Fetch rooms from Firebase
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsCollection = collection(db, "rooms");
        const roomSnapshot = await getDocs(roomsCollection);
        const roomsList = roomSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as RoomType[];
        setRooms(roomsList);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Filter rooms based on category
  const filteredRooms =
    selectedCategory === "all"
      ? rooms
      : rooms.filter((room) =>
          selectedCategory === "luxury"
            ? room.type.toLowerCase().includes("luxury") ||
              room.type.toLowerCase().includes("suite")
            : room.type.toLowerCase().includes(selectedCategory)
        );

  // Format Naira prices
  const formatNaira = (amount: number) => {
    return amount.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  // Amenity icons mapping
  const amenityIcons: Record<string, React.ReactElement> = {
    wifi: <FiWifi />,
    breakfast: <FiCoffee />,
    shower: <FiShower />,
    tv: <FiTv />,
    ac: <FiWind />,
    safe: <FiLock />,
    pool: <FiDroplet />,
    view: <FiMapPin />,
    workspace: <FiMonitor />,
    minibar: <FiZap />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Luxury Rooms
            </h1>
            <p className="text-lg text-amber-100 max-w-2xl mx-auto mb-8">
              Experience comfort and elegance in our carefully designed rooms
            </p>
            <a href="/booking">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-8 rounded-full text-lg shadow-lg"
            >
              Book Your Stay
            </motion.button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Rooms Content */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Discover Your Perfect Room
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Each of our rooms is designed to provide ultimate comfort with modern
            amenities
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
            onClick={() => setSelectedCategory("luxury")}
            className={`px-6 py-2 rounded-full transition-all ${
              selectedCategory === "luxury"
                ? "bg-amber-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Luxury & Suites
          </button>
          <button
            onClick={() => setSelectedCategory("deluxe")}
            className={`px-6 py-2 rounded-full transition-all ${
              selectedCategory === "deluxe"
                ? "bg-amber-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Deluxe
          </button>
          <button
            onClick={() => setSelectedCategory("standard")}
            className={`px-6 py-2 rounded-full transition-all ${
              selectedCategory === "standard"
                ? "bg-amber-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Standard
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
        ) : rooms.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <FiHome className="w-full h-full" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No Rooms Available
            </h3>
            <p className="text-gray-600 mb-6">
              We're currently preparing our rooms. Please check back later.
            </p>
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
                  {room.imageUrl ? (
                    <img
                      src={room.imageUrl}
                      alt={`Room ${room.number}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/500x300?text=Room+Image";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <FiHome className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md cursor-pointer">
                    <FiHeart className="text-gray-600 hover:text-red-500 transition-colors" />
                  </div>
                  {room.status === "new" && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      New
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {room.type} - Room {room.number}
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
                      <FiUsers className="mr-1" /> {room.capacity}{" "}
                      {room.capacity > 1 ? "Guests" : "Guest"}
                    </span>
                    <span className="flex items-center">
                      <FiMapPin className="mr-1" /> {room.type}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {room.description || "Comfortable and well-appointed room"}
                  </p>

                  {room.amenities && room.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {room.amenities.slice(0, 4).map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center text-sm bg-slate-100 px-3 py-1 rounded-full"
                        >
                          {amenityIcons[amenity.toLowerCase()] || (
                            <FiStar className="mr-1" />
                          )}
                          <span className="ml-1 capitalize">
                            {amenity.replace(/_/g, " ")}
                          </span>
                        </div>
                      ))}
                      {room.amenities.length > 4 && (
                        <div className="flex items-center text-sm bg-slate-100 px-3 py-1 rounded-full">
                          +{room.amenities.length - 4} more
                        </div>
                      )}
                    </div>
                  )}

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
                      onClick={() => setSelectedRoom(room)}
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
          className="mt-24 bg-gradient-to-r from-amber-50 to-green-50 rounded-2xl p-8 md:p-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Premium Amenities
            </h3>
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
              We provide exceptional amenities to ensure your stay is comfortable
              and memorable.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: <FiWifi size={32} />, name: "High-Speed WiFi" },
                { icon: <FiCoffee size={32} />, name: "Complimentary Breakfast" },
                { icon: <FiShower size={32} />, name: "Rain Shower" },
                { icon: <FiTv size={32} />, name: "Smart TV" },
                { icon: <FiUsers size={32} />, name: "24/7 Concierge" },
                { icon: <FiDroplet size={32} />, name: "Swimming Pool" },
                { icon: <FiWind size={32} />, name: "Air Conditioning" },
                { icon: <FiLock size={32} />, name: "Room Safe" },
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
      {selectedRoom && (
        <motion.div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedRoom(null)}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-96">
              {selectedRoom.imageUrl ? (
                <img
                  src={selectedRoom.imageUrl}
                  alt={`Room ${selectedRoom.number}`}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <FiHome className="w-20 h-20 text-gray-400" />
                </div>
              )}
              <button
                onClick={() => setSelectedRoom(null)}
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
            </div>

            <div className="p-8">
              <div className="flex flex-wrap justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    {selectedRoom.type} - Room {selectedRoom.number}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <span className="mr-4 flex items-center">
                      <FiUsers className="mr-1" /> {selectedRoom.capacity}{" "}
                      {selectedRoom.capacity > 1 ? "Guests" : "Guest"}
                    </span>
                    <span className="flex items-center">
                      <FiMapPin className="mr-1" /> {selectedRoom.type}
                    </span>
                  </div>
                </div>

                <div className="text-3xl font-bold text-amber-500">
                  {formatNaira(selectedRoom.price)}
                  <span className="text-lg text-gray-600"> / night</span>
                </div>
              </div>

              <p className="text-gray-600 mb-8">
                {selectedRoom.description ||
                  "This comfortable and well-appointed room provides all the amenities you need for a pleasant stay."}
              </p>

              {selectedRoom.amenities && selectedRoom.amenities.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">
                    Room Amenities
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedRoom.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <div className="text-amber-500 mr-2">
                          {amenityIcons[amenity.toLowerCase()] || (
                            <FiStar className="mr-1" />
                          )}
                        </div>
                        <span className="capitalize">
                          {amenity.replace(/_/g, " ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <a href="/booking">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-full font-medium text-center"
                >
                  Book Now
                </motion.button>
                </a>
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
        <div className="absolute inset-0 bg-gray-950/40 opacity-90"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for an Exceptional Stay?
            </h3>
            <p className="text-xl mb-8 text-amber-100">
              Experience luxury and comfort at its finest
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
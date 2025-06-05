import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format, addDays, isAfter, isBefore } from "date-fns";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase"; 
interface Room {
  id: string;
  amenities: string[];
  imageUrl: string;
  number: string;
  price: number;
  type: string;
  description?: string;
}

const ModernBookingSystem = () => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(addDays(new Date(), 2));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDateField, setActiveDateField] = useState("checkIn");
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "rooms"));
        const roomsData: Room[] = [];
        querySnapshot.forEach((doc) => {
          roomsData.push({ id: doc.id, ...doc.data() } as Room);
        });
        setRooms(roomsData);
      } catch (error) {
        console.error("Error fetching rooms: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleDateSelect = (date: Date) => {
    if (activeDateField === "checkIn") {
      setCheckInDate(date);
      if (isAfter(date, checkOutDate)) {
        setCheckOutDate(addDays(date, 1));
      }
    } else {
      if (isBefore(date, checkInDate)) return;
      setCheckOutDate(date);
    }
    setShowDatePicker(false);
  };

  const generateDates = (startDate: Date, days: number) => {
    return Array.from({ length: days }, (_, i) => addDays(startDate, i));
  };

  const dates = generateDates(new Date(), 30);

  // Format price as Nigerian Naira with commas
  const formatNaira = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h1 className="text-2xl font-bold">Book Your Stay</h1>
          <p className="opacity-90">Find the perfect room for your trip</p>
        </div>

        {/* Date Selection */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-in
              </label>
              <div
                className="relative cursor-pointer"
                onClick={() => {
                  setActiveDateField("checkIn");
                  setShowDatePicker(true);
                }}
              >
                <input
                  type="text"
                  readOnly
                  value={format(checkInDate, "EEE, MMM d")}
                  className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="w-5 h-5 absolute right-3 top-3.5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-out
              </label>
              <div
                className="relative cursor-pointer"
                onClick={() => {
                  setActiveDateField("checkOut");
                  setShowDatePicker(true);
                }}
              >
                <input
                  type="text"
                  readOnly
                  value={format(checkOutDate, "EEE, MMM d")}
                  className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="w-5 h-5 absolute right-3 top-3.5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Date Picker Popup */}
          {showDatePicker && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 mt-2 bg-white rounded-xl shadow-xl p-4 border border-gray-200 w-full max-w-md"
            >
              <div className="grid grid-cols-7 gap-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-gray-500 py-1"
                  >
                    {day}
                  </div>
                ))}
                {dates.map((date) => {
                  const isSelected =
                    (activeDateField === "checkIn" &&
                      format(date, "yyyy-MM-dd") ===
                        format(checkInDate, "yyyy-MM-dd")) ||
                    (activeDateField === "checkOut" &&
                      format(date, "yyyy-MM-dd") ===
                        format(checkOutDate, "yyyy-MM-dd"));
                  const isDisabled =
                    activeDateField === "checkOut" &&
                    isBefore(date, checkInDate);

                  return (
                    <button
                      key={date.getTime()}
                      onClick={() => handleDateSelect(date)}
                      disabled={isDisabled}
                      className={`p-2 rounded-full text-sm font-medium transition-colors
                        ${isSelected ? "bg-blue-600 text-white" : ""}
                        ${
                          isDisabled
                            ? "text-gray-300 cursor-not-allowed"
                            : "hover:bg-gray-100"
                        }
                        ${
                          format(date, "d") === "1"
                            ? "col-start-" + (date.getDay() + 1)
                            : ""
                        }
                      `}
                    >
                      {format(date, "d")}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Available Rooms */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Available Rooms
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No rooms available at the moment
            </div>
          ) : (
            <div className="space-y-6">
              {rooms.map((room) => (
                <motion.div
                  key={room.id}
                  whileHover={{ scale: 1.01 }}
                  className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                    selectedRoom === room.id
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto">
                      <img
                        src={room.imageUrl}
                        alt={room.type}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/800x600?text=Room+Image";
                        }}
                      />
                    </div>
                    <div className="p-5 md:w-2/3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {room.type} Room {room.number}
                          </h3>
                          {room.description && (
                            <p className="text-gray-600 mt-1">
                              {room.description}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {room.amenities.map((amenity) => (
                              <span
                                key={amenity}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-500 text-sm">Per night</p>
                          <p className="text-xl font-bold text-blue-600">
                            {formatNaira(room.price)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedRoom(room.id)}
                        className={`mt-4 w-full py-2 rounded-lg font-medium transition-colors ${
                          selectedRoom === room.id
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {selectedRoom === room.id ? "Selected" : "Select Room"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Book Now button */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            disabled={!selectedRoom}
            className={`px-8 py-3 rounded-lg font-bold text-white transition-all ${
              selectedRoom
                ? "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Continue Booking
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ModernBookingSystem;

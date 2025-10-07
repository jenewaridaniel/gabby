import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackButton from '../Backbutton/BackButton'
import {
  format,
  addDays,
  isAfter,
  isBefore,
  differenceInDays,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { collection, getDocs } from "firebase/firestore";
import {db} from '../config/firebase'
import { Link } from "react-router-dom";

interface Room {
  id: string;
  amenities: string[];
  imageUrl: string;
  number: string;
  price: number;
  type: string;
  description?: string;
}

const BookingSystem = () => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(addDays(new Date(), 2));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDateField, setActiveDateField] = useState("checkIn");
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthsToShow, setMonthsToShow] = useState(2);

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

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, monthsToShow));
  };

  const prevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -monthsToShow));
  };

  const getDaysInMonth = (month: Date) => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    return eachDayOfInterval({ start, end });
  };

  const nights = differenceInDays(checkOutDate, checkInDate);

  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    const room = rooms.find((r) => r.id === selectedRoom);
    if (!room) return 0;
    return room.price * nights;
  };

  const totalPrice = calculateTotal();

  const formatNaira = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const generateMonths = () => {
    const months = [];
    for (let i = 0; i < monthsToShow; i++) {
      months.push(addMonths(currentMonth, i));
    }
    return months;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center py-12 px-4">
      <BackButton />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gray-900 p-8 text-white">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold"
          >
            Luxury Awaits You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="opacity-90 text-blue-100"
          >
            Discover your perfect retreat with our exquisite rooms
          </motion.p>
        </div>

        {/* Date Selection */}
        <div className="p-6 border-b border-gray-100 relative">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-in
              </label>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="relative cursor-pointer"
                onClick={() => {
                  setActiveDateField("checkIn");
                  setShowDatePicker(true);
                }}
              >
                <input
                  type="text"
                  readOnly
                  value={format(checkInDate, "EEE, MMM d, yyyy")}
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
              </motion.div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-out
              </label>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="relative cursor-pointer"
                onClick={() => {
                  setActiveDateField("checkOut");
                  setShowDatePicker(true);
                }}
              >
                <input
                  type="text"
                  readOnly
                  value={format(checkOutDate, "EEE, MMM d, yyyy")}
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
              </motion.div>
            </div>
          </div>

          <div className="mt-3 text-sm text-gray-600 flex items-center">
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, repeatDelay: 2 }}
              className="inline-block mr-2"
            >
              ✨
            </motion.span>
            {nights} {nights === 1 ? "night" : "nights"} selected
          </div>

          <AnimatePresence>
            {showDatePicker && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 mt-2 bg-white rounded-xl shadow-xl p-4 border border-gray-200 w-full max-w-3xl"
              >
                <div className="flex justify-between items-center mb-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevMonth}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </motion.button>
                  <div className="flex space-x-4">
                    {generateMonths().map((month) => (
                      <h3
                        key={month.toString()}
                        className="font-semibold text-gray-700"
                      >
                        {format(month, "MMMM yyyy")}
                      </h3>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextMonth}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.button>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {generateMonths().map((month) => (
                    <div
                      key={month.toString()}
                      className="col-span-7 md:col-span-3"
                    >
                      <div className="grid grid-cols-7 gap-1">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                          (day) => (
                            <div
                              key={day}
                              className="text-center text-xs font-medium text-gray-500 py-1"
                            >
                              {day}
                            </div>
                          )
                        )}
                        {getDaysInMonth(month).map((day) => {
                          const isSelected =
                            (activeDateField === "checkIn" &&
                              isSameDay(day, checkInDate)) ||
                            (activeDateField === "checkOut" &&
                              isSameDay(day, checkOutDate));
                          const isDisabled =
                            activeDateField === "checkOut" &&
                            isBefore(day, checkInDate);

                          return (
                            <motion.button
                              key={day.toString()}
                              whileHover={{ scale: isDisabled ? 1 : 1.05 }}
                              whileTap={{ scale: isDisabled ? 1 : 0.95 }}
                              onClick={() => handleDateSelect(day)}
                              disabled={isDisabled}
                              className={`p-2 rounded-full text-sm font-medium transition-colors
                                ${
                                  isSelected
                                    ? "bg-gray-800 text-white shadow-md"
                                    : ""
                                }
                                ${
                                  isDisabled
                                    ? "text-gray-300 cursor-not-allowed"
                                    : "hover:bg-gray-100"
                                }
                                ${
                                  !isSameMonth(day, month)
                                    ? "text-gray-300"
                                    : "text-gray-700"
                                }
                              `}
                            >
                              {format(day, "d")}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setMonthsToShow(monthsToShow === 1 ? 2 : 1)
                      }
                      className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                    >
                      {monthsToShow === 1 ? "Show 2 Months" : "Show 1 Month"}
                    </motion.button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDatePicker(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Available Rooms */}
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">✨</span>
              Our Exclusive Rooms
            </h2>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
                ></motion.div>
              </div>
            ) : rooms.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No rooms available at the moment
              </div>
            ) : (
              <div className="relative">
                <div className="overflow-x-auto pb-6">
                  <div className="flex space-x-6 w-max">
                    {rooms.map((room) => (
                      <motion.div
                        key={room.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        className={`flex-shrink-0 w-80 border rounded-xl overflow-hidden transition-all duration-200 ${
                          selectedRoom === room.id
                            ? "border-blue-500 ring-2 ring-blue-200"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex flex-col h-full">
                          <div className="h-48 relative overflow-hidden">
                            <img
                              src={room.imageUrl}
                              alt={room.type}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80";
                              }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                              <h3 className="text-xl font-bold text-white">
                                {room.type} Room
                              </h3>
                              <p className="text-blue-200 font-medium">
                                {formatNaira(room.price)} / night
                              </p>
                            </div>
                          </div>
                          <div className="p-5 flex-grow">
                            {room.description && (
                              <p className="text-gray-600 mb-4 line-clamp-2">
                                {room.description}
                              </p>
                            )}
                            {/* <div className="flex flex-wrap gap-2 mb-4">
                              {room.amenities.slice(0, 3).map((amenity) => (
                                <motion.span
                                  key={amenity}
                                  whileHover={{ scale: 1.05 }}
                                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                                >
                                  {amenity}
                                </motion.span>
                              ))}
                              {room.amenities.length > 3 && (
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                  +{room.amenities.length - 3} more
                                </span>
                              )}
                            </div> */}
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => setSelectedRoom(room.id)}
                              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                                selectedRoom === room.id
                                  ? "bg-gray-900 text-white shadow-md"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {selectedRoom === room.id
                                ? "✓ Selected"
                                : "Select Room"}
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Footer with Book Now button */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-200">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row justify-between items-center"
          >
            <div className="mb-4 md:mb-0">
              {selectedRoom && (
                <div className="text-gray-700">
                  <div className="font-medium text-lg">
                    {rooms.find((r) => r.id === selectedRoom)?.type} Room
                  </div>
                  <div className="text-xl font-bold text-blue-600">
                    Total: {formatNaira(totalPrice)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {nights} {nights === 1 ? "night" : "nights"} •{" "}
                    {formatNaira(
                      rooms.find((r) => r.id === selectedRoom)?.price || 0
                    )}{" "}
                    per night
                  </div>
                </div>
              )}
            </div>

            <Link to="/booking/details"
             state={{
              room: rooms.find((r) => r.id === selectedRoom),
              checkInDate,
              checkOutDate,
              totalPrice,
              nights
            }}
            >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={!selectedRoom}
              className={`px-8 py-4 rounded-lg font-bold text-white transition-all shadow-lg ${
                selectedRoom
                  ? "bg-gray-900 hover:shadow-xl"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Continue Booking →
            </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingSystem;

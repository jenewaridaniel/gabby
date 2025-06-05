import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiCalendar, FiStar, FiSettings, FiLogOut, FiBell, FiUser, FiCreditCard, FiHelpCircle, FiMapPin } from "react-icons/fi";
import { FaHotel, FaConciergeBell, FaSwimmingPool, FaWifi, FaParking } from "react-icons/fa";

type Booking = {
  id: string;
  hotelName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled";
  image: string;
};

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();


  // logout func.//

   const LogOut=()=>{
    navigate('/')
   }

  // Sample booking data
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      hotelName: "Grand Luxury Hotel",
      roomType: "Deluxe Suite",
      checkIn: "2023-06-15",
      checkOut: "2023-06-20",
      guests: 2,
      totalPrice: 1200,
      status: "confirmed",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: "2",
      hotelName: "Beachside Resort",
      roomType: "Ocean View Room",
      checkIn: "2023-07-10",
      checkOut: "2023-07-15",
      guests: 2,
      totalPrice: 950,
      status: "pending",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: "3",
      hotelName: "Mountain Retreat",
      roomType: "Premium Cabin",
      checkIn: "2023-08-05",
      checkOut: "2023-08-12",
      guests: 4,
      totalPrice: 1800,
      status: "confirmed",
      image: "https://images.unsplash.com/photo-1582719471384-894e8e0bc2a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1488&q=80"
    }
  ]);

  // Sample notifications
  useEffect(() => {
    setNotifications([
      {
        id: "1",
        title: "Booking Confirmed",
        message: "Your booking at Grand Luxury Hotel has been confirmed",
        time: "2 hours ago",
        read: false
      },
      {
        id: "2",
        title: "Special Offer",
        message: "Get 20% off on your next booking with code SUMMER20",
        time: "1 day ago",
        read: true
      },
      {
        id: "3",
        title: "Check-in Reminder",
        message: "Don't forget your check-in at Beachside Resort is in 3 days",
        time: "2 days ago",
        read: true
      }
    ]);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!isMounted) return;

      if (!currentUser) {
        navigate("/auth/login");
        return;
      }

      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [navigate]);

  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, read: true} : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({...n, read: true})));
  };

  const cancelBooking = (id: string) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? {...booking, status: "cancelled"} : booking
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="spinner border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const upcomingBookings = bookings.filter(b => b.status === "confirmed" || b.status === "pending");
  // const pastBookings = bookings.filter(b => b.status === "cancelled");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm">
        <div className="flex justify-between items-center p-4">
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-gray-600"
            >
              <FiBell className="w-5 h-5" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-white shadow-lg flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">Hotel<span className="text-gray-800">Ease</span></h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === "dashboard" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
          >
            <FiHome className="w-5 h-5 mr-3" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === "bookings" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
          >
            <FiCalendar className="w-5 h-5 mr-3" />
            My Bookings
          </button>
          <button
            onClick={() => setActiveTab("rewards")}
            className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === "rewards" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
          >
            <FiStar className="w-5 h-5 mr-3" />
            Rewards
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === "profile" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
          >
            <FiUser className="w-5 h-5 mr-3" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === "payments" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
          >
            <FiCreditCard className="w-5 h-5 mr-3" />
            Payments
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === "settings" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
          >
            <FiSettings className="w-5 h-5 mr-3" />
            Settings
          </button>
        </nav>
        <div className="p-4">
          <button className="flex items-center w-full px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100">
            <FiLogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "tween" }}
            className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 lg:hidden"
          >
            <div className="p-6">
              <h1 className="text-2xl font-bold text-blue-600">Hotel<span className="text-gray-800">Ease</span></h1>
            </div>
            <nav className="flex-1 px-4 space-y-2">
              <button
                onClick={() => {
                  setActiveTab("dashboard");
                  setShowMobileMenu(false);
                }}
                className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === "dashboard" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
              >
                <FiHome className="w-5 h-5 mr-3" />
                Dashboard
              </button>
              <button
                onClick={() => {
                  setActiveTab("bookings");
                  setShowMobileMenu(false);
                }}
                className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === "bookings" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
              >
                <FiCalendar className="w-5 h-5 mr-3" />
                My Bookings
              </button>
              <button
                onClick={() => {
                  setActiveTab("rewards");
                  setShowMobileMenu(false);
                }}
                className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === "rewards" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
              >
                <FiStar className="w-5 h-5 mr-3" />
                Rewards
              </button>
              <button
                onClick={() => {
                  setActiveTab("profile");
                  setShowMobileMenu(false);
                }}
                className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === "profile" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
              >
                <FiUser className="w-5 h-5 mr-3" />
                Profile
              </button>
            </nav>
            <div className="p-4">
              <button onClick={LogOut} className="flex items-center w-full px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100">
                <FiLogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed right-4 top-16 lg:right-6 lg:top-6 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Notifications</h3>
              <button 
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notification.read ? "bg-blue-50" : ""}`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-800">{notification.title}</h4>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No notifications
                </div>
              )}
            </div>
            <div className="p-3 text-center bg-gray-50">
              <button className="text-sm text-blue-600 hover:text-blue-800">
                View all notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:ml-64 p-4 lg:p-8">
        {/* Header */}
        <div className="hidden lg:flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeTab === "dashboard" && "Dashboard"}
            {activeTab === "bookings" && "My Bookings"}
            {activeTab === "rewards" && "Rewards & Loyalty"}
            {activeTab === "profile" && "My Profile"}
            {activeTab === "payments" && "Payment Methods"}
            {activeTab === "settings" && "Settings"}
          </h2>
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-gray-600 hover:text-gray-900"
            >
              <FiBell className="w-5 h-5" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
              </div>
              <div>
                <p className="font-medium text-gray-800">{user?.displayName || user?.email || "User"}</p>
                <p className="text-xs text-gray-500">Member since 2023</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Welcome back, {user?.displayName?.split(' ')[0] || "Guest"}!</h3>
              <p className="text-gray-600">Here's what's happening with your hotel bookings and rewards.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Upcoming Stays</p>
                    <h4 className="text-2xl font-bold mt-1">{upcomingBookings.length}</h4>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                    <FaHotel className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Reward Points</p>
                    <h4 className="text-2xl font-bold mt-1">1,250</h4>
                  </div>
                  <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
                    <FiStar className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Bookings</p>
                    <h4 className="text-2xl font-bold mt-1">{bookings.length}</h4>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50 text-green-600">
                    <FiCalendar className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Member Level</p>
                    <h4 className="text-2xl font-bold mt-1">Silver</h4>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                    <FiUser className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Bookings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Upcoming Stays</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {upcomingBookings.length > 0 ? (
                  upcomingBookings.map(booking => (
                    <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 mb-4 md:mb-0">
                          <div className="w-full h-40 rounded-lg overflow-hidden">
                            <img 
                              src={booking.image} 
                              alt={booking.hotelName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="md:w-3/4 md:pl-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800">{booking.hotelName}</h4>
                              <p className="text-gray-600">{booking.roomType}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === "confirmed" ? "bg-green-100 text-green-800" : booking.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div>
                              <p className="text-sm text-gray-500">Check-in</p>
                              <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Check-out</p>
                              <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Total</p>
                              <p className="font-medium">${booking.totalPrice}</p>
                            </div>
                          </div>
                          <div className="mt-6 flex space-x-3">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                              View Details
                            </button>
                            <button 
                              onClick={() => cancelBooking(booking.id)}
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                            >
                              Cancel Booking
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    You don't have any upcoming stays. Start exploring hotels to book your next getaway!
                  </div>
                )}
              </div>
              {upcomingBookings.length > 0 && (
                <div className="p-4 border-t border-gray-100 text-center">
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    View all bookings
                  </button>
                </div>
              )}
            </div>

            {/* Recommended Hotels */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Recommended For You</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View all
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {[1, 2, 3].map(item => (
                  <motion.div 
                    key={item}
                    whileHover={{ y: -5 }}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={`https://source.unsplash.com/random/600x400/?hotel,${item}`}
                        alt="Hotel"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Luxury Resort & Spa</h4>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <FiMapPin className="w-4 h-4 mr-1" />
                        <span>Bali, Indonesia</span>
                      </div>
                      <div className="flex items-center mt-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <FiStar 
                            key={star} 
                            className={`w-4 h-4 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                          />
                        ))}
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <div>
                          <p className="text-xs text-gray-500">Starting from</p>
                          <p className="font-bold text-gray-800">$199 <span className="text-sm font-normal text-gray-500">/ night</span></p>
                        </div>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Hotel Amenities */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="p-3 bg-blue-50 rounded-full text-blue-600 mb-2">
                    <FaConciergeBell className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">24/7 Concierge</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="p-3 bg-green-50 rounded-full text-green-600 mb-2">
                    <FaSwimmingPool className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Swimming Pool</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="p-3 bg-purple-50 rounded-full text-purple-600 mb-2">
                    <FaWifi className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Free WiFi</span>
                </div>
                <div className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="p-3 bg-yellow-50 rounded-full text-yellow-600 mb-2">
                    <FaParking className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Free Parking</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">My Bookings</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Book a New Stay
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="border-b border-gray-100">
                <div className="flex overflow-x-auto">
                  <button className="px-6 py-4 font-medium text-blue-600 border-b-2 border-blue-600">
                    Upcoming
                  </button>
                  <button className="px-6 py-4 font-medium text-gray-500 hover:text-gray-700">
                    Past
                  </button>
                  <button className="px-6 py-4 font-medium text-gray-500 hover:text-gray-700">
                    Cancelled
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {upcomingBookings.length > 0 ? (
                  upcomingBookings.map(booking => (
                    <div key={booking.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 mb-4 md:mb-0">
                          <div className="w-full h-40 rounded-lg overflow-hidden">
                            <img 
                              src={booking.image} 
                              alt={booking.hotelName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="md:w-3/4 md:pl-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-800">{booking.hotelName}</h4>
                              <p className="text-gray-600">{booking.roomType}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === "confirmed" ? "bg-green-100 text-green-800" : booking.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div>
                              <p className="text-sm text-gray-500">Check-in</p>
                              <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Check-out</p>
                              <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Total</p>
                              <p className="font-medium">${booking.totalPrice}</p>
                            </div>
                          </div>
                          <div className="mt-6 flex space-x-3">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                              View Details
                            </button>
                            <button 
                              onClick={() => cancelBooking(booking.id)}
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                            >
                              Cancel Booking
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                              Contact Hotel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    You don't have any upcoming bookings. Start exploring hotels to book your next getaway!
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Rewards Tab */}
        {activeTab === "rewards" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Your Reward Points</h3>
                  <p className="text-blue-100">Silver Member</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">1,250</p>
                  <p className="text-blue-100 text-sm">+250 needed for Gold</p>
                </div>
              </div>
              <div className="mt-6 w-full bg-white bg-opacity-20 rounded-full h-2.5">
                <div className="bg-white h-2.5 rounded-full" style={{ width: '62.5%' }}></div>
              </div>
              <div className="mt-2 flex justify-between text-sm text-blue-100">
                <span>0</span>
                <span>500</span>
                <span>1,000</span>
                <span>1,500</span>
                <span>2,000</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">How to Earn Points</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-0.5">
                      <FiStar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">100 points per night stayed</p>
                      <p className="text-sm text-gray-600">Earn points for every night you stay at participating hotels</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-0.5">
                      <FiStar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">500 points for first booking</p>
                      <p className="text-sm text-gray-600">Special bonus for your first booking with us</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3 mt-0.5">
                      <FiStar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Referral bonus</p>
                      <p className="text-sm text-gray-600">Get 250 points for every friend who books with your link</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Reward Benefits</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3">
                        <FiStar className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Silver Status</p>
                        <p className="text-sm text-gray-600">You've unlocked Silver benefits</p>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      <span className="text-gray-700">Late checkout until 2PM</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      <span className="text-gray-700">Room upgrade when available</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      <span className="text-gray-700">Welcome drink at check-in</span>
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">Next tier: Gold (1,500 points)</p>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                        <span className="text-gray-700">Free breakfast for two</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                        <span className="text-gray-700">$50 dining credit</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Redeem Your Points</h3>
                <div className="text-sm text-gray-600">1,250 points available</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 1, points: 500, title: "$25 Hotel Credit", description: "Use towards your next stay" },
                  { id: 2, points: 750, title: "Free Spa Treatment", description: "60-minute massage" },
                  { id: 3, points: 1000, title: "Free Night Stay", description: "At participating hotels" }
                ].map(reward => (
                  <motion.div 
                    key={reward.id}
                    whileHover={{ scale: 1.02 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <FiStar className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="font-bold">{reward.points}</span>
                      </div>
                      {reward.points <= 1250 ? (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Available</span>
                      ) : (
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Not enough</span>
                      )}
                    </div>
                    <h4 className="font-medium text-gray-800 mb-1">{reward.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                    <button 
                      className={`w-full py-2 rounded-lg text-sm font-medium ${reward.points <= 1250 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                      disabled={reward.points > 1250}
                    >
                      Redeem Now
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">My Profile</h3>
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 overflow-hidden">
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl text-gray-500">
                          {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
                        </div>
                      )}
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Change Photo
                    </button>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input 
                          type="text" 
                          defaultValue={user?.displayName?.split(' ')[0] || ""}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input 
                          type="text" 
                          defaultValue={user?.displayName?.split(' ')[1] || ""}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        defaultValue={user?.email || ""}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          placeholder="+1 (___) ___-____"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input 
                          type="date" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input 
                        type="text" 
                        placeholder="Street address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-2"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <input 
                          type="text" 
                          placeholder="City"
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input 
                          type="text" 
                          placeholder="State/Province"
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input 
                          type="text" 
                          placeholder="ZIP/Postal code"
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button 
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Account Security</h3>
              
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Password</h4>
                    <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                  </div>
                  <button className="mt-3 md:mt-0 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    Change Password
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <button className="mt-3 md:mt-0 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                    Enable 2FA
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Delete Account</h4>
                    <p className="text-sm text-gray-600">Permanently remove your account and all data</p>
                  </div>
                  <button className="mt-3 md:mt-0 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Payments Tab */}
        {activeTab === "payments" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Payment Methods</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Add New Payment
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-6 bg-blue-100 rounded flex items-center justify-center mr-3">
                        <FiCreditCard className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Visa ending in 4242</h4>
                        <p className="text-sm text-gray-600">Expires 04/2025</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-6 bg-purple-100 rounded flex items-center justify-center mr-3">
                        <FiCreditCard className="text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Mastercard ending in 5555</h4>
                        <p className="text-sm text-gray-600">Expires 12/2024</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer flex items-center justify-center">
                  <div className="text-center">
                    <FiCreditCard className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Add a new payment method</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Billing History</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { id: 1, date: "Jun 15, 2023", description: "Grand Luxury Hotel", amount: "$1,200.00", status: "Paid" },
                      { id: 2, date: "May 22, 2023", description: "Beachside Resort", amount: "$950.00", status: "Paid" },
                      { id: 3, date: "Apr 10, 2023", description: "Mountain Retreat", amount: "$1,800.00", status: "Refunded" },
                      { id: 4, date: "Mar 5, 2023", description: "City View Hotel", amount: "$750.00", status: "Paid" }
                    ].map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === "Paid" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                          <button>View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing 1 to 4 of 4 entries
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Preferences</h3>
              
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive emails about bookings, promotions and more</p>
                  </div>
                  <label className="inline-flex items-center cursor-pointer mt-3 md:mt-0">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">SMS Notifications</h4>
                    <p className="text-sm text-gray-600">Receive text messages about important booking updates</p>
                  </div>
                  <label className="inline-flex items-center cursor-pointer mt-3 md:mt-0">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Dark Mode</h4>
                    <p className="text-sm text-gray-600">Switch between light and dark theme</p>
                  </div>
                  <label className="inline-flex items-center cursor-pointer mt-3 md:mt-0">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Language</h4>
                    <p className="text-sm text-gray-600">Change the language of the app</p>
                  </div>
                  <select className="mt-3 md:mt-0 block w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Currency</h4>
                    <p className="text-sm text-gray-600">Select your preferred currency</p>
                  </div>
                  <select className="mt-3 md:mt-0 block w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                    <option>JPY (¥)</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Save Preferences
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Help & Support</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 mb-4">
                    <FiHelpCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">Help Center</h4>
                  <p className="text-sm text-gray-600 mb-4">Find answers to common questions</p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Visit Help Center
                  </button>
                </div>
                
                <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center text-green-600 mb-4">
                    <FiUser className="w-6 h-6" />
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">Contact Support</h4>
                  <p className="text-sm text-gray-600 mb-4">Get in touch with our support team</p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Contact Us
                  </button>
                </div>
                
                <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="bg-purple-50 w-12 h-12 rounded-full flex items-center justify-center text-purple-600 mb-4">
                    <FiMapPin className="w-6 h-6" />
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">Feedback</h4>
                  <p className="text-sm text-gray-600 mb-4">Share your experience with us</p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Send Feedback
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
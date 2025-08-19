import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import {
  PlusIcon,
  BuildingIcon as BuildingOfficeIcon,
  TrashIcon,
  PencilIcon,
} from "lucide-react";
import { db } from '../config/firebase';
import { format } from "date-fns";

// Type definitions
type Room = {
  id: string;
  number: string;
  type: string;
  description?: string;
  price: number;
  capacity: number;
  status: "available" | "occupied" | "maintenance";
  amenities?: string[];
  imageUrl?: string;
};

type Booking = {
  id: string;
  customer: Customer;
  room: {
    type: string;
    number: string;
  };
  checkIn: Date;
  checkOut: Date;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  totalPrice: number;
  paymentMethod?: string;
  specialRequests?: string;
  createdAt: Date;
  nights: number;
};

interface Customer {
  name: string;
  email?: string;
  phone?: string;
}
type Stats = {
  totalRooms: number;
  occupiedRooms: number;
  revenue: number;
  upcomingCheckIns: number;
  pendingBookings: number;
};

const formatNaira = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "bookings" | "rooms"
  >("dashboard");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState("");
  // const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Partial<Room>>({});
  const [currentBooking, setCurrentBooking] = useState<Partial<Booking>>({});

  // Signs out user
  const SignOut = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1500);
  };

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Rooms collection
        const roomsQuery = query(collection(db, "rooms"));
        const roomsUnsubscribe = onSnapshot(roomsQuery, (snapshot) => {
          const roomsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Room[];
          setRooms(roomsData);
        });

        // Bookings collection
        const bookingsQuery = query(collection(db, "bookings"));
        const bookingsUnsubscribe = onSnapshot(bookingsQuery, (snapshot) => {
          const bookingsData = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              customer: {
                name: data.customer.name || "N/A",
                email: data.customer.email || "N/A",
                phone: data.customer.phone || "",
              },
              room: {
                type: data.room.type || "N/A",
                number: data.room.number || "N/A",
              },
              checkIn: data.checkIn?.toDate() || new Date(),
              checkOut: data.checkOut?.toDate() || new Date(),
              status: data.status || "confirmed",
              totalPrice: data.totalPrice || 0,
              paymentMethod: data.paymentMethod || "",
              specialRequests: data.specialRequests || "",
              createdAt: data.createdAt?.toDate() || new Date(),
              nights: data.nights || 0,
            } as Booking;
          });
          setBookings(bookingsData);
        });

        // Calculate stats
        const calculateStats = async () => {
          const roomsSnapshot = await getDocs(collection(db, "rooms"));
          const bookingsSnapshot = await getDocs(collection(db, "bookings"));

          const totalRooms = roomsSnapshot.size;
          const occupiedRooms = roomsSnapshot.docs.filter(
            (room) => room.data().status === "occupied"
          ).length;

          const revenue = bookingsSnapshot.docs.reduce(
            (sum, booking) => sum + (booking.data().totalPrice || 0),
            0
          );

          const upcomingCheckIns = bookingsSnapshot.docs.filter((booking) => {
            const checkIn = booking.data().checkIn?.toDate();
            return (
              booking.data().status === "confirmed" &&
              checkIn &&
              checkIn > new Date() &&
              checkIn < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            );
          }).length;

          const pendingBookings = bookingsSnapshot.docs.filter(
            (booking) => booking.data().status === "pending"
          ).length;

          setStats({
            totalRooms,
            occupiedRooms,
            revenue,
            upcomingCheckIns,
            pendingBookings,
          });
        };

        calculateStats();
        setLoading(false);

        return () => {
          roomsUnsubscribe();
          bookingsUnsubscribe();
        };
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddRoom = async () => {
    try {
      await addDoc(collection(db, "rooms"), currentRoom);
      setShowRoomModal(false);
      setCurrentRoom({});
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  const handleUpdateRoomStatus = async (
    roomId: string,
    status: Room["status"]
  ) => {
    try {
      await updateDoc(doc(db, "rooms", roomId), { status });
    } catch (error) {
      console.error("Error updating room status:", error);
    }
  };

  const handleUpdateBookingStatus = async (
    bookingId: string,
    status: Booking["status"]
  ) => {
    try {
      await updateDoc(doc(db, "bookings", bookingId), { status });
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Admin Pin//

  const handleAdminAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (adminPin === import.meta.env.VITE_PASSWORD) {
      setIsAuthenticated(true);
      // setShowSensitiveInfo(true);
    } else {
      alert("Invalid admin PIN");
    }
  };

  // const toggleSensitiveInfo = () => {
  //   if (isAuthenticated) {
  //     setShowSensitiveInfo(!showSensitiveInfo);
  //   } else {
  //     alert("Admin authentication required");
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* admin modal */}
      {!isAuthenticated && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full border border-amber-100 shadow-2xl shadow-amber-100/20">
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Admin Authentication
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Enter your credentials to continue
              </p>
            </div>

            <form onSubmit={handleAdminAuth} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin PIN
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    className="block w-full p-3.5 rounded-lg border border-gray-200 focus:border-amber-300 focus:ring-4 focus:ring-amber-100 transition-all"
                    placeholder="••••••"
                    autoFocus
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium py-3.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
              >
                Authenticate
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </form>

            <div className="mt-4 text-center">
              <a
                href="#"
                className="text-sm font-medium text-amber-600 hover:text-amber-700"
              >
                Forgot PIN?
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Gabby Admin Dashboard
          </h1>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={SignOut}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`${
                activeTab === "dashboard"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`${
                activeTab === "bookings"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Bookings
            </button>
            <button
              onClick={() => setActiveTab("rooms")}
              className={`${
                activeTab === "rooms"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Rooms
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <BuildingOfficeIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Rooms
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats.totalRooms}
                        </div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Occupied Rooms
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats.occupiedRooms}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          {Math.round(
                            (stats.occupiedRooms / stats.totalRooms) * 100
                          )}
                          % occupancy
                        </div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Revenue
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {formatNaira(stats.revenue)}
                        </div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Upcoming Check-ins
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stats.upcomingCheckIns}
                        </div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Manage Bookings
                </h2>
                <button
                  onClick={() => {
                    setCurrentBooking({});
                    setShowBookingModal(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Add Booking
                </button>
              </div>

              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Guest Info
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stay Details
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Payment
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map((booking) => (
                        <tr key={booking.id}>
                          {/* Guest Info */}
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.customer.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              Room: {booking.room.type}
                            </div>
                          </td>

                          {/* Contact */}
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {booking.customer.email}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.customer.phone || "No phone"}
                            </div>
                          </td>

                          {/* Stay Details */}
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {format(booking.checkIn, "MMM d, yyyy")} -{" "}
                              {format(booking.checkOut, "MMM d, yyyy")}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.nights} night
                              {booking.nights !== 1 ? "s" : ""}
                            </div>
                          </td>

                          {/* Payment */}
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {formatNaira(booking.totalPrice)}
                            </div>
                            <div className="text-sm text-gray-500 capitalize">
                              {booking.paymentMethod
                                ?.replace(/([A-Z])/g, " $1")
                                ?.toLowerCase() || "N/A"}
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                booking.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : booking.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : booking.status === "cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {booking.status.charAt(0).toUpperCase() +
                                booking.status.slice(1)}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  setCurrentBooking(booking);
                                  setShowBookingModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateBookingStatus(
                                    booking.id,
                                    "cancelled"
                                  )
                                }
                                className="text-red-600 hover:text-red-900"
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Rooms Tab */}
          {activeTab === "rooms" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Room Management
                  </h2>
                  <p className="text-sm text-gray-500">
                    View and manage all hotel rooms
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => setShowRoomModal(true)}
                    className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Add Room
                  </button>
                </div>
              </div>

              {rooms.length === 0 ? (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <div className="mx-auto h-24 w-24 text-gray-400">
                    <BuildingOfficeIcon className="w-full h-full" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    No rooms added
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by adding your first room.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rooms.map((room) => (
                    <div
                      key={room.id}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {/* Room Image Section */}
                      <div className="h-48 bg-gray-100 overflow-hidden">
                        {room.imageUrl ? (
                          <img
                            src={room.imageUrl}
                            alt={`Room ${room.number}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://via.placeholder.com/300x200?text=No+Image";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <BuildingOfficeIcon className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {room.number} - {room.type}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {room.description || "No description"}
                            </p>
                          </div>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              room.status === "available"
                                ? "bg-green-100 text-green-800"
                                : room.status === "occupied"
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {room.status
                              ? room.status.charAt(0).toUpperCase() +
                                room.status.slice(1)
                              : ""}
                          </span>
                        </div>

                        <div className="mt-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Price per night:
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {formatNaira(room.price)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Capacity:
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {room.capacity}{" "}
                              {room.capacity > 1 ? "guests" : "guest"}
                            </span>
                          </div>
                        </div>

                        {room.amenities && room.amenities.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                              Amenities
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {room.amenities.map((amenity, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                                >
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="bg-gray-50 px-5 py-3 flex justify-end gap-2 border-t border-gray-200">
                        <button
                          className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-gray-200 transition"
                          title="Delete room"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentRoom(room);
                            setShowRoomModal(true);
                          }}
                          className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-gray-200 transition"
                          title="Edit room"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateRoomStatus(
                              room.id,
                              room.status === "available"
                                ? "maintenance"
                                : "available"
                            )
                          }
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                            room.status === "available"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                              : "bg-green-100 text-green-800 hover:bg-green-200"
                          } transition`}
                        >
                          {room.status === "available"
                            ? "Maintenance"
                            : "Make Available"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Room Modal */}
      {showRoomModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {currentRoom.id ? "Edit Room" : "Add New Room"}
                </h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="room-number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Room Number
                    </label>
                    <input
                      type="text"
                      name="room-number"
                      id="room-number"
                      value={currentRoom.number || ""}
                      onChange={(e) =>
                        setCurrentRoom({
                          ...currentRoom,
                          number: e.target.value,
                        })
                      }
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="room-type"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Room Type
                    </label>
                    <select
                      id="room-type"
                      name="room-type"
                      value={currentRoom.type || ""}
                      onChange={(e) =>
                        setCurrentRoom({
                          ...currentRoom,
                          type: e.target.value,
                        })
                      }
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Select type</option>
                      <option value="Standard">Standard</option>
                      <option value="Deluxe">Deluxe</option>
                      <option value="Suite">Suite</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="room-price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price per night (₦)
                    </label>
                    <input
                      type="number"
                      name="room-price"
                      id="room-price"
                      value={currentRoom.price || ""}
                      onChange={(e) =>
                        setCurrentRoom({
                          ...currentRoom,
                          price: Number(e.target.value),
                        })
                      }
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="room-capacity"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Capacity
                    </label>
                    <input
                      type="number"
                      name="room-capacity"
                      id="room-capacity"
                      value={currentRoom.capacity || ""}
                      onChange={(e) =>
                        setCurrentRoom({
                          ...currentRoom,
                          capacity: Number(e.target.value),
                        })
                      }
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="room-amenities"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Amenities (comma separated)
                    </label>
                    <input
                      type="text"
                      name="room-amenities"
                      id="room-amenities"
                      value={
                        currentRoom.amenities
                          ? currentRoom.amenities.join(", ")
                          : ""
                      }
                      onChange={(e) =>
                        setCurrentRoom({
                          ...currentRoom,
                          amenities: e.target.value
                            .split(",")
                            .map((item) => item.trim()),
                        })
                      }
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="room-status"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Status
                    </label>
                    <select
                      id="room-status"
                      name="room-status"
                      value={currentRoom.status || "available"}
                      onChange={(e) =>
                        setCurrentRoom({
                          ...currentRoom,
                          status: e.target.value as
                            | "available"
                            | "occupied"
                            | "maintenance",
                        })
                      }
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="available">Available</option>
                      <option value="occupied">Occupied</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="room-image"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Image URL (optional)
                    </label>
                    <input
                      type="text"
                      name="room-image"
                      id="room-image"
                      value={currentRoom.imageUrl || ""}
                      onChange={(e) =>
                        setCurrentRoom({
                          ...currentRoom,
                          imageUrl: e.target.value,
                        })
                      }
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAddRoom}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowRoomModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {currentBooking.id ? "Edit Booking" : "Add New Booking"}
                </h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="guest-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Guest Name
                    </label>
                    <input
                      type="text"
                      name="guest-name"
                      id="guest-name"
                      value={currentBooking.customer?.name || ""}
                      onChange={(e) =>
                        setCurrentBooking({
                          ...currentBooking,
                          customer: {
                            ...currentBooking.customer,
                            name: e.target.value,
                          },
                        })
                      }
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="guest-email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Guest Email
                    </label>
                    <input
                      type="email"
                      name="guest-email"
                      id="guest-email"
                      value={currentBooking.customer?.email || ""}
                      onChange={(e) =>
                        setCurrentBooking({
                          ...currentBooking,
                          customer: {
                            name: currentBooking.customer?.name || "", // Provide default value
                            email: e.target.value,
                            phone: currentBooking.customer?.phone || "", // Provide default value
                          },
                        })
                      }
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  {/* <div className="sm:col-span-3">
                    <label
                      htmlFor="room-id"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Room
                    </label>
                    <select
                      id="room-id"
                      name="room-id"
                      value={currentBooking.room?.type || ""}
                      onChange={(e) =>
                        setCurrentBooking({
                          ...currentBooking,
                          room: {
                            ...currentBooking.room,
                            type: e.target.value,
                          },
                        })
                      }
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Select room</option>
                      {rooms
                        .filter((r) => r.status === "available")
                        .map((room) => (
                          <option key={room.id} value={room.type}>
                            {room.number} - {room.type} (
                            {formatNaira(room.price)}
                            /night)
                          </option>
                        ))}
                    </select>
                  </div> */}

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="booking-status"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Status
                    </label>
                    <select
                      id="booking-status"
                      name="booking-status"
                      value={currentBooking.status || "confirmed"}
                      onChange={(e) =>
                        setCurrentBooking({
                          ...currentBooking,
                          status: e.target.value as
                            | "confirmed"
                            | "pending"
                            | "cancelled"
                            | "completed",
                        })
                      }
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="check-in"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      name="check-in"
                      id="check-in"
                      value={
                        currentBooking.checkIn
                          ? format(currentBooking.checkIn as Date, "yyyy-MM-dd")
                          : ""
                      }
                      onChange={(e) =>
                        setCurrentBooking({
                          ...currentBooking,
                          checkIn: new Date(e.target.value),
                        })
                      }
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="check-out"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      name="check-out"
                      id="check-out"
                      value={
                        currentBooking.checkOut
                          ? format(
                              currentBooking.checkOut as Date,
                              "yyyy-MM-dd"
                            )
                          : ""
                      }
                      onChange={(e) =>
                        setCurrentBooking({
                          ...currentBooking,
                          checkOut: new Date(e.target.value),
                        })
                      }
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="total-price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Total Price (₦)
                    </label>
                    <input
                      type="number"
                      name="total-price"
                      id="total-price"
                      value={currentBooking.totalPrice || ""}
                      onChange={(e) =>
                        setCurrentBooking({
                          ...currentBooking,
                          totalPrice: Number(e.target.value),
                        })
                      }
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="special-requests"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Special Requests (optional)
                    </label>
                    <textarea
                      name="special-requests"
                      id="special-requests"
                      rows={3}
                      value={currentBooking.specialRequests || ""}
                      onChange={(e) =>
                        setCurrentBooking({
                          ...currentBooking,
                          specialRequests: e.target.value,
                        })
                      }
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => {
                    if (currentBooking.id) {
                      handleUpdateBookingStatus(
                        currentBooking.id,
                        currentBooking.status || "confirmed"
                      );
                    } else {
                      // Handle add new booking
                      console.log("Add new booking logic here");
                    }
                    setShowBookingModal(false);
                  }}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

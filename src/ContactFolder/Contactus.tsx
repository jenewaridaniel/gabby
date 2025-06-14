import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import BackButton from "../Backbutton/BackButton";

const Map = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const hotelAddress =
    "Plot 11 Paradise Avenue off G.U Ake Road/Eliozu Road, Eliogbolo, Port Harcourt, Rivers State, Nigeria";
  const encodedAddress = encodeURIComponent(hotelAddress);

  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-amber-50 rounded-lg shadow-md overflow-hidden border border-amber-100">
      <BackButton />
      <div className="p-6">
        <h2 className="text-lg font-bold text-amber-900 mb-2">Our Location</h2>
        <p className="text-amber-800 mb-4">{hotelAddress}</p>
        <div className="relative h-80 w-full bg-amber-100 rounded-lg overflow-hidden">
          {mapLoaded ? (
            <iframe
              className="absolute top-0 left-0 w-full h-full border-0"
              src={`https://maps.google.com/maps?q=${encodedAddress}&output=embed`}
              allowFullScreen
              loading="lazy"
              title="Hotel Location Map"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-pulse">
                  <svg
                    className="w-16 h-16 mx-auto text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <p className="mt-2 text-amber-600">Loading map...</p>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="mb-4 sm:mb-0">
            <h3 className="font-semibold text-amber-800">Directions</h3>
            <p className="text-sm text-amber-700">
              Easily accessible from Port Harcourt International Airport
            </p>
          </div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-1 text-sm bg-amber-600 hover:bg-amber-700 text-white rounded-md transition duration-300"
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
};

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Updated collection name to "contactUsInfo"
      await addDoc(collection(db, "contactUsInfo"), {
        name,
        email,
        message,
        createdAt: new Date(),
      });
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error sending message: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-amber-900 mb-4">Contact Us</h1>
        <p className="text-base text-amber-800 max-w-2xl mx-auto">
          Reach out for inquiries, bookings, or special requests. We'd love to
          hear from you!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-amber-50 p-8 rounded-lg shadow-md border border-amber-100">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">
            Send a Message
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-amber-800 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-amber-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-amber-800 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-amber-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-amber-800 mb-1"
              >
                Your Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-amber-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="How can we help you?"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md transition duration-300"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            {submitted && (
              <p className="text-green-600 mt-2">Message sent successfully!</p>
            )}
          </form>
        </div>

        {/* Map and Contact Info */}
        <div className="space-y-8">
          <Map />

          <div className="bg-amber-50 p-6 rounded-lg shadow-md border border-amber-100">
            <h2 className="text-xl font-bold text-amber-900 mb-4">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="h-6 w-6 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">Phone</h3>
                  <p className="text-sm text-amber-700">+234234567893</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="h-6 w-6 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">Email</h3>
                  <p className="text-sm text-amber-700">
                    gabbyshotel@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="h-6 w-6 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">
                    Opening Hours
                  </h3>
                  <p className="text-sm text-amber-700">24/7 Reception</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

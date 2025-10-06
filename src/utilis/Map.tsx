import { useState, useEffect } from "react";

const Map = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const retreatAddress =
    "Plot 11 Primegate Avenue off G.U Ake Road Eliozu Road, Eliogbolo, Port Harcourt, Rivers State, Nigeria";
  const encodedAddress = encodeURIComponent(retreatAddress);
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2300.865952127425!2d7.009820536930743!3d4.888375128434959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNMKwNTMnMTguMiJOIDfCsDAwJzM1LjciRQ!5e0!3m2!1sen!2sng!4v1750335533859!5m2!1sen!2sng";

  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-xl overflow-hidden border border-amber-100">
      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Our Sanctuary
          </h2>
          <p className="text-xl text-amber-700 font-medium">
            Serene Luxury, Private Bliss
          </p>
        </div>

        <div className="mb-6 text-center">
          <address className="not-italic text-gray-600 text-lg">
            {retreatAddress}
          </address>
        </div>

        <div className="relative h-96 w-full bg-amber-50 rounded-xl overflow-hidden border border-amber-200 shadow-inner">
          {mapLoaded ? (
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
              title="Retreat Location Map"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="animate-pulse">
                <svg
                  className="w-16 h-16 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <p className="mt-4 text-lg font-medium text-gray-700">
                Locating Your Private Retreat
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Serene Luxury, Private Bliss
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800">Why Choose Us</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Exclusive private location</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Luxurious amenities</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Premium security</span>
              </li>
            </ul>
          </div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition duration-300 flex items-center gap-2 whitespace-nowrap"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
};

export default Map;

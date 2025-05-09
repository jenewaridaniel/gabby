import { useState, useEffect } from 'react';

const Map = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Updated hotel address in Rivers State
  const hotelAddress = "Plot 11 Primegate Avenue off G.U Ake Road, Eliogbolo, Port Harcourt, Rivers State, Nigeria";
  const encodedAddress = encodeURIComponent(hotelAddress);

  useEffect(() => {
    // This simulates loading an actual map API
    const timer = setTimeout(() => setMapLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Location</h2>
        <p className="text-gray-600 mb-4">{hotelAddress}</p>
        
        <div className="relative h-80 w-full bg-gray-200 rounded-lg overflow-hidden">
          {mapLoaded ? (
            // In a real implementation, you would use Google Maps or Mapbox here
            <iframe
              className="absolute top-0 left-0 w-full h-full border-0"
              src={`https://maps.google.com/maps?q=${encodedAddress}&output=embed`}
              allowFullScreen
              loading="lazy"
              title="Hotel Location Map"
            ></iframe>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-pulse">
                  <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <p className="mt-2 text-gray-500">Loading map...</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="mb-4 sm:mb-0">
            <h3 className="font-semibold text-gray-700">Directions</h3>
            <p className="text-sm text-gray-600">Easily accessible from Port Harcourt International Airport</p>
          </div>
          <a 
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
          >
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
};

export default Map;
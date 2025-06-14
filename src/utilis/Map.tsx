import { useState, useEffect } from 'react';

const Map = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const retreatAddress = "Plot 11 Paradise Avenue off G.U Ake Road/Eliozu Road, Eliogbolo, Port Harcourt, Rivers State, Nigeria";
  const encodedAddress = encodeURIComponent(retreatAddress);

  useEffect(() => {
    const timer = setTimeout(() => setMapLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-xl overflow-hidden border border-amber-100">
      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Sanctuary</h2>
          <p className="text-xl text-amber-700 font-medium">Serene Luxury, Private Bliss</p>
        </div>

        <div className="mb-6 text-center">
          <address className="not-italic text-gray-600 text-lg">
            {retreatAddress}
          </address>
        </div>
        
        <div className="relative h-96 w-full bg-amber-50 rounded-xl overflow-hidden border border-amber-200">
          {mapLoaded ? (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://maps.google.com/maps?q=${encodedAddress}&output=embed&z=16`}
              allowFullScreen
              loading="lazy"
              title="Luxury Retreat Location - Serene Luxury, Private Bliss"
              aria-label="Interactive map showing our luxury retreat location"
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
              <p className="mt-4 text-lg font-medium text-gray-700">Locating Your Private Retreat</p>
              <p className="mt-2 text-sm text-gray-500">Serene Luxury, Private Bliss</p>
            </div>
          )}
        </div>
        
        <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800">Arrival Information</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✈</span>
                <span>20 minutes from Port Harcourt International Airport</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">🛣</span>
                <span>5 minutes from Aba Road via Eliozu Junction</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">🅿</span>
                <span>Private secured parking available</span>
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
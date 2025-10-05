import React from 'react';
import roof from '../assets/rooftop.jpg'
import club from '../assets/clubss.jpg'

const Dining: React.FC = () => {
  // Sample dining options data
  const diningOptions = [
    {
      id: 1,
      name: "Club Night Restaurant",
      description: "Club Night Restaurant combines fine local dining with exciting music and dance",
      hours: "6:30 AM - 11:00 PM",
      type: "Clubbing & Dining",
      image: club
    },
    {
      id: 2,
      name: "Skybar Lounge",
      description: "Skybar Lounge offers panoramic city views, handcrafted cocktails, and a vibrant atmosphere.",
      hours: "10:00 AM - 10:00 PM",
      type: "Rooftop Lounge",
      image: roof
    },
  ];

  return (
    <div className=" min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Dining at Gabby's</h1>
          <p className="text-base text-amber-800 max-w-3xl mx-auto">
            Experience culinary excellence with our diverse dining options, each crafted to satisfy your palate and elevate your stay.
          </p>
        </div>

        {/* Dining Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {diningOptions.map((option) => (
            <div key={option.id} className="bg-white rounded-lg  overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="relative h-64">
                <img 
                  src={option.image} 
                  alt={option.name} 
                  loading='lazy'
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-2xl font-bold text-white">{option.name}</h2>
                  <span className="inline-block px-3 py-1 bg-amber-600 text-white text-sm rounded-full mt-2">
                    {option.type}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">{option.description}</p>
                <div className="flex items-center text-amber-700">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Hours: {option.hours}</span>
                </div>
                {/* <a href="/dining">
                <button className="mt-6 px-6 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors duration-300">
                  View Menu
                </button>
                </a> */}
              </div>
            </div>
          ))}
        </div>

        {/* Special Offers Section */}
        <div className="mt-20 bg-amber-100 rounded-xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold text-amber-900 mb-4">Rooftop Special</h2>
              <p className="text-amber-800 mb-6">
                Join us at the Rooftop Lounge between 5-7PM daily for our signature cocktails and appetizers at 20% off.
              </p>
              <button className="px-8 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors duration-300">
                Reserve a Table
              </button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Sunset Special" 
                loading='lazy'
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dining;
import React, { useState } from 'react';
import swim from '../assets/swiming.jpg'
import sky from '../assets/sky.jpg'
import gym from '../assets/gym.jpg'
import  pot from '../assets/pot.jpg'
interface Activity {
  id: number;
  name: string;
  category: string;
  rating: number;
  image: string;
  description: string;
}

const Recreational: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const activities: Activity[] = [
    {
      id: 1,
      name: 'Swimming',
      category: 'Outdoor',
      rating: 4.8,
      image: swim,
      description: 'Dive into excellence with expert training and a refreshing swim experience.'
    },
    {
      id: 2,
      name: 'Skybar',
      category: 'Indoor',
      rating: 4.5,
      image: sky,
      description: 'Experience exquisite cocktails and breathtaking views at our skybar, where every sip is a masterpiece.'
    },
    {
      id: 3,
      name: 'Exercise & Workout',
      category: 'Indoor',
      rating: 4.7,
      image: gym,
      description: 'Achieve peak fitness with expert training and state-of-the-art equipment.'
    },
    {
      id: 4,
      name: 'Yoga Session',
      category: 'Wellness',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597',
      description: 'Relax and rejuvenate with guided yoga practice.'
    },
    {
      id: 5,
      name: 'Photography Walk',
      category: 'Outdoor',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
      description: 'Capture beautiful moments with expert guidance.'
    },
    {
      id: 6,
      name: 'Pottery Making',
      category: 'Arts',
      rating: 4.4,
      image: pot,
      description: 'Create beautiful pottery pieces with your own hands.'
    }
  ];

  const categories = ['All', ...new Set(activities.map(activity => activity.category))];

  const filteredActivities = activities.filter(activity => {
    const matchesCategory = selectedCategory === 'All' || activity.category === selectedCategory;
    const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-amber-800 mb-2">Recreational <span className=' text-amber-400'>Activities</span> </h1>
          <p className="text-amber-600">Find your perfect leisure activity</p>
        </header>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-start md:items-end">
          <div className="w-full md:w-1/2">
            <label htmlFor="search" className="block text-sm font-medium text-amber-800 mb-1">
              Search Activities
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by name or description..."
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full md:w-auto">
            <label htmlFor="category" className="block text-sm font-medium text-amber-800 mb-1">
              Filter by Category
            </label>
            <select
              id="category"
              className="px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Activities Grid */}
        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map(activity => (
              <div key={activity.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={activity.image} 
                    alt={activity.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-amber-900">{activity.name}</h3>
                    {/* <span className="flex items-center bg-amber-100 text-amber-800 px-2 py-1 rounded text-sm font-medium">
                      ⭐ {activity.rating}
                    </span> */}
                  </div>
                  <span className="inline-block bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded-full mb-3">
                    {activity.category}
                  </span>
                  <p className="text-gray-600 mb-4">{activity.description}</p>
                  {/* <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                    View Details
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-amber-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-amber-800 mb-1">No activities found</h3>
            <p className="text-amber-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Recreational;
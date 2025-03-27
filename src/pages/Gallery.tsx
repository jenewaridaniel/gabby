import { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import room from '../assets/room.jpg'
import champ from '../assets//champ.jpg'
import rest from '../assets/rest.jpg'
import swim from '../assets/swiming.jpg'
import spa from '../assets/spa.jpg'
import spas from '../assets/spas.jpg'
import suite from '../assets/suite.jpg'
import side from '../assets/sidee.jpg'

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: 'rooms' | 'dining' | 'pool' | 'spa';
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Sample gallery images
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: room,
      alt: 'Gabby\'s Hotel Deluxe Room',
      category: 'rooms'
    },
    {
      id: 2,
      src: rest,
      alt: 'Signature Restaurant at Gabby\'s Hotel',
      category: 'dining'
    },
    {
      id: 3,
      src: swim,
      alt: 'Infinity Pool at Gabby\'s Hotel',
      category: 'pool'
    },
    {
      id: 4,
      src: spa,
      alt: 'Luxury Spa at Gabby\'s Hotel',
      category: 'spa'
    },
    {
      id: 5,
      src: suite,
      alt: 'Executive Suite at Gabby\'s Hotel',
      category: 'rooms'
    },
    {
      id: 6,
      src: champ,
      alt: 'Champagne Bar at Gabby\'s Hotel',
      category: 'dining'
    },
    {
      id: 7,
      src: side,
      alt: 'Poolside Lounge at Gabby\'s Hotel',
      category: 'pool'
    },
    {
      id: 8,
      src: spas,
      alt: 'Spa Treatment Room at Gabby\'s Hotel',
      category: 'spa'
    },
  ];

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;

    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
    }

    setSelectedImage(galleryImages[newIndex]);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold tracking-widest text-amber-600 uppercase mb-2">
            Visual Experience
          </h2>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">
            Discover Gabby's Hotel
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Explore our luxurious accommodations, world-class amenities, and unforgettable experiences
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === 'all' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            All
          </button>
          <button
            onClick={() => setActiveCategory('rooms')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === 'rooms' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Rooms & Suites
          </button>
          <button
            onClick={() => setActiveCategory('dining')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === 'dining' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Dining
          </button>
          <button
            onClick={() => setActiveCategory('pool')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === 'pool' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Pool & Recreation
          </button>
          <button
            onClick={() => setActiveCategory('spa')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === 'spa' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Spa & Wellness
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div 
              key={image.id} 
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-zoom-in"
              onClick={() => openModal(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <h3 className="text-white font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {image.alt.replace('at Gabby\'s Hotel', '')}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 text-white hover:text-amber-400 transition-colors"
            >
              <FiX size={28} />
            </button>
            
            <button 
              onClick={() => navigateImage('prev')}
              className="absolute left-6 text-white hover:text-amber-400 transition-colors p-2"
            >
              <FiChevronLeft size={32} />
            </button>
            
            <div className="max-w-4xl w-full">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full max-h-[80vh] object-contain"
              />
              <p className="text-white text-center mt-4">{selectedImage.alt}</p>
            </div>
            
            <button 
              onClick={() => navigateImage('next')}
              className="absolute right-6 text-white hover:text-amber-400 transition-colors p-2"
            >
              <FiChevronRight size={32} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
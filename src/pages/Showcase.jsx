import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OptimizedModelCard from '../components/OptimizedModelCard';
import ModelViewerModal from '../components/ModelViewerModal';

// Sample furniture data
const furnitureData = [
  // Chairs
  { id: 1, type: 'chair', name: 'Modern Armchair', description: 'Comfortable armchair with wooden legs', price: 299.99, category: 'chairs' },
  { id: 2, type: 'chair', name: 'Dining Chair', description: 'Elegant dining chair with fabric upholstery', price: 149.99, category: 'chairs' },
  { id: 3, type: 'chair', name: 'Office Chair', description: 'Ergonomic office chair with adjustable height', price: 249.99, category: 'chairs' },
  { id: 4, type: 'chair', name: 'Lounge Chair', description: 'Relaxing lounge chair for living rooms', price: 399.99, category: 'chairs' },

  // Tables
  { id: 5, type: 'table', name: 'Dining Table', description: 'Wooden dining table for 6 people', price: 599.99, category: 'tables' },
  { id: 6, type: 'table', name: 'Coffee Table', description: 'Modern coffee table with glass top', price: 249.99, category: 'tables' },
  { id: 7, type: 'table', name: 'Side Table', description: 'Compact side table for living rooms', price: 129.99, category: 'tables' },
  { id: 8, type: 'table', name: 'Office Desk', description: 'Spacious desk with drawers', price: 349.99, category: 'tables' },

  // Cabinets and Storage
  { id: 9, type: 'cabinet', name: 'Bookshelf', description: 'Tall bookshelf with 5 shelves', price: 279.99, category: 'storage' },
  { id: 10, type: 'cabinet', name: 'TV Stand', description: 'Modern TV stand with storage compartments', price: 199.99, category: 'storage' },
  { id: 11, type: 'cabinet', name: 'Wardrobe', description: 'Spacious wardrobe with sliding doors', price: 499.99, category: 'storage' },
  { id: 12, type: 'cabinet', name: 'Sideboard', description: 'Elegant sideboard for dining rooms', price: 399.99, category: 'storage' }
];

function ShowcasePage() {
  const [furniture, setFurniture] = useState(furnitureData);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time and then set loading to false
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort furniture based on active filter, search query, and sort option
  useEffect(() => {
    let filteredFurniture = [...furnitureData];

    // Apply category filter
    if (activeFilter !== 'all') {
      filteredFurniture = filteredFurniture.filter(item => item.category === activeFilter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredFurniture = filteredFurniture.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filteredFurniture.sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.price - b.price;
      } else if (sortBy === 'price-high') {
        return b.price - a.price;
      } else {
        // Default sort by name
        return a.name.localeCompare(b.name);
      }
    });

    setFurniture(filteredFurniture);
  }, [activeFilter, searchQuery, sortBy]);

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-[#0A1628] text-white">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-xl text-gray-300">Loading 3D Models...</p>
            </div>
          </div>
        ) : (
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-2 text-center">Furniture Showcase</h1>
          <p className="text-gray-400 text-center mb-8">Explore our collection of high-quality 3D furniture models</p>

          {/* Filters and Search */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${activeFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  onClick={() => setActiveFilter('all')}
                >
                  All
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${activeFilter === 'chairs' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  onClick={() => setActiveFilter('chairs')}
                >
                  Chairs
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${activeFilter === 'tables' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  onClick={() => setActiveFilter('tables')}
                >
                  Tables
                </button>
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${activeFilter === 'storage' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  onClick={() => setActiveFilter('storage')}
                >
                  Storage
                </button>
              </div>

              {/* Search and Sort */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search furniture..."
                    className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <select
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-400">
              Showing {furniture.length} {furniture.length === 1 ? 'item' : 'items'}
              {activeFilter !== 'all' ? ` in ${activeFilter}` : ''}
              {searchQuery ? ` matching "${searchQuery}"` : ''}
            </p>
          </div>

          {/* Furniture Grid */}
          {furniture.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {furniture.map(item => (
                <OptimizedModelCard
                  key={item.id}
                  type={item.type}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  onClick={() => {
                    setSelectedItem(item);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">No items found</h3>
              <p className="text-gray-400">Try adjusting your filters or search query</p>
            </div>
          )}

          {/* Pagination (simplified) */}
          {furniture.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                  Previous
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">1</button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">2</button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">3</button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
        )}
      </div>
      <Footer />

      {/* 3D Model Viewer Modal */}
      {selectedItem && (
        <ModelViewerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          item={selectedItem}
        />
      )}
    </>
  );
}

export default ShowcasePage;

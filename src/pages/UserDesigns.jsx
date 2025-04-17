import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getUserDesigns, deleteUserDesign } from '../services/userDesigns';

function UserDesignsPage() {
  const [designs, setDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Load user designs on component mount
  useEffect(() => {
    const loadDesigns = () => {
      setIsLoading(true);
      const userDesigns = getUserDesigns();
      setDesigns(userDesigns);
      setIsLoading(false);
    };

    loadDesigns();
  }, []);

  // Handle deleting a design
  const handleDeleteDesign = (timestamp) => {
    const success = deleteUserDesign(timestamp);
    if (success) {
      setDesigns(designs.filter(design => design.timestamp !== timestamp));
    }
  };

  // Format date for display
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-[#0A1628] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Saved Designs</h1>
            <button
              onClick={() => navigate('/showcase')}
              className="bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 rounded-lg"
            >
              Back to Showcase
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : designs.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h2 className="text-xl font-semibold mb-2">No Saved Designs</h2>
              <p className="text-gray-400 mb-6">You haven't saved any furniture designs yet.</p>
              <button
                onClick={() => navigate('/showcase')}
                className="bg-blue-500 hover:bg-blue-600 transition-colors px-6 py-3 rounded-lg"
              >
                Explore Furniture
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {designs.map((design) => (
                <div key={design.timestamp} className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="h-48 bg-gray-700 flex items-center justify-center">
                    <div 
                      className="w-24 h-24 rounded-lg" 
                      style={{ backgroundColor: design.color.value }}
                    ></div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-1">{design.name}</h3>
                    <div className="text-gray-400 text-sm mb-4">
                      <p>Color: {design.color.name}</p>
                      <p>Material: {design.material.name}</p>
                      <p>Saved: {formatDate(design.timestamp)}</p>
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => navigate(`/showcase?type=${design.type}`)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        View Similar
                      </button>
                      <button
                        onClick={() => handleDeleteDesign(design.timestamp)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserDesignsPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { getRoomDesigns, deleteRoomDesign } from '../services/roomDesigns';
import { getUserDesigns, deleteUserDesign } from '../services/userDesigns';

function MyDesignsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [roomDesigns, setRoomDesigns] = useState([]);
  const [furnitureDesigns, setFurnitureDesigns] = useState([]);
  const [activeTab, setActiveTab] = useState('rooms');
  const [isLoading, setIsLoading] = useState(true);
  
  // Load designs on component mount
  useEffect(() => {
    const loadDesigns = () => {
      setIsLoading(true);
      
      // Load room designs
      const rooms = getRoomDesigns();
      setRoomDesigns(rooms);
      
      // Load furniture designs
      const furniture = getUserDesigns();
      setFurnitureDesigns(furniture);
      
      setIsLoading(false);
    };
    
    loadDesigns();
  }, []);
  
  // Handle deleting a room design
  const handleDeleteRoomDesign = (id, event) => {
    event.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this room design?')) {
      const success = deleteRoomDesign(id);
      
      if (success) {
        setRoomDesigns(roomDesigns.filter(design => design.id !== id));
      }
    }
  };
  
  // Handle deleting a furniture design
  const handleDeleteFurnitureDesign = (timestamp, event) => {
    event.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this furniture design?')) {
      const success = deleteUserDesign(timestamp);
      
      if (success) {
        setFurnitureDesigns(furnitureDesigns.filter(design => design.timestamp !== timestamp));
      }
    }
  };
  
  // Format date for display
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  // Calculate room area
  const calculateRoomArea = (room) => {
    if (!room || !room.dimensions) return 0;
    
    switch (room.shape) {
      case 'rectangular':
      case 'square':
        return room.dimensions.width * room.dimensions.length;
      
      case 'l-shaped':
        const mainArea = room.dimensions.mainWidth * room.dimensions.mainLength;
        const secondaryArea = room.dimensions.secondaryWidth * room.dimensions.secondaryLength;
        return mainArea + secondaryArea;
      
      case 'irregular':
        // Simplified area calculation for irregular rooms
        if (!room.dimensions.points || room.dimensions.points.length < 3) return 0;
        
        let area = 0;
        const points = room.dimensions.points;
        
        for (let i = 0; i < points.length; i++) {
          const j = (i + 1) % points.length;
          area += points[i][0] * points[j][1];
          area -= points[j][0] * points[i][1];
        }
        
        return Math.abs(area / 2);
      
      default:
        return 0;
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0A1628] text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Designs</h1>
              <p className="text-gray-400">
                View and manage your saved room and furniture designs
              </p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button
                onClick={() => navigate('/room-planner/new')}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                Create New Room Design
              </button>
              <button
                onClick={() => navigate('/showcase')}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
              >
                Customize Furniture
              </button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-700 mb-6">
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'rooms' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('rooms')}
            >
              Room Designs
            </button>
            <button
              className={`px-6 py-3 font-medium ${activeTab === 'furniture' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('furniture')}
            >
              Furniture Designs
            </button>
          </div>
          
          {/* Loading indicator */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {/* Room Designs */}
              {activeTab === 'rooms' && (
                <>
                  {roomDesigns.length === 0 ? (
                    <div className="bg-gray-800 rounded-lg p-8 text-center">
                      <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <h2 className="text-xl font-semibold mb-2">No Room Designs</h2>
                      <p className="text-gray-400 mb-6">You haven't created any room designs yet.</p>
                      <button
                        onClick={() => navigate('/room-planner/new')}
                        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors"
                      >
                        Create Your First Room Design
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {roomDesigns.map((design) => (
                        <div 
                          key={design.id} 
                          className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-700 transition-colors"
                          onClick={() => navigate(`/room-planner/${design.id}`)}
                        >
                          <div className="h-48 bg-gray-700 flex items-center justify-center">
                            {/* Room preview (simplified) */}
                            <div 
                              className="w-3/4 h-3/4 border-2 border-gray-600 relative"
                              style={{ backgroundColor: design.colors.floor }}
                            >
                              {/* Walls */}
                              <div className="absolute inset-0 border-4" style={{ borderColor: design.colors.walls }}></div>
                              
                              {/* Furniture indicators (simplified) */}
                              {design.furniture && design.furniture.map((item, index) => (
                                <div 
                                  key={index}
                                  className="absolute w-4 h-4 rounded-full"
                                  style={{ 
                                    backgroundColor: item.color || '#A0522D',
                                    left: `${(item.position.x / (design.dimensions.width || 10)) * 100}%`,
                                    top: `${(item.position.y / (design.dimensions.length || 10)) * 100}%`
                                  }}
                                ></div>
                              ))}
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold text-white mb-1">{design.name}</h3>
                                <p className="text-sm text-gray-400">
                                  {design.shape.charAt(0).toUpperCase() + design.shape.slice(1)} Room
                                </p>
                              </div>
                              <button
                                onClick={(e) => handleDeleteRoomDesign(design.id, e)}
                                className="text-gray-400 hover:text-red-500"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                            <div className="mt-3 flex justify-between text-sm">
                              <span className="text-gray-400">
                                {calculateRoomArea(design).toFixed(1)} sq ft
                              </span>
                              <span className="text-gray-400">
                                {design.furniture ? design.furniture.length : 0} items
                              </span>
                            </div>
                            <div className="mt-4 text-xs text-gray-500">
                              Last updated: {formatDate(design.updatedAt)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
              
              {/* Furniture Designs */}
              {activeTab === 'furniture' && (
                <>
                  {furnitureDesigns.length === 0 ? (
                    <div className="bg-gray-800 rounded-lg p-8 text-center">
                      <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <h2 className="text-xl font-semibold mb-2">No Furniture Designs</h2>
                      <p className="text-gray-400 mb-6">You haven't saved any customized furniture yet.</p>
                      <button
                        onClick={() => navigate('/showcase')}
                        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors"
                      >
                        Customize Furniture
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {furnitureDesigns.map((design) => (
                        <div key={design.timestamp} className="bg-gray-800 rounded-lg overflow-hidden">
                          <div className="h-48 bg-gray-700 flex items-center justify-center">
                            <div 
                              className="w-24 h-24 rounded-lg" 
                              style={{ backgroundColor: design.color.value }}
                            ></div>
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-semibold text-white mb-1">{design.name}</h3>
                                <p className="text-sm text-gray-400">
                                  {design.type.charAt(0).toUpperCase() + design.type.slice(1)}
                                </p>
                              </div>
                              <button
                                onClick={(e) => handleDeleteFurnitureDesign(design.timestamp, e)}
                                className="text-gray-400 hover:text-red-500"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                            <div className="mt-3 flex justify-between text-sm">
                              <span className="text-gray-400">
                                Color: {design.color.name}
                              </span>
                              <span className="text-gray-400">
                                Material: {design.material.name}
                              </span>
                            </div>
                            <div className="mt-4 text-xs text-gray-500">
                              Saved: {formatDate(design.timestamp)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyDesignsPage;

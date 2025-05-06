import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../utils/Supabase';
import Navbar from '../components/Navbar';
import ThreeDRenderer from '../components/ThreeDRenderer';

function ViewDesignPage() {
  const { designId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [design, setDesign] = useState(null);
  const [error, setError] = useState(null);
  const [view, setView] = useState('2d'); // '2d' or '3d'

  useEffect(() => {
    const fetchDesign = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('designs')
          .select('*')
          .eq('id', designId)
          .single();
        
        if (error) throw error;
        if (!data) throw new Error('Design not found');
        
        // Check if user has permission to view this design
        if (data.user_id !== user.id) {
          // In a real app you might check if the design is shared/public
          // For now we'll just redirect if it's not the user's own design
          navigate('/designs');
          return;
        }

        setDesign(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching design:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    if (user && designId) {
      fetchDesign();
    }
  }, [designId, user, navigate]);

  const toggleView = () => {
    setView(view === '2d' ? '3d' : '2d');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-blue-500">Loading design...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="bg-red-900/50 border border-red-500 text-red-300 px-6 py-4 rounded max-w-lg">
            <h3 className="text-lg font-medium mb-2">Error</h3>
            <p>{error}</p>
            <button
              onClick={() => navigate('/designs')}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
            >
              Back to My Designs
            </button>
          </div>
        </div>
      </>
    );
  }

  if (!design) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">{design.name}</h1>
              <p className="text-gray-400">
                Created on {new Date(design.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <button
                onClick={toggleView}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm font-medium"
              >
                Switch to {view === '2d' ? '3D' : '2D'} View
              </button>
              <Link
                to={`/edit/${design.id}`}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white text-sm font-medium"
              >
                Edit Design
              </Link>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg overflow-hidden">
            {/* Design Viewer */}
            <div className="relative bg-gray-700 overflow-hidden" style={{ height: '60vh' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                {view === '3d' ? (
                  <div className="h-full w-full">
                    <ThreeDRenderer 
                      roomProperties={design.room_properties} 
                      furniturePieces={design.furniture_pieces} 
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-400 mb-2">2D View</p>
                    <div style={{ 
                      width: `${design.room_properties?.width / 10}px`, 
                      height: `${design.room_properties?.length / 10}px`,
                      backgroundColor: design.room_properties?.floorColor || '#A0522D',
                      position: 'relative',
                      margin: '0 auto'
                    }}>
                      {design.furniture_pieces?.map(piece => (
                        <div 
                          key={piece.id}
                          style={{
                            position: 'absolute',
                            width: `${piece.width / 10}px`,
                            height: `${piece.depth / 10}px`,
                            backgroundColor: piece.color,
                            left: `${piece.x / 10}px`,
                            top: `${piece.y / 10}px`,
                            transform: `rotate(${piece.rotation}deg) scale(${piece.scale || 1})`,
                            border: '1px solid rgba(255,255,255,0.3)'
                          }}
                          title={piece.name}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Design Details Section */}
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Room Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <span className="block text-sm text-gray-400">Dimensions</span>
                  <span className="block">{design.room_properties?.width} × {design.room_properties?.length} × {design.room_properties?.height} cm</span>
                </div>
                <div>
                  <span className="block text-sm text-gray-400">Shape</span>
                  <span className="block capitalize">{design.room_properties?.shape}</span>
                </div>
                <div>
                  <span className="block text-sm text-gray-400">Wall Color</span>
                  <div className="flex items-center">
                    <div 
                      className="w-5 h-5 rounded mr-2" 
                      style={{backgroundColor: design.room_properties?.wallColor}}
                    ></div>
                    <span>{design.room_properties?.wallColor}</span>
                  </div>
                </div>
                <div>
                  <span className="block text-sm text-gray-400">Floor Color</span>
                  <div className="flex items-center">
                    <div 
                      className="w-5 h-5 rounded mr-2" 
                      style={{backgroundColor: design.room_properties?.floorColor}}
                    ></div>
                    <span>{design.room_properties?.floorColor}</span>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold mt-8 mb-4">Furniture List</h2>
              {design.furniture_pieces && design.furniture_pieces.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Item</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Dimensions</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Color</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Position</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {design.furniture_pieces.map((piece) => (
                        <tr key={piece.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{piece.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {piece.width} × {piece.depth} × {piece.height} cm
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex items-center">
                              <div 
                                className="w-4 h-4 rounded mr-2" 
                                style={{backgroundColor: piece.color}}
                              ></div>
                              <span>{piece.color}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            X: {piece.x}, Y: {piece.y}, Rotation: {piece.rotation}°
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-400">No furniture added to this design.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewDesignPage;

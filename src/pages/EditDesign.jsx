import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../utils/Supabase';
import Navbar from '../components/Navbar';
import DraggableFurniture from '../components/DraggableFurniture';
import ThreeDRenderer from '../components/ThreeDRenderer';
import FurniturePreviewCanvas from '../components/FurniturePreviewCanvas';

function EditDesignPage() {
  const { designId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [design, setDesign] = useState(null);
  const [error, setError] = useState(null);
  const [view, setView] = useState('both'); // 'both', '2d', or '3d'
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [designName, setDesignName] = useState('');
  
  // Room properties
  const [roomProperties, setRoomProperties] = useState({
    width: 500, // cm
    length: 700, // cm
    height: 280, // cm
    shape: 'rectangular',
    wallColor: '#FFFFFF',
    floorColor: '#A0522D',
  });
  
  // Furniture pieces in the design
  const [furniturePieces, setFurniturePieces] = useState([]);
  
  // Updated furniture options with more specific types
  const [availableFurniture, setAvailableFurniture] = useState([
    { id: 1, type: 'chair', name: 'Dining Chair', width: 45, depth: 50, height: 90, colors: ['#8B4513', '#A0522D', '#D2691E', '#000000'] },
    { id: 2, type: 'dining-table', name: 'Dining Table', width: 150, depth: 90, height: 75, colors: ['#8B4513', '#A0522D', '#D2691E', '#000000'] },
    { id: 3, type: 'lounge-chair', name: 'Lounge Chair', width: 80, depth: 85, height: 100, colors: ['#8B4513', '#A0522D', '#D2691E', '#000000', '#808080'] },
    { id: 4, type: 'coffee-table', name: 'Coffee Table', width: 110, depth: 60, height: 45, colors: ['#8B4513', '#A0522D', '#D2691E', '#000000', '#D3D3D3'] },
    { id: 5, type: 'side-table', name: 'Side Table', width: 55, depth: 55, height: 60, colors: ['#8B4513', '#A0522D', '#D2691E', '#000000'] },
  ]);

  useEffect(() => {
    const fetchDesign = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('designs')
          .select('*')
          .eq('id', designId)
          .eq('user_id', user.id)
          .single();
        
        if (error) throw error;
        if (!data) throw new Error('Design not found or you do not have permission to edit it.');
        
        setDesign(data);
        setDesignName(data.name);
        
        // Load saved data
        if (data.room_properties) {
          setRoomProperties(data.room_properties);
        }
        
        if (data.furniture_pieces) {
          setFurniturePieces(data.furniture_pieces);
        }
        
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
  }, [designId, user]);

  const handleRoomPropertyChange = (property, value) => {
    setRoomProperties({
      ...roomProperties,
      [property]: value
    });
  };

  const addFurniture = (furniture) => {
    const newFurniture = {
      ...furniture,
      id: `furniture-${Date.now()}`,
      x: 100, // default position
      y: 100,
      rotation: 0,
      color: furniture.colors[0],
      scale: 1
    };
    
    setFurniturePieces([...furniturePieces, newFurniture]);
  };

  const updateFurniture = (id, properties) => {
    setFurniturePieces(furniturePieces.map(piece => 
      piece.id === id ? { ...piece, ...properties } : piece
    ));
  };

  const removeFurniture = (id) => {
    setFurniturePieces(furniturePieces.filter(piece => piece.id !== id));
    
    // If the deleted furniture was selected, clear the selection
    if (selectedFurniture && selectedFurniture.id === id) {
      setSelectedFurniture(null);
    }
  };

  const toggleView = () => {
    // Cycle through view modes: both -> 2d -> 3d -> both
    if (view === 'both') setView('2d');
    else if (view === '2d') setView('3d');
    else setView('both');
  };

  const saveDesign = async () => {
    if (!designName.trim()) {
      setError("Please provide a name for your design.");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('designs')
        .update({ 
          name: designName,
          room_properties: roomProperties,
          furniture_pieces: furniturePieces,
        })
        .eq('id', designId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      navigate(`/design/${designId}`);
    } catch (err) {
      setError("Failed to save design. Please try again.");
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  const deleteDesign = async () => {
    if (!window.confirm('Are you sure you want to delete this design? This action cannot be undone.')) {
      return;
    }
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('designs')
        .delete()
        .eq('id', designId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      navigate('/designs');
    } catch (err) {
      setError("Failed to delete design. Please try again.");
      console.error("Delete error:", err);
    } finally {
      setSaving(false);
    }
  };

  // Function to toggle furniture selection
  const toggleFurnitureSelection = (piece) => {
    if (selectedFurniture && selectedFurniture.id === piece.id) {
      setSelectedFurniture(null); // Deselect if already selected
    } else {
      setSelectedFurniture(piece); // Select the new piece
    }
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Edit Design</h1>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <div>
                <input
                  type="text"
                  placeholder="Design Name"
                  value={designName}
                  onChange={(e) => setDesignName(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white mr-4"
                />
              </div>
              <button
                onClick={toggleView}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm font-medium"
              >
                {view === 'both' ? 'Split View' : view === '2d' ? '2D View' : '3D View'} ↺
              </button>
              <button
                onClick={saveDesign}
                disabled={saving}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white text-sm font-medium disabled:bg-green-800"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={deleteDesign}
                disabled={saving}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm font-medium disabled:bg-red-800"
              >
                Delete
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Combined content in a single view */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Room Properties and Furniture Selection */}
            <div className="lg:col-span-1 space-y-6">
              {/* Room Properties */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Room Properties</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Width (cm)</label>
                    <input
                      type="number"
                      value={roomProperties.width}
                      onChange={(e) => handleRoomPropertyChange('width', parseInt(e.target.value))}
                      className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Length (cm)</label>
                    <input
                      type="number"
                      value={roomProperties.length}
                      onChange={(e) => handleRoomPropertyChange('length', parseInt(e.target.value))}
                      className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Height (cm)</label>
                    <input
                      type="number"
                      value={roomProperties.height}
                      onChange={(e) => handleRoomPropertyChange('height', parseInt(e.target.value))}
                      className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Shape</label>
                    <select
                      value={roomProperties.shape}
                      onChange={(e) => handleRoomPropertyChange('shape', e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="rectangular">Rectangular</option>
                      <option value="l-shaped">L-Shaped</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Wall Color</label>
                    <div className="mt-1 flex">
                      <input
                        type="color"
                        value={roomProperties.wallColor}
                        onChange={(e) => handleRoomPropertyChange('wallColor', e.target.value)}
                        className="h-9 w-9 border-0"
                      />
                      <input
                        type="text"
                        value={roomProperties.wallColor}
                        onChange={(e) => handleRoomPropertyChange('wallColor', e.target.value)}
                        className="ml-2 flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Floor Color</label>
                    <div className="mt-1 flex">
                      <input
                        type="color"
                        value={roomProperties.floorColor}
                        onChange={(e) => handleRoomPropertyChange('floorColor', e.target.value)}
                        className="h-9 w-9 border-0"
                      />
                      <input
                        type="text"
                        value={roomProperties.floorColor}
                        onChange={(e) => handleRoomPropertyChange('floorColor', e.target.value)}
                        className="ml-2 flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Furniture Selection */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Select Furniture</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {availableFurniture.map((furniture) => (
                    <div
                      key={furniture.id}
                      className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 cursor-pointer"
                      onClick={() => addFurniture(furniture)}
                    >
                      <div className="h-32 bg-gray-600 rounded-md mb-2 overflow-hidden">
                        <FurniturePreviewCanvas
                          furnitureType={furniture.name}
                          color={furniture.colors[0]}
                        />
                      </div>
                      <h3 className="font-medium">{furniture.name}</h3>
                      <p className="text-sm text-gray-400">
                        {furniture.width} x {furniture.depth} x {furniture.height} cm
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Design Canvas and Added Furniture */}
            <div className="lg:col-span-2 space-y-6">
              {/* Design Canvas */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Design Canvas</h2>

                <div className="relative bg-gray-700 rounded-lg overflow-hidden" style={{ height: '500px' }}>
                  <div className={`${view === 'both' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4 h-full' : 'h-full'}`}>

                    {/* 2D View */}
                    {(view === '2d' || view === 'both') && (
                      <div className={`${view === 'both' ? '' : 'absolute inset-0'} flex items-center justify-center p-4`}>
                        <div className="w-full h-full flex flex-col">
                          <p className="text-gray-400 mb-2 text-center">2D View - Drag furniture to position</p>
                          <div className="relative flex-grow bg-gray-600 rounded overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div style={{
                                width: `${roomProperties.width / 10}px`,
                                height: `${roomProperties.length / 10}px`,
                                backgroundColor: roomProperties.floorColor,
                                position: 'relative'
                              }}>
                                {furniturePieces.map(piece => (
                                  <DraggableFurniture
                                    key={piece.id}
                                    piece={piece}
                                    onUpdate={updateFurniture}
                                    onSelect={setSelectedFurniture}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 3D View */}
                    {(view === '3d' || view === 'both') && (
                      <div className={`${view === 'both' ? '' : 'absolute inset-0'} flex items-center justify-center p-4`}>
                        <div className="w-full h-full flex flex-col">
                          <p className="text-gray-400 mb-2 text-center">3D View - Drag to rotate, scroll to zoom</p>
                          <div className="flex-grow bg-gray-600 rounded-lg overflow-hidden">
                            <ThreeDRenderer
                              roomProperties={roomProperties}
                              furniturePieces={furniturePieces}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Added Furniture */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="font-medium mb-2">Added Furniture</h3>
                {furniturePieces.length === 0 ? (
                  <p className="text-gray-400">No furniture added yet. Select furniture from the left panel to add to your design.</p>
                ) : (
                  <div className="space-y-2">
                    {furniturePieces.map(piece => (
                      <div
                        key={piece.id}
                        className={`bg-gray-700 p-3 rounded-md flex justify-between items-center ${selectedFurniture?.id === piece.id ? 'border-2 border-blue-500' : ''}`}
                      >
                        <div>
                          <span className="font-medium">{piece.name}</span>
                          <span className="text-sm text-gray-400 ml-2">
                            {piece.width} x {piece.depth} cm
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => toggleFurnitureSelection(piece)}
                            className="p-1 bg-blue-600 rounded hover:bg-blue-700"
                          >
                            {selectedFurniture?.id === piece.id ? 'Close' : 'Edit'}
                          </button>
                          <button
                            onClick={() => removeFurniture(piece.id)}
                            className="p-1 bg-red-600 rounded hover:bg-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Furniture Editor */}
                {selectedFurniture && (
                  <div className="mt-6 bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Edit Furniture: {selectedFurniture.name}</h3>
                      <button
                        onClick={() => setSelectedFurniture(null)}
                        className="text-gray-400 hover:text-gray-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Position X</label>
                        <input
                          type="number"
                          value={selectedFurniture.x}
                          onChange={(e) => updateFurniture(selectedFurniture.id, { x: parseInt(e.target.value) })}
                          className="mt-1 block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Position Y</label>
                        <input
                          type="number"
                          value={selectedFurniture.y}
                          onChange={(e) => updateFurniture(selectedFurniture.id, { y: parseInt(e.target.value) })}
                          className="mt-1 block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Rotation (°)</label>
                        <input
                          type="number"
                          value={selectedFurniture.rotation}
                          onChange={(e) => updateFurniture(selectedFurniture.id, { rotation: parseInt(e.target.value) })}
                          className="mt-1 block w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Color</label>
                        <div className="mt-1 flex items-center">
                          <div
                            className="h-9 w-9 border border-gray-500 rounded mr-3 flex-shrink-0"
                            style={{ backgroundColor: selectedFurniture.color }}
                          ></div>
                          <div className="flex-grow">
                            <input
                              type="color"
                              value={selectedFurniture.color}
                              onChange={(e) => updateFurniture(selectedFurniture.id, { color: e.target.value })}
                              className="w-full h-9 cursor-pointer"
                            />
                            <div className="text-xs text-gray-400 mt-1">
                              {selectedFurniture.color.toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400">Scale</label>
                        <input
                          type="range"
                          min="0.5"
                          max="2"
                          step="0.1"
                          value={selectedFurniture.scale}
                          onChange={(e) => updateFurniture(selectedFurniture.id, { scale: parseFloat(e.target.value) })}
                          className="mt-1 block w-full"
                        />
                        <div className="text-center text-sm mt-1">
                          {selectedFurniture.scale}x
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Save Button */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={deleteDesign}
                  disabled={saving}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded text-white font-medium disabled:bg-red-800"
                >
                  Delete Design
                </button>
                <button
                  onClick={saveDesign}
                  disabled={saving}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded text-white font-medium disabled:bg-green-800"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditDesignPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RoomVisualizer2D from '../components/RoomVisualizer2D';
import RoomVisualizer3D from '../components/RoomVisualizer3D';
import { useAuth } from '../context/AuthContext';
import {
  ROOM_SHAPES,
  COLOR_SCHEMES,
  createNewRoom,
  calculateRoomArea,
  getRecommendedFurniture
} from '../data/roomModels';
import {
  getRoomDesignById,
  saveRoomDesign,
  deleteRoomDesign,
  addFurnitureToRoom,
  removeFurnitureFromRoom,
  updateFurnitureInRoom
} from '../services/roomDesigns';
import { furnitureData } from '../data/furnitureData';

function RoomPlannerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Room state
  const [room, setRoom] = useState(null);
  const [viewMode, setViewMode] = useState('2d'); // '2d' or '3d'
  const [webGLFailed, setWebGLFailed] = useState(false);
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [transformMode, setTransformMode] = useState('translate'); // 'translate', 'rotate', 'scale'
  const [scale, setScale] = useState(20); // pixels per foot for 2D view
  const [isEditing, setIsEditing] = useState(false);
  const [showFurnitureCatalog, setShowFurnitureCatalog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form state for room configuration
  const [roomName, setRoomName] = useState('');
  const [roomShape, setRoomShape] = useState('rectangular');
  const [roomColorScheme, setRoomColorScheme] = useState('modern');
  const [roomDimensions, setRoomDimensions] = useState({
    width: 12,
    length: 16,
    height: 9
  });

  // Load room data if editing an existing room
  useEffect(() => {
    if (id === 'new') {
      // Create a new room
      const newRoom = createNewRoom();
      setRoom(newRoom);
      setRoomName(newRoom.name);
      setRoomShape(newRoom.shape);
      setRoomColorScheme(newRoom.colorScheme);
      setRoomDimensions(newRoom.dimensions);
      setIsEditing(true);
    } else if (id) {
      // Load existing room
      const existingRoom = getRoomDesignById(id);
      if (existingRoom) {
        setRoom(existingRoom);
        setRoomName(existingRoom.name);
        setRoomShape(existingRoom.shape);
        setRoomColorScheme(existingRoom.colorScheme);
        setRoomDimensions(existingRoom.dimensions);
      } else {
        // Room not found, redirect to new room
        navigate('/room-planner/new');
      }
    } else {
      // No ID provided, redirect to new room
      navigate('/room-planner/new');
    }
  }, [id, navigate]);

  // Handle room configuration changes
  const handleRoomConfigChange = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    // Create updated room object
    const updatedRoom = {
      ...room,
      name: roomName,
      shape: roomShape,
      colorScheme: roomColorScheme,
      dimensions: roomDimensions,
      colors: COLOR_SCHEMES.find(scheme => scheme.id === roomColorScheme)?.colors || room.colors,
      updatedAt: new Date().toISOString()
    };

    setRoom(updatedRoom);
    setIsEditing(false);
  };

  // Handle adding furniture to the room
  const handleAddFurniture = (furnitureItem) => {
    if (!room) return;

    // Create a new furniture object
    const newFurniture = {
      id: `furniture-${Date.now()}`,
      type: furnitureItem.type,
      name: furnitureItem.name,
      description: furnitureItem.description,
      color: furnitureItem.color || '#A0522D',
      position: { x: room.dimensions.width / 2, y: room.dimensions.length / 2 },
      rotation: furnitureItem.rotation || 0,
      rotationX: furnitureItem.rotationX || 0,
      rotationZ: furnitureItem.rotationZ || 0,
      dimensions: {
        width: furnitureItem.dimensions?.width ||
               (furnitureItem.type === 'table' ? 3 :
               furnitureItem.type === 'cabinet' ? 2 : 1.5),
        height: furnitureItem.dimensions?.height ||
                (furnitureItem.type === 'table' ? 2.5 :
                furnitureItem.type === 'cabinet' ? 4 : 3),
        depth: furnitureItem.dimensions?.depth ||
               (furnitureItem.type === 'table' ? 2 :
               furnitureItem.type === 'cabinet' ? 1.5 : 1.5)
      }
    };

    // Add furniture to room
    const updatedRoom = {
      ...room,
      furniture: [...(room.furniture || []), newFurniture],
      updatedAt: new Date().toISOString()
    };

    setRoom(updatedRoom);
    setSelectedFurniture(newFurniture.id);
    setShowFurnitureCatalog(false);
  };

  // Handle removing furniture from the room
  const handleRemoveFurniture = (furnitureId) => {
    if (!room) return;

    // Remove furniture from room
    const updatedRoom = {
      ...room,
      furniture: room.furniture.filter(f => f.id !== furnitureId),
      updatedAt: new Date().toISOString()
    };

    setRoom(updatedRoom);

    if (selectedFurniture === furnitureId) {
      setSelectedFurniture(null);
    }
  };

  // Handle moving furniture in the room
  const handleMoveFurniture = (furnitureId, newPosition) => {
    if (!room) return;

    // Update furniture position
    const updatedRoom = {
      ...room,
      furniture: room.furniture.map(f =>
        f.id === furnitureId ? { ...f, position: newPosition } : f
      ),
      updatedAt: new Date().toISOString()
    };

    setRoom(updatedRoom);
  };

  // Handle rotating furniture in the room
  const handleRotateFurniture = (furnitureId, rotationData) => {
    if (!room) return;

    // Update furniture rotation
    const updatedRoom = {
      ...room,
      furniture: room.furniture.map(f => {
        if (f.id === furnitureId) {
          // Handle both simple degrees (for Y rotation) and full rotation object
          if (typeof rotationData === 'number') {
            // Legacy support for Y-axis rotation only
            return { ...f, rotation: (f.rotation || 0) + rotationData };
          } else {
            // Full rotation object with X, Y, Z axes
            return {
              ...f,
              rotation: rotationData.rotation !== undefined ? rotationData.rotation : (f.rotation || 0),
              rotationX: rotationData.rotationX !== undefined ? rotationData.rotationX : (f.rotationX || 0),
              rotationZ: rotationData.rotationZ !== undefined ? rotationData.rotationZ : (f.rotationZ || 0)
            };
          }
        }
        return f;
      }),
      updatedAt: new Date().toISOString()
    };

    setRoom(updatedRoom);
  };

  // Handle changing furniture color
  const handleChangeFurnitureColor = (furnitureId, color) => {
    if (!room) return;

    // Update furniture color
    const updatedRoom = {
      ...room,
      furniture: room.furniture.map(f =>
        f.id === furnitureId ? { ...f, color } : f
      ),
      updatedAt: new Date().toISOString()
    };

    setRoom(updatedRoom);
  };

  // Handle saving the room design
  const handleSaveRoom = () => {
    if (!room) return;

    setIsSaving(true);

    // Save room design
    const success = saveRoomDesign(room);

    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);

      // If this is a new room, redirect to the saved room
      if (id === 'new') {
        navigate(`/room-planner/${room.id}`);
      }
    }

    setIsSaving(false);
  };

  // Handle deleting the room design
  const handleDeleteRoom = () => {
    if (!room || id === 'new') return;

    if (window.confirm('Are you sure you want to delete this room design?')) {
      const success = deleteRoomDesign(room.id);

      if (success) {
        navigate('/my-designs');
      }
    }
  };

  // Get the selected furniture object
  const getSelectedFurnitureObject = () => {
    if (!selectedFurniture || !room || !room.furniture) return null;
    return room.furniture.find(f => f.id === selectedFurniture);
  };

  // Filter furniture catalog by type
  const getFurnitureCatalog = (type = null) => {
    if (!type) return furnitureData;
    return furnitureData.filter(item => item.type === type);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0A1628] text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {id === 'new' ? 'Create New Room Design' : `Edit: ${room?.name || 'Room Design'}`}
              </h1>
              <p className="text-gray-400">
                Design and visualize your room layout in 2D and 3D
              </p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button
                onClick={() => navigate('/my-designs')}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
              >
                Back to Designs
              </button>
              <button
                onClick={handleSaveRoom}
                disabled={isSaving}
                className={`bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSaving ? 'Saving...' : 'Save Design'}
              </button>
              {id !== 'new' && (
                <button
                  onClick={handleDeleteRoom}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Delete
                </button>
              )}
            </div>
          </div>

          {/* Success message */}
          {saveSuccess && (
            <div className="bg-green-800/50 text-green-200 p-4 rounded-lg mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Room design saved successfully!
            </div>
          )}

          {/* Room Configuration Panel */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Room Configuration</h2>
              <button
                onClick={handleRoomConfigChange}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition-colors text-sm"
              >
                {isEditing ? 'Apply Changes' : 'Edit Configuration'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Room Name */}
              <div>
                <label className="block text-gray-300 mb-2">Room Name</label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white ${!isEditing ? 'opacity-70 cursor-not-allowed' : ''}`}
                />
              </div>

              {/* Room Shape */}
              <div>
                <label className="block text-gray-300 mb-2">Room Shape</label>
                <select
                  value={roomShape}
                  onChange={(e) => setRoomShape(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white ${!isEditing ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {ROOM_SHAPES.map(shape => (
                    <option key={shape.id} value={shape.id}>
                      {shape.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color Scheme */}
              <div>
                <label className="block text-gray-300 mb-2">Color Scheme</label>
                <select
                  value={roomColorScheme}
                  onChange={(e) => setRoomColorScheme(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white ${!isEditing ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {COLOR_SCHEMES.map(scheme => (
                    <option key={scheme.id} value={scheme.id}>
                      {scheme.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Room Dimensions */}
              <div>
                <label className="block text-gray-300 mb-2">Dimensions (feet)</label>
                <div className="grid grid-cols-3 gap-2">
                  {(roomShape === 'rectangular' || roomShape === 'square') && (
                    <>
                      <div>
                        <label className="block text-gray-400 text-xs mb-1">Width</label>
                        <input
                          type="number"
                          value={roomDimensions.width}
                          onChange={(e) => setRoomDimensions({
                            ...roomDimensions,
                            width: parseFloat(e.target.value) || 0
                          })}
                          disabled={!isEditing}
                          min="1"
                          max="50"
                          className={`w-full bg-gray-700 border border-gray-600 rounded-lg px-2 py-1 text-white ${!isEditing ? 'opacity-70 cursor-not-allowed' : ''}`}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-xs mb-1">Length</label>
                        <input
                          type="number"
                          value={roomDimensions.length}
                          onChange={(e) => setRoomDimensions({
                            ...roomDimensions,
                            length: parseFloat(e.target.value) || 0
                          })}
                          disabled={!isEditing || roomShape === 'square'}
                          min="1"
                          max="50"
                          className={`w-full bg-gray-700 border border-gray-600 rounded-lg px-2 py-1 text-white ${(!isEditing || roomShape === 'square') ? 'opacity-70 cursor-not-allowed' : ''}`}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-xs mb-1">Height</label>
                        <input
                          type="number"
                          value={roomDimensions.height}
                          onChange={(e) => setRoomDimensions({
                            ...roomDimensions,
                            height: parseFloat(e.target.value) || 0
                          })}
                          disabled={!isEditing}
                          min="1"
                          max="20"
                          className={`w-full bg-gray-700 border border-gray-600 rounded-lg px-2 py-1 text-white ${!isEditing ? 'opacity-70 cursor-not-allowed' : ''}`}
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Display room area */}
                {room && (
                  <div className="mt-2 text-sm text-gray-400">
                    Area: {calculateRoomArea(room).toFixed(1)} sq ft
                  </div>
                )}
              </div>
            </div>

            {/* Color scheme preview */}
            {room && (
              <div className="mt-4">
                <h3 className="text-sm text-gray-300 mb-2">Color Scheme Preview</h3>
                <div className="flex space-x-3">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-8 h-8 rounded-full border border-gray-600"
                      style={{ backgroundColor: room.colors.walls }}
                    ></div>
                    <span className="text-xs text-gray-400 mt-1">Walls</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-8 h-8 rounded-full border border-gray-600"
                      style={{ backgroundColor: room.colors.floor }}
                    ></div>
                    <span className="text-xs text-gray-400 mt-1">Floor</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-8 h-8 rounded-full border border-gray-600"
                      style={{ backgroundColor: room.colors.accent }}
                    ></div>
                    <span className="text-xs text-gray-400 mt-1">Accent</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-8 h-8 rounded-full border border-gray-600"
                      style={{ backgroundColor: room.colors.trim }}
                    ></div>
                    <span className="text-xs text-gray-400 mt-1">Trim</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Room Visualization */}
          {room && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Visualization Area */}
              <div className="lg:col-span-3">
                {/* View Controls */}
                <div className="bg-gray-800 rounded-lg p-4 mb-4 flex flex-wrap justify-between items-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setViewMode('2d')}
                      className={`px-3 py-1 rounded ${viewMode === '2d' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                    >
                      2D View
                    </button>
                    <button
                      onClick={() => {
                        if (!webGLFailed) {
                          setViewMode('3d');
                        }
                      }}
                      className={`px-3 py-1 rounded ${viewMode === '3d' ? 'bg-blue-600' : webGLFailed ? 'bg-gray-500 cursor-not-allowed opacity-50' : 'bg-gray-700 hover:bg-gray-600'}`}
                      disabled={webGLFailed}
                      title={webGLFailed ? '3D view is not available on your device' : '3D View'}
                    >
                      3D View {webGLFailed && '(Not Available)'}
                    </button>
                  </div>

                  {viewMode === '2d' && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">Scale:</span>
                      <select
                        value={scale}
                        onChange={(e) => setScale(parseInt(e.target.value))}
                        className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
                      >
                        <option value="10">1:10</option>
                        <option value="15">1:15</option>
                        <option value="20">1:20</option>
                        <option value="25">1:25</option>
                        <option value="30">1:30</option>
                      </select>
                    </div>
                  )}

                  {viewMode === '3d' && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">Transform:</span>
                      <select
                        value={transformMode}
                        onChange={(e) => setTransformMode(e.target.value)}
                        className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
                      >
                        <option value="translate">Move</option>
                        <option value="rotate">Rotate</option>
                        <option value="scale">Scale</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Visualization */}
                <div className="bg-gray-800 rounded-lg p-4 mb-4" style={{ height: '500px' }}>
                  {viewMode === '2d' ? (
                    <RoomVisualizer2D
                      room={room}
                      selectedFurniture={selectedFurniture}
                      onSelectFurniture={setSelectedFurniture}
                      onMoveFurniture={handleMoveFurniture}
                      scale={scale}
                    />
                  ) : (
                    <>
                      <RoomVisualizer3D
                        room={room}
                        selectedFurniture={selectedFurniture}
                        onSelectFurniture={setSelectedFurniture}
                        onMoveFurniture={handleMoveFurniture}
                        onRotateFurniture={handleRotateFurniture}
                        transformMode={transformMode}
                        onWebGLError={() => {
                          setWebGLFailed(true);
                          setViewMode('2d');
                        }}
                      />
                      {webGLFailed && viewMode === '3d' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-90 z-10">
                        <div className="bg-gray-900 p-6 rounded-lg max-w-md text-center">
                          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <h3 className="text-xl font-bold text-white mb-2">3D Rendering Not Available</h3>
                          <p className="text-gray-300 mb-4">Your browser or device doesn't support the required 3D features.</p>
                          <button
                            onClick={() => setViewMode('2d')}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                          >
                            Switch to 2D View
                          </button>
                        </div>
                      </div>
                    )}
                    </>
                  )}
                </div>
              </div>

              {/* Furniture Panel */}
              <div className="lg:col-span-1">
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Furniture</h2>
                    <button
                      onClick={() => setShowFurnitureCatalog(!showFurnitureCatalog)}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition-colors text-sm"
                    >
                      {showFurnitureCatalog ? 'Hide Catalog' : 'Add Furniture'}
                    </button>
                  </div>

                  {/* Furniture Catalog */}
                  {showFurnitureCatalog && (
                    <div className="mb-4">
                      <h3 className="text-sm text-gray-300 mb-2">Furniture Catalog</h3>
                      <div className="max-h-60 overflow-y-auto pr-2">
                        {getFurnitureCatalog().map(item => (
                          <div
                            key={item.id}
                            className="bg-gray-700 rounded-lg p-2 mb-2 cursor-pointer hover:bg-gray-600 transition-colors"
                            onClick={() => handleAddFurniture(item)}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-xs text-gray-400">{item.type}</p>
                              </div>
                              <button className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded">
                                Add
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Selected Furniture Details */}
                  {selectedFurniture && (
                    <div>
                      <h3 className="text-sm text-gray-300 mb-2">Selected Furniture</h3>
                      <div className="bg-gray-700 rounded-lg p-3 mb-4">
                        <h4 className="font-medium mb-1">
                          {getSelectedFurnitureObject()?.name || 'Furniture'}
                        </h4>
                        <p className="text-xs text-gray-400 mb-2">
                          {getSelectedFurnitureObject()?.type || 'Unknown type'}
                        </p>

                        {/* Color selection */}
                        <div className="mb-3">
                          <label className="block text-xs text-gray-400 mb-1">Color</label>
                          <div className="flex flex-wrap gap-1">
                            {['#A0522D', '#5D4037', '#D7CCC8', '#212121', '#1A237E', '#1B5E20', '#880E4F', '#616161'].map(color => (
                              <button
                                key={color}
                                className={`w-6 h-6 rounded-full ${getSelectedFurnitureObject()?.color === color ? 'ring-2 ring-white' : ''}`}
                                style={{ backgroundColor: color }}
                                onClick={() => handleChangeFurnitureColor(selectedFurniture, color)}
                              ></button>
                            ))}
                          </div>
                        </div>

                        {/* Rotation controls */}
                        <div className="mb-3">
                          <label className="block text-xs text-gray-400 mb-1">Rotation</label>

                          {/* Y-axis rotation (horizontal) */}
                          <div className="mb-2">
                            <label className="block text-xs text-gray-400 mb-1">Y-axis (Horizontal)</label>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleRotateFurniture(selectedFurniture, -45)}
                                className="bg-gray-600 hover:bg-gray-500 px-2 py-1 rounded text-xs"
                              >
                                -45°
                              </button>
                              <button
                                onClick={() => handleRotateFurniture(selectedFurniture, -90)}
                                className="bg-gray-600 hover:bg-gray-500 px-2 py-1 rounded text-xs"
                              >
                                -90°
                              </button>
                              <button
                                onClick={() => handleRotateFurniture(selectedFurniture, 90)}
                                className="bg-gray-600 hover:bg-gray-500 px-2 py-1 rounded text-xs"
                              >
                                +90°
                              </button>
                              <button
                                onClick={() => handleRotateFurniture(selectedFurniture, 45)}
                                className="bg-gray-600 hover:bg-gray-500 px-2 py-1 rounded text-xs"
                              >
                                +45°
                              </button>
                            </div>
                          </div>

                          {/* X-axis rotation (vertical) */}
                          <div className="mb-2">
                            <label className="block text-xs text-gray-400 mb-1">X-axis (Vertical)</label>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleRotateFurniture(selectedFurniture, { rotationX: -30 })}
                                className="bg-gray-600 hover:bg-gray-500 px-2 py-1 rounded text-xs"
                              >
                                -30°
                              </button>
                              <button
                                onClick={() => handleRotateFurniture(selectedFurniture, { rotationX: -15 })}
                                className="bg-gray-600 hover:bg-gray-500 px-2 py-1 rounded text-xs"
                              >
                                -15°
                              </button>
                              <button
                                onClick={() => handleRotateFurniture(selectedFurniture, { rotationX: 15 })}
                                className="bg-gray-600 hover:bg-gray-500 px-2 py-1 rounded text-xs"
                              >
                                +15°
                              </button>
                              <button
                                onClick={() => handleRotateFurniture(selectedFurniture, { rotationX: 30 })}
                                className="bg-gray-600 hover:bg-gray-500 px-2 py-1 rounded text-xs"
                              >
                                +30°
                              </button>
                            </div>
                          </div>

                          {/* Reset rotation */}
                          <button
                            onClick={() => handleRotateFurniture(selectedFurniture, { rotation: 0, rotationX: 0, rotationZ: 0 })}
                            className="mt-2 bg-gray-600 hover:bg-gray-500 px-2 py-1 rounded text-xs w-full"
                          >
                            Reset Rotation
                          </button>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => handleRemoveFurniture(selectedFurniture)}
                          className="w-full bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition-colors text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Furniture List */}
                  <div>
                    <h3 className="text-sm text-gray-300 mb-2">Room Furniture</h3>
                    {room.furniture && room.furniture.length > 0 ? (
                      <div className="max-h-60 overflow-y-auto pr-2">
                        {room.furniture.map(item => (
                          <div
                            key={item.id}
                            className={`bg-gray-700 rounded-lg p-2 mb-2 cursor-pointer hover:bg-gray-600 transition-colors ${selectedFurniture === item.id ? 'ring-2 ring-blue-500' : ''}`}
                            onClick={() => setSelectedFurniture(item.id)}
                          >
                            <div className="flex items-center">
                              <div
                                className="w-4 h-4 rounded-full mr-2"
                                style={{ backgroundColor: item.color }}
                              ></div>
                              <div>
                                <h4 className="font-medium">{item.name || item.type}</h4>
                                <p className="text-xs text-gray-400">{item.type}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-400 text-sm">
                        No furniture added yet. Click "Add Furniture" to get started.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RoomPlannerPage;

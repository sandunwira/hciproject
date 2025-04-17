import React, { useState, useEffect } from 'react';

// Available colors for customization
const AVAILABLE_COLORS = [
  { name: 'Natural Wood', value: '#A0522D' },
  { name: 'Dark Walnut', value: '#5D4037' },
  { name: 'White Oak', value: '#D7CCC8' },
  { name: 'Black', value: '#212121' },
  { name: 'Navy Blue', value: '#1A237E' },
  { name: 'Forest Green', value: '#1B5E20' },
  { name: 'Burgundy', value: '#880E4F' },
  { name: 'Gray', value: '#616161' }
];

// Available materials for customization
const AVAILABLE_MATERIALS = [
  { name: 'Wood', value: 'wood', roughness: 0.7, metalness: 0.0 },
  { name: 'Fabric', value: 'fabric', roughness: 0.9, metalness: 0.0 },
  { name: 'Leather', value: 'leather', roughness: 0.5, metalness: 0.1 },
  { name: 'Metal', value: 'metal', roughness: 0.2, metalness: 0.8 },
  { name: 'Glass', value: 'glass', roughness: 0.1, metalness: 0.2 }
];

// Function to get image path based on furniture type
const getFurnitureImage = (type) => {
  switch (type) {
    case 'chair':
      return '/furniture-images/chair-detailed.svg';
    case 'table':
      return '/furniture-images/table-detailed.svg';
    case 'cabinet':
    case 'shelf':
    case 'storage':
      return '/furniture-images/cabinet-detailed.svg';
    default:
      return '/furniture-images/furniture-large.svg';
  }
};

function SimpleFullPageCustomizer({ item, onSave, onCancel }) {
  const [selectedColor, setSelectedColor] = useState(AVAILABLE_COLORS[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(AVAILABLE_MATERIALS[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle rotation animation
  useEffect(() => {
    let rotationInterval;

    if (isRotating) {
      rotationInterval = setInterval(() => {
        setRotation(prev => (prev + 5) % 360);
      }, 100);
    }

    return () => {
      if (rotationInterval) clearInterval(rotationInterval);
    };
  }, [isRotating]);

  // Function to handle saving the design
  const handleSaveDesign = () => {
    const design = {
      ...item,
      color: selectedColor,
      material: selectedMaterial,
      timestamp: new Date().toISOString()
    };

    onSave(design);
  };

  // Get the appropriate image for the furniture type
  const imagePath = getFurnitureImage(item.type);

  // Debug log to check image path - only log once during initial render
  useEffect(() => {
    console.log('Loading furniture image:', imagePath, 'for type:', item.type);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0A1628]">
      {/* 3D Model Viewer (takes up most of the screen) */}
      <div className="w-full md:w-3/4 h-1/2 md:h-full relative">
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-70">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-xl text-gray-300">Loading...</p>
            </div>
          </div>
        )}

        {/* Image error notification */}
        {imageError && (
          <div className="absolute top-4 left-4 right-4 bg-red-800 text-white p-4 rounded-lg z-20">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Unable to load furniture image. Using fallback image instead.</span>
            </div>
          </div>
        )}

        {/* Simplified furniture display with color applied */}
        <div className="w-full h-full flex items-center justify-center bg-gray-800">
          <div
            className="relative w-3/4 h-3/4 flex items-center justify-center transition-all duration-500"
            style={{ transform: `rotate3d(0, 1, 0, ${rotation}deg)` }}
          >
            {/* Direct image rendering with SVG */}
            <img
              src={imagePath}
              alt={`${item.name} visualization`}
              className="w-full h-full object-contain transition-all duration-300"
              style={{
                filter: `brightness(0.9) sepia(0.2) hue-rotate(${selectedColor.value === '#A0522D' ? '0deg' :
                  selectedColor.value === '#5D4037' ? '0deg' :
                  selectedColor.value === '#D7CCC8' ? '180deg' :
                  selectedColor.value === '#212121' ? '0deg' :
                  selectedColor.value === '#1A237E' ? '240deg' :
                  selectedColor.value === '#1B5E20' ? '120deg' :
                  selectedColor.value === '#880E4F' ? '330deg' :
                  selectedColor.value === '#616161' ? '0deg' : '0deg'})`,
                backgroundColor: selectedMaterial.value === 'glass' ? 'transparent' : selectedColor.value,
                opacity: selectedMaterial.value === 'glass' ? 0.7 : 1,
                boxShadow: selectedMaterial.value === 'metal' ? '0 0 20px rgba(255,255,255,0.3)' : 'none',
                mixBlendMode: selectedMaterial.value === 'metal' ? 'hard-light' : 'normal'
              }}
              onError={(e) => {
                console.error('Error loading image:', e);
                e.target.src = '/fallback-furniture.svg'; // Fallback image
                setImageError(true);
              }}
            />

            {/* Material effect overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: selectedMaterial.value === 'wood' ? 'url(/textures/wood-grain.svg)' :
                                 selectedMaterial.value === 'fabric' ? 'url(/textures/fabric.svg)' :
                                 selectedMaterial.value === 'leather' ? 'url(/textures/leather.svg)' : 'none',
                backgroundSize: 'cover',
                backgroundBlendMode: selectedMaterial.value === 'metal' ? 'hard-light' : 'overlay',
                opacity: selectedMaterial.value === 'wood' ? 0.4 :
                         selectedMaterial.value === 'fabric' ? 0.5 :
                         selectedMaterial.value === 'leather' ? 0.4 :
                         selectedMaterial.value === 'metal' ? 0.6 : 0.1,
                borderRadius: '4px',
                border: selectedMaterial.value === 'glass' ? '2px solid rgba(255,255,255,0.3)' : 'none',
                backdropFilter: selectedMaterial.value === 'glass' ? 'blur(2px)' : 'none'
              }}
            ></div>
          </div>
        </div>

        {/* Camera controls */}
        <div className="absolute bottom-4 left-4 flex space-x-2">
          <button
            onClick={() => setRotation(0)}
            className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg"
            title="Front view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => setRotation(90)}
            className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg"
            title="Side view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => setRotation(180)}
            className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg"
            title="Back view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`${isRotating ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'} text-white p-2 rounded-lg`}
            title={isRotating ? "Stop rotation" : "Start rotation"}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Customization Panel (sidebar) */}
      <div className="w-full md:w-1/4 h-1/2 md:h-full bg-gray-900 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{item.name}</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-400">{item.description}</p>
          <p className="text-blue-400 font-medium text-xl mt-2">${item.price}</p>
        </div>

        {/* Color Selection */}
        <div className="mb-6">
          <h3 className="text-white text-lg font-medium mb-3">Color</h3>
          <div className="grid grid-cols-4 gap-3">
            {AVAILABLE_COLORS.map((color) => (
              <button
                key={color.value}
                className={`w-12 h-12 rounded-lg border-2 ${selectedColor.value === color.value ? 'border-white' : 'border-transparent'} transition-all hover:scale-105`}
                style={{ backgroundColor: color.value }}
                title={color.name}
                onClick={() => setSelectedColor(color)}
              ></button>
            ))}
          </div>
          <p className="text-gray-400 mt-2">Selected: {selectedColor.name}</p>
        </div>

        {/* Material Selection */}
        <div className="mb-6">
          <h3 className="text-white text-lg font-medium mb-3">Material</h3>
          <select
            value={selectedMaterial.value}
            onChange={(e) => setSelectedMaterial(AVAILABLE_MATERIALS.find(m => m.value === e.target.value))}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {AVAILABLE_MATERIALS.map((material) => (
              <option key={material.value} value={material.value}>
                {material.name}
              </option>
            ))}
          </select>
          <p className="text-gray-400 mt-2">
            {selectedMaterial.name} -
            {selectedMaterial.value === 'wood' && ' Natural grain with matte finish'}
            {selectedMaterial.value === 'fabric' && ' Soft texture with high durability'}
            {selectedMaterial.value === 'leather' && ' Premium feel with slight sheen'}
            {selectedMaterial.value === 'metal' && ' Sleek with reflective properties'}
            {selectedMaterial.value === 'glass' && ' Transparent with subtle reflections'}
          </p>
        </div>

        {/* Dimensions (for future implementation) */}
        <div className="mb-8">
          <h3 className="text-white text-lg font-medium mb-3">Dimensions</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-400 mb-1">Width</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="50"
                  max="150"
                  value="100"
                  className="w-full"
                  disabled
                />
                <span className="text-gray-400 ml-2">100%</span>
              </div>
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Height</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="50"
                  max="150"
                  value="100"
                  className="w-full"
                  disabled
                />
                <span className="text-gray-400 ml-2">100%</span>
              </div>
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Depth</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="50"
                  max="150"
                  value="100"
                  className="w-full"
                  disabled
                />
                <span className="text-gray-400 ml-2">100%</span>
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-2">Dimension customization coming soon</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={handleSaveDesign}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Save Design
          </button>
          <button
            onClick={onCancel}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SimpleFullPageCustomizer;

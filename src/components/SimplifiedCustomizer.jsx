import React, { useState, useEffect } from 'react';
import { 
  AVAILABLE_COLORS, 
  AVAILABLE_MATERIALS
} from '../data/threeDFurnitureParts';

// Simplified customizer that doesn't use WebGL
function SimplifiedCustomizer({ item, onSave, onCancel }) {
  const [selectedColor, setSelectedColor] = useState(AVAILABLE_COLORS[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(AVAILABLE_MATERIALS[0]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
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
  
  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0A1628]">
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-70">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-300">Loading...</p>
          </div>
        </div>
      )}
      
      {/* Furniture display (takes up most of the screen) */}
      <div className="w-full md:w-3/4 h-1/2 md:h-full relative">
        <div className="w-full h-full flex items-center justify-center bg-gray-800">
          <div className="relative w-3/4 h-3/4 flex items-center justify-center">
            <img 
              src={getFurnitureImage(item.type)} 
              alt={`${item.name} visualization`}
              className="w-full h-full object-contain transition-all duration-300"
              style={{ 
                filter: `brightness(0.9) sepia(0.2) hue-rotate(${
                  selectedColor.value === '#A0522D' ? '0deg' : 
                  selectedColor.value === '#5D4037' ? '0deg' : 
                  selectedColor.value === '#D7CCC8' ? '180deg' : 
                  selectedColor.value === '#212121' ? '0deg' : 
                  selectedColor.value === '#1A237E' ? '240deg' : 
                  selectedColor.value === '#1B5E20' ? '120deg' : 
                  selectedColor.value === '#880E4F' ? '330deg' : 
                  selectedColor.value === '#616161' ? '0deg' : '0deg'
                })`,
                backgroundColor: selectedMaterial.value === 'glass' ? 'transparent' : selectedColor.value,
                opacity: selectedMaterial.value === 'glass' ? 0.7 : 1,
                mixBlendMode: selectedMaterial.value === 'metal' ? 'hard-light' : 'normal'
              }}
            />
          </div>
        </div>
        
        <div className="absolute top-4 left-4 right-4 bg-yellow-800 bg-opacity-80 text-white p-3 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>3D editing is not available. Using simplified mode instead.</span>
          </div>
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
                className={`w-12 h-12 rounded-lg border-2 ${
                  selectedColor.value === color.value ? 'border-white' : 'border-transparent'
                } transition-all hover:scale-105`}
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
        
        {/* Note about 3D editing */}
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-white text-lg font-medium mb-2">3D Editing Unavailable</h3>
          <p className="text-gray-400">
            Your browser or device doesn't support advanced 3D editing. You can still customize colors and materials.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col space-y-3 mt-8">
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

export default SimplifiedCustomizer;

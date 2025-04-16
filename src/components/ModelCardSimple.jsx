import React, { useState } from 'react';

// Function to get image path based on furniture type
const getImagePath = (type) => {
  switch (type) {
    case 'chair':
      return '/furniture-images/chair.svg';
    case 'table':
      return '/furniture-images/table.svg';
    case 'cabinet':
    case 'shelf':
    case 'storage':
      return '/furniture-images/cabinet.svg';
    default:
      return '/furniture-images/furniture.svg';
  }
};

function ModelCardSimple({ type, name, description, price, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  // Fallback images for each furniture type
  const imagePath = getImagePath(type);

  return (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Viewer */}
      <div className="h-48 bg-gray-700 relative">
        {/* Furniture image */}
        <div className="w-full h-full flex items-center justify-center bg-gray-700">
          <img
            src={imagePath}
            alt={name}
            className="w-full h-full object-contain p-4"
          />
        </div>

        {/* Quick view button that appears on hover */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              onClick={() => onClick && onClick()}
            >
              View 3D Model
            </button>
          </div>
        )}
      </div>

      {/* Model Information */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
        <p className="text-gray-400 text-sm mb-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-400 font-medium">${price}</span>
          <button className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded transition-colors">
            Add to Design
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModelCardSimple;

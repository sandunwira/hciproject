import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';

// Import our model viewers
import AdvancedChairViewer from './AdvancedChairModel';
import TableViewer from './TableModel';
import CabinetViewer from './CabinetModel';

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

function CustomizableModelCard({ type, name, description, price, onSaveDesign }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [selectedColor, setSelectedColor] = useState(AVAILABLE_COLORS[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(AVAILABLE_MATERIALS[0]);
  const cardRef = useRef(null);
  
  // Use Intersection Observer to only render 3D models when they're visible in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: '0px',
        threshold: 0.1 // Trigger when at least 10% of the element is visible
      }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  // Function to determine which 3D model to render based on type
  const renderModel = () => {
    // Pass customization props to the model components
    const customizationProps = {
      color: selectedColor.value,
      material: selectedMaterial,
      isCustomizing: isCustomizing
    };
    
    switch (type) {
      case 'chair':
        return <AdvancedChairViewer {...customizationProps} />;
      case 'table':
        return <TableViewer {...customizationProps} />;
      case 'cabinet':
      case 'shelf':
      case 'storage':
        return <CabinetViewer {...customizationProps} />;
      default:
        return <AdvancedChairViewer {...customizationProps} />;
    }
  };

  // Function to get fallback image path based on furniture type
  const getFallbackImage = () => {
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
  
  // Function to handle saving the design
  const handleSaveDesign = () => {
    const design = {
      type,
      name,
      color: selectedColor,
      material: selectedMaterial,
      timestamp: new Date().toISOString()
    };
    
    onSaveDesign(design);
    setIsCustomizing(false);
  };

  return (
    <div 
      ref={cardRef}
      className="bg-gray-800 rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Model Viewer */}
      <div className="h-48 bg-gray-700 relative">
        {isVisible ? (
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src={getFallbackImage()} 
                alt={name} 
                className="w-full h-full object-contain p-4" 
              />
            </div>
          }>
            <Canvas 
              shadows 
              dpr={[1, 1.5]} // Reduced DPR for better performance
              gl={{ 
                powerPreference: "low-power", 
                antialias: false, // Disable antialiasing for performance
                depth: false // Disable depth buffer for performance
              }}
              frameloop={isHovered || isCustomizing ? "always" : "demand"} // Only animate when hovered or customizing
            >
              <ambientLight intensity={0.7} />
              <spotLight position={[5, 8, 5]} angle={0.15} penumbra={1} intensity={1} castShadow={false} />
              <PerspectiveCamera makeDefault position={[0, 0.5, 3]} fov={40} />
              
              {/* Position adjusted to center the model */}
              <group position={[0, -0.7, 0]} rotation={[0, isHovered && !isCustomizing ? Math.PI * 2 : 0, 0]}>
                {renderModel()}
              </group>
              
              <OrbitControls
                enablePan={isCustomizing}
                enableZoom={isCustomizing}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2.5}
                autoRotate={isHovered && !isCustomizing}
                autoRotateSpeed={1.5}
                target={[0, 0, 0]}
              />
              <Environment preset="sunset" />
            </Canvas>
          </Suspense>
        ) : (
          // Show static image when not in viewport
          <div className="w-full h-full flex items-center justify-center">
            <img 
              src={getFallbackImage()} 
              alt={name} 
              className="w-full h-full object-contain p-4" 
            />
          </div>
        )}
        
        {/* Action buttons that appear on hover */}
        {isHovered && !isCustomizing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300">
            <div className="flex space-x-2">
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                onClick={() => setIsCustomizing(true)}
              >
                Customize
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Customization Panel */}
      {isCustomizing && (
        <div className="p-4 bg-gray-900 border-t border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-white font-medium">Customize {name}</h4>
            <button 
              onClick={() => setIsCustomizing(false)}
              className="text-gray-400 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Color Selection */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2">Color</label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_COLORS.map((color) => (
                <button
                  key={color.value}
                  className={`w-6 h-6 rounded-full border ${selectedColor.value === color.value ? 'border-white' : 'border-transparent'}`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                  onClick={() => setSelectedColor(color)}
                ></button>
              ))}
            </div>
          </div>
          
          {/* Material Selection */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2">Material</label>
            <select
              value={selectedMaterial.value}
              onChange={(e) => setSelectedMaterial(AVAILABLE_MATERIALS.find(m => m.value === e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {AVAILABLE_MATERIALS.map((material) => (
                <option key={material.value} value={material.value}>
                  {material.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Save Button */}
          <button
            onClick={handleSaveDesign}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Save Design
          </button>
        </div>
      )}
      
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

export default CustomizableModelCard;

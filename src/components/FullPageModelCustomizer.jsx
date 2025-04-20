import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Stats } from '@react-three/drei';

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

function FullPageModelCustomizer({ item, onSave, onCancel }) {
  const [selectedColor, setSelectedColor] = useState(AVAILABLE_COLORS[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(AVAILABLE_MATERIALS[0]);
  const [showStats, setShowStats] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [cameraPosition, setCameraPosition] = useState([0, 1, 4]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Function to determine which 3D model to render based on type
  const renderModel = () => {
    // Pass customization props to the model components
    const customizationProps = {
      color: selectedColor.value,
      material: selectedMaterial,
      isCustomizing: true
    };
    
    switch (item.type) {
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
  
  // Handle camera position changes
  const handleCameraChange = (position) => {
    setCameraPosition(position);
    setAutoRotate(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0A1628]">
      {/* 3D Model Viewer (takes up most of the screen) */}
      <div className="w-full md:w-3/4 h-1/2 md:h-full relative">
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-70">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-xl text-gray-300">Loading 3D Model...</p>
            </div>
          </div>
        )}
        
        <Suspense fallback={null}>
          <Canvas 
            shadows 
            dpr={[1, 2]}
            gl={{ 
              antialias: true,
              powerPreference: "high-performance"
            }}
            onCreated={() => setIsLoading(false)}
          >
            <ambientLight intensity={0.7} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <PerspectiveCamera makeDefault position={cameraPosition} fov={45} />
            
            {/* Position adjusted to center the model */}
            <group position={[0, -1, 0]} scale={1.5}>
              {renderModel()}
            </group>
            
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              minDistance={2}
              maxDistance={10}
              autoRotate={autoRotate}
              autoRotateSpeed={1}
              onChange={(e) => {
                if (e.target.object.position) {
                  const pos = e.target.object.position.toArray();
                  // Only update if significant change to avoid constant re-renders
                  if (Math.abs(pos[0] - cameraPosition[0]) > 0.1 ||
                      Math.abs(pos[1] - cameraPosition[1]) > 0.1 ||
                      Math.abs(pos[2] - cameraPosition[2]) > 0.1) {
                    setCameraPosition(pos);
                  }
                }
              }}
            />
            <Environment preset="sunset" />
            {showStats && <Stats />}
          </Canvas>
        </Suspense>
        
        {/* Camera controls */}
        <div className="absolute bottom-4 left-4 flex space-x-2">
          <button 
            onClick={() => handleCameraChange([0, 1, 4])}
            className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg"
            title="Front view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button 
            onClick={() => handleCameraChange([4, 1, 0])}
            className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg"
            title="Side view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button 
            onClick={() => handleCameraChange([0, 4, 0])}
            className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg"
            title="Top view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button 
            onClick={() => setAutoRotate(!autoRotate)}
            className={`${autoRotate ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'} text-white p-2 rounded-lg`}
            title={autoRotate ? "Stop rotation" : "Start rotation"}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button 
            onClick={() => setShowStats(!showStats)}
            className={`${showStats ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'} text-white p-2 rounded-lg`}
            title="Toggle performance stats"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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

export default FullPageModelCustomizer;

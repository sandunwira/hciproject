import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';

// Import our model viewers
import AdvancedChairViewer from './AdvancedChairModel';
import TableViewer from './TableModel';
import CabinetViewer from './CabinetModel';

function ModelViewerModal({ isOpen, onClose, item }) {
  if (!isOpen) return null;
  
  // Function to determine which 3D model to render based on type
  const renderModel = () => {
    switch (item.type) {
      case 'chair':
        return <AdvancedChairViewer />;
      case 'table':
        return <TableViewer />;
      case 'cabinet':
      case 'shelf':
      case 'storage':
        return <CabinetViewer />;
      default:
        return <AdvancedChairViewer />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
      <div className="bg-gray-800 rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gray-900 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">{item.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
          {/* 3D Model Viewer */}
          <div className="w-full md:w-2/3 h-64 md:h-auto bg-gray-700 relative">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            }>
              <Canvas shadows dpr={[1, 2]}>
                <ambientLight intensity={0.7} />
                <spotLight position={[5, 8, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <PerspectiveCamera makeDefault position={[0, 0.5, 3]} fov={40} />
                
                {/* Position adjusted to center the model */}
                <group position={[0, -0.7, 0]}>
                  {renderModel()}
                </group>
                
                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI / 1.5}
                  autoRotate={true}
                  autoRotateSpeed={1}
                  target={[0, 0, 0]}
                />
                <Environment preset="sunset" />
              </Canvas>
            </Suspense>
          </div>
          
          {/* Product Details */}
          <div className="w-full md:w-1/3 p-6 overflow-y-auto">
            <h3 className="text-2xl font-semibold text-white mb-2">{item.name}</h3>
            <p className="text-blue-400 text-xl font-medium mb-4">${item.price}</p>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-2">Description</h4>
              <p className="text-gray-300">{item.description}</p>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-2">Features</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>High-quality materials</li>
                <li>Ergonomic design</li>
                <li>Easy assembly</li>
                <li>Durable construction</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-2">Dimensions</h4>
              <div className="grid grid-cols-2 gap-2 text-gray-300">
                <div>Width: <span className="text-white">60 cm</span></div>
                <div>Height: <span className="text-white">80 cm</span></div>
                <div>Depth: <span className="text-white">45 cm</span></div>
                <div>Weight: <span className="text-white">12 kg</span></div>
              </div>
            </div>
            
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Add to Design
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModelViewerModal;

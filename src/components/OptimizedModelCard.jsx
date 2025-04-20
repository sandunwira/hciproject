import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';

// Import our model viewers
import AdvancedChairViewer from './AdvancedChairModel';
import TableViewer from './TableModel';
import CabinetViewer from './CabinetModel';

function OptimizedModelCard({ type, name, description, price, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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
    switch (type) {
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
              frameloop={isHovered ? "always" : "demand"} // Only animate when hovered
            >
              <ambientLight intensity={0.7} />
              <spotLight position={[5, 8, 5]} angle={0.15} penumbra={1} intensity={1} castShadow={false} />
              <PerspectiveCamera makeDefault position={[0, 0.5, 3]} fov={40} />

              {/* Position adjusted to center the model */}
              <group position={[0, -0.7, 0]} rotation={[0, isHovered ? Math.PI * 2 : 0, 0]}>
                {renderModel()}
              </group>

              <OrbitControls
                enablePan={false}
                enableZoom={false}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2.5}
                autoRotate={isHovered}
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
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300">
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                onClick={() => onClick && onClick()}
              >
                {onClick && typeof onClick === 'function' && onClick.toString().includes('navigateToCustomize') ? 'Customize' : 'Quick View'}
              </button>
            </div>
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

export default OptimizedModelCard;

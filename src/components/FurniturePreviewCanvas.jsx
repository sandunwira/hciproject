import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { FurniturePreview } from './FurnitureModels';

function FurniturePreviewCanvas({ furnitureType, color }) {
  let modelType = 'chair';
  
  // Map furniture type to model type
  switch(furnitureType) {
    case 'Dining Chair':
      modelType = 'chair';
      break;
    case 'Lounge Chair':
      modelType = 'lounge-chair';
      break;
    case 'Dining Table':
      modelType = 'dining-table';
      break;
    case 'Coffee Table':
      modelType = 'coffee-table';
      break;
    case 'Side Table':
      modelType = 'side-table';
      break;
    default:
      modelType = 'chair';
  }
  
  return (
    <Canvas shadows className="w-full h-full">
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        
        <PerspectiveCamera makeDefault position={[1.5, 1.5, 1.5]} />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI/4}
          maxPolarAngle={Math.PI/2}
        />
        
        <FurniturePreview type={modelType} color={color || "#8B4513"} />
        
        <Environment preset="apartment" />
        
        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial transparent opacity={0.2} />
        </mesh>
      </Suspense>
    </Canvas>
  );
}

export default FurniturePreviewCanvas;

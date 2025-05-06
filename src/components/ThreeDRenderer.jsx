import React, { useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera, Environment, Box } from '@react-three/drei';
import { FurniturePiece } from './FurnitureModels';

// Simple room component for the 3D view
function Room({ properties }) {
  const floorWidth = properties.width / 100;
  const floorLength = properties.length / 100;
  const wallHeight = properties.height / 100;
  
  return (
    <>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[floorWidth, floorLength]} />
        <meshStandardMaterial color={properties.floorColor} />
      </mesh>
      
      {/* Back Wall */}
      <mesh position={[0, wallHeight/2, -floorLength/2]} receiveShadow castShadow>
        <planeGeometry args={[floorWidth, wallHeight]} />
        <meshStandardMaterial color={properties.wallColor} />
      </mesh>
      
      {/* Left Wall */}
      <mesh position={[-floorWidth/2, wallHeight/2, 0]} rotation={[0, Math.PI/2, 0]} receiveShadow castShadow>
        <planeGeometry args={[floorLength, wallHeight]} />
        <meshStandardMaterial color={properties.wallColor} />
      </mesh>
    </>
  );
}

// Camera controller component
function CameraController() {
  const { camera, gl } = useThree();
  
  useEffect(() => {
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  return null;
}

// Main 3D renderer component
function ThreeDRenderer({ roomProperties, furniturePieces }) {
  return (
    <Canvas shadows className="w-full h-full">
      <CameraController />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      <Room properties={roomProperties} />
      
      {furniturePieces.map((piece) => (
        <FurniturePiece key={piece.id} piece={piece} />
      ))}
      
      <Environment preset="apartment" />
    </Canvas>
  );
}

export default ThreeDRenderer;

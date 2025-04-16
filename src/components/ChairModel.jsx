import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useGLTF } from '@react-three/drei';

// Simple chair model component
function Chair(props) {
  const group = useRef();
  
  // Rotate the chair slowly
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Chair seat */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.1, 0.8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Chair back */}
      <mesh position={[0, 1, -0.35]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 1.1, 0.1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Chair legs */}
      <mesh position={[0.35, 0.2, 0.35]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.4]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      
      <mesh position={[-0.35, 0.2, 0.35]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.4]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      
      <mesh position={[0.35, 0.2, -0.35]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.4]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      
      <mesh position={[-0.35, 0.2, -0.35]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.4]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
    </group>
  );
}

// Optional: If you have a GLB/GLTF model, you can use this component instead
function ChairModel({ url }) {
  const { scene } = useGLTF(url);
  const group = useRef();
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });
  
  return (
    <group ref={group}>
      <primitive object={scene} scale={1} position={[0, -1, 0]} />
    </group>
  );
}

// Main component that renders the 3D scene
export default function ChairViewer({ modelUrl }) {
  return (
    <div className="h-full w-full">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PerspectiveCamera makeDefault position={[0, 1, 3]} fov={50} />
        
        {modelUrl ? (
          <ChairModel url={modelUrl} />
        ) : (
          <Chair position={[0, -0.5, 0]} />
        )}
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2} 
        />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useGLTF } from '@react-three/drei';

// Table model component
function Table(props) {
  const group = useRef();

  // Rotate the table slowly
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Table top */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.08, 0.8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>

      {/* Table legs */}
      <mesh position={[0.5, 0.35, 0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.7]} />
        <meshStandardMaterial color="#5D4037" roughness={0.6} />
      </mesh>

      <mesh position={[-0.5, 0.35, 0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.7]} />
        <meshStandardMaterial color="#5D4037" roughness={0.6} />
      </mesh>

      <mesh position={[0.5, 0.35, -0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.7]} />
        <meshStandardMaterial color="#5D4037" roughness={0.6} />
      </mesh>

      <mesh position={[-0.5, 0.35, -0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.7]} />
        <meshStandardMaterial color="#5D4037" roughness={0.6} />
      </mesh>

      {/* Table drawer */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.12, 0.7]} />
        <meshStandardMaterial color="#6D4C41" roughness={0.8} />
      </mesh>

      {/* Drawer handle */}
      <mesh position={[0, 0.6, 0.36]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.02, 0.02]} />
        <meshStandardMaterial color="#D7CCC8" metalness={0.5} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Optional: If you have a GLB/GLTF model, you can use this component instead
function TableGLTFModel({ url }) {
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
export default function TableViewer({ modelUrl }) {
  return (
    <div className="h-full w-full">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1, 3.5], fov: 40 }}>
        <ambientLight intensity={0.7} />
        <spotLight position={[5, 8, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PerspectiveCamera makeDefault position={[0, 0.5, 3]} fov={40} />

        {/* Position adjusted to center the table */}
        <group position={[0, -0.7, 0]}>
          {modelUrl ? (
            <TableGLTFModel url={modelUrl} />
          ) : (
            <Table />
          )}
        </group>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
          autoRotate
          autoRotateSpeed={1.5}
          target={[0, 0, 0]}
        />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}

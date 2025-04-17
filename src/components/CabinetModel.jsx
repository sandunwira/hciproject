import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useGLTF } from '@react-three/drei';

// Cabinet model component
function Cabinet(props) {
  const group = useRef();

  // Rotate the cabinet slowly
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Cabinet main body */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 0.4]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>

      {/* Cabinet interior (slightly darker) */}
      <mesh position={[0, 0.5, 0.01]} castShadow receiveShadow>
        <boxGeometry args={[0.94, 0.94, 0.38]} />
        <meshStandardMaterial color="#6D4C41" roughness={0.8} />
      </mesh>

      {/* Shelves */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.94, 0.02, 0.38]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>

      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.94, 0.02, 0.38]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>

      {/* Cabinet doors */}
      <mesh position={[-0.25, 0.5, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.48, 0.98, 0.02]} />
        <meshStandardMaterial color="#A1887F" roughness={0.6} />
      </mesh>

      <mesh position={[0.25, 0.5, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.48, 0.98, 0.02]} />
        <meshStandardMaterial color="#A1887F" roughness={0.6} />
      </mesh>

      {/* Door handles */}
      <mesh position={[-0.45, 0.5, 0.22]} castShadow receiveShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.1]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#D7CCC8" metalness={0.5} roughness={0.2} />
      </mesh>

      <mesh position={[0.45, 0.5, 0.22]} castShadow receiveShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.1]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#D7CCC8" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Cabinet feet */}
      <mesh position={[0.4, 0.05, 0.15]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#5D4037" roughness={0.6} />
      </mesh>

      <mesh position={[-0.4, 0.05, 0.15]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#5D4037" roughness={0.6} />
      </mesh>

      <mesh position={[0.4, 0.05, -0.15]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#5D4037" roughness={0.6} />
      </mesh>

      <mesh position={[-0.4, 0.05, -0.15]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial color="#5D4037" roughness={0.6} />
      </mesh>
    </group>
  );
}

// Optional: If you have a GLB/GLTF model, you can use this component instead
function CabinetGLTFModel({ url }) {
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
export default function CabinetViewer({ modelUrl }) {
  // For standalone usage (like in the modal)
  if (typeof window !== 'undefined' && window.location.pathname.includes('/showcase')) {
    // In showcase page, just return the model without Canvas wrapper
    return modelUrl ? <CabinetGLTFModel url={modelUrl} /> : <Cabinet />;
  }

  // For other usages, return the full Canvas setup
  return (
    <div className="h-full w-full">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 1, 3.5], fov: 40 }}
        gl={{ powerPreference: "low-power" }}
      >
        <ambientLight intensity={0.7} />
        <spotLight position={[5, 8, 5]} angle={0.15} penumbra={1} intensity={1} castShadow={false} />
        <PerspectiveCamera makeDefault position={[0, 0.5, 3]} fov={40} />

        {/* Position adjusted to center the cabinet */}
        <group position={[0, -0.5, 0]}>
          {modelUrl ? (
            <CabinetGLTFModel url={modelUrl} />
          ) : (
            <Cabinet />
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

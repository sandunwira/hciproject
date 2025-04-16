import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useGLTF } from '@react-three/drei';

// This component would load an external GLB model if available
function ChairModel({ url }) {
  const [model, setModel] = useState(null);
  const group = useRef();

  useEffect(() => {
    // If we have a URL, try to load the model
    if (url) {
      try {
        const { scene } = useGLTF(url);
        setModel(scene);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    }
  }, [url]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  if (!model) {
    // Fallback to a more detailed procedural chair if no model is loaded
    return <ProceduralChair ref={group} />;
  }

  return (
    <group ref={group}>
      <primitive object={model} scale={1} position={[0, -1, 0]} />
    </group>
  );
}

// A more detailed procedural chair
const ProceduralChair = React.forwardRef((props, ref) => {
  return (
    <group ref={ref} {...props}>
      {/* Chair seat */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.08, 0.8]} />
        <meshStandardMaterial color="#A0522D" roughness={0.7} />
      </mesh>

      {/* Chair cushion */}
      <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.75, 0.05, 0.75]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>

      {/* Chair back - frame */}
      <mesh position={[0, 1, -0.35]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 1.1, 0.05]} />
        <meshStandardMaterial color="#A0522D" roughness={0.7} />
      </mesh>

      {/* Chair back - vertical slats */}
      {[-0.3, -0.15, 0, 0.15, 0.3].map((x, i) => (
        <mesh key={i} position={[x, 1, -0.35]} castShadow receiveShadow>
          <boxGeometry args={[0.05, 1, 0.02]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
      ))}

      {/* Chair armrests */}
      <mesh position={[0.4, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 0.05, 0.7]} />
        <meshStandardMaterial color="#A0522D" roughness={0.7} />
      </mesh>

      <mesh position={[-0.4, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 0.05, 0.7]} />
        <meshStandardMaterial color="#A0522D" roughness={0.7} />
      </mesh>

      {/* Armrest supports */}
      <mesh position={[0.4, 0.55, 0.3]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 0.3, 0.05]} />
        <meshStandardMaterial color="#A0522D" roughness={0.7} />
      </mesh>

      <mesh position={[-0.4, 0.55, 0.3]} castShadow receiveShadow>
        <boxGeometry args={[0.05, 0.3, 0.05]} />
        <meshStandardMaterial color="#A0522D" roughness={0.7} />
      </mesh>

      {/* Chair legs */}
      <mesh position={[0.35, 0.2, 0.35]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.4]} />
        <meshStandardMaterial color="#5D4037" roughness={0.6} />
      </mesh>

      <mesh position={[-0.35, 0.2, 0.35]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.4]} />
        <meshStandardMaterial color="#5D4037" roughness={0.6} />
      </mesh>

      <mesh position={[0.35, 0.2, -0.35]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.4]} />
        <meshStandardMaterial color="#5D4037" roughness={0.6} />
      </mesh>

      <mesh position={[-0.35, 0.2, -0.35]} castShadow receiveShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.4]} />
        <meshStandardMaterial color="#5D4037" roughness={0.6} />
      </mesh>
    </group>
  );
});

// Main component that renders the 3D scene
export default function AdvancedChairViewer({ modelUrl }) {
  return (
    <div className="h-full w-full">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 1, 3.5], fov: 40 }}>
        <ambientLight intensity={0.7} />
        <spotLight position={[5, 8, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <PerspectiveCamera makeDefault position={[0, 0.5, 3]} fov={40} />

        {/* Position adjusted to center the chair */}
        <group position={[0, -0.7, 0]}>
          <ChairModel url={modelUrl} />
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

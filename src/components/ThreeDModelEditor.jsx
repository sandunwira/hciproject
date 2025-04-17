import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, TransformControls, PerspectiveCamera, Environment, Html } from '@react-three/drei';

// Component for a 3D furniture part
const FurniturePart = ({ 
  id, 
  name, 
  position, 
  scale, 
  rotation,
  color, 
  material,
  isSelected,
  onSelect,
  transformMode,
  onTransformChange
}) => {
  const meshRef = useRef();
  const { camera } = useThree();
  
  // Apply material properties based on material type
  const getMaterialProps = () => {
    switch(material.value) {
      case 'wood':
        return { 
          roughness: 0.7, 
          metalness: 0.0,
          color: color
        };
      case 'fabric':
        return { 
          roughness: 0.9, 
          metalness: 0.0,
          color: color
        };
      case 'leather':
        return { 
          roughness: 0.5, 
          metalness: 0.1,
          color: color
        };
      case 'metal':
        return { 
          roughness: 0.2, 
          metalness: 0.8,
          color: color
        };
      case 'glass':
        return { 
          roughness: 0.1, 
          metalness: 0.2,
          color: color,
          transparent: true,
          opacity: 0.6
        };
      default:
        return { 
          roughness: 0.7, 
          metalness: 0.0,
          color: color
        };
    }
  };
  
  // Handle click to select this part
  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(id);
  };
  
  // Update position, rotation, scale when transform changes
  useEffect(() => {
    if (meshRef.current && isSelected) {
      meshRef.current.position.set(position[0], position[1], position[2]);
      meshRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);
      meshRef.current.scale.set(scale[0], scale[1], scale[2]);
    }
  }, [position, rotation, scale, isSelected]);
  
  return (
    <>
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={scale}
        onClick={handleClick}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial {...getMaterialProps()} />
        
        {isSelected && (
          <Html position={[0, 1.2, 0]} center distanceFactor={8}>
            <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {name}
            </div>
          </Html>
        )}
      </mesh>
      
      {isSelected && (
        <TransformControls
          object={meshRef}
          mode={transformMode}
          size={0.7}
          onObjectChange={(e) => {
            if (meshRef.current) {
              onTransformChange({
                position: [
                  meshRef.current.position.x,
                  meshRef.current.position.y,
                  meshRef.current.position.z
                ],
                rotation: [
                  meshRef.current.rotation.x,
                  meshRef.current.rotation.y,
                  meshRef.current.rotation.z
                ],
                scale: [
                  meshRef.current.scale.x,
                  meshRef.current.scale.y,
                  meshRef.current.scale.z
                ]
              });
            }
          }}
        />
      )}
    </>
  );
};

// Chair model with customizable 3D parts
const ChairModel = ({ parts, selectedPart, onSelectPart, transformMode, onTransformChange }) => {
  return (
    <group position={[0, 0, 0]}>
      {parts.map(part => (
        <FurniturePart
          key={part.id}
          id={part.id}
          name={part.name}
          position={part.position}
          rotation={part.rotation}
          scale={part.scale}
          color={part.color}
          material={part.material}
          isSelected={selectedPart === part.id}
          onSelect={onSelectPart}
          transformMode={transformMode}
          onTransformChange={(transforms) => onTransformChange(part.id, transforms)}
        />
      ))}
    </group>
  );
};

// Table model with customizable 3D parts
const TableModel = ({ parts, selectedPart, onSelectPart, transformMode, onTransformChange }) => {
  return (
    <group position={[0, 0, 0]}>
      {parts.map(part => (
        <FurniturePart
          key={part.id}
          id={part.id}
          name={part.name}
          position={part.position}
          rotation={part.rotation}
          scale={part.scale}
          color={part.color}
          material={part.material}
          isSelected={selectedPart === part.id}
          onSelect={onSelectPart}
          transformMode={transformMode}
          onTransformChange={(transforms) => onTransformChange(part.id, transforms)}
        />
      ))}
    </group>
  );
};

// Cabinet model with customizable 3D parts
const CabinetModel = ({ parts, selectedPart, onSelectPart, transformMode, onTransformChange }) => {
  return (
    <group position={[0, 0, 0]}>
      {parts.map(part => (
        <FurniturePart
          key={part.id}
          id={part.id}
          name={part.name}
          position={part.position}
          rotation={part.rotation}
          scale={part.scale}
          color={part.color}
          material={part.material}
          isSelected={selectedPart === part.id}
          onSelect={onSelectPart}
          transformMode={transformMode}
          onTransformChange={(transforms) => onTransformChange(part.id, transforms)}
        />
      ))}
    </group>
  );
};

// Scene setup with lighting and camera
const Scene = ({ 
  type, 
  parts, 
  selectedPart, 
  onSelectPart, 
  transformMode, 
  onTransformChange,
  onBackgroundClick
}) => {
  const { camera } = useThree();
  
  // Reset selection when clicking on background
  const handleBackgroundClick = (e) => {
    if (e.object.type === 'Scene') {
      onBackgroundClick();
    }
  };
  
  // Render the appropriate model based on type
  const renderModel = () => {
    switch(type) {
      case 'chair':
        return (
          <ChairModel 
            parts={parts} 
            selectedPart={selectedPart} 
            onSelectPart={onSelectPart} 
            transformMode={transformMode}
            onTransformChange={onTransformChange}
          />
        );
      case 'table':
        return (
          <TableModel 
            parts={parts} 
            selectedPart={selectedPart} 
            onSelectPart={onSelectPart}
            transformMode={transformMode}
            onTransformChange={onTransformChange}
          />
        );
      case 'cabinet':
      case 'shelf':
      case 'storage':
        return (
          <CabinetModel 
            parts={parts} 
            selectedPart={selectedPart} 
            onSelectPart={onSelectPart}
            transformMode={transformMode}
            onTransformChange={onTransformChange}
          />
        );
      default:
        return (
          <ChairModel 
            parts={parts} 
            selectedPart={selectedPart} 
            onSelectPart={onSelectPart}
            transformMode={transformMode}
            onTransformChange={onTransformChange}
          />
        );
    }
  };
  
  return (
    <>
      <color attach="background" args={['#1a202c']} />
      
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
      
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048} 
      />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      
      <group position={[0, 0, 0]} onClick={handleBackgroundClick}>
        {renderModel()}
      </group>
      
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
        minDistance={2}
        maxDistance={10}
      />
      
      <Environment preset="sunset" />
      
      {/* Ground plane for shadows */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
    </>
  );
};

// Main 3D model editor component
const ThreeDModelEditor = ({ 
  type, 
  initialParts, 
  selectedPart, 
  onSelectPart,
  transformMode,
  onTransformChange,
  onBackgroundClick
}) => {
  return (
    <div className="w-full h-full">
      <Canvas shadows gl={{ antialias: true }} dpr={[1, 2]}>
        <Scene 
          type={type} 
          parts={initialParts} 
          selectedPart={selectedPart} 
          onSelectPart={onSelectPart}
          transformMode={transformMode}
          onTransformChange={onTransformChange}
          onBackgroundClick={onBackgroundClick}
        />
      </Canvas>
    </div>
  );
};

export default ThreeDModelEditor;

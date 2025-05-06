import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// Simple furniture model components
export function DiningChair({ color, rotation = 0, scale = 1, ...props }) {
  return (
    <group scale={scale} rotation={[0, rotation * Math.PI / 180, 0]} {...props}>
      {/* Seat */}
      <mesh castShadow position={[0, 0.45, 0]}>
        <boxGeometry args={[0.4, 0.05, 0.4]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Back */}
      <mesh castShadow position={[0, 0.8, -0.2]}>
        <boxGeometry args={[0.4, 0.7, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Legs */}
      <mesh castShadow position={[0.15, 0.225, 0.15]}>
        <boxGeometry args={[0.05, 0.45, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow position={[-0.15, 0.225, 0.15]}>
        <boxGeometry args={[0.05, 0.45, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow position={[0.15, 0.225, -0.15]}>
        <boxGeometry args={[0.05, 0.45, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow position={[-0.15, 0.225, -0.15]}>
        <boxGeometry args={[0.05, 0.45, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

export function DiningTable({ color, rotation = 0, scale = 1, ...props }) {
  return (
    <group scale={scale} rotation={[0, rotation * Math.PI / 180, 0]} {...props}>
      {/* Table top */}
      <mesh castShadow position={[0, 0.75, 0]}>
        <boxGeometry args={[1.5, 0.05, 0.9]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Legs */}
      <mesh castShadow position={[0.65, 0.375, 0.35]}>
        <boxGeometry args={[0.08, 0.75, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow position={[-0.65, 0.375, 0.35]}>
        <boxGeometry args={[0.08, 0.75, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow position={[0.65, 0.375, -0.35]}>
        <boxGeometry args={[0.08, 0.75, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow position={[-0.65, 0.375, -0.35]}>
        <boxGeometry args={[0.08, 0.75, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

export function LoungeChair({ color, rotation = 0, scale = 1, ...props }) {
  return (
    <group scale={scale} rotation={[0, rotation * Math.PI / 180, 0]} {...props}>
      {/* Seat */}
      <mesh castShadow position={[0, 0.3, 0]}>
        <boxGeometry args={[0.8, 0.15, 0.7]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Back */}
      <mesh castShadow position={[0, 0.6, -0.3]}>
        <boxGeometry args={[0.8, 0.6, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Arms */}
      <mesh castShadow position={[0.4, 0.45, 0]}>
        <boxGeometry args={[0.08, 0.3, 0.7]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow position={[-0.4, 0.45, 0]}>
        <boxGeometry args={[0.08, 0.3, 0.7]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Legs */}
      <mesh castShadow position={[0.35, 0.15, 0.3]}>
        <boxGeometry args={[0.05, 0.3, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow position={[-0.35, 0.15, 0.3]}>
        <boxGeometry args={[0.05, 0.3, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow position={[0.35, 0.15, -0.3]}>
        <boxGeometry args={[0.05, 0.3, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow position={[-0.35, 0.15, -0.3]}>
        <boxGeometry args={[0.05, 0.3, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

export function CoffeeTable({ color, rotation = 0, scale = 1, ...props }) {
  return (
    <group scale={scale} rotation={[0, rotation * Math.PI / 180, 0]} {...props}>
      {/* Table top */}
      <mesh castShadow position={[0, 0.45, 0]}>
        <boxGeometry args={[1.1, 0.05, 0.6]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Shelf/bottom */}
      <mesh castShadow position={[0, 0.15, 0]}>
        <boxGeometry args={[0.9, 0.03, 0.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Legs */}
      <mesh castShadow position={[0.5, 0.225, 0.25]}>
        <boxGeometry args={[0.05, 0.45, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow position={[-0.5, 0.225, 0.25]}>
        <boxGeometry args={[0.05, 0.45, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow position={[0.5, 0.225, -0.25]}>
        <boxGeometry args={[0.05, 0.45, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow position={[-0.5, 0.225, -0.25]}>
        <boxGeometry args={[0.05, 0.45, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

export function SideTable({ color, rotation = 0, scale = 1, ...props }) {
  return (
    <group scale={scale} rotation={[0, rotation * Math.PI / 180, 0]} {...props}>
      {/* Table top */}
      <mesh castShadow position={[0, 0.6, 0]}>
        <boxGeometry args={[0.55, 0.05, 0.55]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Legs */}
      <mesh castShadow position={[0.2, 0.3, 0.2]}>
        <boxGeometry args={[0.04, 0.6, 0.04]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow position={[-0.2, 0.3, 0.2]}>
        <boxGeometry args={[0.04, 0.6, 0.04]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow position={[0.2, 0.3, -0.2]}>
        <boxGeometry args={[0.04, 0.6, 0.04]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow position={[-0.2, 0.3, -0.2]}>
        <boxGeometry args={[0.04, 0.6, 0.04]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

// A component to display a rotating furniture model for previews
export function FurniturePreview({ type, color }) {
  const groupRef = React.useRef();
  
  // Gentle rotation animation
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <group ref={groupRef}>
      {type === 'chair' && <DiningChair position={[0, 0, 0]} color={color} />}
      {type === 'lounge-chair' && <LoungeChair position={[0, 0, 0]} color={color} />}
      {type === 'dining-table' && <DiningTable position={[0, 0, 0]} color={color} />}
      {type === 'coffee-table' && <CoffeeTable position={[0, 0, 0]} color={color} />}
      {type === 'side-table' && <SideTable position={[0, 0, 0]} color={color} />}
    </group>
  );
}

// A component to render any furniture based on the piece data
export function FurniturePiece({ piece }) {
  // Scale values to reasonable 3D world units (meters)
  const xPos = (piece.x - 250) / 100; // Center the furniture
  const zPos = (piece.y - 350) / 100; // Center the furniture
  
  switch(piece.type) {
    case 'chair':
      return <DiningChair position={[xPos, 0, zPos]} rotation={piece.rotation} scale={piece.scale} color={piece.color} />;
    case 'lounge-chair':
      return <LoungeChair position={[xPos, 0, zPos]} rotation={piece.rotation} scale={piece.scale} color={piece.color} />;
    case 'dining-table':
    case 'table':
      return <DiningTable position={[xPos, 0, zPos]} rotation={piece.rotation} scale={piece.scale} color={piece.color} />;
    case 'coffee-table': 
      return <CoffeeTable position={[xPos, 0, zPos]} rotation={piece.rotation} scale={piece.scale} color={piece.color} />;
    case 'side-table':
      return <SideTable position={[xPos, 0, zPos]} rotation={piece.rotation} scale={piece.scale} color={piece.color} />;
    default:
      return <DiningTable position={[xPos, 0, zPos]} rotation={piece.rotation} scale={piece.scale} color={piece.color} />;
  }
}

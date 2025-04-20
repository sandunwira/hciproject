import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Html, TransformControls } from '@react-three/drei';
import * as THREE from 'three';
import WebGLContextManager, { checkWebGLSupport } from './WebGLContextManager';

// Component for a 3D room
const Room = ({ room, selectedFurniture, onSelectFurniture }) => {
  // Create geometry based on room shape
  const createRoomGeometry = () => {
    switch (room.shape) {
      case 'rectangular':
      case 'square': {
        const width = room.dimensions.width;
        const length = room.dimensions.length;
        const height = room.dimensions.height;

        return (
          <group>
            {/* Floor */}
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[width / 2, 0, length / 2]}
              receiveShadow
            >
              <planeGeometry args={[width, length]} />
              <meshStandardMaterial color={room.colors.floor} />
            </mesh>

            {/* Ceiling */}
            <mesh
              rotation={[Math.PI / 2, 0, 0]}
              position={[width / 2, height, length / 2]}
              receiveShadow
            >
              <planeGeometry args={[width, length]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>

            {/* Walls */}
            {/* Back wall */}
            <mesh
              position={[width / 2, height / 2, 0]}
              receiveShadow
            >
              <planeGeometry args={[width, height]} />
              <meshStandardMaterial color={room.colors.walls} />
            </mesh>

            {/* Front wall */}
            <mesh
              rotation={[0, Math.PI, 0]}
              position={[width / 2, height / 2, length]}
              receiveShadow
            >
              <planeGeometry args={[width, height]} />
              <meshStandardMaterial color={room.colors.walls} />
            </mesh>

            {/* Left wall */}
            <mesh
              rotation={[0, Math.PI / 2, 0]}
              position={[0, height / 2, length / 2]}
              receiveShadow
            >
              <planeGeometry args={[length, height]} />
              <meshStandardMaterial color={room.colors.walls} />
            </mesh>

            {/* Right wall */}
            <mesh
              rotation={[0, -Math.PI / 2, 0]}
              position={[width, height / 2, length / 2]}
              receiveShadow
            >
              <planeGeometry args={[length, height]} />
              <meshStandardMaterial color={room.colors.walls} />
            </mesh>

            {/* Trim */}
            <mesh position={[width / 2, 0.05, length / 2]}>
              <boxGeometry args={[width, 0.1, length]} />
              <meshStandardMaterial color={room.colors.trim} />
            </mesh>
          </group>
        );
      }

      case 'l-shaped': {
        const mainWidth = room.dimensions.mainWidth;
        const mainLength = room.dimensions.mainLength;
        const secondaryWidth = room.dimensions.secondaryWidth;
        const secondaryLength = room.dimensions.secondaryLength;
        const height = room.dimensions.height;

        // Create a custom shape for the L-shaped room
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(mainWidth, 0);
        shape.lineTo(mainWidth, mainLength);
        shape.lineTo(mainWidth - secondaryWidth, mainLength);
        shape.lineTo(mainWidth - secondaryWidth, mainLength - secondaryLength);
        shape.lineTo(0, mainLength - secondaryLength);
        shape.lineTo(0, 0);

        // Extrude the shape to create walls
        const extrudeSettings = {
          steps: 1,
          depth: height,
          bevelEnabled: false
        };

        return (
          <group>
            {/* Floor */}
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 0, 0]}
              receiveShadow
            >
              <shapeGeometry args={[shape]} />
              <meshStandardMaterial color={room.colors.floor} />
            </mesh>

            {/* Walls (simplified as a wireframe for L-shaped room) */}
            <mesh
              position={[0, height / 2, 0]}
              receiveShadow
            >
              <extrudeGeometry args={[shape, extrudeSettings]} />
              <meshStandardMaterial
                color={room.colors.walls}
                wireframe={true}
                opacity={0.5}
                transparent={true}
              />
            </mesh>
          </group>
        );
      }

      case 'irregular': {
        if (!room.dimensions.points || room.dimensions.points.length < 3) {
          return null;
        }

        const height = room.dimensions.height;

        // Create a custom shape for the irregular room
        const shape = new THREE.Shape();
        shape.moveTo(
          room.dimensions.points[0][0],
          room.dimensions.points[0][1]
        );

        for (let i = 1; i < room.dimensions.points.length; i++) {
          shape.lineTo(
            room.dimensions.points[i][0],
            room.dimensions.points[i][1]
          );
        }

        // Extrude the shape to create walls
        const extrudeSettings = {
          steps: 1,
          depth: height,
          bevelEnabled: false
        };

        return (
          <group>
            {/* Floor */}
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 0, 0]}
              receiveShadow
            >
              <shapeGeometry args={[shape]} />
              <meshStandardMaterial color={room.colors.floor} />
            </mesh>

            {/* Walls (simplified as a wireframe for irregular room) */}
            <mesh
              position={[0, height / 2, 0]}
              receiveShadow
            >
              <extrudeGeometry args={[shape, extrudeSettings]} />
              <meshStandardMaterial
                color={room.colors.walls}
                wireframe={true}
                opacity={0.5}
                transparent={true}
              />
            </mesh>
          </group>
        );
      }

      default:
        return null;
    }
  };

  return (
    <group>
      {createRoomGeometry()}

      {/* Render furniture */}
      {room.furniture && room.furniture.map(furniture => (
        <Furniture
          key={furniture.id}
          furniture={furniture}
          isSelected={selectedFurniture === furniture.id}
          onClick={() => onSelectFurniture(furniture.id)}
        />
      ))}
    </group>
  );
};

// Component for 3D furniture
const Furniture = ({ furniture, isSelected, onClick }) => {

  // Create geometry based on furniture type
  const createFurnitureGeometry = () => {
    const width = furniture.dimensions.width;
    const height = furniture.dimensions.height;
    const depth = furniture.dimensions.depth;

    switch (furniture.type) {
      case 'chair':
        return (
          <group
            position={[furniture.position.x, 0, furniture.position.y]}
            rotation={[
              (furniture.rotationX || 0) * Math.PI / 180,
              (furniture.rotation || 0) * Math.PI / 180,
              (furniture.rotationZ || 0) * Math.PI / 180
            ]}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            {/* Chair seat */}
            <mesh position={[0, height * 0.4, 0]} castShadow>
              <boxGeometry args={[width, height * 0.1, depth]} />
              <meshStandardMaterial color={furniture.color || '#A0522D'} />
            </mesh>

            {/* Chair back */}
            <mesh position={[0, height * 0.8, -depth * 0.4]} castShadow>
              <boxGeometry args={[width, height * 0.8, depth * 0.1]} />
              <meshStandardMaterial color={furniture.color || '#A0522D'} />
            </mesh>

            {/* Chair legs */}
            <mesh position={[width * 0.4, height * 0.2, depth * 0.4]} castShadow>
              <boxGeometry args={[width * 0.1, height * 0.4, depth * 0.1]} />
              <meshStandardMaterial color={furniture.color || '#8B4513'} />
            </mesh>

            <mesh position={[-width * 0.4, height * 0.2, depth * 0.4]} castShadow>
              <boxGeometry args={[width * 0.1, height * 0.4, depth * 0.1]} />
              <meshStandardMaterial color={furniture.color || '#8B4513'} />
            </mesh>

            <mesh position={[width * 0.4, height * 0.2, -depth * 0.4]} castShadow>
              <boxGeometry args={[width * 0.1, height * 0.4, depth * 0.1]} />
              <meshStandardMaterial color={furniture.color || '#8B4513'} />
            </mesh>

            <mesh position={[-width * 0.4, height * 0.2, -depth * 0.4]} castShadow>
              <boxGeometry args={[width * 0.1, height * 0.4, depth * 0.1]} />
              <meshStandardMaterial color={furniture.color || '#8B4513'} />
            </mesh>

            {/* Selection indicator */}
            {isSelected && (
              <Html position={[0, height + 0.2, 0]}>
                <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {furniture.name || 'Chair'}
                </div>
              </Html>
            )}
          </group>
        );

      case 'table':
        return (
          <group
            position={[furniture.position.x, 0, furniture.position.y]}
            rotation={[
              (furniture.rotationX || 0) * Math.PI / 180,
              (furniture.rotation || 0) * Math.PI / 180,
              (furniture.rotationZ || 0) * Math.PI / 180
            ]}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            {/* Table top */}
            <mesh position={[0, height * 0.9, 0]} castShadow>
              <boxGeometry args={[width, height * 0.1, depth]} />
              <meshStandardMaterial color={furniture.color || '#A0522D'} />
            </mesh>

            {/* Table legs */}
            <mesh position={[width * 0.4, height * 0.45, depth * 0.4]} castShadow>
              <boxGeometry args={[width * 0.1, height * 0.9, depth * 0.1]} />
              <meshStandardMaterial color={furniture.color || '#8B4513'} />
            </mesh>

            <mesh position={[-width * 0.4, height * 0.45, depth * 0.4]} castShadow>
              <boxGeometry args={[width * 0.1, height * 0.9, depth * 0.1]} />
              <meshStandardMaterial color={furniture.color || '#8B4513'} />
            </mesh>

            <mesh position={[width * 0.4, height * 0.45, -depth * 0.4]} castShadow>
              <boxGeometry args={[width * 0.1, height * 0.9, depth * 0.1]} />
              <meshStandardMaterial color={furniture.color || '#8B4513'} />
            </mesh>

            <mesh position={[-width * 0.4, height * 0.45, -depth * 0.4]} castShadow>
              <boxGeometry args={[width * 0.1, height * 0.9, depth * 0.1]} />
              <meshStandardMaterial color={furniture.color || '#8B4513'} />
            </mesh>

            {/* Selection indicator */}
            {isSelected && (
              <Html position={[0, height + 0.2, 0]}>
                <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {furniture.name || 'Table'}
                </div>
              </Html>
            )}
          </group>
        );

      case 'cabinet':
      case 'shelf':
      case 'storage':
        return (
          <group
            position={[furniture.position.x, 0, furniture.position.y]}
            rotation={[
              (furniture.rotationX || 0) * Math.PI / 180,
              (furniture.rotation || 0) * Math.PI / 180,
              (furniture.rotationZ || 0) * Math.PI / 180
            ]}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            {/* Cabinet body */}
            <mesh position={[0, height * 0.5, 0]} castShadow>
              <boxGeometry args={[width, height, depth]} />
              <meshStandardMaterial color={furniture.color || '#A0522D'} />
            </mesh>

            {/* Cabinet doors */}
            <mesh position={[0, height * 0.5, depth * 0.51]} castShadow>
              <boxGeometry args={[width * 0.9, height * 0.9, depth * 0.05]} />
              <meshStandardMaterial color={furniture.color ? lightenColor(furniture.color, 20) : '#B25D30'} />
            </mesh>

            {/* Cabinet handles */}
            <mesh position={[width * 0.2, height * 0.5, depth * 0.56]} castShadow>
              <boxGeometry args={[width * 0.05, height * 0.1, depth * 0.05]} />
              <meshStandardMaterial color="#D4A76A" metalness={0.8} roughness={0.2} />
            </mesh>

            <mesh position={[-width * 0.2, height * 0.5, depth * 0.56]} castShadow>
              <boxGeometry args={[width * 0.05, height * 0.1, depth * 0.05]} />
              <meshStandardMaterial color="#D4A76A" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Selection indicator */}
            {isSelected && (
              <Html position={[0, height + 0.2, 0]}>
                <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {furniture.name || 'Cabinet'}
                </div>
              </Html>
            )}
          </group>
        );

      default:
        return (
          <group
            position={[furniture.position.x, 0, furniture.position.y]}
            rotation={[
              (furniture.rotationX || 0) * Math.PI / 180,
              (furniture.rotation || 0) * Math.PI / 180,
              (furniture.rotationZ || 0) * Math.PI / 180
            ]}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <mesh position={[0, height * 0.5, 0]} castShadow>
              <boxGeometry args={[width, height, depth]} />
              <meshStandardMaterial color={furniture.color || '#A0522D'} />
            </mesh>

            {/* Selection indicator */}
            {isSelected && (
              <Html position={[0, height + 0.2, 0]}>
                <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {furniture.name || 'Furniture'}
                </div>
              </Html>
            )}
          </group>
        );
    }
  };

  return createFurnitureGeometry();
};

// Helper function to lighten a color
const lightenColor = (color, amount) => {
  // Convert hex to RGB
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, 7), 16);

  // Lighten
  r = Math.min(255, r + amount);
  g = Math.min(255, g + amount);
  b = Math.min(255, b + amount);

  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

// Scene setup with lighting and camera
const Scene = ({
  room,
  selectedFurniture,
  onSelectFurniture,
  onMoveFurniture,
  onRotateFurniture,
  onScaleFurniture,
  transformMode
}) => {
  const { camera } = useThree();

  // Calculate camera position based on room size
  useEffect(() => {
    if (!room) return;

    let maxDimension = 0;

    switch (room.shape) {
      case 'rectangular':
      case 'square':
        maxDimension = Math.max(room.dimensions.width, room.dimensions.length);
        camera.position.set(
          room.dimensions.width / 2,
          maxDimension * 0.7,
          room.dimensions.length * 1.5
        );
        break;

      case 'l-shaped':
        maxDimension = Math.max(room.dimensions.mainWidth, room.dimensions.mainLength);
        camera.position.set(
          room.dimensions.mainWidth / 2,
          maxDimension * 0.7,
          room.dimensions.mainLength * 1.5
        );
        break;

      case 'irregular':
        if (room.dimensions.points && room.dimensions.points.length > 0) {
          let maxX = 0;
          let maxY = 0;

          room.dimensions.points.forEach(point => {
            maxX = Math.max(maxX, point[0]);
            maxY = Math.max(maxY, point[1]);
          });

          maxDimension = Math.max(maxX, maxY);
          camera.position.set(maxX / 2, maxDimension * 0.7, maxY * 1.5);
        }
        break;

      default:
        camera.position.set(5, 5, 10);
        break;
    }

    camera.lookAt(new THREE.Vector3(
      room.shape === 'rectangular' || room.shape === 'square' ? room.dimensions.width / 2 : 0,
      0,
      room.shape === 'rectangular' || room.shape === 'square' ? room.dimensions.length / 2 : 0
    ));
  }, [room, camera]);

  // Get the selected furniture object
  const getSelectedFurnitureObject = () => {
    if (!selectedFurniture || !room || !room.furniture) return null;
    return room.furniture.find(f => f.id === selectedFurniture);
  };

  // Handle transform changes
  const handleTransformChange = (e) => {
    if (!selectedFurniture) return;

    const furniture = getSelectedFurnitureObject();
    if (!furniture) return;

    if (transformMode === 'translate') {
      // Get the new position from the transform controls
      const newPosition = {
        x: e.target.object.position.x,
        y: e.target.object.position.z // Note: y in 2D is z in 3D
      };

      // Update furniture position
      onMoveFurniture(selectedFurniture, newPosition);
    } else if (transformMode === 'rotate') {
      // Get rotation in degrees
      const rotationX = e.target.object.rotation.x * (180 / Math.PI);
      const rotationY = e.target.object.rotation.y * (180 / Math.PI);
      const rotationZ = e.target.object.rotation.z * (180 / Math.PI);

      // Update furniture rotation
      if (onRotateFurniture) {
        onRotateFurniture(selectedFurniture, {
          rotationX,
          rotation: rotationY, // Keep 'rotation' for Y-axis for backward compatibility
          rotationZ
        });
      }
    } else if (transformMode === 'scale') {
      // Get scale
      const scale = {
        x: e.target.object.scale.x,
        y: e.target.object.scale.y,
        z: e.target.object.scale.z
      };

      // Update furniture scale
      if (onScaleFurniture) {
        onScaleFurniture(selectedFurniture, scale);
      }
    }
  };

  return (
    <>
      <color attach="background" args={['#1a202c']} />

      <PerspectiveCamera makeDefault position={[5, 5, 10]} fov={50} />

      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />

      {/* Room and furniture */}
      <Room
        room={room}
        selectedFurniture={selectedFurniture}
        onSelectFurniture={onSelectFurniture}
      />

      {/* Transform controls for selected furniture */}
      {selectedFurniture && (
        <TransformControls
          mode={transformMode}
          object={getSelectedFurnitureObject()}
          onObjectChange={handleTransformChange}
        />
      )}

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={50}
      />

      <Environment preset="sunset" blur={0.5} />
    </>
  );
};

// Error boundary for Three.js errors
class ThreeJSErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Three.js error:', error, errorInfo);
    if (this.props.onError) {
      this.props.onError();
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

// Main 3D room visualizer component
const RoomVisualizer3D = ({
  room,
  selectedFurniture,
  onSelectFurniture,
  onMoveFurniture,
  onRotateFurniture,
  transformMode = 'translate', // 'translate', 'rotate', 'scale'
  onWebGLError
}) => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [webGLError, setWebGLError] = useState(false);

  // Handle WebGL errors
  const handleWebGLError = useCallback(() => {
    console.warn('WebGL error detected, switching to 2D view');
    setWebGLError(true);
    if (onWebGLError) {
      onWebGLError();
    }
  }, [onWebGLError]);

  // Check for WebGL support
  useEffect(() => {
    const isWebGLSupported = checkWebGLSupport();
    setHasWebGL(isWebGLSupported);

    if (!isWebGLSupported) {
      console.warn('WebGL not supported on this device');
    }
  }, []);

  // If WebGL is not supported or has errors, show fallback
  if (!hasWebGL || webGLError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-lg">
        <div className="bg-gray-900 p-6 rounded-lg max-w-md text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-xl font-bold text-white mb-2">3D Rendering Not Available</h3>
          <p className="text-gray-300 mb-4">Your browser or device doesn't support the required 3D features.</p>
          <p className="text-gray-400 text-sm">Try using the 2D view instead.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <ThreeJSErrorBoundary
        onError={handleWebGLError}
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-lg">
            <div className="bg-gray-900 p-6 rounded-lg max-w-md text-center">
              <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-xl font-bold text-white mb-2">3D Rendering Error</h3>
              <p className="text-gray-300 mb-4">There was an error rendering the 3D view.</p>
              <p className="text-gray-400 text-sm">Try using the 2D view instead.</p>
            </div>
          </div>
        }
      >
        <Canvas
          shadows
          gl={{
            antialias: false,
            alpha: false,
            powerPreference: 'low-power',
            failIfMajorPerformanceCaveat: false,
            preserveDrawingBuffer: true // Helps with some WebGL context issues
          }}
          dpr={[1, 1]} // Lower resolution for better performance
          frameloop="demand"
          performance={{ min: 0.1 }} // Allow even lower performance
          onCreated={({ gl }) => {
            // Disable depth buffer clearing to improve performance
            gl.autoClear = false;
          }}
        >
          <Suspense fallback={
            <Html center>
              <div className="text-white bg-gray-800 p-4 rounded-lg">
                Loading 3D View...
              </div>
            </Html>
          }>
            <Scene
              room={room}
              selectedFurniture={selectedFurniture}
              onSelectFurniture={onSelectFurniture}
              onMoveFurniture={onMoveFurniture}
              onRotateFurniture={onRotateFurniture || onMoveFurniture} // Use dedicated handler if available
              onScaleFurniture={onMoveFurniture} // Reuse onMoveFurniture for scaling
              transformMode={transformMode}
            />
            <WebGLContextManager onError={handleWebGLError} />
          </Suspense>
        </Canvas>
      </ThreeJSErrorBoundary>
    </div>
  );
};

export default RoomVisualizer3D;

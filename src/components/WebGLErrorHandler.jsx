import React, { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';

// Component to handle WebGL context loss and other errors
const WebGLErrorHandler = () => {
  const [hasError, setHasError] = useState(false);
  const { gl } = useThree();
  
  useEffect(() => {
    // Handle WebGL context loss
    const handleContextLost = (event) => {
      event.preventDefault();
      console.warn('WebGL context lost. Attempting to recover...');
      setHasError(true);
    };
    
    // Handle WebGL context restoration
    const handleContextRestored = () => {
      console.log('WebGL context restored.');
      setHasError(false);
    };
    
    // Add event listeners to the canvas
    const canvas = gl.domElement;
    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);
    
    // Clean up event listeners
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [gl]);
  
  // If there's an error, show a message in the 3D scene
  if (hasError) {
    return (
      <Html center>
        <div className="bg-red-800 text-white p-4 rounded-lg max-w-md text-center">
          <h3 className="text-xl font-bold mb-2">WebGL Error</h3>
          <p>The 3D renderer encountered an error. This may be due to limited GPU resources.</p>
          <button 
            className="mt-4 bg-white text-red-800 px-4 py-2 rounded font-medium"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      </Html>
    );
  }
  
  return null;
};

export default WebGLErrorHandler;

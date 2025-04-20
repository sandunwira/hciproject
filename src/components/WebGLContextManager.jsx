import React, { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';

// Component to handle WebGL context loss and other errors
const WebGLContextManager = ({ onError }) => {
  const [hasError, setHasError] = useState(false);
  const { gl } = useThree();
  
  useEffect(() => {
    // Handle WebGL context loss
    const handleContextLost = (event) => {
      event.preventDefault();
      console.warn('WebGL context lost. Attempting to recover...');
      setHasError(true);
      if (onError) onError();
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
  }, [gl, onError]);
  
  return null;
};

// Function to check if WebGL is supported
export const checkWebGLSupport = () => {
  try {
    const canvas = document.createElement('canvas');
    
    // Try to get WebGL 2 context first (better performance)
    let gl = canvas.getContext('webgl2');
    
    // Fall back to WebGL 1 if WebGL 2 is not available
    if (!gl) {
      gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    }
    
    // Check if context was created successfully
    if (!gl) {
      return false;
    }
    
    // Check for minimum required features
    const extensions = gl.getSupportedExtensions();
    
    // Clean up
    const loseContext = gl.getExtension('WEBGL_lose_context');
    if (loseContext) {
      loseContext.loseContext();
    }
    
    return true;
  } catch (e) {
    console.error('WebGL detection failed:', e);
    return false;
  }
};

export default WebGLContextManager;

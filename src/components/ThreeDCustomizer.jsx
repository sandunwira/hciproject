import React, { useState, useEffect } from 'react';
import ThreeDModelEditor from './ThreeDModelEditor';
import { 
  AVAILABLE_COLORS, 
  AVAILABLE_MATERIALS, 
  getDefault3DParts 
} from '../data/threeDFurnitureParts';

function ThreeDCustomizer({ item, onSave, onCancel }) {
  const [selectedColor, setSelectedColor] = useState(AVAILABLE_COLORS[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(AVAILABLE_MATERIALS[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [editMode, setEditMode] = useState('color'); // 'color', 'material', 'transform'
  const [transformMode, setTransformMode] = useState('translate'); // 'translate', 'rotate', 'scale'
  
  // Initialize parts based on furniture type
  useEffect(() => {
    const defaultParts = getDefault3DParts(item.type, selectedColor, selectedMaterial);
    setParts(defaultParts);
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [item.type]);
  
  // Function to update a specific part
  const updatePart = (partId, updates) => {
    setParts(prevParts => 
      prevParts.map(part => 
        part.id === partId ? { ...part, ...updates } : part
      )
    );
  };
  
  // Function to update all parts with the same color/material
  const updateAllParts = (updates) => {
    setParts(prevParts => 
      prevParts.map(part => {
        // Don't update handles or special parts
        if (part.id.includes('handle') || !part.editable) {
          return part;
        }
        return { ...part, ...updates };
      })
    );
  };
  
  // Function to handle color change
  const handleColorChange = (color) => {
    setSelectedColor(color);
    
    if (selectedPart) {
      // Update only the selected part
      const selectedPartObj = parts.find(part => part.id === selectedPart);
      if (selectedPartObj && selectedPartObj.editable) {
        updatePart(selectedPart, { color: color.value });
      }
    } else {
      // Update all parts
      updateAllParts({ color: color.value });
    }
  };
  
  // Function to handle material change
  const handleMaterialChange = (material) => {
    setSelectedMaterial(material);
    
    if (selectedPart) {
      // Update only the selected part
      const selectedPartObj = parts.find(part => part.id === selectedPart);
      if (selectedPartObj && selectedPartObj.editable) {
        updatePart(selectedPart, { material });
      }
    } else {
      // Update all parts
      updateAllParts({ material });
    }
  };
  
  // Function to handle transform changes (position, rotation, scale)
  const handleTransformChange = (partId, transforms) => {
    updatePart(partId, transforms);
  };
  
  // Function to handle saving the design
  const handleSaveDesign = () => {
    const design = {
      ...item,
      parts: parts,
      color: selectedColor,
      material: selectedMaterial,
      timestamp: new Date().toISOString()
    };
    
    onSave(design);
  };
  
  // Reset the selected part to default
  const resetSelectedPart = () => {
    if (!selectedPart) return;
    
    const defaultParts = getDefault3DParts(item.type, selectedColor, selectedMaterial);
    const defaultPart = defaultParts.find(part => part.id === selectedPart);
    
    if (defaultPart) {
      updatePart(selectedPart, defaultPart);
    }
  };
  
  // Reset all parts to default
  const resetAllParts = () => {
    const defaultParts = getDefault3DParts(item.type, selectedColor, selectedMaterial);
    setParts(defaultParts);
  };
  
  // Clear selection when clicking on background
  const handleBackgroundClick = () => {
    setSelectedPart(null);
  };
  
  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0A1628]">
      {/* 3D Model Viewer (takes up most of the screen) */}
      <div className="w-full md:w-3/4 h-1/2 md:h-full relative">
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-70">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-xl text-gray-300">Loading 3D Editor...</p>
            </div>
          </div>
        )}
        
        {/* 3D Model Editor */}
        <div className="w-full h-full">
          <ThreeDModelEditor
            type={item.type}
            initialParts={parts}
            selectedPart={selectedPart}
            onSelectPart={setSelectedPart}
            transformMode={transformMode}
            onTransformChange={handleTransformChange}
            onBackgroundClick={handleBackgroundClick}
          />
        </div>
        
        {/* Part selection info */}
        <div className="absolute top-4 left-4 right-4 bg-gray-800 bg-opacity-80 text-white p-3 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-medium">
                {selectedPart ? `Editing: ${parts.find(p => p.id === selectedPart)?.name}` : 'Click on a part to edit'}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedPart(null)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                title="Edit all parts"
              >
                Edit All
              </button>
              {selectedPart && (
                <button
                  onClick={resetSelectedPart}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                  title="Reset this part"
                >
                  Reset Part
                </button>
              )}
              <button
                onClick={resetAllParts}
                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                title="Reset all parts"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
        
        {/* Transform controls */}
        {editMode === 'transform' && selectedPart && (
          <div className="absolute bottom-4 left-4 right-4 bg-gray-800 bg-opacity-80 text-white p-3 rounded-lg">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setTransformMode('translate')}
                className={`px-4 py-2 rounded ${transformMode === 'translate' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                Move
              </button>
              <button
                onClick={() => setTransformMode('rotate')}
                className={`px-4 py-2 rounded ${transformMode === 'rotate' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                Rotate
              </button>
              <button
                onClick={() => setTransformMode('scale')}
                className={`px-4 py-2 rounded ${transformMode === 'scale' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                Scale
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Customization Panel (sidebar) */}
      <div className="w-full md:w-1/4 h-1/2 md:h-full bg-gray-900 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{item.name}</h2>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-400">{item.description}</p>
          <p className="text-blue-400 font-medium text-xl mt-2">${item.price}</p>
        </div>
        
        {/* Edit mode tabs */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            className={`px-4 py-2 font-medium ${editMode === 'color' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setEditMode('color')}
          >
            Color
          </button>
          <button
            className={`px-4 py-2 font-medium ${editMode === 'material' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setEditMode('material')}
          >
            Material
          </button>
          <button
            className={`px-4 py-2 font-medium ${editMode === 'transform' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setEditMode('transform')}
          >
            Transform
          </button>
        </div>
        
        {/* Color Selection */}
        {editMode === 'color' && (
          <div className="mb-6">
            <h3 className="text-white text-lg font-medium mb-3">
              {selectedPart ? `${parts.find(p => p.id === selectedPart)?.name} Color` : 'All Parts Color'}
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {AVAILABLE_COLORS.map((color) => (
                <button
                  key={color.value}
                  className={`w-12 h-12 rounded-lg border-2 ${
                    (selectedPart ? 
                      parts.find(p => p.id === selectedPart)?.color === color.value : 
                      selectedColor.value === color.value) ? 
                      'border-white' : 'border-transparent'
                  } transition-all hover:scale-105`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                  onClick={() => handleColorChange(color)}
                  disabled={selectedPart && !parts.find(p => p.id === selectedPart)?.editable}
                ></button>
              ))}
            </div>
            <p className="text-gray-400 mt-2">
              Selected: {
                selectedPart ? 
                  AVAILABLE_COLORS.find(c => c.value === parts.find(p => p.id === selectedPart)?.color)?.name || 'Custom' : 
                  selectedColor.name
              }
            </p>
            
            {selectedPart && !parts.find(p => p.id === selectedPart)?.editable && (
              <p className="text-yellow-500 mt-2">This part cannot be customized.</p>
            )}
          </div>
        )}
        
        {/* Material Selection */}
        {editMode === 'material' && (
          <div className="mb-6">
            <h3 className="text-white text-lg font-medium mb-3">
              {selectedPart ? `${parts.find(p => p.id === selectedPart)?.name} Material` : 'All Parts Material'}
            </h3>
            <select
              value={selectedPart ? 
                parts.find(p => p.id === selectedPart)?.material.value : 
                selectedMaterial.value
              }
              onChange={(e) => handleMaterialChange(AVAILABLE_MATERIALS.find(m => m.value === e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={selectedPart && !parts.find(p => p.id === selectedPart)?.editable}
            >
              {AVAILABLE_MATERIALS.map((material) => (
                <option key={material.value} value={material.value}>
                  {material.name}
                </option>
              ))}
            </select>
            <p className="text-gray-400 mt-2">
              {selectedPart ? 
                parts.find(p => p.id === selectedPart)?.material.name : 
                selectedMaterial.name
              } - 
              {selectedPart ? 
                (parts.find(p => p.id === selectedPart)?.material.value === 'wood' && ' Natural grain with matte finish') ||
                (parts.find(p => p.id === selectedPart)?.material.value === 'fabric' && ' Soft texture with high durability') ||
                (parts.find(p => p.id === selectedPart)?.material.value === 'leather' && ' Premium feel with slight sheen') ||
                (parts.find(p => p.id === selectedPart)?.material.value === 'metal' && ' Sleek with reflective properties') ||
                (parts.find(p => p.id === selectedPart)?.material.value === 'glass' && ' Transparent with subtle reflections') :
                (selectedMaterial.value === 'wood' && ' Natural grain with matte finish') ||
                (selectedMaterial.value === 'fabric' && ' Soft texture with high durability') ||
                (selectedMaterial.value === 'leather' && ' Premium feel with slight sheen') ||
                (selectedMaterial.value === 'metal' && ' Sleek with reflective properties') ||
                (selectedMaterial.value === 'glass' && ' Transparent with subtle reflections')
              }
            </p>
            
            {selectedPart && !parts.find(p => p.id === selectedPart)?.editable && (
              <p className="text-yellow-500 mt-2">This part cannot be customized.</p>
            )}
          </div>
        )}
        
        {/* Transform Instructions */}
        {editMode === 'transform' && (
          <div className="mb-6">
            <h3 className="text-white text-lg font-medium mb-3">Transform Controls</h3>
            
            {selectedPart ? (
              <>
                <p className="text-gray-400 mb-4">
                  Use the colored handles to transform the selected part:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
                  <li>Red axis: X (left/right)</li>
                  <li>Green axis: Y (up/down)</li>
                  <li>Blue axis: Z (forward/backward)</li>
                </ul>
                <p className="text-gray-400 mb-4">
                  Select a transform mode from the buttons at the bottom of the screen.
                </p>
                
                {!parts.find(p => p.id === selectedPart)?.editable && (
                  <p className="text-yellow-500 mt-2">This part cannot be transformed.</p>
                )}
              </>
            ) : (
              <p className="text-gray-400">
                Click on a part to select it for transformation.
              </p>
            )}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-col space-y-3 mt-8">
          <button
            onClick={handleSaveDesign}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Save Design
          </button>
          <button
            onClick={onCancel}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThreeDCustomizer;

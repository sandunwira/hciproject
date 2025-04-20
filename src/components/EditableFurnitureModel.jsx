import React, { useState, useEffect } from 'react';

// Component for a customizable furniture part
const FurniturePart = ({ 
  id, 
  name, 
  x, 
  y, 
  width, 
  height, 
  color, 
  material,
  isSelected,
  onSelect
}) => {
  // Calculate styles based on material
  const getMaterialStyles = () => {
    switch(material.value) {
      case 'wood':
        return {
          backgroundImage: 'url(/textures/wood-grain.svg)',
          backgroundSize: 'cover',
          backgroundBlendMode: 'overlay',
          opacity: 1
        };
      case 'fabric':
        return {
          backgroundImage: 'url(/textures/fabric.svg)',
          backgroundSize: 'cover',
          backgroundBlendMode: 'overlay',
          opacity: 1
        };
      case 'leather':
        return {
          backgroundImage: 'url(/textures/leather.svg)',
          backgroundSize: 'cover',
          backgroundBlendMode: 'overlay',
          opacity: 1
        };
      case 'metal':
        return {
          backgroundImage: 'none',
          backgroundSize: 'cover',
          backgroundBlendMode: 'hard-light',
          opacity: 1,
          boxShadow: 'inset 0 0 10px rgba(255,255,255,0.5)'
        };
      case 'glass':
        return {
          backgroundImage: 'none',
          backgroundSize: 'cover',
          backgroundBlendMode: 'screen',
          opacity: 0.7,
          backdropFilter: 'blur(2px)',
          border: '1px solid rgba(255,255,255,0.3)'
        };
      default:
        return {};
    }
  };

  return (
    <div
      className={`absolute cursor-pointer transition-all duration-300 ${isSelected ? 'ring-2 ring-blue-500 z-10' : ''}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
        backgroundColor: color,
        borderRadius: '4px',
        ...getMaterialStyles()
      }}
      onClick={() => onSelect(id)}
    >
      {isSelected && (
        <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded">
          {name}
        </div>
      )}
    </div>
  );
};

// Chair model with customizable parts
const ChairModel = ({ parts, selectedPart, onSelectPart }) => {
  return (
    <div className="relative w-full h-full">
      {parts.map(part => (
        <FurniturePart
          key={part.id}
          id={part.id}
          name={part.name}
          x={part.x}
          y={part.y}
          width={part.width}
          height={part.height}
          color={part.color}
          material={part.material}
          isSelected={selectedPart === part.id}
          onSelect={onSelectPart}
        />
      ))}
    </div>
  );
};

// Table model with customizable parts
const TableModel = ({ parts, selectedPart, onSelectPart }) => {
  return (
    <div className="relative w-full h-full">
      {parts.map(part => (
        <FurniturePart
          key={part.id}
          id={part.id}
          name={part.name}
          x={part.x}
          y={part.y}
          width={part.width}
          height={part.height}
          color={part.color}
          material={part.material}
          isSelected={selectedPart === part.id}
          onSelect={onSelectPart}
        />
      ))}
    </div>
  );
};

// Cabinet model with customizable parts
const CabinetModel = ({ parts, selectedPart, onSelectPart }) => {
  return (
    <div className="relative w-full h-full">
      {parts.map(part => (
        <FurniturePart
          key={part.id}
          id={part.id}
          name={part.name}
          x={part.x}
          y={part.y}
          width={part.width}
          height={part.height}
          color={part.color}
          material={part.material}
          isSelected={selectedPart === part.id}
          onSelect={onSelectPart}
        />
      ))}
    </div>
  );
};

// Main editable furniture model component
const EditableFurnitureModel = ({ 
  type, 
  initialParts, 
  selectedPart, 
  onSelectPart,
  rotation
}) => {
  const [parts, setParts] = useState(initialParts);
  
  // Update parts when initialParts changes
  useEffect(() => {
    setParts(initialParts);
  }, [initialParts]);
  
  // Render the appropriate model based on type
  const renderModel = () => {
    switch(type) {
      case 'chair':
        return (
          <ChairModel 
            parts={parts} 
            selectedPart={selectedPart} 
            onSelectPart={onSelectPart} 
          />
        );
      case 'table':
        return (
          <TableModel 
            parts={parts} 
            selectedPart={selectedPart} 
            onSelectPart={onSelectPart} 
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
          />
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-white">Unknown furniture type</p>
          </div>
        );
    }
  };
  
  return (
    <div 
      className="w-full h-full flex items-center justify-center"
      style={{
        transform: `rotate3d(0, 1, 0, ${rotation}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.5s ease'
      }}
    >
      {renderModel()}
    </div>
  );
};

export default EditableFurnitureModel;

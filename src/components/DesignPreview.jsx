import React from 'react';

function DesignPreview({ design, className = '' }) {
  // Extract room properties and furniture pieces from the design
  const roomProperties = design.room_properties || { 
    width: 500, 
    length: 700, 
    floorColor: '#8B4513' 
  };
  
  const furniturePieces = design.furniture_pieces || [];
  
  // Scale the room to fit within the preview area
  const maxSize = 200;
  const aspectRatio = roomProperties.width / roomProperties.length;
  let displayWidth, displayHeight;
  
  if (aspectRatio > 1) {
    displayWidth = maxSize;
    displayHeight = maxSize / aspectRatio;
  } else {
    displayHeight = maxSize;
    displayWidth = maxSize * aspectRatio;
  }
  
  return (
    <div className={`${className} flex items-center justify-center`}>
      <div 
        style={{
          width: `${displayWidth}px`,
          height: `${displayHeight}px`,
          backgroundColor: roomProperties.floorColor,
          position: 'relative',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Render furniture pieces */}
        {furniturePieces.map(piece => (
          <div
            key={piece.id}
            style={{
              position: 'absolute',
              left: `${(piece.x / roomProperties.width) * displayWidth}px`,
              top: `${(piece.y / roomProperties.length) * displayHeight}px`,
              width: `${((piece.width || 50) * piece.scale / roomProperties.width) * displayWidth}px`,
              height: `${((piece.depth || 50) * piece.scale / roomProperties.length) * displayHeight}px`,
              backgroundColor: piece.color || '#A0522D',
              transform: `rotate(${piece.rotation || 0}deg)`,
              transformOrigin: 'center',
              boxShadow: '0 0 3px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
            title={piece.name}
          />
        ))}
      </div>
    </div>
  );
}

export default DesignPreview;

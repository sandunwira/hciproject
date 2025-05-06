import React, { useState, useRef, useEffect } from 'react';

function DraggableFurniture({ piece, onUpdate, onSelect }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const furnitureRef = useRef(null);

  const handleDragStart = (clientX, clientY) => {
    // Calculate the offset between pointer position and the furniture's top-left corner
    const rect = furnitureRef.current.getBoundingClientRect();
    setDragOffset({
      x: (clientX - rect.left) * 10, // Convert back to cm for calculations
      y: (clientY - rect.top) * 10   // Convert back to cm for calculations
    });
    setIsDragging(true);
    onSelect(piece);
  };

  const handleDragMove = (clientX, clientY) => {
    if (!isDragging) return;
    
    // Get parent container position for relative positioning
    const containerRect = furnitureRef.current.parentElement.getBoundingClientRect();
    
    // Calculate new position, keeping the same relative point under the pointer
    const newX = ((clientX - containerRect.left) * 10) - dragOffset.x;
    const newY = ((clientY - containerRect.top) * 10) - dragOffset.y;
    
    // Update the piece position
    onUpdate(piece.id, { 
      x: Math.max(0, Math.min(newX, piece.width * 10)),
      y: Math.max(0, Math.min(newY, piece.depth * 10)) 
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Mouse event handlers
  const handleMouseDown = (e) => {
    e.stopPropagation();
    handleDragStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    handleDragMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    e.stopPropagation();
    const touch = e.touches[0];
    handleDragStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    handleDragMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Add event listeners to window for drag events
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div 
      ref={furnitureRef}
      className={`absolute border ${isDragging ? 'border-blue-500 z-10' : 'border-gray-500'} cursor-move`}
      style={{
        width: `${piece.width / 10}px`,
        height: `${piece.depth / 10}px`,
        backgroundColor: piece.color,
        left: `${piece.x / 10}px`,
        top: `${piece.y / 10}px`,
        transform: `rotate(${piece.rotation}deg) scale(${piece.scale || 1})`,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Optional visual elements for better UX */}
      <div className="absolute inset-0 flex items-center justify-center text-xs text-white opacity-50 select-none">
        {piece.name}
      </div>
    </div>
  );
}

export default DraggableFurniture;

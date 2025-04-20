import React, { useRef, useEffect, useState } from 'react';

// Component for 2D room visualization
const RoomVisualizer2D = ({ 
  room, 
  selectedFurniture, 
  onSelectFurniture, 
  onMoveFurniture,
  scale = 20 // pixels per foot
}) => {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedFurniture, setDraggedFurniture] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  // Draw the room and furniture on the canvas
  useEffect(() => {
    if (!canvasRef.current || !room) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the room based on its shape
    drawRoom(ctx, room, scale);
    
    // Draw the furniture
    if (room.furniture && room.furniture.length > 0) {
      room.furniture.forEach(furniture => {
        drawFurniture(ctx, furniture, scale, furniture.id === selectedFurniture);
      });
    }
  }, [room, selectedFurniture, scale]);
  
  // Draw the room based on its shape
  const drawRoom = (ctx, room, scale) => {
    ctx.fillStyle = room.colors.walls;
    ctx.strokeStyle = room.colors.trim;
    ctx.lineWidth = 2;
    
    switch (room.shape) {
      case 'rectangular':
      case 'square':
        // Draw the floor
        ctx.fillStyle = room.colors.floor;
        ctx.fillRect(
          20, 
          20, 
          room.dimensions.width * scale, 
          room.dimensions.length * scale
        );
        
        // Draw the walls
        ctx.strokeRect(
          20, 
          20, 
          room.dimensions.width * scale, 
          room.dimensions.length * scale
        );
        break;
        
      case 'l-shaped':
        ctx.fillStyle = room.colors.floor;
        ctx.beginPath();
        ctx.moveTo(20, 20);
        ctx.lineTo(20 + room.dimensions.mainWidth * scale, 20);
        ctx.lineTo(20 + room.dimensions.mainWidth * scale, 20 + room.dimensions.mainLength * scale);
        ctx.lineTo(20 + (room.dimensions.mainWidth - room.dimensions.secondaryWidth) * scale, 20 + room.dimensions.mainLength * scale);
        ctx.lineTo(20 + (room.dimensions.mainWidth - room.dimensions.secondaryWidth) * scale, 20 + (room.dimensions.mainLength - room.dimensions.secondaryLength) * scale);
        ctx.lineTo(20, 20 + (room.dimensions.mainLength - room.dimensions.secondaryLength) * scale);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
        
      case 'irregular':
        if (room.dimensions.points && room.dimensions.points.length > 2) {
          ctx.fillStyle = room.colors.floor;
          ctx.beginPath();
          ctx.moveTo(20 + room.dimensions.points[0][0] * scale, 20 + room.dimensions.points[0][1] * scale);
          
          for (let i = 1; i < room.dimensions.points.length; i++) {
            ctx.lineTo(
              20 + room.dimensions.points[i][0] * scale, 
              20 + room.dimensions.points[i][1] * scale
            );
          }
          
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
        break;
        
      default:
        break;
    }
    
    // Draw room dimensions
    ctx.fillStyle = '#000000';
    ctx.font = '12px Arial';
    
    if (room.shape === 'rectangular' || room.shape === 'square') {
      // Width dimension
      ctx.fillText(
        `${room.dimensions.width} ft`, 
        20 + (room.dimensions.width * scale / 2) - 15, 
        15
      );
      
      // Length dimension
      ctx.fillText(
        `${room.dimensions.length} ft`, 
        5, 
        20 + (room.dimensions.length * scale / 2) + 5
      );
    }
  };
  
  // Draw a piece of furniture
  const drawFurniture = (ctx, furniture, scale, isSelected) => {
    // Set styles based on furniture type and selection state
    ctx.fillStyle = furniture.color || '#A0522D';
    ctx.strokeStyle = isSelected ? '#1E88E5' : '#000000';
    ctx.lineWidth = isSelected ? 3 : 1;
    
    const x = 20 + furniture.position.x * scale;
    const y = 20 + furniture.position.y * scale;
    const width = furniture.dimensions.width * scale;
    const height = furniture.dimensions.depth * scale;
    
    // Apply rotation if specified
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate((furniture.rotation || 0) * Math.PI / 180);
    
    // Draw the furniture based on its type
    switch (furniture.type) {
      case 'chair':
        // Draw chair
        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.strokeRect(-width / 2, -height / 2, width, height);
        
        // Draw chair back
        ctx.fillRect(-width / 2, -height / 2 - height * 0.3, width, height * 0.3);
        ctx.strokeRect(-width / 2, -height / 2 - height * 0.3, width, height * 0.3);
        break;
        
      case 'table':
        // Draw table
        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.strokeRect(-width / 2, -height / 2, width, height);
        break;
        
      case 'cabinet':
      case 'shelf':
      case 'storage':
        // Draw cabinet
        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.strokeRect(-width / 2, -height / 2, width, height);
        
        // Draw cabinet doors
        ctx.beginPath();
        ctx.moveTo(-width / 2 + width / 2, -height / 2);
        ctx.lineTo(-width / 2 + width / 2, -height / 2 + height);
        ctx.stroke();
        break;
        
      default:
        // Default furniture drawing
        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.strokeRect(-width / 2, -height / 2, width, height);
        break;
    }
    
    // Draw furniture label if selected
    if (isSelected) {
      ctx.fillStyle = '#000000';
      ctx.font = '12px Arial';
      ctx.fillText(furniture.name || furniture.type, -width / 2, -height / 2 - 5);
    }
    
    ctx.restore();
  };
  
  // Handle mouse down event for furniture selection and dragging
  const handleMouseDown = (e) => {
    if (!room || !room.furniture || room.furniture.length === 0) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Check if the mouse is over any furniture
    for (let i = room.furniture.length - 1; i >= 0; i--) {
      const furniture = room.furniture[i];
      const furnitureX = 20 + furniture.position.x * scale;
      const furnitureY = 20 + furniture.position.y * scale;
      const furnitureWidth = furniture.dimensions.width * scale;
      const furnitureHeight = furniture.dimensions.depth * scale;
      
      // Simple bounding box check (doesn't account for rotation)
      if (
        mouseX >= furnitureX && 
        mouseX <= furnitureX + furnitureWidth && 
        mouseY >= furnitureY && 
        mouseY <= furnitureY + furnitureHeight
      ) {
        // Select this furniture
        onSelectFurniture(furniture.id);
        
        // Start dragging
        setIsDragging(true);
        setDraggedFurniture(furniture.id);
        setDragOffset({
          x: mouseX - furnitureX,
          y: mouseY - furnitureY
        });
        
        break;
      }
    }
  };
  
  // Handle mouse move event for furniture dragging
  const handleMouseMove = (e) => {
    if (!isDragging || !draggedFurniture) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate new position
    const newX = (mouseX - dragOffset.x - 20) / scale;
    const newY = (mouseY - dragOffset.y - 20) / scale;
    
    // Update furniture position
    onMoveFurniture(draggedFurniture, { x: newX, y: newY });
  };
  
  // Handle mouse up event to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedFurniture(null);
  };
  
  // Calculate canvas dimensions based on room size
  const getCanvasDimensions = () => {
    if (!room) return { width: 600, height: 400 };
    
    let maxWidth = 0;
    let maxHeight = 0;
    
    switch (room.shape) {
      case 'rectangular':
      case 'square':
        maxWidth = room.dimensions.width * scale + 40;
        maxHeight = room.dimensions.length * scale + 40;
        break;
        
      case 'l-shaped':
        maxWidth = room.dimensions.mainWidth * scale + 40;
        maxHeight = room.dimensions.mainLength * scale + 40;
        break;
        
      case 'irregular':
        if (room.dimensions.points && room.dimensions.points.length > 0) {
          room.dimensions.points.forEach(point => {
            maxWidth = Math.max(maxWidth, point[0] * scale + 40);
            maxHeight = Math.max(maxHeight, point[1] * scale + 40);
          });
        } else {
          maxWidth = 600;
          maxHeight = 400;
        }
        break;
        
      default:
        maxWidth = 600;
        maxHeight = 400;
        break;
    }
    
    return { width: maxWidth, height: maxHeight };
  };
  
  const { width, height } = getCanvasDimensions();
  
  return (
    <div className="relative border border-gray-300 rounded-lg overflow-hidden bg-white">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      
      {/* Scale indicator */}
      <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 px-2 py-1 rounded text-xs">
        Scale: 1:{scale} (1 ft = {scale} px)
      </div>
    </div>
  );
};

export default RoomVisualizer2D;

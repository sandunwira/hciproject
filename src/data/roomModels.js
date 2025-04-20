// Room configuration models and utilities

// Available room shapes
export const ROOM_SHAPES = [
  { id: 'rectangular', name: 'Rectangular' },
  { id: 'l-shaped', name: 'L-Shaped' },
  { id: 'square', name: 'Square' },
  { id: 'irregular', name: 'Irregular' }
];

// Available color schemes
export const COLOR_SCHEMES = [
  { 
    id: 'modern', 
    name: 'Modern', 
    colors: {
      walls: '#F5F5F5',
      floor: '#8B4513',
      accent: '#1A237E',
      trim: '#212121'
    }
  },
  { 
    id: 'minimalist', 
    name: 'Minimalist', 
    colors: {
      walls: '#FFFFFF',
      floor: '#D7CCC8',
      accent: '#616161',
      trim: '#212121'
    }
  },
  { 
    id: 'warm', 
    name: 'Warm & Cozy', 
    colors: {
      walls: '#FFF8E1',
      floor: '#5D4037',
      accent: '#D84315',
      trim: '#3E2723'
    }
  },
  { 
    id: 'cool', 
    name: 'Cool & Calm', 
    colors: {
      walls: '#E8F5E9',
      floor: '#455A64',
      accent: '#00796B',
      trim: '#263238'
    }
  },
  { 
    id: 'bold', 
    name: 'Bold & Vibrant', 
    colors: {
      walls: '#FFFFFF',
      floor: '#212121',
      accent: '#D81B60',
      trim: '#1A237E'
    }
  },
  { 
    id: 'natural', 
    name: 'Natural', 
    colors: {
      walls: '#EFEBE9',
      floor: '#8D6E63',
      accent: '#558B2F',
      trim: '#4E342E'
    }
  }
];

// Default room dimensions (in feet)
export const DEFAULT_ROOM_DIMENSIONS = {
  rectangular: { width: 12, length: 16, height: 9 },
  square: { width: 12, length: 12, height: 9 },
  'l-shaped': { 
    mainWidth: 12, 
    mainLength: 16, 
    secondaryWidth: 8, 
    secondaryLength: 10, 
    height: 9 
  },
  irregular: { 
    points: [
      [0, 0],
      [12, 0],
      [12, 10],
      [8, 10],
      [8, 16],
      [0, 16]
    ],
    height: 9
  }
};

// Create a new room configuration
export const createNewRoom = (shape = 'rectangular', colorScheme = 'modern', dimensions = null) => {
  // Get default dimensions for the selected shape
  const defaultDims = DEFAULT_ROOM_DIMENSIONS[shape] || DEFAULT_ROOM_DIMENSIONS.rectangular;
  
  // Use provided dimensions or defaults
  const roomDimensions = dimensions || defaultDims;
  
  // Find the selected color scheme
  const selectedScheme = COLOR_SCHEMES.find(scheme => scheme.id === colorScheme) || COLOR_SCHEMES[0];
  
  return {
    id: `room-${Date.now()}`,
    name: 'New Room Design',
    shape,
    dimensions: roomDimensions,
    colorScheme: selectedScheme.id,
    colors: { ...selectedScheme.colors },
    furniture: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// Calculate room area in square feet
export const calculateRoomArea = (room) => {
  if (!room || !room.dimensions) return 0;
  
  switch (room.shape) {
    case 'rectangular':
    case 'square':
      return room.dimensions.width * room.dimensions.length;
    
    case 'l-shaped':
      const mainArea = room.dimensions.mainWidth * room.dimensions.mainLength;
      const secondaryArea = room.dimensions.secondaryWidth * room.dimensions.secondaryLength;
      return mainArea + secondaryArea;
    
    case 'irregular':
      // Calculate area using the Shoelace formula for irregular polygons
      if (!room.dimensions.points || room.dimensions.points.length < 3) return 0;
      
      let area = 0;
      const points = room.dimensions.points;
      
      for (let i = 0; i < points.length; i++) {
        const j = (i + 1) % points.length;
        area += points[i][0] * points[j][1];
        area -= points[j][0] * points[i][1];
      }
      
      return Math.abs(area / 2);
    
    default:
      return 0;
  }
};

// Get recommended furniture for room size
export const getRecommendedFurniture = (room) => {
  const area = calculateRoomArea(room);
  
  // Small room (under 150 sq ft)
  if (area < 150) {
    return [
      { type: 'chair', count: 1 },
      { type: 'table', count: 1, size: 'small' },
      { type: 'cabinet', count: 1, size: 'small' }
    ];
  }
  
  // Medium room (150-250 sq ft)
  if (area < 250) {
    return [
      { type: 'chair', count: 2 },
      { type: 'table', count: 1, size: 'medium' },
      { type: 'cabinet', count: 1, size: 'medium' }
    ];
  }
  
  // Large room (over 250 sq ft)
  return [
    { type: 'chair', count: 4 },
    { type: 'table', count: 1, size: 'large' },
    { type: 'cabinet', count: 2, size: 'large' }
  ];
};

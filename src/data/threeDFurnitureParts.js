// Default 3D furniture part configurations

// Available colors for customization
export const AVAILABLE_COLORS = [
  { name: 'Natural Wood', value: '#A0522D' },
  { name: 'Dark Walnut', value: '#5D4037' },
  { name: 'White Oak', value: '#D7CCC8' },
  { name: 'Black', value: '#212121' },
  { name: 'Navy Blue', value: '#1A237E' },
  { name: 'Forest Green', value: '#1B5E20' },
  { name: 'Burgundy', value: '#880E4F' },
  { name: 'Gray', value: '#616161' }
];

// Available materials for customization
export const AVAILABLE_MATERIALS = [
  { name: 'Wood', value: 'wood', roughness: 0.7, metalness: 0.0 },
  { name: 'Fabric', value: 'fabric', roughness: 0.9, metalness: 0.0 },
  { name: 'Leather', value: 'leather', roughness: 0.5, metalness: 0.1 },
  { name: 'Metal', value: 'metal', roughness: 0.2, metalness: 0.8 },
  { name: 'Glass', value: 'glass', roughness: 0.1, metalness: 0.2 }
];

// Default chair parts in 3D
export const getDefaultChairParts = (color = AVAILABLE_COLORS[0], material = AVAILABLE_MATERIALS[0]) => [
  {
    id: 'chair-back',
    name: 'Chair Back',
    position: [0, 0.5, -0.4],
    rotation: [0, 0, 0],
    scale: [1, 1.5, 0.1],
    color: color.value,
    material: material,
    editable: true
  },
  {
    id: 'chair-seat',
    name: 'Chair Seat',
    position: [0, -0.2, 0],
    rotation: [0, 0, 0],
    scale: [1, 0.1, 1],
    color: color.value,
    material: material,
    editable: true
  },
  {
    id: 'chair-leg-front-left',
    name: 'Front Left Leg',
    position: [-0.4, -0.8, 0.4],
    rotation: [0, 0, 0],
    scale: [0.1, 0.5, 0.1],
    color: color.value,
    material: material,
    editable: true
  },
  {
    id: 'chair-leg-front-right',
    name: 'Front Right Leg',
    position: [0.4, -0.8, 0.4],
    rotation: [0, 0, 0],
    scale: [0.1, 0.5, 0.1],
    color: color.value,
    material: material,
    editable: true
  },
  {
    id: 'chair-leg-back-left',
    name: 'Back Left Leg',
    position: [-0.4, -0.8, -0.4],
    rotation: [0, 0, 0],
    scale: [0.1, 0.5, 0.1],
    color: color.value,
    material: material,
    editable: true
  },
  {
    id: 'chair-leg-back-right',
    name: 'Back Right Leg',
    position: [0.4, -0.8, -0.4],
    rotation: [0, 0, 0],
    scale: [0.1, 0.5, 0.1],
    color: color.value,
    material: material,
    editable: true
  }
];

// Default table parts in 3D
export const getDefaultTableParts = (color = AVAILABLE_COLORS[0], material = AVAILABLE_MATERIALS[0]) => [
  {
    id: 'table-top',
    name: 'Table Top',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [2, 0.1, 1.5],
    color: color.value,
    material: material,
    editable: true
  },
  {
    id: 'table-leg-front-left',
    name: 'Front Left Leg',
    position: [-0.8, -0.8, 0.6],
    rotation: [0, 0, 0],
    scale: [0.1, 0.7, 0.1],
    color: color.value,
    material: material,
    editable: true
  },
  {
    id: 'table-leg-front-right',
    name: 'Front Right Leg',
    position: [0.8, -0.8, 0.6],
    rotation: [0, 0, 0],
    scale: [0.1, 0.7, 0.1],
    color: color.value,
    material: material,
    editable: true
  },
  {
    id: 'table-leg-back-left',
    name: 'Back Left Leg',
    position: [-0.8, -0.8, -0.6],
    rotation: [0, 0, 0],
    scale: [0.1, 0.7, 0.1],
    color: color.value,
    material: material,
    editable: true
  },
  {
    id: 'table-leg-back-right',
    name: 'Back Right Leg',
    position: [0.8, -0.8, -0.6],
    rotation: [0, 0, 0],
    scale: [0.1, 0.7, 0.1],
    color: color.value,
    material: material,
    editable: true
  },
  {
    id: 'table-support',
    name: 'Support Beam',
    position: [0, -0.5, 0],
    rotation: [0, 0, 0],
    scale: [1.5, 0.05, 0.05],
    color: color.value,
    material: material,
    editable: true
  }
];

// Default cabinet parts in 3D
export const getDefaultCabinetParts = (color = AVAILABLE_COLORS[0], material = AVAILABLE_MATERIALS[0]) => [
  {
    id: 'cabinet-body',
    name: 'Cabinet Body',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1.5, 2, 0.8],
    color: color.value,
    material: material,
    editable: true
  },
  {
    id: 'cabinet-door-left',
    name: 'Left Door',
    position: [-0.38, 0, 0.41],
    rotation: [0, 0, 0],
    scale: [0.7, 1.9, 0.05],
    color: color.value,
    material: material,
    editable: true
  },
  {
    id: 'cabinet-door-right',
    name: 'Right Door',
    position: [0.38, 0, 0.41],
    rotation: [0, 0, 0],
    scale: [0.7, 1.9, 0.05],
    color: color.value,
    material: material,
    editable: true
  },
  {
    id: 'cabinet-shelf-top',
    name: 'Top Shelf',
    position: [0, 0.6, 0],
    rotation: [0, 0, 0],
    scale: [1.4, 0.05, 0.7],
    color: color.value,
    material: material,
    editable: true
  },
  {
    id: 'cabinet-shelf-middle',
    name: 'Middle Shelf',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1.4, 0.05, 0.7],
    color: color.value,
    material: material,
    editable: true
  },
  {
    id: 'cabinet-shelf-bottom',
    name: 'Bottom Shelf',
    position: [0, -0.6, 0],
    rotation: [0, 0, 0],
    scale: [1.4, 0.05, 0.7],
    color: color.value,
    material: material,
    editable: true
  },
  {
    id: 'cabinet-handle-left',
    name: 'Left Handle',
    position: [-0.05, 0, 0.45],
    rotation: [0, 0, 0],
    scale: [0.05, 0.2, 0.05],
    color: '#D4A76A',
    material: AVAILABLE_MATERIALS.find(m => m.value === 'metal'),
    editable: false
  },
  {
    id: 'cabinet-handle-right',
    name: 'Right Handle',
    position: [0.05, 0, 0.45],
    rotation: [0, 0, 0],
    scale: [0.05, 0.2, 0.05],
    color: '#D4A76A',
    material: AVAILABLE_MATERIALS.find(m => m.value === 'metal'),
    editable: false
  }
];

// Get default parts based on furniture type
export const getDefault3DParts = (type, color, material) => {
  switch(type) {
    case 'chair':
      return getDefaultChairParts(color, material);
    case 'table':
      return getDefaultTableParts(color, material);
    case 'cabinet':
    case 'shelf':
    case 'storage':
      return getDefaultCabinetParts(color, material);
    default:
      return getDefaultChairParts(color, material);
  }
};

// Default furniture part configurations

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

// Default chair parts
export const getDefaultChairParts = (color = AVAILABLE_COLORS[0], material = AVAILABLE_MATERIALS[0]) => [
  {
    id: 'chair-back',
    name: 'Chair Back',
    x: 20,
    y: 5,
    width: 60,
    height: 40,
    color: color.value,
    material: material,
    scalable: true
  },
  {
    id: 'chair-seat',
    name: 'Chair Seat',
    x: 15,
    y: 45,
    width: 70,
    height: 10,
    color: color.value,
    material: material,
    scalable: true
  },
  {
    id: 'chair-leg-left-front',
    name: 'Left Front Leg',
    x: 20,
    y: 55,
    width: 5,
    height: 40,
    color: color.value,
    material: material,
    scalable: true
  },
  {
    id: 'chair-leg-right-front',
    name: 'Right Front Leg',
    x: 75,
    y: 55,
    width: 5,
    height: 40,
    color: color.value,
    material: material,
    scalable: true
  },
  {
    id: 'chair-leg-left-back',
    name: 'Left Back Leg',
    x: 20,
    y: 55,
    width: 5,
    height: 40,
    color: color.value,
    material: material,
    scalable: true
  },
  {
    id: 'chair-leg-right-back',
    name: 'Right Back Leg',
    x: 75,
    y: 55,
    width: 5,
    height: 40,
    color: color.value,
    material: material,
    scalable: true
  }
];

// Default table parts
export const getDefaultTableParts = (color = AVAILABLE_COLORS[0], material = AVAILABLE_MATERIALS[0]) => [
  {
    id: 'table-top',
    name: 'Table Top',
    x: 10,
    y: 30,
    width: 80,
    height: 10,
    color: color.value,
    material: material,
    scalable: true
  },
  {
    id: 'table-leg-left-front',
    name: 'Left Front Leg',
    x: 15,
    y: 40,
    width: 5,
    height: 50,
    color: color.value,
    material: material,
    scalable: true
  },
  {
    id: 'table-leg-right-front',
    name: 'Right Front Leg',
    x: 80,
    y: 40,
    width: 5,
    height: 50,
    color: color.value,
    material: material,
    scalable: true
  },
  {
    id: 'table-leg-left-back',
    name: 'Left Back Leg',
    x: 15,
    y: 40,
    width: 5,
    height: 50,
    color: color.value,
    material: material,
    scalable: true
  },
  {
    id: 'table-leg-right-back',
    name: 'Right Back Leg',
    x: 80,
    y: 40,
    width: 5,
    height: 50,
    color: color.value,
    material: material,
    scalable: true
  },
  {
    id: 'table-support',
    name: 'Support Beam',
    x: 20,
    y: 65,
    width: 60,
    height: 5,
    color: color.value,
    material: material,
    scalable: true
  }
];

// Default cabinet parts
export const getDefaultCabinetParts = (color = AVAILABLE_COLORS[0], material = AVAILABLE_MATERIALS[0]) => [
  {
    id: 'cabinet-body',
    name: 'Cabinet Body',
    x: 15,
    y: 10,
    width: 70,
    height: 80,
    color: color.value,
    material: material,
    scalable: true
  },
  {
    id: 'cabinet-door-left',
    name: 'Left Door',
    x: 17,
    y: 12,
    width: 33,
    height: 76,
    color: color.value,
    material: material,
    scalable: true
  },
  {
    id: 'cabinet-door-right',
    name: 'Right Door',
    x: 50,
    y: 12,
    width: 33,
    height: 76,
    color: color.value,
    material: material,
    scalable: true
  },
  {
    id: 'cabinet-shelf-top',
    name: 'Top Shelf',
    x: 17,
    y: 30,
    width: 66,
    height: 2,
    color: color.value,
    material: material,
    scalable: true
  },
  {
    id: 'cabinet-shelf-middle',
    name: 'Middle Shelf',
    x: 17,
    y: 50,
    width: 66,
    height: 2,
    color: color.value,
    material: material,
    scalable: true
  },
  {
    id: 'cabinet-shelf-bottom',
    name: 'Bottom Shelf',
    x: 17,
    y: 70,
    width: 66,
    height: 2,
    color: color.value,
    material: material,
    scalable: true
  },
  {
    id: 'cabinet-handle-left',
    name: 'Left Handle',
    x: 45,
    y: 45,
    width: 2,
    height: 10,
    color: '#D4A76A',
    material: AVAILABLE_MATERIALS.find(m => m.value === 'metal'),
    scalable: false
  },
  {
    id: 'cabinet-handle-right',
    name: 'Right Handle',
    x: 53,
    y: 45,
    width: 2,
    height: 10,
    color: '#D4A76A',
    material: AVAILABLE_MATERIALS.find(m => m.value === 'metal'),
    scalable: false
  }
];

// Get default parts based on furniture type
export const getDefaultParts = (type, color, material) => {
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

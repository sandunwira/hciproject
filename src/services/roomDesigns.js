// Service for handling room designs

// Get all room designs for the current user
export const getRoomDesigns = () => {
  try {
    const designs = localStorage.getItem('roomDesigns');
    return designs ? JSON.parse(designs) : [];
  } catch (error) {
    console.error('Error getting room designs:', error);
    return [];
  }
};

// Get a specific room design by ID
export const getRoomDesignById = (id) => {
  try {
    const designs = getRoomDesigns();
    return designs.find(design => design.id === id) || null;
  } catch (error) {
    console.error('Error getting room design by ID:', error);
    return null;
  }
};

// Save a new room design
export const saveRoomDesign = (design) => {
  try {
    const designs = getRoomDesigns();
    const existingIndex = designs.findIndex(d => d.id === design.id);
    
    // Update existing design or add new one
    if (existingIndex >= 0) {
      designs[existingIndex] = {
        ...design,
        updatedAt: new Date().toISOString()
      };
    } else {
      designs.push({
        ...design,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    
    localStorage.setItem('roomDesigns', JSON.stringify(designs));
    return true;
  } catch (error) {
    console.error('Error saving room design:', error);
    return false;
  }
};

// Delete a room design by ID
export const deleteRoomDesign = (id) => {
  try {
    const designs = getRoomDesigns();
    const updatedDesigns = designs.filter(design => design.id !== id);
    localStorage.setItem('roomDesigns', JSON.stringify(updatedDesigns));
    return true;
  } catch (error) {
    console.error('Error deleting room design:', error);
    return false;
  }
};

// Add furniture to a room design
export const addFurnitureToRoom = (roomId, furniture) => {
  try {
    const designs = getRoomDesigns();
    const roomIndex = designs.findIndex(d => d.id === roomId);
    
    if (roomIndex >= 0) {
      // Add unique ID to the furniture
      const furnitureWithId = {
        ...furniture,
        id: `furniture-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      };
      
      designs[roomIndex].furniture = [
        ...designs[roomIndex].furniture,
        furnitureWithId
      ];
      
      designs[roomIndex].updatedAt = new Date().toISOString();
      localStorage.setItem('roomDesigns', JSON.stringify(designs));
      return furnitureWithId.id;
    }
    
    return null;
  } catch (error) {
    console.error('Error adding furniture to room:', error);
    return null;
  }
};

// Remove furniture from a room design
export const removeFurnitureFromRoom = (roomId, furnitureId) => {
  try {
    const designs = getRoomDesigns();
    const roomIndex = designs.findIndex(d => d.id === roomId);
    
    if (roomIndex >= 0) {
      designs[roomIndex].furniture = designs[roomIndex].furniture.filter(
        f => f.id !== furnitureId
      );
      
      designs[roomIndex].updatedAt = new Date().toISOString();
      localStorage.setItem('roomDesigns', JSON.stringify(designs));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error removing furniture from room:', error);
    return false;
  }
};

// Update furniture in a room design
export const updateFurnitureInRoom = (roomId, furnitureId, updates) => {
  try {
    const designs = getRoomDesigns();
    const roomIndex = designs.findIndex(d => d.id === roomId);
    
    if (roomIndex >= 0) {
      const furnitureIndex = designs[roomIndex].furniture.findIndex(
        f => f.id === furnitureId
      );
      
      if (furnitureIndex >= 0) {
        designs[roomIndex].furniture[furnitureIndex] = {
          ...designs[roomIndex].furniture[furnitureIndex],
          ...updates
        };
        
        designs[roomIndex].updatedAt = new Date().toISOString();
        localStorage.setItem('roomDesigns', JSON.stringify(designs));
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error updating furniture in room:', error);
    return false;
  }
};

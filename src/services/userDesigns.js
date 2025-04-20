// Service for handling user designs

// Get all designs for the current user
export const getUserDesigns = () => {
  try {
    const designs = localStorage.getItem('userDesigns');
    return designs ? JSON.parse(designs) : [];
  } catch (error) {
    console.error('Error getting user designs:', error);
    return [];
  }
};

// Save a new design for the current user
export const saveUserDesign = (design) => {
  try {
    const designs = getUserDesigns();
    const updatedDesigns = [...designs, design];
    localStorage.setItem('userDesigns', JSON.stringify(updatedDesigns));
    return true;
  } catch (error) {
    console.error('Error saving user design:', error);
    return false;
  }
};

// Delete a design by its timestamp
export const deleteUserDesign = (timestamp) => {
  try {
    const designs = getUserDesigns();
    const updatedDesigns = designs.filter(design => design.timestamp !== timestamp);
    localStorage.setItem('userDesigns', JSON.stringify(updatedDesigns));
    return true;
  } catch (error) {
    console.error('Error deleting user design:', error);
    return false;
  }
};

// In a real application, these functions would interact with a backend API
// to store designs in a database associated with the user's account.
// For now, we're using localStorage as a simple demonstration.

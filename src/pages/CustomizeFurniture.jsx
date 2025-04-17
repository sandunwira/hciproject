import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThreeDCustomizer from '../components/ThreeDCustomizer';
import { saveUserDesign } from '../services/userDesigns';

function CustomizeFurniturePage() {
  const [item, setItem] = useState(null);
  const [designSaved, setDesignSaved] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the item from location state
  useEffect(() => {
    if (location.state && location.state.item) {
      setItem(location.state.item);
    } else {
      // If no item is provided, redirect back to showcase
      navigate('/showcase');
    }
  }, [location, navigate]);

  // Handle saving the design
  const handleSaveDesign = (design) => {
    const success = saveUserDesign(design);
    if (success) {
      setDesignSaved(true);

      // Show success message and redirect after a delay
      setTimeout(() => {
        navigate('/my-designs');
      }, 2000);
    }
  };

  // Handle canceling customization
  const handleCancel = () => {
    navigate('/showcase');
  };

  // If no item is available yet, show loading
  if (!item) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A1628]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // If design was saved, show success message
  if (designSaved) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A1628]">
        <div className="text-center bg-gray-800 p-8 rounded-lg max-w-md">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Design Saved!</h2>
          <p className="text-gray-300 mb-6">Your customized design has been saved successfully.</p>
          <p className="text-gray-400">Redirecting to your saved designs...</p>
        </div>
      </div>
    );
  }

  // Render the 3D customizer
  return (
    <ThreeDCustomizer
      item={item}
      onSave={handleSaveDesign}
      onCancel={handleCancel}
    />
  );
}

export default CustomizeFurniturePage;

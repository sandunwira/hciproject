import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../utils/Supabase';
import Navbar from '../components/Navbar';
import DesignPreview from '../components/DesignPreview';

function MyDesignsPage() {
  const { user } = useAuth();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchDesigns = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('designs')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: sortBy === 'oldest' });
          
        if (error) throw error;
        
        // Apply search filtering in-memory
        let filteredData = data;
        if (searchTerm) {
          const lowerSearchTerm = searchTerm.toLowerCase();
          filteredData = data.filter(design => 
            design.name.toLowerCase().includes(lowerSearchTerm)
          );
        }
        
        setDesigns(filteredData || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching designs:', err);
        setError('Failed to load your designs');
        setLoading(false);
      }
    };
    
    if (user) {
      fetchDesigns();
    }
  }, [user, sortBy, searchTerm]);

  const handleDelete = async (designId) => {
    if (!window.confirm('Are you sure you want to delete this design? This action cannot be undone.')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('designs')
        .delete()
        .eq('id', designId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      // Update the designs list after successful deletion
      setDesigns(designs.filter(design => design.id !== designId));
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete design. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">My Designs</h1>
            <Link
              to="/create"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm font-medium"
            >
              Create New Design
            </Link>
          </div>
          
          {error && (
            <div className="mb-6 bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          {/* Search and Sort Bar */}
          <div className="bg-gray-800 p-4 rounded-lg mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="w-full sm:w-1/2">
                <input
                  type="text"
                  placeholder="Search your designs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="sortBy" className="sr-only">Sort By</label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Designs List */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-blue-500">Loading your designs...</div>
            </div>
          ) : designs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {designs.map((design) => (
                <div key={design.id} className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-700 flex items-center justify-center overflow-hidden">
                    {design.thumbnail_url ? (
                      <img 
                        src={design.thumbnail_url} 
                        alt={design.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <DesignPreview 
                        design={design} 
                        className="w-full h-full p-4"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-medium text-white truncate">{design.name}</h2>
                    <p className="text-sm text-gray-400 mt-1">
                      Created: {new Date(design.created_at).toLocaleDateString()}
                    </p>
                    {design.room_properties && (
                      <p className="text-xs text-gray-500 mt-1">
                        {design.room_properties.width}cm × {design.room_properties.length}cm
                        {design.furniture_pieces?.length > 0 && 
                          ` • ${design.furniture_pieces.length} furniture piece${design.furniture_pieces.length !== 1 ? 's' : ''}`
                        }
                      </p>
                    )}
                    
                    <div className="mt-4 flex justify-between">
                      <Link 
                        to={`/design/${design.id}`}
                        className="text-blue-500 hover:text-blue-400 text-sm font-medium"
                      >
                        View
                      </Link>
                      <div className="flex space-x-4">
                        <Link 
                          to={`/edit/${design.id}`}
                          className="text-gray-400 hover:text-white text-sm font-medium"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(design.id)}
                          className="text-red-500 hover:text-red-400 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="mt-4 text-xl font-medium text-gray-400">No designs found</h3>
              <p className="mt-2 text-gray-500">
                {searchTerm ? 
                  'No designs match your search criteria' : 
                  'You haven\'t created any designs yet'
                }
              </p>
              <Link 
                to="/create" 
                className="mt-6 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
              >
                Create Your First Design
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyDesignsPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#0A1628]/90 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">Furniture<span className="text-blue-500">Viz</span></span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link to="/showcase" className="text-gray-300 hover:text-white transition-colors">
              Furniture Showcase
            </Link>
            {user && (
              <>
                <Link to="/room-planner/new" className="text-gray-300 hover:text-white transition-colors">
                  Room Planner
                </Link>
                <Link to="/my-designs" className="text-gray-300 hover:text-white transition-colors">
                  My Designs
                </Link>
              </>
            )}
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Auth Buttons / Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">{user.email?.substring(0, 2).toUpperCase() || 'U'}</span>
                  </div>
                </button>
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-800 rounded-lg shadow-xl hidden group-hover:block">
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                    Dashboard
                  </Link>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                    Profile
                  </Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                    Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Designer Login
                </Link>
                <Link to="/signup" className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 py-4 px-4">
          <div className="flex flex-col space-y-3">
            <Link to="/features" className="text-gray-300 hover:text-white transition-colors py-2">
              Features
            </Link>
            <Link to="/showcase" className="text-gray-300 hover:text-white transition-colors py-2">
              Furniture Showcase
            </Link>
            {user && (
              <>
                <Link to="/room-planner/new" className="text-gray-300 hover:text-white transition-colors py-2">
                  Room Planner
                </Link>
                <Link to="/my-designs" className="text-gray-300 hover:text-white transition-colors py-2">
                  My Designs
                </Link>
              </>
            )}
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors py-2">
              Contact
            </Link>
            {!user && (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors py-2">
                  Designer Login
                </Link>
                <Link to="/signup" className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

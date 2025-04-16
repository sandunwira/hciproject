import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  // This should be replaced with actual auth state management
  const isLoggedIn = false;

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
              Showcase
            </Link>
            <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          {/* Auth Buttons / Profile */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">JD</span>
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
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Designer Login
                </Link>
                <button className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

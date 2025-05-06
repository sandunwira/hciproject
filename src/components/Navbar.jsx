import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import * as DiceBear from '@dicebear/core';
import * as identiconStyle from '@dicebear/identicon';
import supabase from '../utils/Supabase';

function Navbar() {
	const navigate = useNavigate();
	const location = useLocation();
	const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const profileDropdownRef = useRef(null);
	const { user, signOut } = useAuth();
	const [userProfile, setUserProfile] = useState(null);

	const getUserInfo = async () => {
		try {
			if (!user) return null;

			const { data, error } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', user.id)
				.single();

			if (error) {
				console.error("Supabase profile error:", error);
				throw error;
			}

			if (data) {
				setUserProfile(data);
			}
		} catch (error) {
			console.error("Error fetching user data:", error);
			return null;
		}
	};

	useEffect(() => {
		getUserInfo();
	}, [user]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
				setIsProfileDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleLogout = async () => {
		try {
			await signOut();
			navigate('/');
		} catch (error) {
			console.error('Failed to logout:', error);
		}
	};

	const getNavLinkClass = (path) => {
		const isActive = location.pathname === path;
		return `flex items-center justify-center gap-2 text-sm font-medium ${isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white'} px-3 py-2 rounded-md transition duration-150`;
	};

	return (
		<nav className="bg-gray-900 shadow-md sticky top-0 z-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center">
						<Link to="/" className="flex-shrink-0">
							<h1 className="text-xl font-bold text-white">FurnitureViz</h1>
						</Link>
						<div className="hidden md:block ml-10">
							<div className="flex items-baseline space-x-4">
								<Link to="/" className={getNavLinkClass('/')}>
									Home
								</Link>
								{user && (
									<>
										<Link to="/create" className={getNavLinkClass('/create')}>
											Create Design
										</Link>
										<Link to="/designs" className={getNavLinkClass('/designs')}>
											My Designs
										</Link>
										<Link to="/gallery" className={getNavLinkClass('/gallery')}>
											Gallery
										</Link>
									</>
								)}
							</div>
						</div>
					</div>
					<div className="hidden md:block">
						<div className="ml-4 flex items-center md:ml-6">
							{user ? (
								<div className="relative" ref={profileDropdownRef}>
									<button
										onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
										className="flex items-center gap-2 bg-gray-800 p-1 rounded-full text-gray-200 hover:text-white focus:outline-none cursor-pointer"
									>
										<img
											src={DiceBear.createAvatar(identiconStyle, {
												seed: user.id,
												backgroundColor: ['3B82F6'],
												backgroundType: ['solid'],
											}).toDataUri()}
											alt="avatar"
											className="h-8 w-8 rounded-full border-2 border-blue-500"
										/>
										<svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
											<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
										</svg>
									</button>

									{isProfileDropdownOpen && (
										<div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
											<Link
												to="/profile"
												className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
											>
												Profile
											</Link>
											<Link
												to="/settings"
												className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
											>
												Settings
											</Link>
											<button
												onClick={handleLogout}
												className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
											>
												Sign out
											</button>
										</div>
									)}
								</div>
							) : (
								<Link to="/login"
									className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								>
									<svg xmlns="http://www.w3.org/2000/svg" className="mr-2 -ml-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
									</svg>
									Login
								</Link>
							)}
						</div>
					</div>
					
					{/* Mobile menu button */}
					<div className="md:hidden">
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
						>
							<span className="sr-only">Open main menu</span>
							{!isMobileMenuOpen ? (
								<svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
								</svg>
							) : (
								<svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu, toggle classes based on menu state */}
			{isMobileMenuOpen && (
				<div className="md:hidden">
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
						<Link to="/" className={location.pathname === '/' ? 
							'block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-800' : 
							'block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700'
						}>
							Home
						</Link>
						
						{user && (
							<>
								<Link to="/create" className={location.pathname === '/create' ? 
									'block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-800' : 
									'block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700'
								}>
									Create Design
								</Link>
								<Link to="/designs" className={location.pathname === '/designs' ? 
									'block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-800' : 
									'block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700'
								}>
									My Designs
								</Link>
								<Link to="/gallery" className={location.pathname === '/gallery' ? 
									'block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-800' : 
									'block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700'
								}>
									Gallery
								</Link>
							</>
						)}
					</div>
					
					<div className="pt-4 pb-3 border-t border-gray-700">
						{user ? (
							<>
								<div className="flex items-center px-5">
									<div className="flex-shrink-0">
										<img
											className="h-10 w-10 rounded-full"
											src={DiceBear.createAvatar(identiconStyle, {
												seed: user.id,
												backgroundColor: ['3B82F6'],
												backgroundType: ['solid'],
											}).toDataUri()}
											alt="Profile"
										/>
									</div>
									<div className="ml-3">
										<div className="text-base font-medium leading-none text-white">
											{userProfile?.display_name || 'Designer'}
										</div>
										<div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
									</div>
								</div>
								<div className="mt-3 px-2 space-y-1">
									<Link to="/profile" 
										className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
									>
										Your Profile
									</Link>
									<Link to="/settings"
										className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
									>
										Settings
									</Link>
									<button
										onClick={handleLogout}
										className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:text-red-300 hover:bg-gray-700"
									>
										Sign out
									</button>
								</div>
							</>
						) : (
							<div className="px-5">
								<Link to="/login"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
								>
									Login
								</Link>
								<Link to="/register"
									className="mt-2 w-full flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-200 bg-gray-800 hover:bg-gray-700"
								>
									Register
								</Link>
							</div>
						)}
					</div>
				</div>
			)}
		</nav>
	);
}

export default Navbar;
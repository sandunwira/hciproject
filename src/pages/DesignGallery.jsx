import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../utils/Supabase';
import Navbar from '../components/Navbar';
import DesignPreview from '../components/DesignPreview';

function DesignGalleryPage() {
	const { user } = useAuth();
	const [designs, setDesigns] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [filters, setFilters] = useState({
		sortBy: 'newest'
	});
	const [profilesData, setProfilesData] = useState({});

	useEffect(() => {
		const fetchDesigns = async () => {
			setLoading(true);
			try {
				// First, fetch designs
				let query = supabase
					.from('designs')
					.select('*')
					.order('created_at', { ascending: filters.sortBy === 'oldest' });

				const { data: designsData, error: designsError } = await query;

				if (designsError) throw designsError;

				// Then get unique user IDs from designs
				const userIds = [...new Set(designsData.map(design => design.user_id))];
				
				// Fetch profiles for those user IDs
				if (userIds.length > 0) {
					const { data: profilesData, error: profilesError } = await supabase
						.from('profiles')
						.select('id, username')
						.in('id', userIds);

					if (profilesError) throw profilesError;

					// Create a map of user_id to profile data for easy lookup
					const profilesMap = {};
					profilesData.forEach(profile => {
						profilesMap[profile.id] = profile;
					});
					setProfilesData(profilesMap);
				}

				let filteredData = designsData;
				if (searchTerm) {
					const lowerSearchTerm = searchTerm.toLowerCase();
					filteredData = designsData.filter(design =>
						design.name.toLowerCase().includes(lowerSearchTerm)
					);
				}

				setDesigns(filteredData || []);
				setLoading(false);
			} catch (err) {
				console.error('Error fetching designs:', err);
				setError('Failed to load designs gallery');
				setLoading(false);
			}
		};

		fetchDesigns();
	}, [filters, searchTerm]);

	const updateFilters = (key, value) => {
		setFilters({
			...filters,
			[key]: value
		});
	};

	// Helper function to get profile display name
	const getDisplayName = (userId) => {
		if (profilesData[userId]) {
			return profilesData[userId].username;
		}
		return 'Anonymous';
	};

	return (
		<>
			<Navbar />

			<div className="min-h-screen bg-gray-900 text-white py-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h1 className="text-3xl font-bold mb-6">Design Gallery</h1>

					{error && (
						<div className="mb-6 bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded">
							{error}
						</div>
					)}

					{/* Search and Filter Bar */}
					<div className="bg-gray-800 p-4 rounded-lg mb-8">
						<div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
							<div className="w-full md:w-1/3">
								<input
									type="text"
									placeholder="Search designs..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
								<div>
									<label htmlFor="sortBy" className="sr-only">Sort By</label>
									<select
										id="sortBy"
										value={filters.sortBy}
										onChange={(e) => updateFilters('sortBy', e.target.value)}
										className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									>
										<option value="newest">Newest First</option>
										<option value="oldest">Oldest First</option>
									</select>
								</div>
							</div>
						</div>
					</div>

					{/* Designs Gallery */}
					{loading ? (
						<div className="flex justify-center items-center h-64">
							<div className="text-blue-500">Loading designs...</div>
						</div>
					) : designs.length > 0 ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{designs.map((design) => (
								<div key={design.id} className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
									<div className="h-48 bg-gray-700 relative">
										{/* Design Preview/Thumbnail */}
										{design.thumbnail_url ? (
											<img
												src={design.thumbnail_url}
												alt={design.name}
												className="w-full h-full object-cover"
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center">
												<DesignPreview
													design={design}
													className="w-full h-full p-4"
												/>
											</div>
										)}

										{/* Design created by current user indicator */}
										{design.user_id === user?.id && (
											<div className="absolute top-2 right-2 bg-blue-600 text-xs text-white px-2 py-1 rounded-full">
												Your Design
											</div>
										)}
									</div>

									<div className="p-4">
										<h2 className="text-lg font-medium text-white truncate">{design.name}</h2>
										<p className="text-sm text-gray-400 mt-1">
											by {getDisplayName(design.user_id)}
										</p>
										<p className="text-xs text-gray-500 mt-1">
											{new Date(design.created_at).toLocaleDateString()}
										</p>

										<div className="mt-4 flex justify-between">
											{/* View option for all designs */}
											<Link
												to={`/design/${design.id}`}
												className="text-blue-500 hover:text-blue-400 text-sm font-medium"
											>
												View Details
											</Link>

											{/* Edit option only for user's designs */}
											{design.user_id === user?.id && (
												<Link
													to={`/edit/${design.id}`}
													className="text-gray-400 hover:text-white text-sm font-medium"
												>
													Edit
												</Link>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="bg-gray-800 rounded-lg p-12 text-center">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
							</svg>
							<h3 className="mt-4 text-xl font-medium text-gray-400">No designs found</h3>
							<p className="mt-2 text-gray-500">
								{searchTerm || filters.category !== 'all'
									? 'Try changing your search or filter criteria'
									: 'Be the first to share a design with the community!'}
							</p>
							<Link
								to="/create"
								className="mt-6 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
							>
								Create a Design
							</Link>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default DesignGalleryPage;

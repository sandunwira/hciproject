import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import headerImage from '../assets/header.jpg';

import Navbar from '../components/Navbar';

function HomePage() {
	const { user } = useAuth();

	return (
		<>
			<Navbar />

			<div className="w-full min-h-screen bg-gray-900 text-white">
				{/* Hero Section */}
				<div className="relative bg-gray-900 overflow-hidden">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="pt-10 pb-20 md:pt-16 lg:pt-20 lg:pb-28 flex flex-col lg:flex-row items-center">
							{/* Left content - Text */}
							<div className="lg:flex-1 lg:pr-8 z-10 mb-10 lg:mb-0">
								<div className="text-center lg:text-left">
									<h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
										<span className="block xl:inline">Design Your</span>{' '}
										<span className="block text-blue-500 xl:inline">Perfect Space</span>
									</h1>
									<p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
										Visualize furniture in your space before you buy. Our 3D visualization tool helps you design the perfect room with confidence.
									</p>
									<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
										{user ? (
											<div className="rounded-md shadow">
												<Link
													to="/create"
													className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
												>
													Create New Design
												</Link>
											</div>
										) : (
											<div className="rounded-md shadow">
												<Link
													to="/login"
													className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
												>
													Get Started
												</Link>
											</div>
										)}
										<div className="mt-3 sm:mt-0 sm:ml-3">
											<a
												href="#features"
												className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-400 bg-gray-800 hover:bg-gray-700 md:py-4 md:text-lg md:px-10"
											>
												Learn More
											</a>
										</div>
									</div>
								</div>
							</div>
							
							{/* Right content - Image */}
							<div className="lg:flex-1 w-full">
								<div className="h-56 w-full bg-gray-800 sm:h-72 md:h-96 rounded-lg shadow-lg overflow-hidden relative">
									<div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20"></div>
									<div className="relative h-full w-full p-4 flex items-center justify-center">
										<img 
											src={headerImage} 
											alt="3D Room Visualization" 
											className="max-h-full object-contain rounded-md"
											onError={(e) => {
												e.target.onerror = null;
												e.target.style.display = 'none';
												document.getElementById('fallbackIcon').style.display = 'block';
											}}
										/>
										<div id="fallbackIcon" style={{display: 'none'}} className="text-center">
											<svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
											</svg>
											<span className="block text-blue-400 text-xl mt-2">3D Room Visualization</span>
											<span className="text-gray-300 text-sm block mt-1">Design your perfect space</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* How It Works Section */}
				<div className="py-16 bg-gray-900">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center">
							<h2 className="text-base text-blue-500 font-semibold tracking-wide uppercase">How It Works</h2>
							<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
								Simple Design Process
							</p>
							<p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
								Get your perfect furniture layout in just a few simple steps.
							</p>
						</div>

						<div className="mt-16">
							<div className="flex flex-wrap justify-center gap-8">
								{[
									{
										icon: (
											<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
											</svg>
										),
										title: "1. Create Your Room",
										description: "Define your room dimensions and basic layout."
									},
									{
										icon: (
											<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
											</svg>
										),
										title: "2. Add Furniture",
										description: "Choose from our library or add custom pieces."
									},
									{
										icon: (
											<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
											</svg>
										),
										title: "3. Visualize",
										description: "View your design in 2D and 3D perspectives."
									},
									{
										icon: (
											<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
											</svg>
										),
										title: "4. Save & Share",
										description: "Save your design and share with others."
									},
								].map((step, index) => (
									<div key={index} className="w-64 p-6 bg-gray-800 rounded-lg shadow-md flex flex-col items-center text-center">
										<div className="mb-4 text-blue-500">
											{step.icon}
										</div>
										<h3 className="text-xl font-medium text-white">{step.title}</h3>
										<p className="mt-2 text-sm text-gray-400">{step.description}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Features Section */}
				<div id="features" className="py-12 bg-gray-800">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="lg:text-center">
							<h2 className="text-base text-blue-500 font-semibold tracking-wide uppercase">Features</h2>
							<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
								Design with Confidence
							</p>
							<p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
								Our visualization tools help designers and customers make the best furniture choices.
							</p>
						</div>

						<div className="mt-10">
							<div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
								{[
									{
										icon: (
											<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
											</svg>
										),
										title: "2D & 3D Visualization",
										description: "Toggle between 2D and 3D views to get the perfect perspective of your furniture design."
									},
									{
										icon: (
											<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
											</svg>
										),
										title: "Room Customization",
										description: "Specify room dimensions, shape, and color scheme to match your client's space perfectly."
									},
									{
										icon: (
											<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
											</svg>
										),
										title: "Furniture Library",
										description: "Choose from our extensive catalog of chairs, tables, and other furniture pieces."
									},
									{
										icon: (
											<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
											</svg>
										),
										title: "Save & Share",
										description: "Save designs to revisit later or share with clients for approval."
									},
									{
										icon: (
											<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
											</svg>
										),
										title: "Color & Shading Options",
										description: "Adjust colors and shading of individual furniture elements or the entire design."
									},
									{
										icon: (
											<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
											</svg>
										),
										title: "Size Scaling Tools",
										description: "Scale furniture pieces to ensure they perfectly fit the room's dimensions."
									},
								].map((feature) => (
									<div key={feature.title} className="relative">
										<div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-blue-600 text-white">
											{feature.icon}
										</div>
										<div className="ml-16">
											<h3 className="text-lg font-medium text-white">{feature.title}</h3>
											<p className="mt-2 text-base text-gray-400">{feature.description}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* CTA Section */}
				<div className="py-16 bg-blue-600">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-3xl font-extrabold text-white sm:text-4xl">
							Ready to design your perfect space?
						</h2>
						<p className="mt-4 text-xl text-blue-100">
							Start creating your furniture visualization today – it's free to get started.
						</p>
						<div className="mt-8 flex justify-center">
							<div className="inline-flex rounded-md shadow">
								<Link
									to={user ? "/create" : "/login"}
									className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
								>
									{user ? "Create New Design" : "Get Started Free"}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default HomePage;
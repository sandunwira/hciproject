import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdvancedChairViewer from '../components/AdvancedChairModel';
import TableViewer from '../components/TableModel';
import CabinetViewer from '../components/CabinetModel';

function HomePage() {
	return (
		<>
			<Navbar />
			<div className="w-full min-h-screen bg-[#0A1628] text-white">
				{/* Hero Section */}
				<header className="container mx-auto px-4 py-24 mt-20 text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-4">
						Design your Dream Room
						<span className="block text-white">with FurnitureViz</span>
					</h1>
					<p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
						Visualize furniture in your space before you buy. Transform your rooms with our
						advanced 2D and 3D visualization tools designed for professional interior designers.
					</p>
					<div className="flex justify-center gap-4">
						<Link to="/login" className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
							Designer Login
						</Link>
						<button className="border border-gray-600 px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
							Learn More
						</button>
					</div>
				</header>

				{/* Features Section */}
				<section className="container mx-auto px-4 py-16">
					<h2 className="text-3xl font-bold text-center mb-12">
						Everything designers need to visualize furniture for clients
					</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
						<div className="flex flex-col gap-4 p-6 bg-gray-800 rounded-lg">
							<div className="bg-blue-500 p-3 rounded-lg h-fit w-fit">
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
								</svg>
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Room Customization</h3>
								<p className="text-gray-400">Set room size, shape, and color scheme to create a personalized design environment for your clients.</p>
							</div>
						</div>

						<div className="flex flex-col gap-4 p-6 bg-gray-800 rounded-lg">
							<div className="bg-blue-500 p-3 rounded-lg h-fit w-fit">
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
								</svg>
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">3D Visualization</h3>
								<p className="text-gray-400">Transform 2D designs into immersive 3D models to help clients visualize their future spaces.</p>
							</div>
						</div>

						<div className="flex flex-col gap-4 p-6 bg-gray-800 rounded-lg">
							<div className="bg-blue-500 p-3 rounded-lg h-fit w-fit">
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
								</svg>
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Color & Shading</h3>
								<p className="text-gray-400">Modify colors and add realistic shading to furniture items individually or as a whole design.</p>
							</div>
						</div>

						<div className="flex flex-col gap-4 p-6 bg-gray-800 rounded-lg">
							<div className="bg-blue-500 p-3 rounded-lg h-fit w-fit">
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
								</svg>
							</div>
							<div>
								<h3 className="text-xl font-semibold mb-2">Save Designs</h3>
								<p className="text-gray-400">Store and retrieve client designs for future modifications and presentations.</p>
							</div>
						</div>
					</div>
				</section>

				{/* Design Process Section */}
				<section className="container mx-auto px-4 py-16">
					<h2 className="text-3xl font-bold text-center mb-12">
						Our Design Process
					</h2>
					<div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
						<div className="bg-gray-800 p-6 rounded-lg text-center">
							<div className="bg-blue-500 text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">1</div>
							<h3 className="text-xl font-semibold mb-4">Create Room Profile</h3>
							<p className="text-gray-400">Input room dimensions, shape, and existing color schemes to create a digital twin of your client's space.</p>
						</div>

						<div className="bg-gray-800 p-6 rounded-lg text-center">
							<div className="bg-blue-500 text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">2</div>
							<h3 className="text-xl font-semibold mb-4">Add Furniture</h3>
							<p className="text-gray-400">Browse our catalog of chairs, tables, and other items to place in the design. Adjust sizes and positions as needed.</p>
						</div>

						<div className="bg-gray-800 p-6 rounded-lg text-center">
							<div className="bg-blue-500 text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">3</div>
							<h3 className="text-xl font-semibold mb-4">Visualize in 3D</h3>
							<p className="text-gray-400">Transform your 2D design into an immersive 3D model that you can rotate and explore with your clients.</p>
						</div>
					</div>
				</section>

				{/* Furniture Categories */}
				<section className="container mx-auto px-4 py-16">
					<h2 className="text-3xl font-bold text-center mb-4">
						Our Furniture Collection
					</h2>
					<p className="text-center text-gray-400 mb-12">Explore our extensive catalog of high-quality furniture for every room</p>
					<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						<div className="bg-gray-800 p-6 rounded-lg text-center">
							<div className="h-48 bg-gray-700 rounded-lg mb-4 overflow-hidden">
								<Suspense fallback={
									<div className="w-full h-full flex items-center justify-center">
										<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
									</div>
								}>
									<AdvancedChairViewer />
								</Suspense>
							</div>
							<h3 className="text-xl font-semibold mb-2">Chairs</h3>
							<p className="text-gray-400 mb-4">Dining chairs, armchairs, recliners, and more</p>
							<button className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors">Browse Chairs</button>
						</div>

						<div className="bg-gray-800 p-6 rounded-lg text-center">
							<div className="h-48 bg-gray-700 rounded-lg mb-4 overflow-hidden">
								<Suspense fallback={
									<div className="w-full h-full flex items-center justify-center">
										<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
									</div>
								}>
									<TableViewer />
								</Suspense>
							</div>
							<h3 className="text-xl font-semibold mb-2">Tables</h3>
							<p className="text-gray-400 mb-4">Dining tables, coffee tables, side tables, and desks</p>
							<button className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors">Browse Tables</button>
						</div>

						<div className="bg-gray-800 p-6 rounded-lg text-center">
							<div className="h-48 bg-gray-700 rounded-lg mb-4 overflow-hidden">
								<Suspense fallback={
									<div className="w-full h-full flex items-center justify-center">
										<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
									</div>
								}>
									<CabinetViewer />
								</Suspense>
							</div>
							<h3 className="text-xl font-semibold mb-2">Other Furniture</h3>
							<p className="text-gray-400 mb-4">Cabinets, shelves, sofas, and more for complete room design</p>
							<button className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors">Browse Collection</button>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="bg-blue-500 py-16">
					<div className="container mx-auto px-4 text-center">
						<h2 className="text-3xl font-bold mb-4">
							Ready to start designing for your clients?
						</h2>
						<p className="mb-8">Log in to access our professional furniture design tools.</p>
						<Link to="/login" className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
							Designer Login
						</Link>
					</div>
				</section>
			</div>
			<Footer />
		</>
	);
}

export default HomePage;

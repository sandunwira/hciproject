import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/Profile';
import CreateDesignPage from './pages/CreateDesign';
import EditDesignPage from './pages/EditDesign';
import ViewDesignPage from './pages/ViewDesign';
import DesignGalleryPage from './pages/DesignGallery';
import MyDesignsPage from './pages/MyDesigns';
import SettingsPage from './pages/Settings';

// Protected route component
function ProtectedRoute({ children }) {
	const { user, loading } = useAuth();

	if (loading) return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;

	if (!user) return <Navigate to="/login" />;

	return children;
}

function AppRoutes() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/profile" element={
					<ProtectedRoute>
						<ProfilePage />
					</ProtectedRoute>
				} />
				<Route path="/settings" element={
					<ProtectedRoute>
						<SettingsPage />
					</ProtectedRoute>
				} />
				<Route path="/create" element={
					<ProtectedRoute>
						<CreateDesignPage />
					</ProtectedRoute>
				} />
				<Route path="/edit/:designId" element={
					<ProtectedRoute>
						<EditDesignPage />
					</ProtectedRoute>
				} />
				<Route path="/design/:designId" element={
					<ProtectedRoute>
						<ViewDesignPage />
					</ProtectedRoute>
				} />
				<Route path="/gallery" element={
					<ProtectedRoute>
						<DesignGalleryPage />
					</ProtectedRoute>
				} />
				<Route path="/designs" element={
					<ProtectedRoute>
						<MyDesignsPage />
					</ProtectedRoute>
				} />
			</Routes>
		</Router>
	);
}


function App() {
	return (
		<AuthProvider>
			<AppRoutes />
		</AuthProvider>
	)
}

export default App;
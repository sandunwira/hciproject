import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../utils/Supabase';

import Navbar from '../components/Navbar';

function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const { signIn } = useAuth();

	const redirectMessage = location.state?.message;

	// Check if the user is logged in
	useEffect(() => {
		const checkUserSession = async () => {
			const { data } = await supabase.auth.getSession();
			if (data.session) {
				// User is logged in, redirect to profile page
				navigate('/');
			}
		};
		checkUserSession();
	}, [navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			const { error } = await signIn(email, password);
			if (error) throw error;
			navigate('/profile');
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Navbar />

			<div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
						<p className="mt-2 text-center text-sm text-gray-400">
							Or{' '}
							<Link to="/register" className="font-medium text-blue-500 hover:text-blue-400">
								create a new account
							</Link>
						</p>
					</div>
					<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
						{error && <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded">{error}</div>}
						{redirectMessage && <div className="bg-yellow-900/50 border border-yellow-500 text-yellow-300 px-4 py-3 rounded">{redirectMessage}</div>}
						
						<div className="rounded-md -space-y-px">
							<div>
								<label htmlFor="email-address" className="sr-only">Email address</label>
								<input
									id="email-address"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="appearance-none rounded-t-md relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
									placeholder="Email address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor="password" className="sr-only">Password</label>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="appearance-none rounded-b-md relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								disabled={loading}
								className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
							>
								{loading ? 'Signing in...' : 'Sign in'}
							</button>
						</div>

						<div className="text-center text-sm text-gray-400">
							<p>Don't have an account? <Link to="/register" className="font-medium text-blue-500 hover:text-blue-400">Register</Link></p>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default LoginPage;
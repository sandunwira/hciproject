import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../utils/Supabase';

import Navbar from '../components/Navbar';

function RegisterPage() {
	const [username, setUsername] = useState('');
	const [usernameError, setUsernameError] = useState("");
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { signUp, validateUsername } = useAuth();

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

	const handleUsernameChange = (e) => {
		const value = e.target.value;
		setUsername(value);

		// Only validate if there's input
		if (value) {
			const validation = validateUsername(value);
			if (!validation.isValid) {
				setUsernameError(validation.message);
			} else {
				setUsernameError("");
			}
		} else {
			setUsernameError("");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		// Validate username before submission
		if (username) {
			const validation = validateUsername(username);
			if (!validation.isValid) {
				setUsernameError(validation.message);
				return;
			}
		}

		setLoading(true);

		try {
			const { error } = await signUp(username, name, email, password);
			if (error) throw error;
			navigate('/login');
			alert('Check your email for the confirmation link!');
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
						<h2 className="mt-6 text-center text-3xl font-extrabold text-white">Create a designer account</h2>
						<p className="mt-2 text-center text-sm text-gray-400">
							Or{' '}
							<Link to="/login" className="font-medium text-blue-500 hover:text-blue-400">
								sign in to your existing account
							</Link>
						</p>
					</div>
					<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
						{error && <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded">{error}</div>}
						
						<div className="rounded-md -space-y-px">
							<div>
								<label htmlFor="username" className="sr-only">Username</label>
								<input
									id="username"
									name="username"
									type="text"
									autoComplete="username"
									required
									className="appearance-none rounded-t-md relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
									placeholder="Username"
									value={username}
									onChange={handleUsernameChange}
								/>
								{usernameError && (
									<div className="text-red-400 text-xs mt-1 ml-1">{usernameError}</div>
								)}
							</div>
							<div>
								<label htmlFor="name" className="sr-only">Full Name</label>
								<input
									id="name"
									name="name"
									type="text"
									autoComplete="name"
									required
									className="appearance-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
									placeholder="Full Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor="email-address" className="sr-only">Email address</label>
								<input
									id="email-address"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="appearance-none relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
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
									autoComplete="new-password"
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
								{loading ? 'Creating account...' : 'Create Account'}
							</button>
						</div>

						<div className="text-center text-sm text-gray-400">
							<p>Already have an account? <Link to="/login" className="font-medium text-blue-500 hover:text-blue-400">Sign in</Link></p>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default RegisterPage;
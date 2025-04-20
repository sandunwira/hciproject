import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      setLoading(true);

      const { error } = await signIn({ email, password });

      if (error) throw error;

      // Redirect to dashboard on successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in:', error.message);
      setError(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to handle demo login
  const handleDemoLogin = async () => {
    setEmail('demo@furnitureviz.com');
    setPassword('demo123');

    try {
      setError('');
      setLoading(true);

      const { error } = await signIn({
        email: 'demo@furnitureviz.com',
        password: 'demo123'
      });

      if (error) throw error;

      // Redirect to dashboard on successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in with demo account:', error.message);
      setError(error.message || 'Failed to sign in with demo account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-[#0A1628] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Designer Login</h1>

            {error && (
              <div className="bg-red-800/50 text-red-200 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold py-3 px-6 rounded-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full bg-gray-600 hover:bg-gray-700 transition-colors text-white font-semibold py-3 px-6 rounded-lg mt-2"
              >
                Use Demo Account
              </button>
              <p className="text-gray-400 mt-4">
                Forgot your password?{' '}
                <Link to="/reset-password" className="text-blue-400 hover:underline">
                  Reset it here
                </Link>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-400 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          <div className="max-w-md mx-auto mt-8 p-6 bg-gray-800/50 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Demo Credentials</h2>
            <p className="text-gray-300 mb-2">For demonstration purposes, you can use:</p>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-300"><strong>Email:</strong> demo@furnitureviz.com</p>
              <p className="text-gray-300"><strong>Password:</strong> demo123</p>
            </div>
            <p className="text-gray-400 mt-4 text-sm">
              Note: These credentials are for demonstration only and provide limited access.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;

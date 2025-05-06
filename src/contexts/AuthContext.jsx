import { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../utils/Supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Check for active session on load
		const getSession = async () => {
			const { data, error } = await supabase.auth.getSession();

			if (error) {
				console.error('Error fetching session:', error);
			}

			setUser(data?.session?.user || null);
			setLoading(false);
		};

		getSession();

		// Listen for auth changes
		const { data: { subscription } } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setUser(session?.user || null);
			}
		);

		return () => {
			subscription?.unsubscribe();
		};
	}, []);

	// Function to validate username
	const validateUsername = (username) => {
		// Check for spaces
		if (/\s/.test(username)) {
			return { isValid: false, message: "Username cannot contain spaces" };
		}

		// Check for uppercase letters
		if (/[A-Z]/.test(username)) {
			return { isValid: false, message: "Username cannot contain uppercase letters" };
		}

		// Check for symbols (allowing only lowercase letters, numbers, and underscores)
		if (!/^[a-z0-9_]+$/.test(username)) {
			return { isValid: false, message: "Username can only contain lowercase letters, numbers, and underscores" };
		}

		// Check minimum length (optional)
		if (username.length < 3) {
			return { isValid: false, message: "Username must be at least 3 characters long" };
		}

		// Check maximum length (optional)
		if (username.length > 30) {
			return { isValid: false, message: "Username cannot exceed 30 characters" };
		}

		// All validations passed
		return { isValid: true, message: "Username is valid" };
	};

	const signUp = async (username, name, email, password) => {
		try {
			// Validate username first
			const usernameValidation = validateUsername(username);
			if (!usernameValidation.isValid) {
				throw new Error(usernameValidation.message);
			}

			// First check if username already exists
			const { data: existingUsers, error: usernameCheckError } = await supabase
				.from('profiles')
				.select('username')
				.eq('username', username);

			if (usernameCheckError) throw usernameCheckError;

			// Check if any users were found with this username
			if (existingUsers && existingUsers.length > 0) {
				throw new Error('Username already taken');
			}

			// Create auth user
			const { data, error: signUpError } = await supabase.auth.signUp({
				email: email,
				password: password,
				options: {
					data: {
						display_name: name
					}
				}
			});

			if (signUpError) throw signUpError;

			// Create user entry
			const { error: profileError } = await supabase
				.from('profiles')
				.insert([{
					id: data.user.id,
					username: username,
					email_address: email,
					display_name: name,
				}]);

			if (profileError) throw profileError;

			return { data, error: null };
		} catch (error) {
			console.error('Signup error:', error.message);
			return { data: null, error };
		}
	};

	const signIn = (email, password) => {
		return supabase.auth.signInWithPassword({ email, password });
	};

	// Add this new function to check user roles
	const checkUserRole = async (userId) => {
		try {
			if (!userId) return null;

			const { data, error } = await supabase
				.from('profiles')
				.select('role')
				.eq('id', userId)
				.single();

			if (error) {
				console.error('Error fetching user role:', error);
				return null;
			}

			return data?.role || 'user';
		} catch (error) {
			console.error('Error in checkUserRole:', error);
			return null;
		}
	};

	const signOut = () => {
		return supabase.auth.signOut();
	};

	return (
		<AuthContext.Provider value={{
			user,
			loading,
			signUp,
			signIn,
			signOut,
			validateUsername,
			checkUserRole
		}}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
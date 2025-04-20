import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockSignUp, mockSignIn, mockSignOut, initMockAuth } from '../services/mockAuth';

// Always use mock auth in production to avoid Supabase connection issues
const USE_MOCK_AUTH = true;

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize auth
    const initAuth = async () => {
      try {
        // Always use mock auth
        if (USE_MOCK_AUTH) {
          const storedUser = initMockAuth();
          setUser(storedUser);
        } else {
          // This branch is never executed but kept for reference
          throw new Error('External auth not supported');
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Fallback to mock auth if external auth fails
        const storedUser = initMockAuth();
        setUser(storedUser);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const value = {
    signUp: async (data) => {
      const result = await mockSignUp(data);
      if (!result.error) {
        setUser(result.user);
      }
      return result;
    },
    signIn: async (data) => {
      const result = await mockSignIn(data);
      if (!result.error) {
        setUser(result.user);
      }
      return result;
    },
    signOut: async () => {
      const result = await mockSignOut();
      if (!result.error) {
        setUser(null);
      }
      return result;
    },
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
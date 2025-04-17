import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockSignUp, mockSignIn, mockSignOut, initMockAuth } from '../services/mockAuth';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize mock auth and get stored user
    const storedUser = initMockAuth();
    setUser(storedUser);
    setLoading(false);
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
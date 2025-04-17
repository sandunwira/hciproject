// Mock authentication service for local development

// Mock user database (in a real app, this would be in a database)
const mockUsers = [
  {
    id: '1',
    email: 'demo@furnitureviz.com',
    password: 'demo123', // In a real app, passwords would be hashed
  }
];

// Get user from localStorage
const getStoredUser = () => {
  try {
    const user = localStorage.getItem('mockAuthUser');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting stored user:', error);
    return null;
  }
};

// Store user in localStorage
const storeUser = (user) => {
  try {
    // Remove password before storing
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem('mockAuthUser', JSON.stringify(userWithoutPassword));
  } catch (error) {
    console.error('Error storing user:', error);
  }
};

// Sign up a new user
export const mockSignUp = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if user already exists
      const existingUser = mockUsers.find(user => user.email === email);
      if (existingUser) {
        return resolve({
          error: { message: 'User with this email already exists' }
        });
      }

      // Create new user
      const newUser = {
        id: String(mockUsers.length + 1),
        email,
        password
      };
      
      // Add to mock database
      mockUsers.push(newUser);
      
      // Store user in localStorage (without password)
      const { password: _, ...userWithoutPassword } = newUser;
      storeUser(userWithoutPassword);
      
      resolve({ user: userWithoutPassword, error: null });
    }, 500); // Simulate network delay
  });
};

// Sign in a user
export const mockSignIn = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Find user
      const user = mockUsers.find(user => user.email === email);
      
      // Check if user exists and password matches
      if (!user || user.password !== password) {
        return resolve({
          error: { message: 'Invalid email or password' }
        });
      }
      
      // Store user in localStorage (without password)
      const { password: _, ...userWithoutPassword } = user;
      storeUser(userWithoutPassword);
      
      resolve({ user: userWithoutPassword, error: null });
    }, 500); // Simulate network delay
  });
};

// Sign out a user
export const mockSignOut = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem('mockAuthUser');
      resolve({ error: null });
    }, 300); // Simulate network delay
  });
};

// Get the current user
export const mockGetUser = () => {
  return getStoredUser();
};

// Initialize the mock auth system
export const initMockAuth = () => {
  // Check if demo user exists, if not add it
  if (!mockUsers.find(user => user.email === 'demo@furnitureviz.com')) {
    mockUsers.push({
      id: '1',
      email: 'demo@furnitureviz.com',
      password: 'demo123',
    });
  }
  
  // Return the current user if stored
  return getStoredUser();
};

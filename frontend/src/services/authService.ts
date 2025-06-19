import axios from 'axios';

const API_URL = '/api/auth';

// This is a placeholder service for authentication
// It will be replaced with actual API calls in the implementation

const login = async (email: string, password: string) => {
  try {
    // Simulate API call
    // In real implementation, this would be:
    // const response = await axios.post(`${API_URL}/login`, { email, password });
    // return response.data;
    
    // Mock response for demonstration
    return {
      user: {
        id: '1',
        name: 'Test User',
        email: email,
      },
      token: 'mock-jwt-token',
    };
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};

const register = async (name: string, email: string, password: string) => {
  try {
    // Simulate API call
    // In real implementation, this would be:
    // const response = await axios.post(`${API_URL}/register`, { name, email, password });
    // return response.data;
    
    // Mock response for demonstration
    return {
      user: {
        id: '1',
        name: name,
        email: email,
      },
      token: 'mock-jwt-token',
    };
  } catch (error) {
    throw new Error('Registration failed');
  }
};

const logout = async () => {
  // In real implementation, this might include API calls to invalidate tokens
  localStorage.removeItem('token');
};

const authService = {
  login,
  register,
  logout,
};

export default authService;

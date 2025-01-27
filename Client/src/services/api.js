import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Replace with your backend URL
const Bank_Api_URL = 'http://localhost:5000/api';

// Create an axios instance for authenticated requests
const api = axios.create({
  baseURL: Bank_Api_URL,
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Register user
export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, formData, {
      headers: {
        'Content-Type': 'application/json', // Set Content-Type to application/json
      },
    });
    return response.data;
  } catch (error) {
    // Log the error to console for debugging
    console.error('Registration error:', error);

    // Check if error is from the response (backend error)
    if (error.response) {
      throw new Error(error.response.data.message || 'Error during registration');
    } else if (error.request) {
      // Request was made but no response was received
      throw new Error('No response from server during registration');
    } else {
      // Something else caused the error
      throw new Error(error.message || 'An error occurred during registration');
    }
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'Error during login');
    } else if (error.request) {
      throw new Error('No response from server during login');
    } else {
      throw new Error(error.message || 'An error occurred during login');
    }
  }
};

// Fetch user's bank accounts
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

// Fetch user's bank accounts
export const getBankAccounts = async () => {
  try {
    const response = await axios.get(`${Bank_Api_URL}/bank`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching bank accounts:', error);
    throw new Error(error.response?.data?.message || 'Error fetching bank accounts');
  }
};

// Add a new bank account
export const addBankAccount = async (form) => {
  try {
    const response = await axios.post(`${Bank_Api_URL}/bank`, form, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error adding bank account:', error);
    throw new Error(error.response?.data?.message || 'Error adding bank account');
  }
};

// Update an existing bank account
export const updateBankAccount = async (id, form) => {
  try {
    const response = await axios.put(`${Bank_Api_URL}/bank/${id}`, form, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Error updating bank account:', error);
    throw new Error(error.response?.data?.message || 'Error updating bank account');
  }
};

// Delete a bank account
export const deleteBankAccount = async (id) => {
  try {
    await axios.delete(`${Bank_Api_URL}/bank/${id}`, {
      headers: getAuthHeaders(),
    });
  } catch (error) {
    console.error('Error deleting bank account:', error);
    throw new Error(error.response?.data?.message || 'Error deleting bank account');
  }
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Admin API Calls
export const getAllUsers = async () => {
  try {
    const response = await api.get('/admin/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getAllBankAccounts = async () => {
  try {
    const response = await api.get('/admin/bank-accounts');
    return response.data;
  } catch (error) {
    console.error('Error fetching bank accounts:', error);
    throw error;
  }
};

export const searchUsers = async (query) => {
  try {
    const response = await api.get(`/admin/users/search/${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};
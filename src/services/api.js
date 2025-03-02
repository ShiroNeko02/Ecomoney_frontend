import axios from "axios";

// Backend API base URL from .env
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to handle errors
const handleRequest = async (request) => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

export const deviceService = {
  getDevices: () => handleRequest(() => api.get("/devices")),
  getDeviceById: (id) => handleRequest(() => api.get(`/devices/${id}`)),
  createDevice: (deviceData) =>
    handleRequest(() => api.post("/devices", deviceData)),
  updateDevice: (id, updateData) =>
    handleRequest(() => api.put(`/devices/${id}`, updateData)),
  deleteDevice: (id) => handleRequest(() => api.delete(`/devices/${id}`)),
};

export const userService = {
  // Get current user data
  getCurrentUser: () => handleRequest(() => api.get("/users")),

  // Sign in (login) a user
  signIn: (userData) => handleRequest(() => api.post(`/users/login`, userData)),

  // Sign up a new user
  signUp: (userData) => handleRequest(() => api.post(`/users/signup`, userData)),

  // Sign out (logout) a user
  signOut: (userData) => handleRequest(() => api.post(`/users/logout`, userData)),

  // Update user data (other than consumption goal)
  updateUser: (id, updateData) => handleRequest(() => api.put(`/users/${id}`, updateData)),

  // Update user's consumption goal (after sign-up)
  updateConsumptionGoal: (id, goal) =>
    handleRequest(() => api.put(`/users/${id}/consumption_goal`, { consumption_goal_euros: goal })),

  // Delete user account
  deleteUser: (id) => handleRequest(() => api.delete(`/users/${id}`)),
};

export const suggestionService = {
  getSuggestions: () => handleRequest(() => api.get("/suggestions")),
  getSuggestionsById: (id) => handleRequest(() => api.get(`/suggestions/${id}`)),
  createSuggestion: (suggestionData) =>
    handleRequest(() => api.post("/suggestions", suggestionData)),
  updateSuggestion: (id, updateData) =>
    handleRequest(() => api.put(`/suggestions/${id}`, updateData)),
  deleteSuggestion: (id) => handleRequest(() => api.delete(`/suggestions/${id}`)),
};



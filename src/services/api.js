import axios from "axios";

// Backend API base URL from .env
const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajouter l'intercepteur pour les requêtes
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

// Pour gérer la déconnexion automatique
const handleRequest = async (request) => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    console.error('API Error Details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    if (error.response?.status === 401) {
      // Si le token est invalide ou expiré, déconnecter l'utilisateur
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/signIn';
    }
    throw {
      ...error,
      message: error.response?.data?.message || error.message,
      details: error.response?.data
    };  }
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

export const deviceUserService = {
  getDevicesUsers: () => handleRequest(() => api.get("/device_users")),
  getDeviceUserById: (id) => handleRequest(() => api.get(`/device_users/${id}`)),
  createDeviceUser: (deviceData) =>
    handleRequest(() => api.post("/device_users", deviceData)),
  updateDeviceUser: (id, updateData) =>
    handleRequest(() => api.put(`/devices_users/${id}`, updateData)),
  deleteDeviceUser: (id) => handleRequest(() => api.delete(`/device_users/${id}`)),
};

export const userService = {
  // Get current user data
  getCurrentUser: () => handleRequest(() => api.get("/user")),

  // Get current user id
  getCurrentUserId: () => handleRequest(() => api.get("/user/id")),

  // Sign in (login) a user
  signIn: async (userData) => {
    try {
      const response = await api.post("/user/login", userData);
      const { access_token, ...user } = response.data;
      if (access_token) {
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(user));
      }
      return response.data;
    } catch (error) {
      console.error("SignIn Error:", error);
      throw error;
    }
  },

  // Sign up a new user
  signUp: (userData) => handleRequest(() => api.post("/user/signup", userData)),

  // Sign out (logout) a user
  signOut: async () => {
    const token = localStorage.getItem('token');
    try {
      await api.post("/user/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error("SignOut Error:", error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  // Update user data (other than consumption goal)
  updateUser: (updateData) => handleRequest(() => api.put("/user/profile", updateData)),

  // Get current goal
  getCurrentGoal: () => handleRequest(() => api.get("/user/goal")),

  // Update user's consumption goal (after sign-up)
  updateConsumptionGoal: (goal) =>
    handleRequest(() => api.put("/user/goal", { consumption_goal_euros: goal })),

  // Update password
  changePassword: (currentPassword, newPassword) =>
    handleRequest(() => api.put("/user/password", { current_password: currentPassword, new_password: newPassword })),

 // Send password reset email
  requestPasswordReset: (email) =>
    handleRequest(() => api.post("/user/password/reset", { email })),

  // Choose the new password after reset
  chooseNewPassword: (newPassword, access_token) =>
    handleRequest(() => api.put("/user/password/choose-new", { new_password: newPassword, access_token: access_token })),

  // Delete user account
  deleteUser: () => handleRequest(() => api.delete("/user")),
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

export const trackSuggestionService = {
  getSuggestions: () => handleRequest(() => api.get("/track_suggestions")),
  getSuggestionsById: (id) => handleRequest(() => api.get(`/track_suggestions/${id}`)),
  createSuggestion: (suggestionData) =>
    handleRequest(() => api.post("/track_suggestions", suggestionData)),
  updateSuggestion: (id, updateData) =>
    handleRequest(() => api.put(`/track_suggestions/${id}`, updateData)),
  deleteSuggestion: (id) => handleRequest(() => api.delete(`/suggestions/${id}`)),
};

export const roomService = {
  getRooms: () => handleRequest(() => api.get("/rooms")),
  getRoomById: (id) => handleRequest(() => api.get(`/rooms/${id}`)),
  createRoom: (roomData) =>
    handleRequest(() => api.post(`/rooms/${roomData}`, roomData)),
  updateRoom: (id) =>
    handleRequest(() => api.post(`/rooms/${id}`)),
  deleteRoom: (id) => handleRequest(() => api.delete(`/rooms/${id}`)),
}

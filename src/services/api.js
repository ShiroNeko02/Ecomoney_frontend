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

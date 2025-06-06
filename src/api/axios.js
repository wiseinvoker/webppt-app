// frontend/src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,  // Backend API URL
  timeout: 5000,
});

export default api;

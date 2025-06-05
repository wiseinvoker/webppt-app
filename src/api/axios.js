// frontend/src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // Backend API URL
  timeout: 5000,
});

export default api;

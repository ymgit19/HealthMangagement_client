import axios from 'axios';

// Create an axios instance
const API = axios.create({
  baseURL: 'https://health-management-server.onrender.com/api'
});

// Add a request interceptor to include the token in headers
API.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const register = (userData) => API.post('/users/register', userData);
export const login = (userData) => API.post('/users/login', userData);
export const getMe = () => API.get('/users/me');

// Health Record API calls
export const getHealthRecords = () => API.get('/health/records');
export const getHealthRecord = (id) => API.get(`/health/records/${id}`);
export const createHealthRecord = (recordData) => API.post('/health/records', recordData);
export const updateHealthRecord = (id, recordData) => API.put(`/health/records/${id}`, recordData);
export const deleteHealthRecord = (id) => API.delete(`/health/records/${id}`);

// Contact API calls
export const getContacts = () => API.get('/contact');
export const getContact = (id) => API.get(`/contact/${id}`);
export const createContact = (contactData) => API.post('/contact', contactData);
export const deleteContact = (id) => API.delete(`/contact/${id}`);

export default API;

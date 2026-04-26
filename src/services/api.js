import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    // baseURL: 'https://api.gsps.online/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to add the JWT token to every request
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

// User Profile & Password
export const updateProfile = (formData) => api.put('/user/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const changePassword = (data) => api.put('/user/change-password', data);

export default api;

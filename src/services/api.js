import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;



const api = axios.create({
    baseURL: BASE_URL,
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
export const updateProfile = (data) => api.put('/user/profile', data);
export const changePassword = (data) => api.put('/user/change-password', data);

// Wallet
export const requestWithdrawal = (data) => api.post('/wallet/withdraw', data);
export const requestDeposit = (data) => api.post('/wallet/deposit', data);
export const getMyTransactions = () => api.get('/wallet/my-transactions');
export const adminGetTransactions = () => api.get('/wallet/admin/transactions');
export const adminUpdateTransactionStatus = (id, data) => api.put(`/wallet/admin/transactions/${id}/status`, data);

export default api;

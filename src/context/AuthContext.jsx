import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const res = await api.get('/auth/me');
                setUser(res.data);
            } catch (err) {
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const signup = async (userData) => {
        const res = await api.post('/auth/signup', userData);
        return res.data;
    };

    const verifyOTP = async (email, otp) => {
        const res = await api.post('/auth/verify-otp', { email, otp });
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        signup,
        verifyOTP,
        logout,
        checkAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

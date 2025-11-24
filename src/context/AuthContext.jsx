import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            // You could verify the token here
        } else {
            localStorage.removeItem('token');
        }
        setLoading(false);
    }, [token]);

    const register = async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, {
                username,
                password
            });
            setToken(response.data.token);
            setUser({ username });
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.msg || 'Error al registrar'
            };
        }
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                username,
                password
            });
            setToken(response.data.token);
            setUser({ username });
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.msg || 'Credenciales inválidas'
            };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!token
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

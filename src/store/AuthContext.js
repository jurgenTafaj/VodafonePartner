// src/store/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import * as storage from '../utils/storage';
import * as authService from '../api/authService';
import { navigate, reset } from '../navigation/NavigationService'; // Global nav functions

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        token: null,
        isLoading: true,
        isAuthenticated: false,
    });

    // 1. Check for stored tokens on app load
    useEffect(() => {
        const loadInitialState = async () => {
            const token = await storage.getAccessToken();
            if (token) {
                // In a real app, you would verify this token by calling a /me endpoint
                setAuthState(prev => ({
                    ...prev,
                    token,
                    isAuthenticated: true,
                    isLoading: false,
                    user: { id: 'retrieved_id' } // Placeholder user info
                }));
            } else {
                setAuthState(prev => ({ ...prev, isLoading: false }));
            }
        };
        loadInitialState();
    }, []);

    // 2. Login function called by LoginScreen
    const login = async (email, password, captchaToken) => {
        const { token, user } = await authService.login(email, password, captchaToken);
        
        // Update state and navigation on success
        setAuthState({ user, token, isAuthenticated: true, isLoading: false });
        reset('App'); // Navigate to the main app stack
    };

    // 3. Logout function
    const logout = async () => {
        await storage.clearTokens();
        setAuthState({ user: null, token: null, isAuthenticated: false, isLoading: false });
        reset('Auth'); // Navigate to the auth stack
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
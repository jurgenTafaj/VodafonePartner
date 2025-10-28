// src/api/authService.js (FIXED: Simplified API call)

import apiClient from './apiClient';
import { setTokens } from '../utils/storage';
import { API_URL, getTypeId } from '../constants/config'; // Updated import

/**
 * Handles the login call to the backend using FormData.
 * @returns {object} { token, user }
 */
export const login = async (email, password, captchaToken) => {
    
    // 1. Construct the FormData object exactly as shown in Postman
    const formData = new FormData();
    formData.append('action', 'login'); // Key: 'action'
    formData.append('type_id', getTypeId()); 
    formData.append('username', email); 
    formData.append('password', password);
    formData.append('recaptcha_response', captchaToken); 

    try {
        // 2. Use the simplified apiClient instance, which is base-URL ready
        const response = await apiClient.post('/', formData); // POST to the base URL (API_URL)

        const { token, refreshToken, user } = response.data; 

        await setTokens(token, refreshToken);
        
        return { token, user }; 
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Login failed due to network error.');
    }
};
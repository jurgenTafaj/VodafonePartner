// src/api/authService.js (FIXED: Simplified API call and captcha payload)

import apiClient from './apiClient';
import { setTokens } from '../utils/storage';
import { API_URL, getTypeId } from '../constants/config'; 

/**
 * Handles the login call to the backend using FormData.
 * @returns {object} { token, user }
 */
export const login = async (email, password, captchaToken) => {
    
    // 1. Construct the FormData object exactly as shown in Postman
    const formData = new FormData();
    formData.append('action', 'login'); 
    formData.append('type_id', getTypeId()); 
    formData.append('username', email); 
    formData.append('password', password);
    formData.append('recaptcha_response',  ''); 

    try {
        // 2. Use the simplified apiClient instance and a relative path (or empty string)
        console.log("Sending login request to API.", formData);
        const response = await apiClient.post('', formData); 
        console.log("Login response received:", response.data);
        const { token, refreshToken, user } = response.data; 

        await setTokens(token, refreshToken);
        
        return { token, user }; 
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        console.log(error);
        // This is fine, but ensure 'message' always exists on error.response?.data
        throw new Error(error.response?.data?.message || 'A network or server error occurred.' ); 
    }
};
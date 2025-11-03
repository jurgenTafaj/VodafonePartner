// src/api/apiClient.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// !! REPLACE THIS with your actual API URL from Postman
const API_URL = 'https://mobileapi.vodafonecoupons.al/v.2/'; 

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data', // Based on your Postman 'form-data'
  },
});

// === Request Interceptor ===
// This runs BEFORE each request is sent
apiClient.interceptors.request.use(
  async (config) => {
    console.log('Preparing request to: config ', config);
    // Get the token from storage
    const token = await AsyncStorage.getItem('userToken');
    
    // If the token exists and it's not a login/refresh request, attach it
    if (token) {
      // Your API might expect the token in the headers
      // config.headers.Authorization = `Bearer ${token}`; 
      
      // OR, based on your Postman, it might expect it in the form data
      // We check if config.data is a FormData instance
      if (config.data instanceof FormData) {
        console.log('action: ', config.data._parts[0][1]);
        // Don't add token to login or refresh token requests
        if (config.data._parts[0][1] !== 'login' && config.data._parts[0][1] !== 'refreshToken') {
           config.data.append('token', token);
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// === Response Interceptor ===
// This runs AFTER a response is received
apiClient.interceptors.response.use(
  (response) => {
    // Any status code within 2xx triggers this
    return response;
  },
  async (error) => {
    // Any status code outside 2xx triggers this
    const originalRequest = error.config;

    // Check for 401 Unauthorized and if we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark as retried
      
      console.log('Access token expired. Attempting refresh...');

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const userId = await AsyncStorage.getItem('userId');
        
        // !! REPLACE with your static type_id
        const TYPE_ID = '{{type_id}}'; 

        if (!refreshToken || !userId) {
          // If no refresh token, force logout
          // We'll trigger this via our AuthContext later
          console.log('No refresh token or user ID. Logging out.');
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('refreshToken');
          await AsyncStorage.removeItem('userId');
          // Reloading the app or navigating to login would happen here
          // For now, just reject
          return Promise.reject(new Error('No refresh token'));
        }

        // Create form data for the refresh token request
        const refreshFormData = new FormData();
        refreshFormData.append('action', 'refreshToken');
        refreshFormData.append('type_id', TYPE_ID);
        refreshFormData.append('user_id', userId);
        refreshFormData.append('token', await AsyncStorage.getItem('userToken')); // The expired token
        refreshFormData.append('refresh_token', refreshToken);

        // Make the refresh token request
        // We use a new axios instance or 'apiClient.post' directly to avoid interceptor loop
        const { data } = await axios.post(API_URL, refreshFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        // Assuming refresh is successful and returns new tokens
        // { "success": true, "token": "...", "refresh_token": "..." }
        if (data.success && data.token) {
          console.log('Token refreshed successfully.');
          
          // Store new tokens
          await AsyncStorage.setItem('userToken', data.token);
          await AsyncStorage.setItem('refreshToken', data.refresh_token);

          // Update the authorization header/data for the original request
          if (originalRequest.data instanceof FormData) {
            originalRequest.data.set('token', data.token); // Update token
          } else {
            // Or update header if your API uses that
            // originalRequest.headers['Authorization'] = `Bearer ${data.token}`;
          }

          // Retry the original request with the new token
          return apiClient(originalRequest);
        } else {
          // Refresh failed (e.g., refresh token also expired)
          throw new Error('Refresh token failed');
        }
      } catch (refreshError) {
        console.error('Could not refresh token:', refreshError);
        // Logout user
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.removeItem('userId');
        // Here we'd navigate to login via context
        return Promise.reject(refreshError);
      }
    }

    // For other errors, just reject
    return Promise.reject(error);
  }
);

export default apiClient;
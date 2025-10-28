// src/api/apiClient.js (FIXED: Using singular API_URL and FormData for refresh)

import axios from 'axios';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '../utils/storage';
import { API_URL, getTypeId } from '../constants/config'; // Updated import
import { navigate, reset } from '../navigation/NavigationService'; 

// Use the single API_URL for all requests
const apiClient = axios.create({
    baseURL: API_URL,
});

let isRefreshing = false;
let failedQueue = [];

// Helper function to handle pending requests (Unchanged)
const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// **REQUEST INTERCEPTOR: Attaches the Access Token (Unchanged)**
apiClient.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// **RESPONSE INTERCEPTOR: Handles HTTP 401 & Token Refresh (Adjusted)**
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // This check is now simplified: if status is 401, we try to refresh.
        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        // Check if the original request was *already* a refresh token call itself
        // We use the request body to identify the action
        const isOriginalRequestRefresh = originalRequest.data && (originalRequest.data.includes('action=refreshToken'));
        
        if (isOriginalRequestRefresh) {
             // If refresh failed, reject immediately
             await clearTokens();
             reset('Auth');
             return Promise.reject(error);
        }
        
        if (isRefreshing) {
            // Queue logic (Unchanged)
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject, config: originalRequest });
            })
            .then(token => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return apiClient(originalRequest); 
            })
            .catch(err => {
                return Promise.reject(err);
            });
        }

        // 2. START THE REFRESH PROCESS
        isRefreshing = true;
        const refreshToken = await getRefreshToken();

        // 🌟 Construct FormData for the 'refreshToken' action
        const refreshFormData = new FormData();
        refreshFormData.append('action', 'refreshToken'); // <--- Action for refresh
        refreshFormData.append('type_id', getTypeId()); 
        refreshFormData.append('refreshToken', refreshToken); // Key is likely 'refreshToken' or 'refresh_token'

        try {
            console.log('Attempting token refresh with FormData...');
            
            // Use API_URL and the FormData payload
            const refreshResponse = await axios.post(
                API_URL,
                refreshFormData 
            );

            const { token: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data;

            await setTokens(newAccessToken, newRefreshToken); 
            isRefreshing = false;
            processQueue(null, newAccessToken); 

            // Retry the original failed request
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiClient(originalRequest); 
            
        } catch (refreshError) {
            console.error('Refresh token failed:', refreshError.response?.data);
            await clearTokens();
            isRefreshing = false;
            processQueue(refreshError);
            
            reset('Auth'); 
            
            return Promise.reject(refreshError);
        }
    }
);

export default apiClient;
// src/constants/config.js (FIXED: Removing separate endpoint paths)

// Replace with your single, unchanging API URL for all actions
export const API_URL = 'https://your-api-domain.com/api/v1/user_endpoint'; 

// REFRESH_URL and LOGIN_URL are REMOVED. The 'action' field dictates the endpoint.

// Replace with your actual reCAPTCHA v2 Site Key
export const RECAPTCHA_SITE_KEY = '6LcKK60UAAAAAGc12CLNY22bt0hnGIYcUbXzDaOA';

/**
 * Function to retrieve the static 'type_id' parameter for the login call.
 */
export const getTypeId = () => {
    return '3'; 
};
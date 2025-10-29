// src/api/authService.js

import apiClient from './apiClient';

// !! REPLACE THIS with your static type_id from Postman
const TYPE_ID = '3'; 

export const loginUser = (username, password) => {
  const formData = new FormData();
  formData.append('action', 'login');
  formData.append('type_id', TYPE_ID);
  formData.append('username', username);
  formData.append('password', password);
  formData.append('recaptcha_response', ''); // As requested

  return apiClient.post('/', formData);
};

// You can add other auth-related API calls here (e.g., logout, register)
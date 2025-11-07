// src/api/authService.js

import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Needed to access userId

// !! REPLACE THIS with your static type_id from Postman
const TYPE_ID = '3'; 

export const loginUser = (username, password) => {
  const formData = new FormData();
  formData.append('action', 'login');
  formData.append('type_id', TYPE_ID);
  formData.append('username', username);
  formData.append('password', password);
  formData.append('recaptcha_response', ''); // As requested

  // The request interceptor in apiClient will handle the token if needed
  return apiClient.post('/', formData);
};

/**
 * Redeems a coupon code by calling the API.
 * The token is handled automatically by the apiClient interceptor.
 * @param {string} couponCode - The code scanned from the QR.
 * @param {number} invoiceAmount - The transaction amount (defaulting to a placeholder value).
 * @param {string} notes - Optional notes for the transaction.
 * @returns {Promise<AxiosResponse>} The Axios response object.
 */
export const redeemCoupon = async (couponCode, invoiceAmount , notes = '') => {
  const userId = await AsyncStorage.getItem('userId');
  if (!userId) {
    throw new Error('User ID not found in storage. Please log in first.');
  }

  const formData = new FormData();
  formData.append('action', 'redeemCoupon');
  formData.append('type_id', TYPE_ID); // Static TYPE_ID
  formData.append('user_id', userId); // Retrieved from storage
  
  formData.append('invoice_amount', invoiceAmount.toString());
  formData.append('coupon', couponCode);
  formData.append('notes', notes);

  // The request is sent to the base URL (which the server handles based on the 'action' field)
  return apiClient.post('/', formData); 
};

export const getCuponDetails = async (couponCode) => {
  const userId = await AsyncStorage.getItem('userId');
  if (!userId) {
    throw new Error('User ID not found in storage. Please log in first.');
  }

  const formData = new FormData();
  formData.append('action', 'getCouponDetails');
  formData.append('type_id', TYPE_ID); // Static TYPE_ID
  formData.append('user_id', userId); // Retrieved from storage
  
  formData.append('coupon', couponCode);
  formData.append('invoice_amount', '');

  // The request is sent to the base URL (which the server handles based on the 'action' field)
  return apiClient.post('/', formData); 
};

export const getSales = async (dateFrom, dateTo, limit = "100") => {
  const userId = await AsyncStorage.getItem('userId');
  if (!userId) {
    throw new Error('User ID not found in storage. Please log in first.');
  }

  const formData = new FormData();
  formData.append('action', 'getSales');
  formData.append('type_id', TYPE_ID); // Static TYPE_ID
  formData.append('user_id', userId); // Retrieved from storage
  
  formData.append('datetime_from', dateFrom);
  formData.append('datetime_to', dateTo);
  formData.append('limit', limit);

  // The request is sent to the base URL (which the server handles based on the 'action' field)
  return apiClient.post('/', formData); 
};

export const getDailySalesAmounts = async () => {
  const userId = await AsyncStorage.getItem('userId');
  if (!userId) {
    throw new Error('User ID not found in storage. Please log in first.');
  }

  const formData = new FormData();
  formData.append('action', 'getDailySalesAmounts');
  formData.append('type_id', TYPE_ID); // Static TYPE_ID
  formData.append('user_id', userId); // Retrieved from storage
  
  // The request is sent to the base URL (which the server handles based on the 'action' field)
  return apiClient.post('/', formData); 
};

// src/context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../api/authService';

// Create the context
const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  // signIn function
const signIn = async (username, password, recaptchaToken) => {
  try {
    // Pass the token to loginUser
    const response = await loginUser(username, password, recaptchaToken);
    console.log('Login response:', response.data, " ", response.data.status_code);
    if (response.data.status_code === 200) {
      const { token, refresh_token, user_id, fullname, profile_img } = response.data.data;
      console.log('response.data.data: ', response.data.data);
      // Store tokens and user ID
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('refreshToken', refresh_token);
      await AsyncStorage.setItem('userId', user_id.toString()); // Store as string
      await AsyncStorage.setItem('fullName', fullname.toString());
      await AsyncStorage.setItem('profile_img', profile_img);
      setUserToken(token); // Update state to trigger navigation
    } else {
      // Handle failed login (e.g., show error)
      console.log('Login failed with message:', response);
      throw new Error(response.data.message || 'Login failed');
    }
  } catch (error) {
    console.error('An error occurred during sign in:', error);
    throw error; // Re-throw to be caught in LoginScreen
  }
};

  // signOut function
  const signOut = async () => {
    setIsLoading(true);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('fullName');
    await AsyncStorage.removeItem('profile_img');
    setUserToken(null);
    setIsLoading(false);
  };

  // Check if user is already logged in on app start
  const isLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token); // If token exists, user is logged in
    } catch (e) {
      console.error('Error reading token from storage:', e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, userToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
// src/utils/storage.js

import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for storage
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

/**
 * Saves both the access token and the refresh token.
 */
export const setTokens = async (accessToken, refreshToken) => {
    try {
        await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        console.log("Tokens saved successfully.");
    } catch (error) {
        console.error('Error setting tokens:', error);
    }
};

/**
 * Retrieves the current access token.
 */
export const getAccessToken = async () => {
    try {
        return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    } catch (error) {
        return null;
    }
};

/**
 * Retrieves the refresh token.
 */
export const getRefreshToken = async () => {
    try {
        return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
        return null;
    }
};

/**
 * Clears all tokens from storage.
 */
export const clearTokens = async () => {
    try {
        await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
        await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
        console.log("Tokens cleared successfully.");
    } catch (error) {
        console.error('Error clearing tokens:', error);
    }
};
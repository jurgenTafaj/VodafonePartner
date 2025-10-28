// src/navigation/AppNavigator.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../store/AuthContext';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export default function AppNavigator() {
    const { authState } = useAuth();

    if (authState.isLoading) {
        // Show a loading screen while checking AsyncStorage for initial tokens
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Switch between AuthStack and AppStack based on authentication status
    return authState.isAuthenticated ? <AppStack /> : <AuthStack />;
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
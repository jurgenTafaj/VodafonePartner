// App.js (FIXED: Added GestureHandlerRootView)
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/store/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { navigationRef } from './src/navigation/NavigationService';

import { GestureHandlerRootView } from 'react-native-gesture-handler'; 

export default function App() {
    return (
        // WRAP THE ENTIRE APP HERE
        <GestureHandlerRootView style={{ flex: 1 }}> 
            <AuthProvider>
                <NavigationContainer ref={navigationRef}>
                    <AppNavigator />
                </NavigationContainer>
            </AuthProvider>
        </GestureHandlerRootView>
    );
}
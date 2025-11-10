// App.jsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native'; // Import ActivityIndicator

// Import your screens
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import LogoutScreen from './src/screens/LogOutScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import InfoScreen from './src/screens/InfoScreen';
import BottomTab from './src/components/BottomTab';
import CameraScann from './src/screens/CameraScann';
// Import your AuthProvider and useAuth hook
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

// Create a new component for your navigation logic
const AppNavigator = () => {
  const { userToken, isLoading } = useAuth();

  // Show a loading spinner while checking for token
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Choose the navigator based on userToken
  return (
    <Stack.Navigator>
      {userToken == null ? (
        // No token, show only Login
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Hide header for login
        />
      ) : (
        // User is logged in, show the main app with BottomTab
        <>
          <Stack.Screen
            name="Main"
            component={BottomTab}
            options={{ headerShown: false }} // Hide header for tab navigator
          />
          {/* You can add other screens here that are part of the logged-in stack */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Logout" component={LogoutScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Info" component={InfoScreen} />
          <Stack.Screen name="Scanner" component={CameraScann} />
        </>
      )}
    </Stack.Navigator>
  );
};

// Your main App component
export default function App() {
  return (
    // Wrap the entire app in the AuthProvider
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />

        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
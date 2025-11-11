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

const AppNavigator = () => {
  const { userToken, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {userToken == null ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Main"
            component={BottomTab}
            options={{ headerShown: false }}
          />
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

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />

        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
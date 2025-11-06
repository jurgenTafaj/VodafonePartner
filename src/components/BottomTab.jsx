import * as React from 'react';
import { Image, View, StyleSheet } from 'react-native';
// Note: You don't need NavigationContainer here, only in your root App.js
// import { NavigationContainer } from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen'; // Not used in tabs, but in your original file
import LogoutScreen from '../screens/LogOutScreen';
import SettingsScreen from '../screens/SettingsScreen';
import InfoScreen from '../screens/InfoScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    // You should apply flex: 1 to the PARENT of this component
    // or wrap the Tab.Navigator in a View with flex: 1 if this is your root.
    // The SafeAreaView here is good, but I'll add flex: 1 to it.
    <SafeAreaView style={{ flex: 1, backgroundColor: '#db0000ff' }} edges={['bottom']}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#db0000ff', // General bar color
            borderTopWidth: 0,
            elevation: 5,
            height: 60,
          },
          
          // --- THIS IS THE FIX ---
          // Sets the color for the whole active tab button
          tabBarActiveBackgroundColor: '#c10303ff', 
          
          // Sets the color for the inactive tab buttons
          tabBarInactiveBackgroundColor: '#db0000ff', 
          // --- END OF FIX ---
        }}
      >

        <Tab.Screen name="Home" component={HomeScreen} options={{

          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../assets/icons/menu_home.png')} 
              style={styles.icon} 
            />
          ),
        }} />

        <Tab.Screen name="Info" component={InfoScreen} options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../assets/icons/menu_raport.png')} 
              style={styles.icon}
            />
          ),
        }} />

        <Tab.Screen name="Settings" component={SettingsScreen} options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../assets/icons/menu_settings.png')} 
              style={styles.icon}
            />
          ),
        }} />

        <Tab.Screen name="Logout" component={LogoutScreen} options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../assets/icons/logout_red.png')} 
              style={styles.icon}
            />
          ),
        }} />

      </Tab.Navigator>
    </SafeAreaView>
  );
}

// These styles are still needed for your icons
const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
    tintColor: '#ffffff',
    resizeMode: 'contain',
  },
});
import * as React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import LogoutScreen from '../screens/LogOutScreen'
import SettingsScreen from '../screens/SettingsScreen'
import InfoScreen from '../screens/InfoScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <SafeAreaView style={{ flex: 1, zIndex: 1 }} edges={['bottom']}>

      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#db0000ff',
          borderTopWidth: 0,
          elevation: 5,
          height: 65,
        },
        tabBarActiveBackgroundColor: '#c10303ff',
        tabBarInactiveBackgroundColor: '#db0000ff',

      }}>

        <Tab.Screen name="Home" component={HomeScreen} options={{

          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabButton,
                { backgroundColor: focused ? '#c10303ff' : '#db0000ff' },
              ]}
            >
              <Image source={require('../assets/icons/menu_home.png')} style={styles.icon} />
            </View>
          ),
        }} />

        <Tab.Screen name="Info" component={InfoScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabButton,
                { backgroundColor: focused ? '#c10303ff' : '#db0000ff' },
              ]}
            >
              <Image source={require('../assets/icons/menu_raport.png')} style={{
                width: 35, height: 35, tintColor: '#ffffffff'
              }} />
            </View>
          ),
        }} />

        <Tab.Screen name="Settings" component={SettingsScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabButton,
                { backgroundColor: focused ? '#c10303ff' : '#db0000ff' },
              ]}
            >
              <Image source={require('../assets/icons/menu_settings.png')} style={{
                width: 35, height: 35, tintColor: '#ffffffff'
              }} /></View>
          ),
        }} />

        <Tab.Screen name="Logout" component={LogoutScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabButton,
                { backgroundColor: focused ? '#c10303ff' : '#db0000ff' },
              ]}
            >
              <Image source={require('../assets/icons/logout_red.png')} style={{
                width: 35, height: 35, tintColor: '#ffffffff'
              }} />
            </View>
          ),
        }} />

      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    //flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
    //alignItems: 'center',
    //justifyContent: 'center',


  },
  icon: {
    width: 35,
    height: 35,
    tintColor: '#ffffff',
    resizeMode: 'contain',
  },
})
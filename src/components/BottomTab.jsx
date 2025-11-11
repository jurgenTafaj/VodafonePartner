import * as React from 'react';
import { Image, View, StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import LogoutScreen from '../screens/LogOutScreen';
import SettingsScreen from '../screens/SettingsScreen';
import InfoScreen from '../screens/InfoScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

// export default function BottomTab() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarHideOnKeyboard: true,
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           backgroundColor: '#db0000ff',
//           borderTopWidth: 0,
//           elevation: 5,
//           height: 70,
//         },
//         tabBarActiveBackgroundColor: '#c10303ff',
//         tabBarInactiveBackgroundColor: '#db0000ff',
//       }}
//     >

//       <Tab.Screen name="Home" component={HomeScreen} options={{

//         tabBarIcon: ({ focused }) => (
//           <Image
//             source={require('../assets/icons/menu_home.png')}
//             style={styles.icon}
//           />
//         ),
//       }} />

//       <Tab.Screen name="Info" component={InfoScreen} options={{
//         tabBarIcon: ({ focused }) => (
//           <Image
//             source={require('../assets/icons/menu_raport.png')}
//             style={styles.icon}
//           />
//         ),
//       }} />

//       <Tab.Screen name="Settings" component={SettingsScreen} options={{
//         tabBarIcon: ({ focused }) => (
//           <Image
//             source={require('../assets/icons/menu_settings.png')}
//             style={styles.icon}
//           />
//         ),
//       }} />

//       <Tab.Screen name="Logout" component={LogoutScreen} options={{
//         tabBarIcon: ({ focused }) => (
//           <Image
//             source={require('../assets/icons/logout_red.png')}
//             style={styles.icon}
//           />
//         ),
//       }} />

//     </Tab.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   icon: {
//     width: 35,
//     height: 35,
//     tintColor: '#ffffff',
//     resizeMode: 'contain',
//   },
// });


export default function BottomTab() {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#db0000ff' }} edges={['bottom']}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#db0000ff',
            borderTopWidth: 0,
            elevation: 5,
            height: 45,
          },
          tabBarActiveBackgroundColor: '#c10303ff',
          tabBarInactiveBackgroundColor: '#db0000ff',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../assets/icons/menu_home.png')}
                style={styles.icon}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Info"
          component={InfoScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../assets/icons/menu_raport.png')}
                style={styles.icon}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../assets/icons/menu_settings.png')}
                style={styles.icon}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Logout"
          component={LogoutScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../assets/icons/logout_red.png')}
                style={styles.icon}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
    tintColor: '#ffffff',
    //
    resizeMode: 'contain',
  },
});
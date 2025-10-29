import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen'
import LoginScreen from './src/screens/LoginScreen'
import LogoutScreen from './src/screens/LogOutScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import InfoScreen from './src/screens/InfoScreen'
import BottomTab from './src/components/BottomTab'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen name="Main" component={BottomTab} />
        <Stack.Screen name="Home" component={HomeScreen} screenOptions={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Logout" component={LogoutScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  )
}
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


const Stack=createNativeStackNavigator();

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen}/>
    <Stack.Screen name="Login" component={LoginScreen}/>
  </Stack.Navigator>
);

return(
  <NavigationContainer>
    <MainStack/>
  </NavigationContainer>
)
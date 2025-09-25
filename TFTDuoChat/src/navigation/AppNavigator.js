import { createStackNavigator } from '@react-navigation/stack';
import LobbyScreen from '../screens/LobbyScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WaitingScreen from '../screens/WaitingScreen';
import ChatScreen from '../screens/ChatScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

export default function AppNavigator() { 
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="WaitingScreen" component={WaitingScreen} />
        <Stack.Screen name="LobbyScreen" component={LobbyScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </>
    </Stack.Navigator>
  );
}
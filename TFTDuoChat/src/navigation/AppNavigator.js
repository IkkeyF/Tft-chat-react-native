import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LobbyScreen from '../screens/LobbyScreen';
import WaitingScreen from '../screens/WaitingScreen';
import ChatScreen from '../screens/ChatScreen';

import { useAppContext } from '../context/AppContext'; 
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegador de Tabs (para Lobby e Chat)
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Lobby') iconName = 'dashboard';
          else if (route.name === 'Chat') iconName = 'chat';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#f8c537',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Lobby" component={LobbyScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}

// Navegador Principal (Stack para fluxos)
export default function AppNavigator() {
  const { state } = useAppContext();     
  const isLoggedIn = !!state?.currentUser;

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="WaitingScreen" component={WaitingScreen} />
          </>
        ) : (
          <>
            {/* Só colocar a HomeScreen aqui depois */}
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
  );
}
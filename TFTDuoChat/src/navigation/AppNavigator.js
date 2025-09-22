import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';  // Para ícones nas tabs

// Importe todas as telas
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LobbyScreen from '../screens/LobbyScreen';
import WaitingScreen from '../screens/WaitingScreen';  // ← Adicione esta import
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegador de Tabs (para Lobby e Chat)
function TabNavigator({ state }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
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
export default function AppNavigator({ state }) {
  const isLoggedIn = !!state.currentUser  ;  // Do AppContext

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="WaitingScreen" component={WaitingScreen} />  // ← Registre aqui como 'WaitingScreen'
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
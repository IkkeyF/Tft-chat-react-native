import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { AppProvider } from './src/context/AppContext';
import * as SystemUI from 'expo-system-ui';

export default function App() {
  SystemUI.setBackgroundColorAsync('#10101cff');

  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#1a1a2e" />
        <AppNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}
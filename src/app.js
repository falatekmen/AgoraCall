import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './navigation';
import { LogBox, StatusBar } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <MainNavigation />
    </NavigationContainer>
  );
}

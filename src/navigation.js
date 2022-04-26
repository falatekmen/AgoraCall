import React from 'react';
import { IntroScreen } from './screens/intro-screen';
import { JoinScreen } from './screens/join-screen';
import { CallScreen } from './screens/call-screen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function MainNavigation() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      animationEnabled: false
    }}>
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Join" component={JoinScreen} />
      <Stack.Screen name="Call" component={CallScreen} />
    </Stack.Navigator>
  );
}
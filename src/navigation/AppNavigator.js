import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaymentScreen } from '../screens/PaymentScreen';
import ListingScreen from '../screens/ListingScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Payment'
          component={PaymentScreen}
          options={{ title: 'UK Address Verifier' }}
        />
        <Stack.Screen
          name='Listing'
          component={ListingScreen}
          options={{ title: 'UK Address Listing' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

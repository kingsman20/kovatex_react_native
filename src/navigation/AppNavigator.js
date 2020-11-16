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
          options={{ title: 'Address Verifier' }}
        />
        <Stack.Screen
          name='Listing'
          component={ListingScreen}
          options={{ title: 'Address Listing', headerLeft: null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

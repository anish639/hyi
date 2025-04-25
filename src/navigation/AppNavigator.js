import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UsersListScreen from '../screens/UsersListScreen';
import UserDetailScreen from '../screens/UserDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Users" component={UsersListScreen} />
    <Stack.Screen name="UserDetails" component={UserDetailScreen} />
  </Stack.Navigator>
);

export default AppNavigator;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from '../HomePage';
import Products from '../Products';
import Dashboard from '../Dashboard';
import EditProfile from '../EditProfile';
import ChangePassword from '../ChangePassword';

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Products" component={Products} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

import React, { useEffect, useState, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from '../ComponentScreens/Dashboard';
import PNDs from '../ComponentScreens/PNDs';

export default function Dashboardstack() {
  const dashboardStack = createNativeStackNavigator();

  return (
    <dashboardStack.Navigator initialRouteName='Dashboard'>
      <dashboardStack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false, tabBarStyle: 'none' }} />
      <dashboardStack.Screen name="PNDs" component={PNDs} options={
        ({ route }) => ({ 
          title: route.params.pnd , 
          headerShown: true,
          headerStyle: {
            backgroundColor: '#7ABD87',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
          })} />
    </dashboardStack.Navigator>

  );
}
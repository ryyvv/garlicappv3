import React, { useEffect, useState, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { LogBox } from 'react-native';
import Dashboardstack from '../Navigation/Dashboardstack';
import Forecast from '../ComponentScreens/Forecast';
import Plant from '../ComponentScreens/Plant';
import Profile from '../ComponentScreens/Account';

export default function MainTabStack() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: '#7ABD87',
        tabBarStyle: {
          height: 60,
          fontSize: 34,
          paddingTop: 6,
          color: '#7ABD87',
          paddingBottom: 6
        },
      }}>
      <Tab.Screen
        name="Dashboardstack"
        component={Dashboardstack}
        options={{
          headerShown: false,
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Icon name={"view-dashboard-outline"} color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="forecast"
        component={Forecast}
        options={({ route }) => ({
          headerShown: false,
          tabBarLabel: 'Forecast',
          // tabBarStyle:{display: getRouteName(route)},
          tabBarIcon: ({ color, size }) => (
            <Icon name={"thermometer-lines"} color={color} size={25} />
          ),
        })}
      />
      <Tab.Screen
        name="Plant"
        component={Plant}
        options={{
          headerShown: false,
          tabBarLabel: 'Plant',
          tabBarIcon: ({ color, size }) => (
            <Icon name={"sprout-outline"} color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name={"account-details-outline"} color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator >
  );
}
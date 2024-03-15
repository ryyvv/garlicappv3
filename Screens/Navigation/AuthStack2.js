import React, { useEffect, useState, useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../Auth/login';
import Register from '../Auth/Register';
//import SplashScreen from '../SplashScreen';
import Resetpass from '../Auth/Resetpass';

export default function AuthStack() {
    const authStack = createNativeStackNavigator();

    return (
        <authStack.Navigator initialRouteName='Login'>
            <authStack.Screen name="Login" component={Login} options={{ headerShown: false, tabBarStyle: 'none' }} />
            <authStack.Screen name="Register" component={Register} options={{ headerShown: false, tabBarStyle: 'none' }} />
            <authStack.Screen name="Resetpass" component={Resetpass} options={{ title: "Forget Password", headerBackVisible: true }} />
        </authStack.Navigator>

    );
}
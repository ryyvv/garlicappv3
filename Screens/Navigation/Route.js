import React, { useEffect, useState, useContext, } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RNBootSplash from "react-native-bootsplash";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../Context/AuthProvider';

import AuthStack from '../Navigation/AuthStack';
import MainTabStack from '../Navigation/MainTabStack';

export default function Route() {
  const { user, setUsers } = useContext(AuthContext);
  // const [loading, setLoading] = useState(true); add loading
  const [initializing, setInitializing] = useState(false);

  function onAuthStateChanged(user) {
    setUsers(user);
    console.log(user)
    if (initializing) setInitializing(false);
    // setLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  return (

    <NavigationContainer
      onReady={() => { RNBootSplash.hide({ fade: true }); }}>
      {user ? <MainTabStack /> : <AuthStack />}
      {/* {user ? null : <AuthStack />} */}
    </NavigationContainer>
  );
}
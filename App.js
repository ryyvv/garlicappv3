/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { LocationProvider } from './Screens/Context/LocationProvider'
import { AuthProvider } from './Screens/Context/AuthProvider';

import Route from './Screens/Navigation/Route';

export default function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <Route />
      </LocationProvider>
    </AuthProvider>
  );
};

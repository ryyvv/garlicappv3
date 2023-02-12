import React, { useEffect, useState, useContext, useFonts } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ImageBackground, Button, Platform, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, LogBox, TextInput, } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../../src/css/styles';
import { AuthContext } from '../Context/AuthProvider';
import AccountHeader from '../Components/AccountHeader';

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];


function AccountInfo() {
    return (
        <View>
            <Text>userID: {user.uid}</Text>
        </View>
    )
}

function Account({ navigation }) {
    const { logout, user } = useContext(AuthContext)
    const hidden = true;
    const statusBarStyle = 'dark-content';

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <AccountHeader />
        </SafeAreaProvider>
    );
}

export default Account;
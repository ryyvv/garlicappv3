//import axios from 'axios';
import moment from "moment";
import React, { useEffect, useState, useFonts, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FloatingAction } from "react-native-floating-action";
import DatePicker from 'react-native-date-picker'
import database from '@react-native-firebase/database';
import { AuthContext } from '../Context/AuthProvider';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    TextInput,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Pressable,
    LogBox,
    ImageBackground,
    Button,
    Animated,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../src/css/styles';
export default function PestNDiseases({ navigation }) {
    return (

        // List
        <SafeAreaView>
            <View>

            </View>
        </SafeAreaView>
    );
}
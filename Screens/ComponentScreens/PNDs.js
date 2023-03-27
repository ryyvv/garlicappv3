//import axios from 'axios';
import moment from 'moment';
import React, {useEffect, useState, useFonts, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DatePicker from 'react-native-date-picker';
import database from '@react-native-firebase/database';
import {AuthContext} from '../Context/AuthProvider';

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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../src/css/styles';
export default function PNDs({route, navigation}) {
  const {name, pnd, spname, description, images} = route.params;
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={{flex:1, backgroundColor:'red', height:200}}>
        <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
        </View>
        <View style={{flex:3, backgroundColor:'green', height:600}}>
        <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

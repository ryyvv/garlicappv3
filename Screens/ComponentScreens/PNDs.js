//import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState, useFonts, useContext, } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DatePicker from 'react-native-date-picker';
import database from '@react-native-firebase/database';
// import { AuthContext } from '../Context/AuthProvider';

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

export default function PNDs({ route, navigation }) {
const { name, pnd, spname, description, images } = route.params;

  let AnimatedHeaderValue = new Animated.Value(0);
  const HEADER_MAX_HEIGHT = 300;
  const HEADER_MIN_HEIGHT = 200;

  const animatedHeaderBackgroundColor = AnimatedHeaderValue.interpolate({
    inputRange: [5  , HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: ['blue', 'red'],
    extrapolate: 'clamp',
  });

  const animatedHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [60, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });


  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Animated.View
        style={{
          height: animatedHeaderHeight,
          flex:1
          // backgroundColor: animatedHeaderBackgroundColor,
        }}>

        <ImageBackground
          source={require('../../src/images/Insect4.jpg')}
          resizeMode="cover"
          style={{ flex: 1, justifyContent: 'center', }}>
          {/* opacity: 0.1 */}
        </ImageBackground>
        <View style={{ position: 'absolute', bottom: 0, padding: 35 }}>
          {/* <Image  source={require(JSON.stringify(images))}/> */}
          <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'white' }}>{name}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 20, fontStyle: 'italic', color: 'white' }}>{spname}</Text>
        </View>
        <View
          style={{ position: 'absolute', bottom: 0, paddingLeft: 60 }}></View>
      </Animated.View>
      <View style={{
        flex:2,
        padding: 20,
        backgroundColor: '#7ABD87',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        paddingTop: 30,
        marginTop: -20,
        maxHeight: 400
      }}>
        <ScrollView
          scrollEventThrottle={15}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: AnimatedHeaderValue,
                  },
                },
              },
            ],
            { useNativeDriver: false },
          )}
          >
          <View>
            {/* Description */}
            <View>
              <Text style={{ color: 'white', marginBottom: 10, fontWeight: 'bold', fontSize: 20 }}>Description:</Text>
              <Text style={{color:'white', fontSize: 18 }}>
                {description}
              </Text>
            </View>

            {/* Status */}
            <View style={[styles.div2RowSpaceEven, { marginTop: 10 }]}>
              {/* 3col */}
              <View style={[styles.div2RowSpaceEven, { marginTop: 30 }]}>
                <View style={[styles.div2RowSpaceEven, { marginTop: 10, paddingRight: 25, paddingLeft: 25 }]}>
                  <View>
                  <Icon name={'thermometer'} color={'white'} size={40} style={{ width: 30,left:-5 }} />
                  <Icon name={'weather-windy'} color={'white'} size={25} style={{position:'absolute', left:-15, }} />
                  </View>
                  <View>
                    <Text style={{ color: 'white', marginBottom: 10, fontWeight: 'bold', fontSize: 13, }}>Air Temp.</Text>
                    <Text style={{ color: 'white', marginTop: -10, fontWeight: 'bold', fontSize:16}}>Weak Effect</Text>
                  </View>
                </View>

        

                <View style={[styles.div2RowSpaceEven, { marginTop: 10, paddingRight: 25, paddingLeft: 25 }]}>
                  <Icon name={'thermometer-low'} color={'white'} size={40} style={{ width: 30,left:-5 }} />
                  <View>
                    <Text style={{ color: 'white', marginBottom: 10, fontWeight: 'bold', fontSize: 13 }}>Min Temp.</Text>
                    <Text style={{ color: 'white',  marginTop: -10, fontWeight: 'bold', fontSize:16 }}>Weak Effect</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.div2RowSpaceEven, { marginTop: 30 }]}>
                <View style={[styles.div2RowSpaceEven, { marginTop: 10, paddingRight: 25, paddingLeft: 25 }]}>
                  <Icon name={'thermometer-high'} color={'white'} size={40} style={{ width: 30,left:-5 }} />
                  <View>
                    <Text style={{ color: 'white', marginBottom: 10, fontWeight: 'bold', fontSize: 13, }}>Max Temp.</Text>
                    <Text style={{ color: 'white', marginTop: -10, fontWeight: 'bold', fontSize:16}}>Weak Effect</Text>
                  </View>
                </View>

        

                <View style={[styles.div2RowSpaceEven, { marginTop: 10, paddingRight: 25, paddingLeft: 25 }]}>
                  <Icon name={'weather-windy'} color={'white'} size={40} style={{ width: 40,left:-5 }}/>
                  <View>
                    <Text style={{ color: 'white', marginBottom: 10, fontWeight: 'bold', fontSize: 13 }}>Wind Speed</Text>
                    <Text style={{ color: 'white',  marginTop: -10, fontWeight: 'bold', fontSize:16 }}>Weak Effect</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.div2RowSpaceEven, { marginTop: 30 }]}>
                <View style={[styles.div2RowSpaceEven, { marginTop: 10, paddingRight: 25, paddingLeft: 25 }]}>
                <View>
                  <Icon name={'water-percent'} color={'white'} size={40} style={{ width: 32,left:-5 }} />
                  <Icon name={'water'} color={'white'} size={25} style={{position:'absolute',bottom:15,left:-10 }} />
                  </View>
                  <View>
                    <Text style={{ color: 'white', marginBottom: 10, fontWeight: 'bold', fontSize: 12, }}>Relative Humidity</Text>
                    <Text style={{ color: 'white', marginTop: -10, fontWeight: 'bold', fontSize:16}}>High Effect</Text>
                  </View>
                </View>

                <View style={[styles.div2RowSpaceEven, { marginTop: 10, paddingRight: 25, paddingLeft: 25 }]}>
                  <Icon name={'weather-pouring'} color={'white'} size={40} style={{ width: 40,left:-5  }} />
                  <View>
                    <Text style={{ color: 'white', marginBottom: 10, fontWeight: 'bold', fontSize: 13 }}>Rain Fall</Text>
                    <Text style={{ color: 'white',  marginTop: -10, fontWeight: 'bold', fontSize:16 }}>High Effect</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.div2RowSpaceEven, { marginTop: 30 }]}>
                <View style={[styles.div2RowSpaceEven, { marginTop: 10, paddingRight: 25, paddingLeft: 25 }]}>
                <Icon name={'sun-wireless'} color={'white'} size={40} style={{ width: 40,left:-5  }} />
                  <View>
                    <Text style={{ color: 'white', marginBottom: 10, fontWeight: 'bold', fontSize: 13, }}>Solar Radiation</Text>
                    <Text style={{ color: 'white', marginTop: -10, fontWeight: 'bold', fontSize:16}}>High Effect</Text>
                  </View>
                </View>

              </View>

              

            </View>
          </View>
        </ScrollView>
      </View>

    </SafeAreaView>
  );
}

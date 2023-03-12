//import axios from 'axios';
import moment from "moment";
import React, { useEffect, useState, useFonts, useContext } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View, Image, LogBox, ImageBackground } from 'react-native';
// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from '../../src/css/styles';
import { AuthContext } from '../Context/AuthProvider';
import { locationContext } from '../Context/LocationProvider';


export default function Dashboard({ navigation }) {
    const { logout, user } = useContext(AuthContext)
    const { location, setlocation } = useContext(locationContext)



    // const apiKey = 'c90f776ca6f447d182204634220807';
    // const newdate = new Date();
    // const [curretC, setCurrent] = useState('');
    // const [currentDay, setCurrentDay] = useState([]);
    // const [currentDayCondition, setCurrentDayCondition] = useState([]);
    // const [location, setLocation] = useState('');
    // const [localTime, setLocaTime] = useState('');

    // const [perHour, setperHour] = useState([]);
    // const [conditions, setCondition] = useState('');
    // const currentTimeCheck = moment(new Date().getHours()).format('hh:mm A');

    const getApiCurrent = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=batac city, ilocos Norte&days=3&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            });
        setLocation(response?.location)
        setCurrent(response?.current?.last_updated)
        setperHour(response?.forecast?.forecastday[0]?.hour)
        setCurrentDay(response?.forecast?.forecastday[0]?.day)
        setCurrentDayCondition(response?.forecast?.forecastday[0]?.day?.condition)
        //check
        console.log('Current Location: ', location.name)
        return perHour;
    };

    useEffect(() => {
        getApiCurrent();
    }, []);

    return (

        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <ImageBackground source={require('../../src/images/garlicbg1.png')} resizeMode="cover" style={{
                flex: 1,
                justifyContent: "center"
            }}>
                <ScrollView>

                    <View style={styles.container}>

                        <View style={styles.dashboardWeather}>
                            {/* card1 */}
                            {/* <View style={[styles.cardDashboard, styles.cardDashboardProp]}>
  
                <View style={{ marginBottom: 10 }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>San Francisco</Text>
                    <Text style={{ fontSize: 12 }}>September 19, 2022</Text>
                  </View>
                </View>
 
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 130, height: 120, marginBottom: 15 }} />
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Partly cloudly</Text>
                </View>
 
                <View style={styles.div2RowSpaceEven}>
                  <View style={{ alignItems: 'center' }}>
                    <Text>Temp</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>23°C</Text>
                      <Icon name={"thermometer"} color={'gray'} size={23} style={{ width: 20 }} />
                    </View>
                  </View>

                  <View style={{ alignItems: 'center' }}>
                    <Text>Wind</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>18.7km/h</Text>
                      <Icon name={"weather-windy"} color={'gray'} size={24} style={{ paddingLeft: 5, marginLeft: -5, width: 20 }} />
                    </View>
                  </View>

                  <View style={{ alignItems: 'center' }}>
                    <Text>Humidity</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>75%</Text>
                      <Icon name={"water-outline"} color={'gray'} size={24} style={{ paddingLeft: -3, marginLeft: -5, width: 25 }} />
                    </View>
                  </View>
                </View>
              </View> */}

                            {/* card2 */}
                            <View style={{ marginBottom: 10, marginTop: 70 }}>
                                {/* location */}
                                <View style={{ marginBottom: 10 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>San Francisco</Text>
                                        <Text style={{ fontSize: 16 }}>September 19, 2022</Text>
                                    </View>
                                </View>

                                <View style={[styles.cardDashboard, styles.cardDashboardProp, styles.overlay]}>
                                    {/* Data */}
                                    <View style={styles.div2RowSpaceEven}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text>Temp</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>23°C</Text>
                                                {/* <Icon name={"thermometer"} color={'gray'} size={23} style={{ width: 20 }} /> */}
                                            </View>
                                        </View>

                                        <View style={{ alignItems: 'center' }}>
                                            <Text>Wind</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>18.7km/h</Text>
                                                {/* <Icon name={"weather-windy"} color={'gray'} size={24} style={{ paddingLeft: 5, marginLeft: -5, width: 20 }} /> */}
                                            </View>
                                        </View>

                                        <View style={{ alignItems: 'center' }}>
                                            <Text>Humidity</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>75%</Text>
                                                {/* <Icon name={"water-outline"} color={'gray'} size={24} style={{ paddingLeft: -3, marginLeft: -5, width: 25 }} /> */}
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                {/* WeatherIcon */}
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 100 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 130, height: 120, marginBottom: 15 }} />
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Partly cloudly</Text>
                                </View>

                            </View>
                        </View>
                        <View style={styles.dashboardHourly}>
                            {/* <Text style={{fontSize:18, fontWeight:'bold'}}>Hourly</Text> */}
                            <ScrollView horizontal={true}>
                                <View style={{ marginRight: 12, marginBottom: 10 }}>
                                    <View style={[styles.cardDashboardHourly, styles.cardDashboardHourlyProp]}>
                                        <View style={styles.div2RowSpaceEven}>
                                            <View style={{ padding: 4 }}>
                                                <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 45, height: 45 }} />
                                            </View>
                                            <View style={{ justifyContent: 'flex-end' }}>
                                                <Text style={{ fontSize: 14 }}>1:00pm</Text>
                                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>27.4°C</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ marginRight: 12, marginBottom: 10 }}>
                                    <View style={[styles.cardDashboardHourly, styles.cardDashboardHourlyProp]}>
                                        <View style={styles.div2RowSpaceEven}>
                                            <View style={{ padding: 4 }}>
                                                <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 45, height: 45 }} />
                                            </View>
                                            <View style={{ justifyContent: 'flex-end' }}>
                                                <Text style={{ fontSize: 14 }}>1:00pm</Text>
                                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>27.4°C</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ marginRight: 12, marginBottom: 10 }}>
                                    <View style={[styles.cardDashboardHourly, styles.cardDashboardHourlyProp]}>
                                        <View style={styles.div2RowSpaceEven}>
                                            <View style={{ padding: 4 }}>
                                                <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 45, height: 45 }} />
                                            </View>
                                            <View style={{ justifyContent: 'flex-end' }}>
                                                <Text style={{ fontSize: 14 }}>1:00pm</Text>
                                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>27.4°C</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ marginRight: 12, marginBottom: 10 }}>
                                    <View style={[styles.cardDashboardHourly, styles.cardDashboardHourlyProp]}>
                                        <View style={styles.div2RowSpaceEven}>
                                            <View style={{ padding: 4 }}>
                                                <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 45, height: 45 }} />
                                            </View>
                                            <View style={{ justifyContent: 'flex-end' }}>
                                                <Text style={{ fontSize: 14 }}>1:00pm</Text>
                                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>27.4°C</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>

                        {/* Recent */}
                        <View style={styles.dashboardRecent}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Recent</Text>
                            <View style={[styles.cardDashboardRecent, styles.cardDashboardRecentProp]}>
                                <View style={[styles.div2Row, { margin: 10, paddingLeft: 20, paddingRight: 20 }]}>
                                    <View style={styles.div2columnRecent}>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}> Day</Text>
                                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'red', opacity: 0.7, marginTop: -6 }}>11</Text>
                                    </View>
                                    <View style={styles.div2column}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Title_Garlic_1</Text>
                                        <Text>09-21-2022 Batac</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={[styles.cardDashboardRecent, styles.cardDashboardRecentProp]}>
                                <View style={[styles.div2Row, { margin: 10, paddingLeft: 20, paddingRight: 20 }]}>
                                    <View style={styles.div2columnRecent}>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}> Day</Text>
                                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'red', opacity: 0.7, marginTop: -6 }}>33</Text>
                                    </View>
                                    <View style={styles.div2column}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Title_Garlic_2</Text>
                                        <Text>08-26-2022 Batac</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={[styles.cardDashboardRecent, styles.cardDashboardRecentProp]}>
                                <View style={[styles.div2Row, { margin: 10, paddingLeft: 20, paddingRight: 20 }]}>
                                    <View style={styles.div2columnRecent}>
                                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}> Day</Text>
                                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'red', opacity: 0.7, marginTop: -6 }}>45</Text>
                                    </View>
                                    <View style={styles.div2column}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Title_Garlic_3</Text>
                                        <Text>08-08-2022 Batac</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
}
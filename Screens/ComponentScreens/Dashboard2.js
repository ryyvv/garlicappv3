//import axios from 'axios';
import moment from "moment";
import React, { useEffect, useState, useFonts, useContext } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View, Image, LogBox, ImageBackground } from 'react-native';
// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from '../../src/css/styles';
import { AuthContext } from '../Context/AuthProvider';


export default function Dashboard({ navigation }) {
    const { logout, user } = useContext(AuthContext)
    const apiKey = 'c90f776ca6f447d182204634220807';
    const newdate = new Date();
    const [currentC, setCurrent] = useState('');
    const [currentDay, setCurrentDay] = useState([]);
    const [currentDayCondition, setCurrentDayCondition] = useState([]);
    const [location, setLocation] = useState('');
    const [localTime, setLocaTime] = useState('');

    const [perHour, setperHour] = useState([]);
    const [conditions, setCondition] = useState('');
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

                        {/* icons&Name */}
                        {/* <View style={styles.dashboardAccountUser}>
              <View style={styles.div2Row}>
                <View style={{ margin: 3 }}>
                </View>
                <View style={styles.div2column}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Hello, </Text>
                  <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Ryan James </Text>
                </View>
              </View>
            </View> */}

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

                        {/* card3 */}
                        <View style={[styles.cardDashboard, styles.cardDashboardProp, { marginTop: 30 }]}>
                            <View>
                                <View style={styles.cards1}>
                                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>

                                        <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center', }}>
                                            <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 130, height: 120, marginBottom: 15 }} />
                                            <Text style={{ fontWeight: '600', fontSize: 18 }}>{currentDayCondition.text}</Text>
                                        </View>

                                        <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>

                                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingBottom: -5, marginBottom: -5 }}>
                                                <Icon name={"thermometer"} color={'gray'} size={33} style={{ paddingTop: 4, width: 25 }} />
                                                <Text style={{ fontSize: 24, fontWeight: '800' }}>Temp </Text>
                                            </View>
                                            <Text style={{ fontSize: 30, fontWeight: '800', paddingLeft: 8, paddingTop: -5, marginTop: -5 }}>
                                                {currentDay.avgtemp_c}°C
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.cards1}>
                                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: 20 }}>

                                            <View>
                                                <Text style={{ fontSize: 14, fontWeight: '600' }}> Humidity</Text>
                                                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                                                    <Text style={{ fontSize: 25, fontWeight: '800', paddingLeft: 0, paddingTop: -5, marginTop: -5 }}>{currentDay.avghumidity}%</Text>
                                                    <Icon name={"water-outline"} color={'gray'} size={30} style={{ paddingLeft: 5, marginLeft: -5, width: 35 }} />
                                                </View>
                                            </View>

                                            <View>
                                                <Text style={{ fontSize: 14, fontWeight: '600' }}>Windspeed</Text>
                                                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                                                    <Text style={{ fontSize: 25, fontWeight: '800', paddingLeft: 0, paddingTop: -5, marginTop: -5 }}>{currentDay.maxwind_kph}km/h</Text>
                                                    <Icon name={"weather-windy"} color={'gray'} size={30} style={{ paddingLeft: 5, marginLeft: -5, width: 35 }} />
                                                </View>
                                            </View>

                                        </View>

                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* card4 */}
                        <View style={[styles.cardDashboard, styles.cardDashboardProp, { marginTop: 30 }]}>
                            <View>
                                <View>
                                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ width: '60%', justifyContent: 'center', alignItems: 'center', }}>
                                            <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 130, height: 120, marginBottom: 15 }} />
                                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>San Fernando</Text>
                                            <Text style={{ fontWeight: '600', fontSize: 16 }}>{currentDayCondition.text}</Text>
                                        </View>
                                        <View style={{ width: '40%', justifyContent: 'space-evenly' }}>

                                            <View style={[styles.div2Row, { marginBottom: 10 }]}>
                                                <View style={{ marginRight: 5, padding: 5, paddingLeft: 7, paddingRight: 7, borderRadius: 9, borderWidth: 1 }}>
                                                    <Icon name={"thermometer"} color={'gray'} size={25} style={{ paddingTop: 4, width: 25 }} />
                                                </View>
                                                <View style={styles.div2column}>
                                                    <Text>Temp</Text>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{currentDay.avgtemp_c}°C</Text>
                                                </View>
                                            </View>


                                            <View style={[styles.div2Row, { marginBottom: 10 }]}>
                                                <View style={{ marginRight: 5, padding: 5, paddingLeft: 7, paddingRight: 7, borderRadius: 9, borderWidth: 1 }}>
                                                    <Icon name={"weather-windy"} color={'gray'} size={25} style={{ paddingTop: 4, width: 25 }} />
                                                </View>
                                                <View style={styles.div2column}>
                                                    <Text>Wind</Text>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{currentDay.avghumidity}%</Text>
                                                </View>
                                            </View>

                                            <View style={styles.div2Row}>
                                                <View style={{ marginRight: 5, padding: 5, paddingLeft: 7, paddingRight: 7, borderRadius: 9, borderWidth: 1 }}>
                                                    <Icon name={"water-outline"} color={'gray'} size={25} style={{ paddingTop: 4, width: 25 }} />
                                                </View>
                                                <View style={styles.div2column}>
                                                    <Text>Humidity</Text>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{currentDay.maxwind_kph}km/h</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.dashboardWeather}>
                            {/* card5 */}
                            <View style={[styles.cardDashboard, styles.cardDashboardProp, { marginTop: 30 }]}>
                                <View>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', marginRight: 12, }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#90B77D', padding: 3, paddingRight: 10, paddingLeft: 10, paddingTop: 7, borderColor: '#90B77D', borderRadius: 15, borderWidth: 2 }}>09-26-2022</Text>
                                    </View>

                                    <View>
                                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: '60%', justifyContent: 'center', alignItems: 'center', }}>
                                                <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 130, height: 120, marginBottom: 15 }} />
                                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>San Fernando</Text>
                                                <Text style={{ fontWeight: '600', fontSize: 16 }}>{currentDayCondition.text}</Text>
                                            </View>
                                            <View style={{ width: '40%', justifyContent: 'space-evenly' }}>



                                                <View style={[styles.div2Row, { marginBottom: 10 }]}>
                                                    <View style={{ marginRight: 5, padding: 5, paddingLeft: 7, paddingRight: 7, borderRadius: 9, backgroundColor: '#F1BAA1', opacity: 0.4 }}>
                                                        <Icon name={"thermometer"} color={'red'} size={25} style={{ paddingTop: 4, width: 25 }} />
                                                    </View>
                                                    <View style={styles.div2column}>
                                                        <Text>Temp</Text>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{currentDay.avgtemp_c}°C</Text>
                                                    </View>
                                                </View>


                                                <View style={[styles.div2Row, { marginBottom: 10 }]}>
                                                    <View style={{ marginRight: 5, padding: 5, paddingLeft: 7, paddingRight: 7, borderRadius: 9, backgroundColor: '#0BA5BE', Opacity: 0.6 }}>
                                                        <Icon name={"weather-windy"} color={'#E8EDE7'} size={25} style={{ paddingTop: 4, width: 25 }} />
                                                    </View>
                                                    <View style={styles.div2column}>
                                                        <Text>Wind</Text>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{currentDay.avghumidity}%</Text>
                                                    </View>
                                                </View>

                                                <View style={styles.div2Row}>
                                                    <View style={{ marginRight: 5, padding: 5, paddingLeft: 7, paddingRight: 7, borderRadius: 9, backgroundColor: '#BACBDB', opacity: 0.6 }}>
                                                        <Icon name={"water"} color={'#0BA5BE'} size={25} style={{ paddingTop: 4, width: 25 }} />
                                                    </View>
                                                    <View style={styles.div2column}>
                                                        <Text>Humidity</Text>
                                                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{currentDay.maxwind_kph}km/h</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Hourly */}
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
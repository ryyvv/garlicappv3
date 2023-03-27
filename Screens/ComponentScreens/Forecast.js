import moment from "moment";
import React, { useEffect, useState, useFonts } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
    ImageBackground
} from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../src/css/styles';

function Wforecast({ navigation }) {

    const apiKey = 'c90f776ca6f447d182204634220807';

    const newdate = new Date();
    const [currentC, setCurrent] = useState('');
    const [currentDay, setCurrentDay] = useState([]);
    const [currentDayCondition, setCurrentDayCondition] = useState([]);
    const [location, setLocation] = useState('');
    const [localTime, setLocaTime] = useState('');
    const [perDay, setperDay] = useState([]);
    const [perHour, setperHour] = useState([]);
    const [conditions, setCondition] = useState('');
    const currentTimeCheck = moment(new Date().getHours()).format('hh:mm A');

    const getApiCurrent = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=batac city, ilocos Norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                let now = moment().utcOffset(15.2).format('l');
                console.error(error);
            });
        setLocation(response?.location)
        setCurrent(response?.current?.last_updated)
        // setCondition(response?.forecast?.forecastday[0]?.day.condition)
        // setLocaTime(response?.location)
        setperHour(response?.forecast?.forecastday[0]?.hour)
        setperDay(response?.forecast?.forecastday)
        setCurrentDay(response?.forecast?.forecastday[0]?.day)
        setCurrentDayCondition(response?.forecast?.forecastday[0]?.day?.condition)
        //check
        // console.log('Current Location: ', location.name)
        // console.log('CurrentDate: ', currentC)
        // console.log('DayDate: ', currentDay.avgtemp_c)
        // console.log('DayMaxTemp: ', currentC.maxtemp_c)
        // console.log('CurrentCondition: ', localTime.localtime)
        // console.log('CurrentCondition: ', perHour)

        return perHour;
    };


    const level = 100;

    useEffect(() => {
        getApiCurrent();
        const dataInterval = setInterval(() => fetchData(), 21600 * 1000);
        return () => clearInterval(dataInterval);
    }, []);
    const statusBarStyle = 'dark-content';
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../../src/images/garlicbg2.png')} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
                <StatusBar animated={true} barStyle={statusBarStyle} translucent={true} />
                <ScrollView>
                    <View style={styles.container}>
                        {/* Forecast */}
                        <View style={{ flex: 0.5, marginTop: 80 }}>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginLeft: 6, marginRight: 6 }}>
                                <Text style={{ fontSize: 25, fontWeight: '900', marginBottom: 10 }}>Forecast Report</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('SearchLocation')}>
                                    {/* <Icon name={"map-marker-radius-outline"} color={'gray'} size={37} style={{ paddingLeft: 3, marginLeft: -5, width: 45, }} /> */}
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Hourly */}
                        <View style={styles.dashboardHourly}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Today</Text>
                            <ScrollView horizontal={true}>
                                {
                                    perHour.map((hours, u) => {
                                        return (
                                            <View key={u} style={{ marginRight: 12, marginBottom: 10 }}>
                                                <View style={[styles.cardDashboardHourly, styles.cardDashboardHourlyProp]}>
                                                    <View style={styles.div2RowSpaceEven}>
                                                        <View style={{ padding: 4 }}>
                                                            <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 45, height: 45 }} />
                                                        </View>
                                                        <View style={{ justifyContent: 'flex-end' }}>
                                                            <Text style={{ fontSize: 14 }}>{moment(hours.time).format("hh:mmA")}</Text>
                                                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{hours.temp_c}°C</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    })
                                }
                            </ScrollView>
                        </View>

                        {/* Next day*/}
                        <View style={styles.dashboardForecastDay}>
                            <View style={styles.div2RowSpaceBetween}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Next forecast</Text>
                                {/* <Icon name={"calendar-month"} color={'gray'} size={37} style={{ paddingLeft: 3, marginLeft: -5, width: 45, }} /> */}
                            </View>

                            {
                                perDay.map((dayper, s) => {
                                    return (
                                        <View key={s} style={[styles.cardDashboardForecast, styles.cardDashboardForecastProp, { marginBottom: 10 }]}>
                                            <View style={styles.div2RowSpaceBetween}>
                                                <View>
                                                    <Text style={{ fontSize: 18, fontWeight: '800' }}>{moment(dayper.date).format("dddd")}</Text>
                                                    <Text style={{ fontSize: 14, fontWeight: '800', }}>{moment(dayper.date).format("MMM. D")} </Text>
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 30, fontWeight: '800' }}>{dayper.day.avgtemp_c}°C</Text>
                                                </View>
                                                <View style={{ marginRight: 12 }}>
                                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 50, height: 50 }} />
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>


                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
}

let data = [
    {
        id: 1,
        location: 'Adams',
        isChecked: false,
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Adams&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 2,
        location: 'Bacarra',
        isChecked: false,
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Bacarra&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 3,
        location: 'Badoc',
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Badoc&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 4,
        location: 'Bangui',
        isChecked: false,
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Bangui&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 5,
        location: 'Batac',
        isChecked: false,
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Batac&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 6,
        location: 'Burgos',
        isChecked: false,
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Burgos&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 7,
        location: 'Carasi',
        isChecked: false,
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Carasi&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 8,
        location: 'Currimao',
        isChecked: false,
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Currimao&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 9,
        location: 'Dingras',
        isChecked: false,
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Dingras&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 10,
        location: 'Dumalneg',
        isChecked: false,
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Dumalneg&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 11,
        location: 'Espiritu',
        isChecked: false,
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Espiritu&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 12,
        location: 'Laoag',
        isChecked: false,
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Laoag&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 13,
        location: 'Marcos',
        isChecked: false,
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Marcos&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 14,
        isChecked: false,
        location: 'Nueva Era',
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Nueva Era&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 15,
        isChecked: false,
        location: 'Pagudpud',
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Pagudpud&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 16,
        isChecked: false,
        location: 'Paoay',
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Paoay&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 17,
        location: 'Pasuquin',
        isChecked: false,
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Pasuquin&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 18,
        location: 'Piddig',
        isChecked: false,
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Piddig&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 19,
        location: 'Pinili',
        isChecked: false,
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Pinili&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 20,
        location: 'San Nicolas',
        isChecked: false,
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=San Nicolas&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 21,
        location: 'Sarrat',
        isChecked: false,
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Sarrat&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 22,
        location: 'Solsona',
        isChecked: false,
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Solsona&days=7&aqi=yes&alerts=yes'
    },
    {
        id: 23,
        location: 'Vintar',
        isChecked: false,
        url: 'http://api.weatherapi.com/v1/forecast.json?key=337a37d695fe42ffa2210148220906&q=Vintar&days=7&aqi=yes&alerts=yes'
    },

]

function SearchLocation({ navigation }) {

    const [locList, setLocList] = useState([]);
    const [apikey, setAPIkey] = useState('337a37d695fe42ffa2210148220906');

    const getApiAdams = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=' + locList + '&days=3&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            });

        setLocation(response?.location)
        setCurrent(response?.current?.last_updated)
        setCurrentDay(response?.forecast?.forecastday[0]?.day)
        setCurrentDayCondition(response?.forecast?.forecastday[0]?.day?.condition)

    };


    useEffect(() => {
        getApiAdams();
    }, []);

    const [checked, setChecked] = useState(data);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return (
        <SafeAreaView>
            <StatusBar animated={true} backgroundColor="green" />
            <ScrollView>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', alignItems: 'center', padding: 10 }}>
                    {
                        data.map((datalist, id) => {
                            return (
                                <View key={id} style={[styles.cardDashboardLocation, styles.cardDashboardLocationProp]}>
                                    <CheckBox disabled={false} value={datalist.id}
                                        onValueChange={(id) => {
                                            // if(id === datalist.id){
                                            //   setChecked({...checked, isChecked :value})
                                            // }
                                            console.log(id)

                                        }} />
                                    <Text>{datalist.location}</Text>
                                </View>
                                // <TouchableOpacity key={id} onPress={()=> {
                                //   setLocList(locList => [...locList,datalist.location])
                                //   }}
                                //   style={[styles.cardDashboardLocation, styles.cardDashboardLocationProp]}>
                                //     <View style={styles.div2Row}>
                                //       <View style={{padding:10}}>
                                //         <Image source={require('../resource/img/sunRAsset2.png')} style={{ width: 40, height: 40, marginBottom: 5 }} />
                                //       </View>
                                //       <View style={{padding:10}}>
                                //         <Text style={{fontWeight:'bold',fontSize:25}}>30°C</Text>
                                //       </View>
                                //     </View>
                                //     <View style={styles.div2RowSpaceBetween}>
                                //     <Text style={{fontWeight:'bold',fontSize:18}}>{datalist.location}</Text>
                                //     <CheckBox
                                //        value={datalist.isChecked}
                                //        onChange={() => {
                                //          handleChange(datalist.id)}}
                                //     />
                                //     </View>
                                // </TouchableOpacity>
                                // <TouchableOpacity key={id} onPress={()=> {
                                //   setLocList(locList => [...locList,datalist.location])
                                //   }}
                                //   style={[styles.cardDashboardLocation, styles.cardDashboardLocationProp]}>
                                //     <View style={styles.div2Row}>
                                //       <View style={{padding:10}}>
                                //         <Image source={require('../resource/img/sunRAsset2.png')} style={{ width: 40, height: 40, marginBottom: 5 }} />
                                //       </View>
                                //       <View style={{padding:10}}>
                                //         <Text style={{fontWeight:'bold',fontSize:25}}>30°C</Text>
                                //       </View>
                                //     </View>
                                //     <View style={styles.div2RowSpaceBetween}>
                                //     <Text style={{fontWeight:'bold',fontSize:18}}>{datalist.location}</Text>
                                //     <CheckBox
                                //       value={toggleCheckBox}
                                //       onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                //     />
                                //     </View>
                                // </TouchableOpacity>
                            )
                        })
                    }
                    {console.log(locList)}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const ForecastStack = createNativeStackNavigator();
export default function Forecast({ navigation }) {
    return (
        <ForecastStack.Navigator>
            <ForecastStack.Screen name="Wforecast" component={Wforecast} options={{ headerShown: false }} />
            <ForecastStack.Screen name="SearchLocation" component={SearchLocation} />
        </ForecastStack.Navigator>
    );
}
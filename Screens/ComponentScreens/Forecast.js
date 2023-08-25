import moment from "moment";
import React, { useEffect, useState, useContext,useFonts } from 'react';
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
import { LocationContext } from '../Context/LocationProvider';
import styles from '../../src/css/styles';

function Wforecast({ navigation }) {

    const apiKey = 'eb40ebc2fe0c4d02b2735258230304';
    const {
        locations,
        setLocation,
        locationList,
        weathloc,
        weathDate,
        weathIcon,
        weathData,
        weathPerHour,
        weathCondition,
        weathPerDay,
        setLOCATION,
        holdlocation,
        setWeatherHoldLocation,
       
    } = useContext(LocationContext);

    const newdate = new Date();

    const level = 100;

    useEffect(() => {
        // getApiCurrent();
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
                                <Text style={{ fontSize: 25, fontWeight: '900', marginBottom: 10, color: '#276653' }}>Forecast Report</Text>
                            </View>
                        </View>

                        <View style={ styles.dashboardHourly}>
                            <ScrollView horizontal={true}
                                showsVerticalScrollIndicator={false}>
                                {weathPerHour.map((wperhour, p) => {
                                return (
                                <View key={p} style={{ marginRight: 12, marginBottom: 10 }}>
                                        <View
                                            style={[
                                                styles.cardDashboardHourly,
                                                styles.cardDashboardHourlyProp,
                                            ]}>
                                            <View style={styles.div2RowSpaceEven}>
                                                <View style={{ padding: 4 }}>

                                                    {
                                                        wperhour.condition.code == 1000 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1000.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1003 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1003.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1006 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1006.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1009 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1009.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1063 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1063.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1087 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1087.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1135 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1135.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1135 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1135.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1150 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1150.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1153 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1153.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1171 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1171.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1180 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1180.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1183 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1183.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1186 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1186.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1189 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1189.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1193 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1193.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1195 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1195.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1198 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1198.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1201 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1201.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1240 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1240.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1243 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1243.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1249 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1249.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1273 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1273.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    {
                                                        wperhour.condition.code == 1276 ?
                                                            (
                                                                <Image resizeMode={'contain'}
                                                                    source={require('../../src/weathericon/1276.png')}
                                                                    style={{ width: 65, height: 45 }}
                                                                />
                                                            )
                                                            :
                                                            (null)
                                                    }

                                                    {/* <Text>{wperhour.condition.code}</Text> */}

                                                </View>
                                                <View style={{ justifyContent: 'flex-end' }}>
                                                    <Text
                                                        style={{
                                                            fontSize: 14,
                                                            fontWeight: 'bold',
                                                            color: '#8eb4a9',
                                                        }}>
                                                        {moment(wperhour.time).format('hh:mmA')}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 20,
                                                            fontWeight: '900',
                                                            color: '#276653',
                                                        }}>
                                                        {wperhour.temp_c}°C
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                </View>
                                );
                                })}
                            </ScrollView>
                        </View>

                        {/* Next day*/}
                        <View style={styles.dashboardForecastDay}>
                            <View style={styles.div2RowSpaceBetween}>
                                <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10,  color: '#276653' }}>7-day forecast</Text>
                                {/* <Icon name={"calendar-month"} color={'gray'} size={37} style={{ paddingLeft: 3, marginLeft: -5, width: 45, }} /> */}
                            </View>
                            {
                                weathPerDay.map((dayper, s) => {
                                    return (
                                        <View key={s} style={[styles.cardDashboardForecast, styles.cardDashboardForecastProp, { marginBottom: 10 }]}>
                                            <View style={styles.div2RowSpaceBetween}>
                                                <View style={{flexDirection:'row'}}>
                                                    <Text style={{ fontSize: 14, fontWeight: '800',  color: '#276653' }}>{moment(dayper.date).format("dddd")}, </Text>
                                                    <Text style={{ fontSize: 14, fontWeight: '800',  color: '#276653'}}>{moment(dayper.date).format("MMM. D")} </Text>
                                                </View>
                                            </View >
                                            <View style={{flexDirection:'row', marginTop:10}}>
                                                <View style={{ marginRight: 12 , justifyContent:'center', alignItems:'center'}}>
                                                    <View>

                                                        {
                                                            weathCondition.code == 1000 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1000.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1003 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1003.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1006 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1006.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1009 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1009.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1063 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1063.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1087 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1087.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1135 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1135.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1135 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1135.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1150 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1150.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1153 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1153.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1171 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1171.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1180 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1180.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1183 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1183.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1186 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1186.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1189 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1189.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1193 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1193.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1195 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1195.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1198 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1198.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1201 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1201.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1240 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1240.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1243 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1243.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1249 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1249.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1273 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1273.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {
                                                            weathCondition.code == 1276 ?
                                                                (
                                                                    <Image
                                                                        source={require('../../src/weathericon/1276.png')}
                                                                        style={{ width: 90, height: 50 }}
                                                                    />
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        {/* 
<Text>{weathCondition.text}</Text> */}
                                                    </View>
                                                    {/* <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 50, height: 50 }} /> */}
                                                    <View>
                                                        <Text style={{ fontSize: 14, fontWeight: '800',color: '#276653'}}>{dayper.day.condition.text}</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={{ fontSize: 14, fontWeight: '800',color: '#276653'}}>{dayper.day.daily_chance_of_rain}% chance of rain</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ fontSize: 14, fontWeight: '800' }}>temp:  </Text>
                                                        <Text style={{ fontSize: 16, fontWeight: '800',color: '#276653' }}> {dayper.day.maxtemp_c}</Text>
                                                        <Text style={{ fontSize: 16, fontWeight: '600',color: '#276653' }}>/{dayper.day.mintemp_c}°C</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ fontSize: 14, fontWeight: '800'}}>humidity:  </Text>
                                                        <Text style={{ fontSize: 16, fontWeight: '800',color: '#276653' }}>{dayper.day.avghumidity}%</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ fontSize: 14,fontWeight: '800'}}>windspeed:  </Text>
                                                        <Text style={{ fontSize: 16, fontWeight: '800',color: '#276653' }}>{dayper.day.maxwind_kph} kph</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row',fontWeight: '800' }}>
                                                        <Text style={{ fontSize: 14,fontWeight: '800'}}>sunrise:  </Text>
                                                        <Text style={{ fontSize: 16, fontWeight: '800',color: '#276653' }}>{dayper.astro.sunrise}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{ fontSize: 14,fontWeight: '800'}}>sunset:  </Text>
                                                        <Text style={{ fontSize: 16, fontWeight: '800',color: '#276653' }}>{dayper.astro.sunset}</Text>
                                                    </View>
                                                    
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
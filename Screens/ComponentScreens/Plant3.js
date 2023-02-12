//import axios from 'axios';
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
    ImageBackground,
    Button,
    Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../src/css/styles';



function PlantDash({ navigation }) {
    const [plants, setPlants] = useState('');

    const hidden = false;
    const statusBarStyle = 'dark-content';

    useEffect(() => {
        navigation.setOptions({
            headerLargeTitle: false,
            headerBackground: props =>
                <Image
                    style={{ width: '100%' }}
                    source={require('../../src/images/garlicbg1.png')}
                />
            ,
            headerTitle: props => <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#276653' }}>My Plants</Text>,
            headerRight: props =>
                <View style={styles.div2Row}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('PlantSearch')
                        }}>
                        <View style={[styles.div2Row, styles.searchbar]}>
                            <Icon name={"magnify"} color={'#276653'} size={19} style={{ marginRight: 1, marginLeft: 1 }} />
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#276653', }}>Search</Text>
                        </View>
                    </TouchableOpacity>
                </View>,
        })
    }, [navigation])
    return (
        <View style={{ flex: 1, backgroundColor: '#cbdeda' }}>
            {/* <View style={{ flex: 1 }}>
      <ImageBackground source={require('../../src/images/garlicbg2.png')} resizeMode="cover" style={{
        flex: 1,
        justifyContent: "center"
      }}> */}
            <StatusBar
                animated={true}
                barStyle={statusBarStyle}
                translucent={true} />
            <ScrollView>
                <View style={styles.accountcontainer}>

                    <View>
                        <View style={styles.cardDataPlant}>
                            <View style={styles.div2RowSpaceEvenNoAlignItems}>
                                <TouchableOpacity>
                                    <View style={styles.div2Row}>
                                        <Image source={require('../../src/images/garlic2.png')} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }} />
                                        <View>
                                            <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 17 }}>Garlic1-Suyo</Text>
                                            <Text>Dec. 03, 2022</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.div2RowDatalist}>
                                    <Icon name={"bell-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 20 }} />
                                    <TouchableOpacity>
                                        <Icon name={"dots-vertical"} color={'#276653'} size={23} style={{ width: 20 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.cardDataPlant}>
                            <View style={styles.div2RowSpaceEvenNoAlignItems}>
                                <TouchableOpacity>
                                    <View style={styles.div2Row}>
                                        <Image source={require('../../src/images/garlic2.png')} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }} />
                                        <View>
                                            <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 17 }}>Garlic1-Suyo</Text>
                                            <Text>Dec. 03, 2022</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.div2RowDatalist}>
                                    {/* <Icon name={"bell-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 20 }} /> */}
                                    <Icon name={"dots-vertical"} color={'#276653'} size={23} style={{ width: 20 }} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.cardDataPlant}>
                            <View style={styles.div2RowSpaceEvenNoAlignItems}>
                                <TouchableOpacity>
                                    <View style={styles.div2Row}>
                                        <Image source={require('../../src/images/garlic2.png')} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }} />
                                        <View>
                                            <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 17 }}>Garlic1-Suyo</Text>
                                            <Text>Dec. 03, 2022</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.div2RowDatalist}>
                                    <Icon name={"bell-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 20 }} />
                                    <TouchableOpacity>
                                        <Icon name={"dots-vertical"} color={'#276653'} size={23} style={{ width: 20 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.cardDataPlant}>
                            <View style={styles.div2RowSpaceEvenNoAlignItems}>
                                <TouchableOpacity>
                                    <View style={styles.div2Row}>
                                        <Image source={require('../../src/images/garlic2.png')} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }} />
                                        <View>
                                            <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 17 }}>Garlic1-Suyo</Text>
                                            <Text>Dec. 03, 2022</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.div2RowDatalist}>
                                    <Icon name={"bell-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 20 }} />
                                    <TouchableOpacity>
                                        <Icon name={"dots-vertical"} color={'#276653'} size={23} style={{ width: 20 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.cardDataPlant}>
                            <View style={styles.div2RowSpaceEvenNoAlignItems}>
                                <TouchableOpacity>
                                    <View style={styles.div2Row}>
                                        <Image source={require('../../src/images/garlic2.png')} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }} />
                                        <View>
                                            <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 17 }}>Garlic1-Suyo</Text>
                                            <Text>Dec. 03, 2022</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.div2RowDatalist}>
                                    <Icon name={"bell-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 20 }} />
                                    <TouchableOpacity>
                                        <Icon name={"dots-vertical"} color={'#276653'} size={23} style={{ width: 20 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.cardDataPlant}>
                            <View style={styles.div2RowSpaceEvenNoAlignItems}>
                                <TouchableOpacity>
                                    <View style={styles.div2Row}>
                                        <Image source={require('../../src/images/garlic2.png')} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }} />
                                        <View>
                                            <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 17 }}>Garlic1-Suyo</Text>
                                            <Text>Dec. 03, 2022</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.div2RowDatalist}>
                                    <Icon name={"bell-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 20 }} />
                                    <TouchableOpacity>
                                        <Icon name={"dots-vertical"} color={'#276653'} size={23} style={{ width: 20 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.cardDataPlant}>
                            <View style={styles.div2RowSpaceEvenNoAlignItems}>
                                <TouchableOpacity>
                                    <View style={styles.div2Row}>
                                        <Image source={require('../../src/images/garlic2.png')} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }} />
                                        <View>
                                            <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 17 }}>Garlic1-Suyo</Text>
                                            <Text>Dec. 03, 2022</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.div2RowDatalist}>
                                    <Icon name={"bell-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 20 }} />
                                    <TouchableOpacity>
                                        <Icon name={"dots-vertical"} color={'#276653'} size={23} style={{ width: 20 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.cardDataPlant}>
                            <View style={styles.div2RowSpaceEvenNoAlignItems}>
                                <TouchableOpacity>
                                    <View style={styles.div2Row}>
                                        <Image source={require('../../src/images/garlic2.png')} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }} />
                                        <View>
                                            <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 17 }}>Garlic1-Suyo</Text>
                                            <Text>Dec. 03, 2022</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.div2RowDatalist}>
                                    <Icon name={"bell-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 20 }} />
                                    <TouchableOpacity>
                                        <Icon name={"dots-vertical"} color={'#276653'} size={23} style={{ width: 20 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.cardDataPlant}>
                            <View style={styles.div2RowSpaceEvenNoAlignItems}>
                                <TouchableOpacity>
                                    <View style={styles.div2Row}>
                                        <Image source={require('../../src/images/garlic2.png')} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }} />
                                        <View>
                                            <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 17 }}>Garlic1-Suyo</Text>
                                            <Text>Dec. 03, 2022</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.div2RowDatalist}>
                                    <Icon name={"bell-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 20 }} />
                                    <TouchableOpacity>
                                        <Icon name={"dots-vertical"} color={'#276653'} size={23} style={{ width: 20 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.cardDataPlant}>
                            <View style={styles.div2RowSpaceEvenNoAlignItems}>
                                <TouchableOpacity>
                                    <View style={styles.div2Row}>
                                        <Image source={require('../../src/images/garlic2.png')} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }} />
                                        <View>
                                            <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 17 }}>Garlic1-Suyo</Text>
                                            <Text>Dec. 03, 2022</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.div2RowDatalist}>
                                    <Icon name={"bell-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 20 }} />
                                    <TouchableOpacity>
                                        <Icon name={"dots-vertical"} color={'#276653'} size={23} style={{ width: 20 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.cardDataPlant}>
                            <View style={styles.div2RowSpaceEvenNoAlignItems}>
                                <TouchableOpacity>
                                    <View style={styles.div2Row}>
                                        <Image source={require('../../src/images/garlic2.png')} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }} />
                                        <View>
                                            <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 17 }}>Garlic1-Suyo</Text>
                                            <Text>Dec. 03, 2022</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.div2RowDatalist}>
                                    <Icon name={"bell-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 20 }} />
                                    <TouchableOpacity>
                                        <Icon name={"dots-vertical"} color={'#276653'} size={23} style={{ width: 20 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.cardDataPlant}>
                            <View style={styles.div2RowSpaceEvenNoAlignItems}>
                                <TouchableOpacity>
                                    <View style={styles.div2Row}>
                                        <Image source={require('../../src/images/garlic2.png')} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }} />
                                        <View>
                                            <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 17 }}>Garlic1-Suyo</Text>
                                            <Text>Dec. 03, 2022</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.div2RowDatalist}>
                                    <Icon name={"bell-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 20 }} />
                                    <TouchableOpacity>
                                        <Icon name={"dots-vertical"} color={'#276653'} size={23} style={{ width: 20 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.cardDataPlant}>
                            <View style={styles.div2RowSpaceEvenNoAlignItems}>
                                <TouchableOpacity>
                                    <View style={styles.div2Row}>
                                        <Image source={require('../../src/images/garlic2.png')} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }} />
                                        <View>
                                            <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 17 }}>Garlic1-Suyo</Text>
                                            <Text>Dec. 03, 2022</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.div2RowDatalist}>
                                    <Icon name={"bell-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 20 }} />
                                    <TouchableOpacity>
                                        <Icon name={"dots-vertical"} color={'#276653'} size={23} style={{ width: 20 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* </ScrollView> */}
                </View>
            </ScrollView>
            {/* </ImageBackground> */}
        </View >
    )
}

function PlantID() {

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
    const [datacollect, setDataColllected] = useState('');
    const [dataArray, setDataArray] = useState([]);
    const currentTimeCheck = moment(new Date().getHours()).format('hh:mm A');

    const getApiCurrent = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=batac city, ilocos Norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
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
        console.log('Current Location: ', location.name)
        console.log('CurrentDate: ', currentC)
        console.log('DayDate: ', currentDay.avgtemp_c)
        console.log('DayMaxTemp: ', currentC.maxtemp_c)
        console.log('CurrentCondition: ', localTime.localtime)
        console.log('CurrentCondition: ', perHour)

        return perHour;
    };

    const addData = () => {
        dataArray.push(datacollect.toString());
        setDataColllected('')

        if (dataArray != null) {
            return dataArray
        } else {
            setDataColllected('')
        }
    }


    useEffect(() => {
        getApiCurrent();
        // addData();
    }, []);

    return (
        <View>
            <StatusBar animated={true} backgroundColor="green" />
            <SafeAreaView>
                <ScrollView>
                    <View>
                        <Text>Screen 2</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}


function PlantSearch({ navigation, route }) {

    const hidden = true;
    const statusBarStyle = 'dark-content';

    const [plants, setPlants] = useState('');
    // useEffect(() => {
    //   navigation.setOptions({
    //     // headerLargeTitle: false,
    //     headerTitle: props =>
    //       <View style={styles.div2Row}>
    //         <TextInput name="searchplant" placeholder="Search plant" onChangeText={text => setPlants(text)}
    //           value={plants} style={{ width: 260, paddingRight: 15, fontSize: 18, color: '#276653', fontWeight: 'bold' }} />
    //         <TouchableOpacity
    //           onPress={() => {
    //             // navigation.navigate('PlantSearch', { searchplant: searchplant })
    //             alert('Search function not available ')
    //           }}>
    //           <Icon name={"magnify"} color={'#276653'} size={25} style={{ marginRight: 1 }} />
    //         </TouchableOpacity>
    //       </View>

    //   })
    // }, [navigation])

    const dataPlant = [
        'id 1',
        'id 2',
        'id 3',
        'id 4',
        'id 5',
        'id 6',
        'id 7',
        'id 8',
        'id 9',
        'id 10',
        'id 11',
        'id 12',
        'id 13',
        'id 14',
        'id 15',
        'id 16',
    ]
    let AnimatedHeaderValue = new Animated.Value(0);
    const HEADER_MAX_HEIGHT = 150;
    const HEADER_MIN_HEIGHT = 90;

    const animatedHeaderBackgroundColor = AnimatedHeaderValue.interpolate({
        inputRange: [40, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: ['blue', 'red'],
        extrapolate: 'clam'
    });


    const animatedHeaderHeight = AnimatedHeaderValue.interpolate({
        inputRange: [40, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clam'
    });

    return (

        <View style={{ flex: 1, backgroundColor: '#cbdeda' }}>
            <StatusBar
                animated={true}
                barStyle={statusBarStyle}
                translucent={false} />

            <Animated.View style={{ height: animatedHeaderHeight, backgroundColor: animatedHeaderBackgroundColor }}>
                <View style={styles.accountcontainer}>
                    <Text>My Plants</Text>
                </View>
            </Animated.View>
            <View style={styles.accountcontainer}>
                <View style={{ backgroundColor: 'white', height: 70, width: '100%', marginBottom: 10 }}>
                    <Text>My Plants</Text>
                </View>
                <ScrollView scrollEventThrottle={16}
                    onScroll={
                        Animated.event(
                            [{
                                nativeEvent: {
                                    contentOffset: {
                                        y: AnimatedHeaderValue
                                    }
                                }
                            }],
                            { useNativeDriver: false }
                        )
                    }>
                    <View>
                        {
                            dataPlant.map((item, index) => (
                                < View Key={index} style={styles.cardDataPlant}>
                                    <View style={styles.div2RowSpaceEvenNoAlignItems}>
                                        <TouchableOpacity>
                                            <View style={styles.div2Row}>
                                                <Image source={require('../../src/images/garlic2.png')} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }} />
                                                <View>
                                                    <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 17 }}>{item}</Text>
                                                    <Text>Dec. 03, 2022</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.div2RowDatalist}>
                                            <Icon name={"bell-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 20 }} />
                                            <TouchableOpacity>
                                                <Icon name={"dots-vertical"} color={'#276653'} size={23} style={{ width: 20 }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                </ScrollView >
            </View >
        </View >
    )
}


const PlantStack = createNativeStackNavigator();
export default function Plant({ navigation }) {
    return (
        <PlantStack.Navigator>
            <PlantStack.Screen name="PlantDash" component={PlantDash} />
            <PlantStack.Screen name="PlantID" component={PlantID} />
            <PlantStack.Screen name="PlantSearch" component={PlantSearch}
                options={
                    { headerShown: false }
                } />
        </PlantStack.Navigator >
    );
}
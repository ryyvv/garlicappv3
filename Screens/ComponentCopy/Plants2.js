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

import BSheet from '../ComponentScreens/BottomSheet'

function PlantDash({route, navigation }) {
  const [plants, setPlants] = useState('');

  // const {plantData, setPlantData} =  route.params;

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
      // headerRight: props =>
      //   <View style={styles.div2Row}>
      //     <TouchableOpacity
      //       onPress={() => {
      //         navigation.navigate('PlantSearch')
      //       }}>
      //       <View style={[styles.div2Row, styles.searchbar]}>
      //         <Icon name={"magnify"} color={'#276653'} size={19} style={{ marginRight: 1, marginLeft: 1 }} />
      //         <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#276653', }}>Search</Text>
      //       </View>
      //     </TouchableOpacity>
      //   </View>
    })
    const plantData = database().ref('/plants/');
    console.log(plantData)
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
                <TouchableOpacity
                  onPress={() => {

                  }}
                >
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

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PlantNew')
        }}
      >
        <View style={styles.addBtn}>
          <Icon name={"plus"} color={'white'} size={23} style={{ fontWeight: 'bold' }} />
        </View>
      </TouchableOpacity>

      {/* </ImageBackground> */}
      {/* <View>
        <TouchableOpacity
          onPress={navigate.navigation('BottomSheet')}>
          <Text>BottomSheet</Text>
        </TouchableOpacity>
      </View> */}
    </View >

  )
}

function PlantID({ navigation }) {

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

function PlantNew({ navigation }) {
  const { logout, user } = useContext(AuthContext)
  const [plantDate, setPlantDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [plantTitle, setPlantTitle] = useState('')
  const [plantVariety, setPlantVariety] = useState('')
  const [plantAddress, setPlantAddress] = useState('')
  const [dataloading, setDataloading] = useState(false);

  // if plantDate is <= 30days
  // then Camera and upload enable
  //


  const getData = () => {
    if (!plantTitle.trim()) {
      alert('Please enter title!');
      return;
    } else if (!plantVariety.trim()) {
      alert('Please enter variety!');
      return;
    } else if (!plantAddress.trim()) {
      alert('Please enter address!');
      return;
    }
    // if (plantTitle == null || plantVariety == null || plantDate == null || plantAddress == null) {
    //   alert('Error!')
    // } 
    else {
      database()
        .ref('plants/' + user.uid + plantTitle)
        .set({
          title: plantTitle,
          variety: plantVariety,
          date: plantDate.toISOString(),
          plantAddress: plantAddress
        }).then(() => {
          // console.log('Plant data stored successfully!')
          // navigation.navigate('PlantID')
          alert('Plant data stored successfully!')

        });

    }
    console.log('TITLE', plantTitle)
    console.log('VARIETY', plantVariety)
    console.log('DATE', plantDate.toISOString())
    console.log('PLANT ADDRESS', plantAddress)
    // }
  }


  // useEffect(() => {

  //   navigation.setOptions({
  //     headerLargeTitle: false,
  //     // headerBackground: props =>
  //     //   <Image
  //     //     style={{ width: '100%' }}
  //     //     source={require('../../src/images/garlicbg1.png')}
  //     //   />
  //     // ,
  //     headerTitle: props => <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#276653' }}>New Plant</Text>,
  //     headerRight: props =>
  //       <View style={styles.div2Row}>
  //         <TouchableOpacity
  //           onPress={() => {
  //             // Submit Btn
  //             // navigation.navigate('PlantDash')
  //             getData();
  //           }}>
  //           <View style={{ marginRight: 20 }}>
  //             <Icon name={"check-bold"} color={'#276653'} size={23} style={{ fontWeight: 'bolder' }} />
  //           </View>
  //         </TouchableOpacity>
  //       </View>,
  //   })

  //   console.log(moment(plantDate).format('llll'))
  // }, [navigation])


  return (
    <View  style={{ flex: 1, backgroundColor: '#AADCB6' }}>
       <StatusBar backgroundColor="transparent" translucent={true} />
      {/* <ImageBackground source={require('../../src/images/garlicbg2.png')} resizeMode="cover" style={{ flex: 1, }}> */}
      {/* <ScrollView style={{ padding: 25 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name={"sprout"} color={'#276653'} size={28} style={{ marginTop: 3, marginRight: 15, marginLeft: 1 }} />
          <TextInput placeholder={'Title'} onChangeText={(value) => setPlantTitle(value)} value={plantTitle}
            style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#276653', fontSize: 18, paddingLeft: 4, paddingTop: -3, paddingBottom: -3, fontWeight: 'bold' }} />
        </View >

        <View style={{ alignItems: 'center', marginTop: 25, marginLeft: 44 }}>
          <TextInput placeholder={'Variety'} onChangeText={(value) => setPlantVariety(value)} value={plantVariety} o style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#276653', fontSize: 18, paddingLeft: 4, paddingTop: -3, paddingBottom: -3, fontWeight: 'bold' }} />
        </View>
        <View style={{ alignItems: 'center', marginTop: 25 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Icon name={"calendar"} color={'#276653'} size={28} style={{ marginTop: 3, marginRight: 15, marginLeft: 1 }} />
            <Text style={{ width: '86%', fontSize: 16, fontWeight: 'bold' }}>Dated planted:</Text>
          </View>
          <TouchableOpacity
            onPress={() => setOpen(true)}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#276653', marginLeft: 44, padding: 5 }}>
              <Text style={{ fontSize: 16, width: '100%', left: 0 }}>{moment(plantDate).format('ll')}</Text>
            </View>
          </TouchableOpacity>
        </View >
        <View>
          <DatePicker
            modal
            open={open}
            date={plantDate}
            mode={'date'}

            onConfirm={(date) => {
              setOpen(false)
              setPlantDate(date)
            }}
            onCancel={() => {
              setOpen(false)
            }}
            style={{ fontWeight: 'bold' }}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 25 }}>
          <Icon name={"map-marker"} color={'#276653'} size={28} style={{ marginTop: 3, marginRight: 15, marginLeft: 1 }} />
          <TextInput placeholder={'Address'} onChangeText={(value) => setPlantAddress(value)} value={plantAddress} style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#276653', fontSize: 18, paddingLeft: 4, paddingTop: -3, paddingBottom: -3, fontWeight: 'bold' }} />
        </View >
      </ScrollView> */}
      <View>
        <Image />
      </View>
        <View>
            <View style={{flexDirection:'row',justifyContent: 'space-between', alignItems:'center',marginTop:40,borderColor:'green',padding:13}}>
                    {/* Header */}
                    <View>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <View>
                        <Icon name={'arrow-left'} color={'#276653'} size={27}  />
                        </View>
                    </TouchableOpacity>
                    </View>
                    {/* <View>
                        <TouchableOpacity>
                        <View>
                            <Icon name={'check'} color={'#276653'} size={27}  />
                            <Text>Submit</Text>
                        </View>
                        </TouchableOpacity>
                    </View> */}
                </View>
                {/* Content */}
                <View style={{flex:2, padding:20}}>
                    <ScrollView>
                    {/* Images */}
                        <View style={{ flexDirection: 'row', marginBottom: 30,justifyContent:'center',alignItems:'center' }}>
                            <View style={{padding:60, borderWidth: 15, borderColor: 'white' ,backgroundColor:'#cbe6d1', borderRadius:25, width:300,justifyContent:'center',alignItems:'center',}}>
                            <Icon name={"image-filter-hdr"} color={'#276653'} size={68}  style={{borderRadius:25}}/> 
                            </View>
                        </View>

                    {/* TextInput */}
                    <View style={[    styles.cardPlantcard, styles.cardPlantcardProp,{backgroundColor: 'white',padding:20, borderRadius:20}]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name={"sprout"} color={'#276653'} size={28} style={{ marginTop: 3, marginRight: 15, marginLeft: 1 }} />
                        <TextInput placeholder={'Title'} onChangeText={(value) => setPlantTitle(value)} value={plantTitle}
                            style={{width: '86%', borderBottomWidth: 1, borderBottomColor: '#276653', fontSize: 18, paddingLeft: 4, paddingTop: -3, paddingBottom: -3, fontWeight: 'bold' }} />
                        </View >

                        <View style={{ alignItems: 'center', marginTop: 25, marginLeft: 44 }}>
                            <TextInput placeholder={'Variety'} onChangeText={(value) => setPlantVariety(value)} value={plantVariety} o style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#276653', fontSize: 18, paddingLeft: 4, paddingTop: -3, paddingBottom: -3, fontWeight: 'bold' }} />
                            </View>
                            <View style={{ alignItems: 'center', marginTop: 25 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Icon name={"calendar"} color={'#276653'} size={28} style={{ marginTop: 3, marginRight: 15, marginLeft: 1 }} />
                                <Text style={{ width: '86%', fontSize: 16, fontWeight: 'bold' }}>Dated planted:</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setOpen(true)}>
                                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#276653', marginLeft: 44, padding: 5 }}>
                                <Text style={{ fontSize: 16, width: '100%', left: 0 }}>{moment(plantDate).format('ll')}</Text>
                                </View>
                            </TouchableOpacity>
                            </View >
                            <View>
                            <DatePicker
                                modal
                                open={open}
                                date={plantDate}
                                mode={'date'}

                                onConfirm={(date) => {
                                setOpen(false)
                                setPlantDate(date)
                                }}
                                onCancel={() => {
                                setOpen(false)
                                }}
                                style={{ fontWeight: 'bold' }}
                            />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 25 }}>
                            <Icon name={"map-marker"} color={'#276653'} size={28} style={{ marginTop: 3, marginRight: 15, marginLeft: 1 }} />
                            <TextInput placeholder={'Address'} onChangeText={(value) => setPlantAddress(value)} value={plantAddress} style={{ width: '86%', borderBottomWidth: 1, borderBottomColor: '#276653', fontSize: 18, paddingLeft: 4, paddingTop: -3, paddingBottom: -3, fontWeight: 'bold' }} />
                            </View >

                            <View style={{marginTop: 25 }}>
                            <TouchableOpacity>
                                <View style={{justifyContent: 'center', alignItems:'center',padding:15, backgroundColor:'#76c788', borderRadius:25  }}>
                                <Text style={{fontSize:16,fontWeight: 'bold', color:'white'}}>Submit</Text>
                                </View>
                            </TouchableOpacity>
                            </View >
                    </View>
                    </ScrollView>
                </View>
            </View>
            {/* </ImageBackground> */}
        </View> 
  )
}

// function PlantSearch({ navigation, route }) {
//   const actions = [

//     {
//       text: "Language",

//       name: "bt_language",
//       position: 1
//     },
//     {
//       text: "Location",

//       name: "bt_room",
//       position: 3
//     },
//   ];
//   return (
//     <View style={styles.container}>
//       <Text style={styles.example}>Floating Action example</Text>
//       <FloatingAction
//         actions={actions}
//         onPressItem={name => {
//           console.log(`selected button: ${name}`);
//         }}
//       />
//     </View>
//   );
// }

// function PlantSearch({ navigation, route }) {

//   const hidden = true;
//   const statusBarStyle = 'dark-content';

//   const [plants, setPlants] = useState('');
//   // useEffect(() => {
//   //   navigation.setOptions({
//   //     // headerLargeTitle: false,
//   //     headerTitle: props =>
//   //       <View style={styles.div2Row}>
//   //         <TextInput name="searchplant" placeholder="Search plant" onChangeText={text => setPlants(text)}
//   //           value={plants} style={{ width: 260, paddingRight: 15, fontSize: 18, color: '#276653', fontWeight: 'bold' }} />
//   //         <TouchableOpacity
//   //           onPress={() => {
//   //             // navigation.navigate('PlantSearch', { searchplant: searchplant })
//   //             alert('Search function not available ')
//   //           }}>
//   //           <Icon name={"magnify"} color={'#276653'} size={25} style={{ marginRight: 1 }} />
//   //         </TouchableOpacity>
//   //       </View>

//   //   })
//   // }, [navigation])

//   const dataPlant = [
//     'id 1',
//     'id 2',
//     'id 3',
//     'id 4',
//     'id 5',
//     'id 6',
//     'id 7',
//     'id 8',
//     'id 9',
//   ]
  
//   let AnimatedHeaderValue = new Animated.Value(0);
//   const HEADER_MAX_HEIGHT = 350;
//   const HEADER_MIN_HEIGHT = 100;

//   const animatedHeaderBackgroundColor = AnimatedHeaderValue.interpolate({
//     inputRange: [40, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
//     outputRange: ['blue', 'red'],
//     extrapolate: 'clamp'
//   });


//   const animatedHeaderHeight = AnimatedHeaderValue.interpolate({
//     inputRange: [60, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
//     outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
//     extrapolate: 'clamp'
//   });

//   return (

//     <View style={{ flex: 1, backgroundColor: '#cbdeda' }}>
//       <StatusBar
//         animated={true}
//         barStyle={statusBarStyle}
//         translucent={false} />

//       <Animated.View style={{ height: animatedHeaderHeight, backgroundColor: animatedHeaderBackgroundColor }}>
//         <View style={{position:'absolute',  bottom:0, paddingLeft:60}}>
//           <Text>name</Text>
//         </View>
//       </Animated.View>
//       <View style={styles.accountcontainer}>
//         <ScrollView scrollEventThrottle={16}
//           onScroll={
//             Animated.event(
//               [{
//                 nativeEvent: {
//                   contentOffset: {
//                     y: AnimatedHeaderValue
//                   }
//                 }
//               }],
//               { useNativeDriver: false }
//             )
//           }>
//           <View>
//             {
//               dataPlant.map((item, index) => (
//                 < View Key={index} style={styles.cardDataPlant}>
//                   <View style={styles.div2RowSpaceEvenNoAlignItems}>
//                     <TouchableOpacity>
//                       <View style={styles.div2Row}>
//                         <Image source={require('../../src/images/garlic2.png')} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }} />
//                         <View>
//                           <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 17 }}>{item}</Text>
//                           <Text>Dec. 03, 2022</Text>
//                         </View>
//                       </View>
//                     </TouchableOpacity>
//                     <View style={styles.div2RowDatalist}>
//                       <Icon name={"bell-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 20 }} />
//                       <TouchableOpacity>
//                         <Icon name={"dots-vertical"} color={'#276653'} size={23} style={{ width: 20 }} />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 </View>
//               ))
//             }
//           </View>
//         </ScrollView >
//       </View >
//     </View >
//   )
// }




const PlantStack = createNativeStackNavigator();
export default function Plant({ navigation }) {
  return (
    <PlantStack.Navigator>
      <PlantStack.Screen name="PlantDash" component={PlantDash} />
      <PlantStack.Screen name="PlantID" component={PlantID} />
      {/* <PlantStack.Screen name="PlantSearch" component={PlantSearch}
        options={
          { headerShown: true }
        } /> */}
      <PlantStack.Screen name="PlantNew" component={PlantNew}
        options={
          { headerShown: false }
        } />
    </PlantStack.Navigator >
  );
}
const style = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
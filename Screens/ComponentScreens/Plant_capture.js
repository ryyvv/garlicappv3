//import axios from 'axios';
import moment from "moment";
import React, { useEffect, useState, useFonts, useContext, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FloatingAction } from "react-native-floating-action";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Storage from '@react-native-firebase/storage';
import DatePicker from 'react-native-date-picker'
import database from '@react-native-firebase/database';
import RBSheet from "react-native-raw-bottom-sheet";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import LinearGradient from 'react-native-linear-gradient';

import { LazyLoadImage } from 'react-native-lazy-load-image';
// import Timeline from "react-native-beautiful-timeline";
import Androw from 'react-native-androw';
import Timeline from 'react-native-timeline-flatlist'

// Request data
import { LocationContext } from '../Context/LocationProvider';
import { AuthContext } from '../Context/AuthProvider';



const dbRef = database().ref('images');

import {
  useWindowDimensions,
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
  PermissionsAndroid,
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

import * as Progress from 'react-native-progress';

function PlantDash({ route, navigation }) {
  const [plants, setPlants] = useState('');
  const [plantData, setPlantData] = useState([])

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
    })
    const plantData = database().ref('/plants/');
    console.log(plantData)
  }, [navigation])

  useEffect(() => {
    displayList();
  }, []);

  const displayList = async () => {
    const dbRef = database().ref('plants');
    dbRef.on('value', (snapshot) => {
      const firebaseData = snapshot.val();
      if (firebaseData == null) {
        setPlantData(null);
      } else {
        const dataArray = Object.values(firebaseData);
        setPlantData(dataArray);
      }
    });
  }

  // datalist
  const renderDisplayList = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate('PlantID', {
          title: item.title,
          image: item.image,
          variety: item.variety,
          date: item.date,
          plantAddress: item.plantAddress,
        });
      }}>
        <View style={styles.cardDataPlant}>
          <View style={styles.div2RowSpaceEvenNoAlignItems}>

            <View style={styles.div2Row}>
              {/* <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }}/> */}
              <LazyLoadImage source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }} />
              <View>
                <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 17 }}>{item.title}</Text>
                <Text>{moment(item.date).format('MMMM D, YYYY')}</Text>
              </View>
            </View>


            {/* Button option */}
            <View style={[styles.div2RowDatalist, { padding: 10 }]}>
              <Icon name={"bell-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 20 }} />
              <TouchableOpacity>
                <Icon name={"dots-vertical"} color={'#276653'} size={23} style={{ width: 20 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // datalist
  const renderDisplayList2 = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate('PlantID', {
          title: item.title,
          image: item.image,
          variety: item.variety,
          date: item.date,
          plantAddress: item.plantAddress,
        });
      }}>
        <View style={styles.cardDataPlant}>
          <View style={styles.div2RowSpaceEvenNoAlignItems}>

            <View style={styles.div2Row}>
              {/* <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }}/> */}
              <LazyLoadImage source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }} />
              <View>
                <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 17 }}>{item.title}</Text>
                <Text>{moment(item.date).format('MMMM D, YYYY')}</Text>
              </View>
            </View>


            {/* Button option */}
            <View style={[styles.div2RowDatalist, { padding: 10 }]}>
              <TouchableOpacity>
                {/* Delete */}
                <Icon name={"dots-vertical"} color={'#276653'} size={23} style={{ width: 20 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const showEmptyListView = () => {
    return (
      <View style={{ marginTop: 200, flexDirection: 'row', justifyContent: 'center', alignItem: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', alignItem: 'center', justifyContent: 'center', }}><Icon name={"plus-circle"} color={'#276653'} size={30} style={{ width: 20 }} />Add a plant to get started!  </Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#cbdeda' }}>
      <StatusBar animated={true} barStyle={statusBarStyle} translucent={true} />
      <ScrollView>
        <View style={styles.accountcontainer}>
          <Text style={{ marginBottom: 6, color: '#276653', fontWeight: 'bold', fontSize: 18 }}>Recent</Text>
          <FlatList
            data={plantData}
            renderItem={renderDisplayList}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={showEmptyListView()} />

          <Text style={{ marginBottom: 6, color: '#276653', fontWeight: 'bold', fontSize: 18 }}>Completed </Text>
          <FlatList
            data={plantData}
            renderItem={renderDisplayList2}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={showEmptyListView()} />
        </View>


      </ScrollView>

      {/* Add button            */}
      <TouchableOpacity onPress={() => { navigation.navigate('PlantNew') }}>
        <View style={styles.addBtn}>
          <Icon name={"plus"} color={'white'} size={23} style={{ fontWeight: 'bold' }} />
        </View>
      </TouchableOpacity>
    </View>

  )
}



function PlantID({ route, navigation }) {

  const refRBSheetAna = useRef();
  let AnimatedHeaderValue = new Animated.Value(0);
  const HEADER_MAX_HEIGHT = 300;
  const HEADER_MIN_HEIGHT = 200;

  const animatedHeaderBackgroundColor = AnimatedHeaderValue.interpolate({
    inputRange: [5, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: ['blue', 'red'],
    extrapolate: 'clamp',
  });

  const animatedHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [60, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });


  const { title, image, variety, date } = route.params;

  const data = [
    {
      "date": 1574342522000,
      "data": [
        {
          "title": "React Native Beautiful Timeline",
          "subtitle": "Sed at justo eros. Phasellus.",
          "date": 1574342522000
        },
        {
          "title": "React Native",
          "subtitle": "Sed viverra. Nam sagittis.",
          "date": 1574342501000
        }
      ]
    },
    {
      "date": 1574248261000,
      "data": [
        {
          "title": "Timeline",
          "subtitle": "Morbi magna orci, consequat in.",
          "date": 1574248261000
        }
      ]
    },
    {
      "date": 1574125621000,
      "data": [
        {
          "title": "Beauty Timeline",
          "subtitle": "Nulla a eleifend urna. Morbi. Praesent.",
          "date": 1574125621000
        }
      ]
    }

    // Time
    // icon
    // title
    // Discription
    // LineColor
    // imageURL;

  ];

  // CamProperties
  let optioncam = {
    saveToPhotos: true,
    mediaType: 'photo',
    cameraType: 'back',
    selectionLimit: 1,
    includeBase64: false,
    // path: 'image',
  };

  // UploadProperties
  let optionImageupload = {
    mediaType: 'photo',
    includeBase64: false,
    // path: 'image',
  };

  // imageCameraPermission
  const AndroidPermissionCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const resultImageCaptured = await launchCamera(optioncam)
        if (resultImageCaptured.didCancel == true) {
          alert('Please try again!')
        }
        setimagePathCapture(resultImageCaptured.assets[0].uri);

      } else {
        console.log("Camera permission denied");
        alert("Camera permission denied")
      }
    } catch (error) {
      alert('Please try again!')
    }
  }

  // imageUploadPermission
  const imageLibrary = async () => {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Garlic App Camera Permission",
          message:
            "Garlic App needs access to your Gallery ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const resultImageToUpload = await launchImageLibrary(optionImageupload)
        setimagePathCapture(resultImageToUpload.assets[0].uri);
        if (resultImageToUpload.didCancel == true) {
          alert('Please try again!')
          // alert('No images in gallery selected!')
        }
        alert(imagePathCapture)

      } else {
        console.log("Camera permission denied");
        alert("Camera permission denied")
      }
    } catch (error) {
      alert('Please try again!', error)
    }
  }


  return (
    <SafeAreaView  >
      <ScrollView >
        <ImageBackground
          source={require('../../src/images/Insect4.jpg')}
          resizeMode="cover"
          style={{ flex: 1, height: 430, }}
          imageStyle={{ borderBottomLeftRadius: 60, borderBottomRightRadius: 60 }}>
          <LinearGradient colors={['#ffffff00', '#92df9748', '#5bb761ce']} style={{ flex: 1, borderBottomLeftRadius: 60, borderBottomRightRadius: 60 }}>
            {/* opacity: 0.1 */}
            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 10, marginRight: 20, backgroundColor: 'rgba(255, 255, 255, 0.815)', padding: 8, borderRadius: 25 }}>
              <Icon name={'calendar-outline'} color={'#276653'} size={20} style={{ width: 20, marginRight: 5 }} />
              <Text style={{ color: '#276653', fontWeight: 'bold' }}>15 days ago</Text>
            </View>
            <View style={{ marginTop: 80, width: '100%', }}>
              <View style={{ margin: 20, padding: 15, backgroundColor: 'rgba(255, 255, 255, 0.548)', borderRadius: 15, flexDirection: 'row', justifyContent: 'flex-start' }}>
                <View>
                  <Image source={require('../../src/images/garlic1.jpg')} style={{ width: 100, height: 100, borderRadius: 15, marginRight: 10 }} />
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <View>
                    <Text style={{ fontSize: 18, color: 'white', fontWeight: '900' }}>Dingras, Ilocos White</Text>
                    <Text style={{ fontSize: 16, color: 'white', fontWeight: '900' }}>Oct. 23, 2023</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <TouchableOpacity
                      onPress={() => { navigation.navigate('PlantNewNote') }}>
                      <View style={{ padding: 7, borderWidth: 1, borderColor: '#5BB761', backgroundColor: '#EAFFE8', borderRadius: 20, marginRight: 5, flexDirection: 'row', paddingLeft: 15, paddingRight: 10 }}>
                        <Icon name={'notebook-plus-outline'} color={'#276653'} size={20} style={{ width: 20, marginRight: 5 }} />
                        <Text style={{ fontWeight: 'bold' }}>Add note</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => { navigation.navigate('PlantCam') }}>
                      <View style={{ padding: 7, borderWidth: 1, borderColor: '#5BB761', backgroundColor: '#EAFFE8', borderRadius: 20, flexDirection: 'row', paddingLeft: 15, paddingRight: 10 }}>
                        <Icon name={'camera-outline'} color={' #276653'} size={20} style={{ width: 20, marginRight: 5 }} />
                        <Text style={{ fontWeight: 'bold' }}>Identify</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>



        <View style={{
          flex: 2, padding: 10, borderTopRightRadius: 25,
          borderTopLeftRadius: 25, paddingTop: 30, marginTop: -160, height: undefined
        }}>

          {/* Details */}
          <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', justifyContent: 'center', borderRadius: 15, padding: 20,margin:10 }]}>
            <View style={{ flexDirection: 'row', width: '100%', marginBottom: 25 }}>
              <View style={{ alignItems: 'center', width: '33%', }}>
                <Icon name={'thermometer'} color={'#276653'} size={30} style={{ width: 25 }} />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>30</Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>°C</Text>
                </View>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#4f74698f', marginTop: -4 }}>Temperature</Text>
              </View>
              {/* wind */}
              <View style={{ alignItems: 'center', width: '33%' }}>
                <Icon name={'weather-windy'} color={'#276653'} size={30} style={{ width: 30 }} />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>30</Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>kph</Text>
                </View>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#4f74698f', marginTop: -4 }}>Wind</Text>
              </View>
              {/* Humidity */}
              <View style={{ alignItems: 'center', width: '33%' }}>
                <Icon name={'water-outline'} color={'#276653'} size={30} style={{ width: 25 }} />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>30</Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>%</Text>
                </View>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#4f74698f', marginTop: -4 }}>Humidity</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: '100%' }}>
              {/* Precipitation */}
              <View style={{ alignItems: 'center', width: '33%' }}>
                <Icon name={'weather-rainy'} color={'#276653'} size={30} style={{ width: 30 }} />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>30</Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>mm</Text>
                </View>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#4f74698f', marginTop: -4 }}>Precipitation</Text>
              </View>
              {/* Sunrise */}
              <View style={{ alignItems: 'center', width: '33%' }}>
                <Icon name={'weather-sunset-up'} color={'#276653'} size={30} style={{ width: 30 }} />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>5:12</Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>am</Text>
                </View>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#4f74698f', marginTop: -4 }}>Sunrise</Text>
              </View>
              {/* Sunset */}
              <View style={{ alignItems: 'center', width: '33%' }}>
                <Icon name={'weather-sunset-down'} color={'#276653'} size={30} style={{ width: 30 }} />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>6:27</Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>pm</Text>
                </View>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#4f74698f', marginTop: -4 }}>Sunset</Text>
              </View>
            </View>
          </View>

          {/* Overview */}
          <View style={{ marginTop: 10, marginRight: 10, margin:10 }}>
            <View style={[styles.cardDashboardPestDiseaseProp,{ backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, borderLeftWidth:10, borderLeftColor:'#6fb96d' }]}>
              <View>
                  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={{width:'50%'}}> 
                      <Text style={{fontWeight:'bold' ,fontSize:14, color:'#687773',}}>Variety:</Text>
                      <Text style={{fontWeight:'bold' ,fontSize:17,  color:'#276653', lineHeight:17, paddingLeft:7}}>Ilocos White</Text>
                    </View>
                    <View style={{width:'50%'}}> 
                      <Text style={{fontWeight:'bold' ,fontSize:14, color:'#687773'}}>Location:</Text>
                      <Text style={{fontWeight:'bold' ,fontSize:17,  color:'#276653', lineHeight:17, paddingLeft:7}}>Dingras, Ilocos Norte</Text>
                    </View>
                  </View>
                  <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20}}>
                    <View style={{width:'50%'}}> 
                      <Text style={{fontWeight:'bold' ,fontSize:14, color:'#687773'}}>Area Planted:</Text>
                      <Text style={{fontWeight:'bold' ,fontSize:17,  color:'#276653', lineHeight:17, paddingLeft:7}}>2 hectares</Text>
                    </View>
                    <View style={{width:'50%'}}> 
                        <Text style={{fontWeight:'bold' ,fontSize:14, color:'#687773'}}>Date Planted:</Text>
                        <Text style={{fontWeight:'bold' ,fontSize:17,  color:'#276653', lineHeight:17, paddingLeft:7}}>October 23, 2023</Text>
                    </View>
                  </View>
                 
              </View>
            </View>
          </View>

          {/* Findings */}
          <View style={{margin:10, marginTop: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: '#276653', fontWeight: 'bold' }}>Findings</Text>
                <TouchableOpacity onPress={() => { navigation.navigate('Task') }}>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{ color: '#276653', fontWeight: 'bold' }}>See all</Text>
                    {/* <Icon name={'arrow-right-thin'} color={'#276653'} size={} style={{ width: 35}} /> */}
                  </View>
                </TouchableOpacity>
            </View>
            <View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} snapToStart={true} >
                <View style={{ marginRight: 10 }}>
                  <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, margin:4,marginBottom:8, padding: 20 }]}>
                    <View style={{ flexDirection: 'row', }}>
                      <Text style={{ fontWeight: 'bold' }}>Feb. 23, 2023 </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                      <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                      <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>Tangle Top</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <View style={{ marginRight: 10, justifyContent: 'flex-end', marginLeft: 50 }}>
                        {/* <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 15, height: 15 }} /> */}
                        <View>
                          <View style={{ borderRadius: 10, borderWidth: 1.5, borderColor: 'gray', width: 140 }}></View>
                          <View style={{ borderRadius: 10, borderWidth: 3, borderColor: '#6fb96d', marginTop: -5, width: '40%' }}></View>
                        </View>
                        <Text style={{ fontWeight: 'bold', alignSelf: 'flex-end', color: '#276653' }}>40%</Text>
                      </View>
                      <View style={{ flexDirection: 'row', }}>
                        <Image source={require('../../src/images/garlic1.jpg')} style={{ width: 30, height: 30, borderRadius: 25 }} />
                        <Image source={require('../../src/images/garlic1.jpg')} style={{ width: 30, height: 30, borderRadius: 25, marginLeft: -20, opacity: 0.5 }} />
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{ marginRight: 10 }}>
                <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, margin:4,marginBottom:8, padding: 20 }]}>
                    <View style={{ flexDirection: 'row', }}>
                      <Text style={{ fontWeight: 'bold' }}>Feb. 23, 2023 </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                      <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                      <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>Tangle Top</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <View style={{ marginRight: 10, justifyContent: 'flex-end', marginLeft: 50 }}>
                        {/* <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 15, height: 15 }} /> */}
                        <View>
                          <View style={{ borderRadius: 10, borderWidth: 1.5, borderColor: 'gray', width: 140 }}></View>
                          <View style={{ borderRadius: 10, borderWidth: 3, borderColor: '#df8c2e', marginTop: -5, width: '60%' }}></View>
                        </View>
                        <Text style={{ fontWeight: 'bold', alignSelf: 'flex-end', color: '#276653' }}>60%</Text>
                      </View>
                      <View style={{ flexDirection: 'row', }}>
                        <Image source={require('../../src/images/garlic1.jpg')} style={{ width: 30, height: 30, borderRadius: 25 }} />
                        <Image source={require('../../src/images/garlic1.jpg')} style={{ width: 30, height: 30, borderRadius: 25, marginLeft: -20, opacity: 0.5 }} />
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{ marginRight: 10 }}>
                <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, margin:4,marginBottom:8, padding: 20 }]}>
                    <View style={{ flexDirection: 'row', }}>
                      <Text>Feb. 23, 2023 </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                      <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                      <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>Tangle Top</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <View style={{ marginRight: 10, justifyContent: 'flex-end', marginLeft: 50 }}>
                        {/* <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 15, height: 15 }} /> */}
                        <View>
                          <View style={{ borderRadius: 10, borderWidth: 1.5, borderColor: 'gray', width: 140 }}></View>
                          <View style={{ borderRadius: 10, borderWidth: 3, borderColor: '#df492e', marginTop: -5, width: '90%' }}></View>
                        </View>
                        <Text style={{ fontWeight: 'bold', alignSelf: 'flex-end', color: '#276653' }}>90%</Text>
                      </View>
                      <View style={{ flexDirection: 'row', }}>
                        <Image source={require('../../src/images/garlic1.jpg')} style={{ width: 30, height: 30, borderRadius: 25 }} />
                        <Image source={require('../../src/images/garlic1.jpg')} style={{ width: 30, height: 30, borderRadius: 25, marginLeft: -20, opacity: 0.5 }} />
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>

          {/*Task1  Today */}
          <View style={{margin:10,marginTop: 10, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between',  paddingBottom: 5, alignItems: 'center' }}>
              <Text style={{ fontSize: 20, color: '#276653', fontWeight: 'bold' }}>Today's Activity</Text>
              <TouchableOpacity onPress={() => { navigation.navigate('Task') }}>
                <View>
                  <Text style={{ color: '#276653', fontWeight: 'bold' }}>See all</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, width: '100%', padding: 20, borderLeftColor: '#80d6f0', borderLeftWidth: 10, marginBottom: 10,alignItems:'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>Tangle Top</Text>
                </View>
                <View>
                  <TouchableOpacity>
                    <View style={{borderRadius:15, borderWidth:1, borderColor:'#e7e43aff', paddingLeft:10,paddingRight:10,padding:5}}>
                      <Text style={{fontSize:12, fontWeight:'bold'}}>Complete</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, width: '100%', padding: 20, borderLeftColor: '#80d6f0', borderLeftWidth: 10, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>Tangle Top</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, width: '100%', padding: 20, borderLeftColor: '#80d6f0', borderLeftWidth: 10, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>Tangle Top</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, width: '100%', padding: 20, borderLeftColor: '#80d6f0', borderLeftWidth: 10, marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>Tangle Top</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PlantCam({ route, navigation }) {
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)
  const [image5, setImage5] = useState(null)

  // imageDefault
  const ImageDefault = () => {
    return (
      <View style={{ padding: 10, backgroundColor: '#BFE5BB', borderRadius: 10 }}>
        <Icon name={'camera-outline'} color={'#276653'} size={33} style={{ width: 33, }} />
      </View>
    )
  }

  // ImageChange1
  const ImageChange1 = (props) => {
    return (
      <View style={{ borderRadius: 10 }}>
        <Image source={{ uri: image1 }} style={{ width: 50, height: 50, alignItems: 'center', borderRadius: 10 }} />
      </View>
    )
  }
  // ImageChange2
  const ImageChange2 = (props) => {
    return (
      <View style={{ borderRadius: 10 }}>
        <Image source={{ uri: image2 }} style={{ width: 50, height: 50, alignItems: 'center', borderRadius: 10 }} />
      </View>
    )
  }
  // ImageChange3
  const ImageChange3 = (props) => {
    return (
      <View style={{ borderRadius: 10 }}>
        <Image source={{ uri: image3 }} style={{ width: 50, height: 50, alignItems: 'center', borderRadius: 10 }} />
      </View>
    )
  }

  // ImageChange4
  const ImageChange4 = (props) => {
    return (
      <View style={{ borderRadius: 10 }}>
        <Image source={{ uri: image4 }} style={{ width: 50, height: 50, alignItems: 'center', borderRadius: 10 }} />
      </View>
    )
  }
  // ImageChange5
  const ImageChange5 = (props) => {
    return (
      <View style={{ borderRadius: 10 }}>
        <Image source={{ uri: image5 }} style={{ width: 50, height: 50, alignItems: 'center', borderRadius: 10 }} />
      </View>
    )
  }

  // CamProperties
  let optioncam = {
    saveToPhotos: false,
    mediaType: 'photo',
    cameraType: 'back',
    selectionLimit: 1,
    includeBase64: false,
    // path: 'image',
  };

  // UploadProperties
  let optionImageupload = {
    mediaType: 'photo',
    includeBase64: false,
    // path: 'image',
  };


  // imageCameraPermission
  const AndroidPermissionCamera1 = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const resultImageCaptured = await launchCamera(optioncam)
        // if (resultImageCaptured.didCancel == true) {
        //     alert('Please try again!')
        // }
        setImage1(resultImageCaptured.assets[0].uri);

      } else {
        console.log("Camera permission denied");
        alert("Camera permission denied")
      }
    } catch (error) {
      alert('Please try again!')
    }
  }

  const AndroidPermissionCamera2 = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const resultImageCaptured = await launchCamera(optioncam)
        // if (resultImageCaptured.didCancel == true) {
        //     alert('Please try again!')
        // }
        setImage2(resultImageCaptured.assets[0].uri);

      } else {
        console.log("Camera permission denied");
        alert("Camera permission denied")
      }
    } catch (error) {
      alert('Please try again!')
    }
  }

  const AndroidPermissionCamera3 = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const resultImageCaptured = await launchCamera(optioncam)
        // if (resultImageCaptured.didCancel == true) {
        //     alert('Please try again!')
        // }
        setImage3(resultImageCaptured.assets[0].uri);

      } else {
        console.log("Camera permission denied");
        alert("Camera permission denied")
      }
    } catch (error) {
      alert('Please try again!')
    }
  }

  const AndroidPermissionCamera4 = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const resultImageCaptured = await launchCamera(optioncam)
        // if (resultImageCaptured.didCancel == true) {
        //     alert('Please try again!')
        // }
        setImage4(resultImageCaptured.assets[0].uri);

      } else {
        console.log("Camera permission denied");
        alert("Camera permission denied")
      }
    } catch (error) {
      alert('Please try again!')
    }
  }

  const AndroidPermissionCamera5 = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const resultImageCaptured = await launchCamera(optioncam)
        // if (resultImageCaptured.didCancel == true) {
        //     alert('Please try again!')
        // }
        setImage5(resultImageCaptured.assets[0].uri);

      } else {
        console.log("Camera permission denied");
        alert("Camera permission denied")
      }
    } catch (error) {
      alert('Please try again!')
    }
  }

  // imageUploadPermission
  const imageLibrary = async () => {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Garlic App Camera Permission",
          message:
            "Garlic App needs access to your Gallery ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const resultImageToUpload = await launchImageLibrary(optionImageupload)
        setimagePathCapture(resultImageToUpload.assets[0].uri);
        if (resultImageToUpload.didCancel == true) {
          alert('Please try again!')
          // alert('No images in gallery selected!')
        }
        alert(imagePathCapture)

      } else {
        console.log("Camera permission denied");
        alert("Camera permission denied")
      }
    } catch (error) {
      alert('Please try again!', error)
    }
  }

  const imageSubmit = () => {
    console.log(' image1: ' + image1 + '     image2: ' + image2 + '     image3: ' + image3 + '     image4: ' + image4 + '     image5: ' + image5)
  }

  //#E8F4E6
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ backgroundColor: '#e6fae3', width: '100%', }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', paddingBottom: 40 }}>
            <Image source={require('../../src/images/garlic1.jpg')} style={{ marginTop: 50, width: 120, height: 120, borderRadius: 160, marginRight: 10 }} />
            <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 18, color: '#528F56' }}>Dingras, Ilocos White</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', }}>October 23, 2023</Text>
          </View>

          <View style={{
            height: 412, padding: 20, backgroundColor: 'white', borderTopRightRadius: 25,
            borderTopLeftRadius: 25, paddingTop: 30
          }}>
            <View style={{ paddingRight: 30, paddingLeft: 30 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Add images</Text>
                <Icon name={'information-outline'} color={' #276653'} size={25} style={{ width: 25, }} />
              </View>
              <Text style={{ paddingRight: 25, fontSize: 14, paddingTop: 5 }}>Upload clear photo of the leaf and bulb that look sick. </Text>
              <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', flexWrap:'wrap', alignItems:'center' }}>

                <TouchableOpacity onPress={AndroidPermissionCamera1}>
                  {
                    image1 == null ? <ImageDefault /> : <ImageChange1 />
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={AndroidPermissionCamera2}>
                  {
                    image2 == null ? <ImageDefault /> : <ImageChange2 />
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={AndroidPermissionCamera3}>
                  {
                    image3 == null ? <ImageDefault /> : <ImageChange3 />
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={AndroidPermissionCamera4}>
                  {
                    image4 == null ? <ImageDefault /> : <ImageChange4 />
                  }
                </TouchableOpacity>
                <TouchableOpacity onPress={AndroidPermissionCamera5}>
                  {
                    image5 == null ? <ImageDefault /> : <ImageChange5 />
                  }
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: 100, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={imageSubmit}>
                  <View style={{ padding: 18, paddingLeft: 60, paddingRight: 60, backgroundColor: '#E8F4E6', borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ color: '#528F56', fontWeight: 'bold', fontSize: 18, }}>Submit</Text>
                  </View>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

function PlantCamResult({ route, navigation }) {
  return (
    <View>
      <Text>PlantCamResult</Text>
    </View>
  )
}


function PlantNew({ navigation }) {
  const { logout, user } = useContext(AuthContext)
  const {

    gpsName,
    gpsUrl,
    gpsWeathData,
    gpsWeathCondition,
    locationList,
    weathloc,
    weathDate,
    weathIcon,
    weathData,
    weathPerHour,
    weathCondition,
    weathPerDay,

  } = useContext(LocationContext);

  const [open, setOpen] = useState(false)
  const [plantTitle, setPlantTitle] = useState('')
  const [plantVariety, setPlantVariety] = useState('')
  const [plantArea, setPlantArea] = useState('')
  const [plantDate, setPlantDate] = useState(new Date())
  const [plantAddress, setPlantAddress] = useState(weathloc.name + ', ' + weathloc.region)
  const [dataloading, setDataloading] = useState(false);
  const [image, setImage] = useState(null); //Test
  const [imagePathCapture, setimagePathCapture] = useState(null);  //ImagePicker
  const [uploading, setUploading] = useState(false);    //setUploaders
  const [downloadURL, setDownloadURL] = useState(null);   //imagelink uploader getdownload image
  const [transferred, setTransferred] = useState(0);    //Progress upload  image


  // ImageDefault Display
  const ImageDefault = () => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: '#cbe6d1', height: 400, aspectRatio: 1, borderBottomRightRadius: 15, borderBottomLeftRadius: 15 }}>
        <Icon name={'image-outline'} color={'#276653'} size={150} style={{ fontWeight: 'bolder' }} />
      </View>
    )


  }

  // ImageChange Display
  const ImageChange = (props) => {
    return (
      <Image source={{ uri: imagePathCapture }} style={{ flex: 1, width: '100%', height: undefined, aspectRatio: 1, borderBottomRightRadius: 15, borderBottomLeftRadius: 15 }} />
    )
  }

  let optioncam = {
    saveToPhotos: true,
    mediaType: 'photo',
    cameraType: 'back',
    selectionLimit: 1,
    includeBase64: false,
    path: 'images',
  };

  let optionImageupload = {
    mediaType: 'photo',
    includeBase64: false,
    path: 'images ',


  };


  const AndroidPermissionCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Garlic photo App Camera Permission",
          message:
            "Garlic photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const resultImageCaptured = await launchCamera(optioncam)
        if (resultImageCaptured.didCancel == true) {
          alert('Please try again!')
        }
        setimagePathCapture(resultImageCaptured.assets[0].uri);
        // !!No error found!

      } else {
        console.log("Camera permission denied");
        alert("Camera permission denied")
      }
    } catch (error) {
      alert('Please try again!')
    }
  }

  const imageLibrary = async () => {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Garlic App Camera Permission",
          message: "Garlic App needs access to your Gallery ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );

   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const resultImageToUpload = await launchImageLibrary(optioncam)
        if (resultImageToUpload.didCancel == true) {
          alert('Please try again! No image selected')
        }

        setimagePathCapture(resultImageToUpload.assets[0].uri);
        // ::Warning message: backend display null value setImagepathCapture::Ignore first null

      } else {
        console.log("Camera permission denied");
        alert("Camera permission denied")
      }
    } catch (error) {
      alert('Please try again!', error)
    }
  }

  const UserUpdate = async () => {
    const uploadURI = imagePathCapture;
    let filename = uploadURI.substring(uploadURI.lastIndexOf('/') + 1);
    console.log(filename)

    const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/` + filename;
    // uploads file
    console.log(pathToFile)
    await storage().ref('userProfilepic/').putFile(pathToFile);

    const storage = getStorage();

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  }


  // uploading trigger
  const imageUpload = async () => {
    // LogBox.ignoreAllLogs();

    // Create Data plant
    if (imagePathCapture === null) {
      alert('Select image!');
      return;
    } else if (!plantTitle.trim()) {
      alert('Please enter title!');
      return;
    } else if (!plantVariety.trim()) {
      alert('Please enter variety!');
      return;
    } else if (!plantArea.trim()) {
      alert('Please enter planted area!');
      return;
    } else if (!plantAddress.trim()) {
      alert('Please enter address!');
      return;
    } else {
      const uri = imagePathCapture;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      setUploading(true);
      setTransferred(0);

      // storagePath and imagePath
      const task = Storage().ref('images/' + filename).putFile(uploadUri)

      // Process 
      task.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);

        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      });

      // Task then
      task.then(async () => {
        // get imageDownloadURL
        const downloadURL = await Storage().ref('images/' + filename).getDownloadURL();

        // Test
        // alert('downloadURL: ' + downloadURL);

        // store data in realtime database
        database().ref('/plants/' + user.uid + plantTitle)
          .set({
            image: downloadURL,
            title: plantTitle,
            variety: plantVariety,
            area: plantArea,
            date: plantDate.toISOString(),
            plantAddress: plantAddress
          })
          .then(async () => {
            alert('Plant data stored successfully!')
            navigation.goBack()
          });
      });

      try {
        await task;
      } catch (e) {
        console.error(e);
      }

      setUploading(false);
      setImage(null);
    }
  }

  const displayListplant = async () => {
    const displayList = database().ref('/plants')
  }

  const addressloc = weathloc.name + weathloc.region;

  return (
    <View style={{ flex: 1, backgroundColor: '#AADCB6' }}>

      {
        uploading ? (<View style={{ flexDirection: 'column', width: '100%', zIndex: 2, position: 'absolute' }}>
          <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.2)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ padding: 30, marginTop: '100%', marginBottom: '100%', backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', }}>
              <Progress.Bar progress={transferred} width={200} color={'#3E7E55'} />
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#3E7E55', marginTop: 5 }}>Uploading... {transferred}%</Text>
            </View>
          </View>
        </View>
        ) : null
      }

      <StatusBar backgroundColor="transparent" translucent={true} />
      <ImageBackground source={require('../../src/images/garlicbg2.png')} resizeMode="cover" style={{ flex: 1, }}>

        {/* Header */}
        <View style={{ zIndex: 2, position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, borderColor: 'green', padding: 13, top: 0 }}>
          {/* Header */}
          <View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}>
              <View>
                <Icon name={'arrow-left'} color={'white'} size={27} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <ScrollView>
          <View>
            {/* Image */}
            <View>
              {
                imagePathCapture == null ? <ImageDefault /> : <ImageChange />
              }

              {/* Button Cam */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 10, marginTop: -100, paddingLeft: '5%', paddingRight: '5%' }}>
                <View>
                  <TouchableOpacity
                    onPress={AndroidPermissionCamera}
                    style={[styles.cardCamera2, styles.cardCameraProps2, { width: '100%' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: 5, paddingRight: 10 }}>
                      <Icon name={"camera-plus-outline"} color={'#6fb591'} size={25} style={{ marginRight: 5 }} />
                      <Text style={styles.textCam2}>Take a photo</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={imageLibrary}
                    style={[styles.cardCamera2, styles.cardCameraProps2, { width: '100%' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingLeft: 5, paddingRight: 10 }}>
                      <Icon name={"file-image-outline"} color={'#6fb591'} size={25} style={{ marginRight: 5 }} />
                      <Text style={styles.textCam2}>Upload a photo</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Content */}
            <View style={{ padding: 20, marginTop: -10 }}>
              {/* TextInput */}
              <View style={[styles.cardPlantcard, styles.cardPlantcardProp, { backgroundColor: 'white', padding: 20, borderRadius: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name={"sprout"} color={'#276653'} size={28} style={{ marginTop: 3, marginRight: 15, marginLeft: 1 }} />
                  <TextInput placeholder={'Title'} onChangeText={(value) => setPlantTitle(value)} value={plantTitle}
                    style={{ width: '86%', borderBottomWidth: 1, borderBottomColor: '#276653', fontSize: 18, paddingLeft: 4, paddingTop: -3, paddingBottom: -3, fontWeight: 'bold' }} />
                </View >

                <View style={{ alignItems: 'center', marginTop: 25, marginLeft: 44 }}>
                  <TextInput placeholder={'Variety'} onChangeText={(value) => setPlantVariety(value)} value={plantVariety} o style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#276653', fontSize: 18, paddingLeft: 4, paddingTop: -3, paddingBottom: -3, fontWeight: 'bold' }} />
                </View>

                <View style={{ alignItems: 'center', marginTop: 25, marginLeft: 44 }}>
                  <TextInput placeholder={'Area'} onChangeText={(value) => setPlantArea(value)} value={plantArea} style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: '#276653', fontSize: 18, paddingLeft: 4, paddingTop: -3, paddingBottom: -3, fontWeight: 'bold' }} />
                </View>

                <View style={{ alignItems: 'center', marginTop: 25 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Icon name={"calendar"} color={'#276653'} size={28} style={{ marginTop: 3, marginRight: 15, marginLeft: 1 }} />
                    <Text style={{ width: '86%', fontSize: 18, fontWeight: 'bold' }}>Dated planted:</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setOpen(true)}>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#276653', marginLeft: 44, padding: 5 }}>
                      <Text style={{ fontSize: 18, width: '100%', left: 0, fontWeight: 'bold' }}>{moment(plantDate).format('ll')}</Text>
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
                  <TextInput placeholder={'Address'} onChangeText={(value) => setPlantAddress(value)} value={plantAddress} style={{ width: '86%', borderBottomWidth: 1, borderBottomColor: '#276653', fontSize: 16, paddingLeft: 4, paddingTop: -3, paddingBottom: -3, fontWeight: 'bold' }} />
                </View >

                <View style={{ marginTop: 25 }} >
                  <TouchableOpacity
                    onPress={imageUpload}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15, backgroundColor: '#76c788', borderRadius: 25 }}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Submit</Text>
                    </View>
                  </TouchableOpacity>
                </View >

              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  )
}

function PlantNewNote({ route, navigation }) {

  const [note, setNote] = React.useState("How's it growing?");
  const [imageNote, setImageNote] = useState(null)

  const ImageDefault = () => {
    return (
      <View style={{ padding: 10, backgroundColor: '#BFE5BB', borderRadius: 10 }}>
        {/* <Icon name={'camera-outline'}color={'#276653'} size={60} style={{ width: 60,}} /> */}
        <Text></Text>
      </View>
    )
  }

  // ImageChange1
  const ImageChangeNote = (props) => {
    return (
      <View style={{ borderRadius: 10 }}>
        <Image source={{ uri: imageNote }} style={{ width: 50, height: 50, alignItems: 'center', borderRadius: 10 }} />
      </View>
    )
  }
  const AndroidPermissionCameraNote = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const resultImageCaptured = await launchCamera(optioncam)
        // if (resultImageCaptured.didCancel == true) {
        //     alert('Please try again!')
        // }
        setImageNote(resultImageCaptured.assets[0].uri);

      } else {
        console.log("Camera permission denied");
        alert("Camera permission denied")
      }
    } catch (error) {
      alert('Please try again!')
    }
  }

  // imageUploadPermission
  const imageLibrary = async () => {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Garlic App Camera Permission",
          message:
            "Garlic App needs access to your Gallery ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const resultImageToUpload = await launchImageLibrary(optionImageupload)
        setimagePathCapture(resultImageToUpload.assets[0].uri);
        if (resultImageToUpload.didCancel == true) {
          alert('Please try again!')
          // alert('No images in gallery selected!')
        }
        alert(imagePathCapture)

      } else {
        console.log("Camera permission denied");
        alert("Camera permission denied")
      }
    } catch (error) {
      alert('Please try again!', error)
    }
  }



  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <View>
          <Text>Date</Text>
          <Text>Date</Text>
        </View>
        <View>
          <TextInput
            multiline
            numberOfLines={6}
            maxLength={255}
            onChangeText={text => setNote(text)}
            value={note}
            style={{ height: 220, paddingTop: 10, paddingLeft: 20, paddingRight: 20, fontSize: 18, backgroundColor: '#eff0d0', borderWidth: 1, borderColor: '#b9bd48', borderRadius: 18 }}
          />
        </View>
        <View>
          <Text>Add photo</Text>
          <Text>Choose photo</Text>
          <View style={{ width: 150 }}>
            <TouchableOpacity onPress={AndroidPermissionCameraNote}>
              {
                imageNote == null ? <ImageDefault /> : <ImageChangeNote />
              }
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )

}


function Task({ route, navigation }) {

  
  const initialLayout = { height: 300, backgroundColor: 'red' };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      //tabStyle={{}}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ fontSize:15, fontWeight:'bold', color:'#276653', margin: 8 }}>
          {route.title}
        </Text>
      )}
      activeColor={'#276653'}
      indicatorStyle={{ backgroundColor: '#276653', height: 5, borderRadius: 10 }}
      style={{backgroundColor:'white' }}
    />
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Today' },
    { key: 'second', title: 'Upcoming' },
    { key: 'third', title: 'Completed' },]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });


  function FirstRoute() {
    return (
      <View style={{ flex: 1 }}>
        <Text>
          First
        </Text>
      </View>
    )
  }
  function SecondRoute() {
    return (
      <View style={{ flex: 1 }}>
        <Text>
          SecondRoute
        </Text>
      </View>
    )
  }
  function ThirdRoute() {
    return (
      <View style={{ flex: 1 }}>
        <Text>
          ThirdRoute
        </Text>
      </View>
    )
  }
  return (
    <SafeAreaView>
      <View style={{padding:20, backgroundColor:'white', height:'100%'}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingBottom: 5, alignItems: 'center' }}>
              <Text style={{ fontSize: 20, color: '#276653', fontWeight: 'bold' }}>Task</Text>
            </View>
            <View >
                  <ScrollView horizontal={true} style={{ paddingBottom: 10 }}>
                    <View style={{ margin: 5 }}>
                      <View style={[styles.cardDashboardPestDiseaseProp,{ backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                          <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                        </View>
                      </View>
                    </View>

                    <View style={{ margin: 5 }}>
                      <View style={[styles.cardDashboardPestDiseaseProp,{ backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                          <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                        </View>
                      </View>
                    </View>

                    <View style={{ margin: 5 }}>
                      <View style={[styles.cardDashboardPestDiseaseProp,{ backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                          <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                        </View>
                      </View>
                    </View>
                  </ScrollView>
            </View>
            <View style={{ height: 300, backgroundColor: 'violet' }}>
              <TabView
                navigationState={{ index, routes }}
                renderTabBar={renderTabBar}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout} 
                style={{backgroundColor:'white'}}
              />
            </View>
          </View>
    </SafeAreaView>
  )
}

const PlantStack = createNativeStackNavigator();
export default function Plant({ navigation }) {
  return (
    <PlantStack.Navigator>
      <PlantStack.Screen name="PlantDash" component={PlantDash} />
      <PlantStack.Screen name="PlantNew" component={PlantNew}
        options={
          { headerShown: false }
        } />
      <PlantStack.Screen name="PlantID" component={PlantID} />
      <PlantStack.Screen name="PlantCam" component={PlantCam} />
      <PlantStack.Screen name="PlantCamResult" component={PlantCamResult} />
      <PlantStack.Screen name="PlantNewNote" component={PlantNewNote} />
      <PlantStack.Screen name="Task" component={Task} />
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
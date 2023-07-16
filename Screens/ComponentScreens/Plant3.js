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

import { LazyLoadImage } from 'react-native-lazy-load-image';
// import Timeline from "react-native-beautiful-timeline";
import Androw from 'react-native-androw';
import Timeline from 'react-native-timeline-flatlist'

// Request data
import { LocationContext } from '../Context/LocationProvider';
import { AuthContext } from '../Context/AuthProvider';


const dbRef = database().ref('images');

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
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View
        style={{
          height: animatedHeaderHeight,
          flex: 1
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
          <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'white' }}>name</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 20, fontStyle: 'italic', color: 'white' }}>spname</Text>

          <TouchableOpacity onPress={() => refRBSheetAna.current.open()}>
            <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#7D8F69', backgroundColor: 'white', padding: 5, paddingRight: 15, paddingLeft: 15, borderRadius: 20 }}>
              <Text style={{ fontSize: 16, color: '#7D8F69', fontWeight: 'bold' }}>
                Analyze leaf
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('PlantCam')}>
            <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#7D8F69', backgroundColor: 'white', padding: 5, paddingRight: 15, paddingLeft: 15, borderRadius: 20 }}>
              <Text style={{ fontSize: 16, color: '#7D8F69', fontWeight: 'bold' }}>
              PlantIdView
              </Text>
            </View>
          </TouchableOpacity>
        

          <RBSheet
            ref={refRBSheetAna}
            closeOnDragDown={true}
            closeOnPressMask={true}
            closeDuration={500}
            openDuration={500}
            height={250}
            animationType={'fade'}
            customStyles={{
              wrapper: {
                backgroundColor: 'rgba(52, 52, 52, 0.4)'
              },
              draggableIcon: {
                backgroundColor: "#276653",
              },
              container: {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }
            }}>
            <View style={{ marginTop: 5, paddingLeft: 48, paddingRight: 25, flexDirection: 'row', }}>
              <Text style={styles.textCamTitle}>
                Choose source
              </Text>
            </View>
            <View style={{ marginTop: 5, paddingLeft: 25, paddingRight: 25, flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <TouchableOpacity
                onPress={AndroidPermissionCamera}
                style={[styles.cardCamera, styles.cardCameraProps]}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ padding: 16, backgroundColor: '#f0f9f6', borderRadius: 10 }}>
                    <Icon name={"camera-plus-outline"} color={'#6fb591'} size={45} style={{ width: 50 }} />
                  </View>
                  <Text style={styles.textCam}>Take a photo</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={imageLibrary}
                style={[styles.cardCamera, styles.cardCameraProps]}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ padding: 16, backgroundColor: '#f0f9f6', borderRadius: 10 }}>
                    <Icon name={"file-image-outline"} color={'#6fb591'} size={45} style={{ width: 50 }} />
                  </View>
                  <Text style={styles.textCam}>Upload a photo</Text>
                </View>
              </TouchableOpacity>
            </View>
          </RBSheet>
        </View>
        <View style={{ position: 'absolute', bottom: 0, paddingLeft: 60 }}>
          <Text>fsdfsf</Text>
        </View>
      </Animated.View>
      <View style={{
        flex: 2,
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
          )}>

          <View>
            {/* Description */}
            <View style={{ marginRight: 12, marginBottom: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', }}>
                Plant info
              </Text>
              <View style={[styles.cardDesHourly, styles.cardDesHourlyProp,]}>
                {/* Data */}
                <View style={styles.div2RowSpaceEven}>
                  <View style={{ justifyContent: 'flex-end' }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '900',
                        color: '#276653',
                      }}>
                      Location
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#8eb4a9',
                      }}>
                      Every 2 wesd
                    </Text>
                  </View>

                  <View style={{ justifyContent: 'flex-start' }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '900',
                        color: '#276653',
                      }}>
                      Plant Variety
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#8eb4a9',
                      }}>
                      last two weeks
                    </Text>
                  </View>
                </View>
                {/* DataEnd */}

                <View style={styles.div2RowSpaceEven}>
                  <View style={{ justifyContent: 'flex-end' }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '900',
                        color: '#276653',
                      }}>
                      Date Starteds:
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#8eb4a9',
                      }}>
                      Every 2 wesd
                    </Text>
                  </View>

                  <View style={{ justifyContent: 'flex-start' }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '900',
                        color: '#276653',
                      }}>
                      Date Harvest:
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#8eb4a9',
                      }}>
                      last two weeks
                    </Text>
                  </View>
                </View>

                <View style={[styles.div2RowSpaceEven, { marginBottom: 10 }]}>
                  <View style={{ justifyContent: 'flex-end' }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '900',
                        color: '#276653',
                      }}>
                      Findings:
                    </Text>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: '#8eb4a9',
                        }}>
                        Disease/s:
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: '#8eb4a9',
                        }}>
                        Insect Pest/s:
                      </Text>
                    </View>
                  </View>
                  <View style={{ justifyContent: 'flex-end' }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '900',
                        color: '#276653',
                      }}>
                      Water
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#8eb4a9',
                      }}>
                      Every 2 weeks
                    </Text>
                  </View>
                </View>

              </View>
            </View>

            <View>
              {/* Findings */}
              <View>
                <Text style={{ color: 'white', marginBottom: 10, fontWeight: 'bold', fontSize: 20 }}>Findings</Text>
                <View style={{ flexDirection: 'row' }}>
                  {/* Loopstart */}
                  <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
                    <View style={[styles.cardSmallHourly, styles.cardSmallHourlyProp, { height: 200 }]}>
                      <View style={styles.div2RowSpaceEven}>
                        <View style={{ paddingRight: 10 }}>
                          <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 45, height: 45 }} />
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '900',
                              color: '#276653',
                            }}>
                            Water
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: '#8eb4a9',
                            }}>
                            Every 2 weeks
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* Loopend */}

                    <View style={[styles.cardSmallHourly, styles.cardSmallHourlyProp,]}>
                      <View style={styles.div2RowSpaceEven}>
                        <View style={{ paddingRight: 10 }}>
                          <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 45, height: 45 }} />
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: '#8eb4a9',
                            }}>
                            Water
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '900',
                              color: '#276653',
                            }}>
                            Every 2 weeks
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={[styles.cardSmallHourly, styles.cardSmallHourlyProp,]}>
                      <View style={styles.div2RowSpaceEven}>
                        <View style={{ paddingRight: 10 }}>
                          <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 45, height: 45 }} />
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: '#8eb4a9',
                            }}>
                            Water
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '900',
                              color: '#276653',
                            }}>
                            Every 2 weeks
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={[styles.cardSmallHourly, styles.cardSmallHourlyProp,]}>
                      <View style={styles.div2RowSpaceEven}>
                        <View style={{ justifyContent: 'center' }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: '#8eb4a9',
                            }}>
                            Analyze plant
                          </Text>
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </View>
              {/* Timeline/Task */}
              <View style={[styles.cardSmallHourly, styles.cardSmallHourlyProp,]}>
                <Text style={{ color: 'white', marginBottom: 10, fontWeight: 'bold', fontSize: 20 }}>Task</Text>

                <View style={styles.dashboardHourly}>
                  <View style={{ flexDirection: 'row' }}>
                    <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
                      {/* Loopstart */}
                      <View style={[styles.cardSmallHourly, styles.cardSmallHourlyProp,]}>
                        <View style={styles.div2RowSpaceEven}>
                          <View style={{ paddingRight: 10 }}>
                            <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 45, height: 45 }} />
                          </View>
                          <View style={{ justifyContent: 'flex-end' }}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: '900',
                                color: '#276653',
                              }}>
                              Water
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: '#8eb4a9',
                              }}>
                              Every 2 weeks
                            </Text>
                          </View>
                        </View>
                      </View>
                      {/* Loopend */}

                      <View style={[styles.cardSmallHourly, styles.cardSmallHourlyProp,]}>
                        <View style={styles.div2RowSpaceEven}>
                          <View style={{ paddingRight: 10 }}>
                            <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 45, height: 45 }} />
                          </View>
                          <View style={{ justifyContent: 'flex-end' }}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: '#8eb4a9',
                              }}>
                              Water
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: '900',
                                color: '#276653',
                              }}>
                              Every 2 weeks
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View style={[styles.cardSmallHourly, styles.cardSmallHourlyProp,]}>
                        <View style={styles.div2RowSpaceEven}>
                          <View style={{ paddingRight: 10 }}>
                            <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 45, height: 45 }} />
                          </View>
                          <View style={{ justifyContent: 'flex-end' }}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: '#8eb4a9',
                              }}>
                              Water
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: '900',
                                color: '#276653',
                              }}>
                              Every 2 weeks
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View style={[styles.cardSmallHourly, styles.cardSmallHourlyProp,]}>
                        <View style={styles.div2RowSpaceEven}>
                          <View style={{ paddingRight: 10 }}>
                            <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 45, height: 45 }} />
                          </View>
                          <View style={{ justifyContent: 'flex-end' }}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: '#8eb4a9',
                              }}>
                              Water
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: '900',
                                color: '#276653',
                              }}>
                              Every 2 weeks
                            </Text>
                          </View>
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                  <ScrollView
                    horizontal={false}
                    vertical={true}
                    showsVerticalScrollIndicator={false}>
                    {/* return ( */}
                    <View style={{ marginRight: 12, marginBottom: 10 }}>
                      <View
                        style={[
                          styles.cardDashboardHourly,
                          styles.cardDashboardHourlyProp,
                        ]}>
                        <View style={styles.div2RowSpaceEven}>


                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: '#8eb4a9',
                            }}>Today
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: '#8eb4a9',
                            }}> upcoming
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: '#8eb4a9',
                            }}>  Completed
                          </Text>


                        </View>
                      </View>
                    </View>


                    <Timeline
                      // showTime
                      // data

                      data={data}


                    />
                  </ScrollView>
                </View>
              </View>

              <View>
                <Text style={{ color: 'white', marginBottom: 10, fontWeight: 'bold', fontSize: 20 }}>Task</Text>
                <View style={{ flexDirection: 'row' }}>
                  <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
                    {/* Loopstart */}
                    <View style={[styles.cardSmallHourly, styles.cardSmallHourlyProp,]}>
                      <View style={styles.div2RowSpaceEven}>
                        <View style={{ paddingRight: 10 }}>
                          <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 45, height: 45 }} />
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '900',
                              color: '#276653',
                            }}>
                            Water
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: '#8eb4a9',
                            }}>
                            Every 2 weeks
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* Loopend */}

                    <View style={[styles.cardSmallHourly, styles.cardSmallHourlyProp,]}>
                      <View style={styles.div2RowSpaceEven}>
                        <View style={{ paddingRight: 10 }}>
                          <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 45, height: 45 }} />
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: '#8eb4a9',
                            }}>
                            Water
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '900',
                              color: '#276653',
                            }}>
                            Every 2 weeks
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={[styles.cardSmallHourly, styles.cardSmallHourlyProp,]}>
                      <View style={styles.div2RowSpaceEven}>
                        <View style={{ paddingRight: 10 }}>
                          <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 45, height: 45 }} />
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: '#8eb4a9',
                            }}>
                            Water
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '900',
                              color: '#276653',
                            }}>
                            Every 2 weeks
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={[styles.cardSmallHourly, styles.cardSmallHourlyProp,]}>
                      <View style={styles.div2RowSpaceEven}>
                        <View style={{ paddingRight: 10 }}>
                          <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 45, height: 45 }} />
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: '#8eb4a9',
                            }}>
                            Water
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '900',
                              color: '#276653',
                            }}>
                            Every 2 weeks
                          </Text>
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </View>

              <View style={styles.dashboardHourly}>
                <ScrollView
                  horizontal={false}
                  vertical={true}
                  showsVerticalScrollIndicator={false}>
                  {/* return ( */}
                  <View style={{ marginRight: 12, marginBottom: 10 }}>
                    <View
                      style={[
                        styles.cardDashboardHourly,
                        styles.cardDashboardHourlyProp,
                      ]}>
                      <View style={styles.div2RowSpaceEven}>

                      <Text
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: '#8eb4a9',
                          }}>All
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: '#8eb4a9',
                          }}>Today
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: '#8eb4a9',
                          }}> upcoming
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: '#8eb4a9',
                          }}>  Completed
                        </Text>


                      </View>
                    </View>
                  </View>


                  <Timeline
                    // showTime
                    // data

                    data={data}


                  />
                </ScrollView>
              </View>

            </View>
          </View>
        </ScrollView>
      </View>

    </SafeAreaView>
  );
}

function PlantCam({ route, navigation}) {
   return(
      <View>
        <Text>PlantCam</Text>
        <TouchableOpacity onPress={() => navigation.navigate('PlantCamResult')}>
            <View style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#7D8F69', backgroundColor: 'white', padding: 5, paddingRight: 15, paddingLeft: 15, borderRadius: 20 }}>
              <Text style={{ fontSize: 16, color: '#7D8F69', fontWeight: 'bold' }}>
              PlantCamResult
              </Text>
            </View>
        </TouchableOpacity>
      </View>
   )
} 

function PlantCamResult({ route, navigation}) {
  return(
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
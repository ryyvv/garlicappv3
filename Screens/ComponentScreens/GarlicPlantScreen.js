// React&React Native
import React, { useEffect, useState, useFonts, useContext, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FloatingAction } from "react-native-floating-action";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Storage from '@react-native-firebase/storage';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FastImage from 'react-native-fast-image';
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
  Modal, 
  ActivityIndicator

} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../src/css/styles';

// other Packages
//import axios from 'axios';
import _, { set, templateSettings } from 'lodash';
import math from 'mathjs';
import moment from "moment";
import brain from 'brain.js';
import * as Progress from 'react-native-progress';
import DatePicker from 'react-native-date-picker'
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from "react-native-raw-bottom-sheet";
import { LazyLoadImage } from 'react-native-lazy-load-image';
// import Timeline from "react-native-beautiful-timeline";
import Androw from 'react-native-androw';
import Timeline from 'react-native-timeline-flatlist'

// Request data
import { LocationContext } from '../Context/LocationProvider';
import { WeatherContext } from '../Context/WeatherProvider';
import { AuthContext } from '../Context/AuthProvider';

// Model Component
import weatherData from '../ModelComponent/weather_data.json';
import NeuralNetwork from '../ModelComponent/NeuralNetwork';
import DecisionTree from '../ModelComponent/DecisionTree1';

//Firebase database
import database from '@react-native-firebase/database';
import { AirbnbRating } from '@rneui/base';
const dbRef = database().ref('images');
import auth from '@react-native-firebase/auth';

function PlantDash({ route, navigation }) {
  const { logout, user } = useContext(AuthContext)
  const [plants, setPlants] = useState('');
  const [plantData, setPlantData] = useState([])
  const [plantDataCompleted, setPlantDataCompleted] = useState([])
  const [recent, setRecent] = useState(false)
  const [completed, setCompleted] = useState(false)
  const userID = auth().currentUser.uid;

  // const {plantData, setPlantData} =  route.params;

  const hidden = false;
  const statusBarStyle = 'dark-content';

  // header
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
    const plantData = database().ref('/plants/' + user.uid);
    console.log(plantData)
  }, [navigation])

  useEffect(() => {
    displayList();
  }, []);

  const displayList = async () => {
    const dbRef = database().ref('/users/' + user.uid + '/plants');
    dbRef.on('value', (snapshot) => {
      const firebaseData = snapshot.val();
      if (firebaseData == null) {
        setPlantData(null);
        setRecent(null)
      } else {
        const dataArray = Object.values(firebaseData);
        const sortedStatus = dataArray.sort((a, b) => {
          const dateA = new Date(`${a.dateAction}`).valueOf();
          const dateB = new Date(`${b.dateAction}`).valueOf();
          if (dateA > dateB) {
            return 1; // return -1 here for DESC order
          }
          return -1 // return 1 here for DESC Order
        });
        setPlantData(sortedStatus);
        setRecent(true)
      }
    });
  }

  
  return (
    <View style={{ flex: 1, backgroundColor: '#cbdeda' }}>
      <StatusBar animated={true} barStyle={statusBarStyle} translucent={true} />
      {
        recent == true ? (<Text style={{ marginLeft: 25, marginTop: 20, marginBottom: 10, fontSize: 16, fontWeight: '900', color: '#276653', }}>Recent</Text>) : (null)
      }
      <ScrollView scrollEnabled={true} style={{ zIndex: 1 }}>
     
       
        <View >
          {
            plantData === null ? (
              <View style={{   marginTop: 80, justifyContent: 'center', alignItem: 'center' }}>
                <Image source={require('../../src/images/imageFrame.png')} style={{ marginLeft:'25%',marginLeft:'25%' ,width: 200, height: 200, opacity: 0.5 ,justifyContent: 'center', alignItem: 'center' }}/>
                <Text style={{ fontSize: 18,marginLeft:'15%',marginLeft:'15%' ,fontWeight: 'bold', alignItem: 'center', justifyContent: 'center', justifyContent: 'center', alignItem: 'center' }}>There is no project available</Text>
                <View style={{ flexDirection: 'row',marginLeft:'15%',marginLeft:'15%' ,}}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', alignItem: 'center', justifyContent: 'center', justifyContent: 'center', alignItem: 'center' }}>
                  Press
                  </Text>
                  <Icon name={"plus-circle"} color={'#276653'} size={20} style={{ width: 20,  marginLeft:10,marginRight:10, }} />
                  <Text style={{ fontSize: 18, fontWeight: 'bold', alignItem: 'center', justifyContent: 'center', justifyContent: 'center', alignItem: 'center' }}>
                  to add new project
                  </Text>
                </View>
              </View>) : (
              plantData.map((plant, index) => {
                return (
                  <View key={index} style={{ margin: 20, marginTop: 4, marginBottom: 4 }}>
                    {
                      plant.harvestedStatus === 'false' ? (<View key={index} style={styles.cardDataPlant}>
                        <Pressable onPress={() => {
                          navigation.navigate('PlantID', {
                            key: plant.id,
                            title: plant.title,
                            imageIcons: plant.image,
                            variety: plant.variety,
                            area: plant.area,
                            date: plant.date,
                            plantAddress: plant.plantAddress,
                          });
                        }}>

                          <View style={styles.div2RowSpaceEvenNoAlignItems}>

                            <View style={styles.div2Row}>
                              {/* <Image source={{ uri: plant.image }} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }}/> */}
                              <LazyLoadImage source={{ uri: plant.image }} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }} />
                              <View>
                                <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 17 }}>{plant.title}</Text>
                                <Text>{moment(plant.date).format('MMMM D, YYYY')}</Text>
                                <Text>Ongoing</Text>
                              </View>
                            </View>


                            {/* Button option */}
                            <View style={[styles.div2RowDatalist, { padding: 10 }]}>
                              <Icon name={"bell-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 20 }} />
                              {/* <TouchableOpacity> */}
                              <Icon name={"dots-vertical"} color={'#276653'} size={23} style={{ width: 20 }} />
                              {/* </TouchableOpacity> */}
                            </View>
                          </View>
                        </Pressable>
                      </View>) : (
                        <View key={index} style={[styles.cardDataPlant, { backgroundColor: '#D9EDBF' }]}>
                          <Pressable onPress={() => {
                            navigation.navigate('Completed', {
                              key: plant.id,
                              title: plant.title,
                              imageIcons: plant.image,
                              variety: plant.variety,
                              area: plant.area,
                              date: plant.date,
                              plantAddress: plant.plantAddress,
                            });
                          }}>

                            <View style={styles.div2RowSpaceEvenNoAlignItems}>

                              <View style={styles.div2Row}>
                                {/* <Image source={{ uri: plant.image }} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }}/> */}
                                <LazyLoadImage source={{ uri: plant.image }} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }} />
                                <View>
                                  <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 17 }}>{plant.title}</Text>
                                  <Text>{moment(plant.date).format('MMMM D, YYYY')}</Text>
                                  <Text>Completed</Text>
                                </View>
                              </View>


                              {/* Button option */}
                              <View style={[styles.div2RowDatalist, { padding: 10 }]}>
                                {/* <TouchableOpacity> */}
                                <Icon name={"dots-vertical"} color={'#276653'} size={23} style={{ width: 20 }} />
                                {/* </TouchableOpacity> */}
                              </View>
                            </View>
                          </Pressable>
                        </View>
                      )
                    }
                  </View>


                )
              })
            )
          }
        </View>
         
      </ScrollView>
      <Pressable style={{ zIndex: 2, position: 'absolute', bottom: 0, right: 0, borderRadius: 30, width: 60, height: 60, justifyContent: 'center', alignItems: 'center', }}
        onPress={() => {
          navigation.navigate('PlantNew')
          console.log('Add garlic plant button pressed!')
        }}>
        <View style={styles.addBtn}>
          <Icon name={"plus"} color={'white'} size={23} style={{ fontWeight: 'bold' }} />
        </View>
     
      </Pressable>
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

  const userID = auth().currentUser.uid;
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false)
  const [plantTitle, setPlantTitle] = useState('')
  const [plantVariety, setPlantVariety] = useState('')
  const [plantArea, setPlantArea] = useState('')
  const [plantDate, setPlantDate] = useState(new Date())
  const [plantAddress, setPlantAddress] = useState(weathloc.name + ', ' + weathloc.region)
  const [upcoming1, setUpcoming1] = useState([])
  const [upcoming2, setUpcoming2] = useState([])
  const [completed, setCompleted] = useState([])
  const [dataloading, setDataloading] = useState(false);
  const [image, setImage] = useState(null); //Test
  const [imagePathCapture, setimagePathCapture] = useState('');  //ImagePicker
  const [uploading, setUploading] = useState(false);    //setUploaders
  const [downloadURL, setDownloadURL] = useState(null);   //imagelink uploader getdownload image
  const [transferred, setTransferred] = useState(0);    //Progress upload  image
  const [transferred2, setTransferred2] = useState(0);    //Progress upload  image



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
          title: "Garlic App Camera Permission",
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


  // uploading trigger
  const imageUpload = async () => {

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

      console.log('New Filename: ', filename)
      console.log('New Upload: ', uploadUri)
      const currentDate = new Date();

      // Spray foliar
      for (let i = 0; i <= 3; i++) {
        const newDate = new Date(currentDate.getTime() + i * 14 * 24 * 60 * 60 * 1000);
        const blues = moment(newDate).format()
        upcoming1.push({
          id_completed: 'Fertilizer_' + blues,
          image: 'false',
          dateupload: 'false',
          imageResult: 'false',
          title: 'Fertilizer',
          action: 'Spray foliar fertilizer',
          dateAction: blues,
          plantstatus: 0,
          count: 0
        });
      }

      // irrigate plant
      for (let i = 0; i <= 33; i++) {
        const newDate = new Date(currentDate.getTime() + i * 3 * 24 * 60 * 60 * 1000);
        const blue = moment(newDate).format();
        upcoming1.push({
          id_completed: 'Water_' + blue,
          image: 'false',
          dateupload: 'false',
          imageResult: 'false',
          title: 'Water',
          action: 'Water plants',
          dateAction: blue,
          plantStatus: 0,
          count: 0
        });
      }

      // storagePath and imagePath
      const task = Storage().ref('garlicImageProfile/' + filename).putFile(uploadUri)

      task.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        console.log(`Upload complete!`);

        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      });

      // Task then
      task.then(async () => {
        // get imageDownloadURL
        const downloadURL = await Storage().ref('garlicImageProfile/' + filename).getDownloadURL();

        //store data in realtime database
        //database().ref('/plants/' + user.uid + plantTitle) 
        database().ref('/users/' + userID+ '/plants/' + userID + plantTitle)
          .set({
            image: downloadURL,
            title: plantTitle,
            variety: plantVariety,
            area: plantArea,
            date: plantDate.toISOString(),
            taskToday: '  ',
            taskCompleted: ' ',
            images: ' ',
            taskUpcoming: upcoming1,
            plantAddress: plantAddress,
            plantStatus: 'false',
            harvestedStatus: 'false',
            dateHarvested: 'false'
          })
          .then(async () => {
            setModalVisible(true)
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
        <ScrollView >
          <View >
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

            {/* Modal message 'Created data' */}
            <View>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}>
                <View style={styles.outerCard}>

                  <View style={{ padding: 10, alignItems: 'center', }}>
                    <Image
                      source={require('../../src/images/done.png')}
                      style={{ width: 100, height: 100, position: 'absolute', zIndex: 2 }}
                    />
                    <View style={styles.innerCard}>
                      <Text style={[{ marginTop: 30, fontSize: 18, fontWeight: 'bold' }, styles.modalText]}>Congratulations!🌱</Text>
                      <Text style={[{ marginTop: 8 }, styles.modalText]}>Your garlic plant has been successfully added to your monitoring list! Keep an eye on its growth and health through our monitoring system. Happy gardening! 🌿</Text>
                      <Pressable
                        style={{ marginTop: 20 }}
                        onPress={() => {
                          setModalVisible(!modalVisible)
                          navigation.goBack()
                        }}>
                        <Text style={{
                          color: 'green', fontSize: 14,
                          textDecorationLine: 'underline'
                        }}>Close</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
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

function PlantID({ route, navigation }) {

  
  const [uploading, setUploading] = useState(false);    //setUploaders
  const [downloadURL, setDownloadURL] = useState(null);   //imagelink uploader getdownload image
  const [transferred2, setTransferred2] = useState(0);    //Progress upload  image
  const [image, setImage] = useState(null); //Test
  const [imagePathCapture, setimagePathCapture] = useState(null);

  
  const [mrhr3humidity, setMRHr3humidity] = useState([])
  const [afhr3humidity, setAFHr3humidity] = useState([])

  const [activities, setActivities] = useState([])
  const [irrigate, setIrrigate] = useState([])
  const [imageIcon, setimageIcon] = useState('');

  const [humis, setHumis] = useState('');
  const [humis2, setHumis2] = useState('');
  const { title, imageIcons, area, variety, date, plantAddress } = route.params;
  const [plantDataID, setPlantDataID] = useState([])
  const [modalVisible, setModalVisible] = useState(false);

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
    setLOCATION,
    setGpsLocationUpdate,
    holdlocation,
    setWeatherHoldLocation,
    weatherD
  } = useContext(LocationContext);
  const userID = auth().currentUser.uid;

  const { data, humi,
    predHumi,
    temp,
    predTemp,
    wind,
    predWind,
    preci,
    predPreci
  } = useContext(WeatherContext);
  const [status, setStatus] = useState(false);
  const [weathplantData, setWeathplantData] = useState('');
  const [findings, setFindings] = useState([])
  const [weathDataAstro, setWeathDataAstro] = useState('')
  const [weathDataDay, setWeathDay] = useState('')
  // Data
  // =================================================
  useEffect(() => {

    plantDisplayList();
    weatherPlant();

    completedTaskfetch()
    irrigation()
    foliar()
    fungicide()

  }, []);

  const plantDisplayList = async () => {
    const dbRef = database().ref('/database/' + user.uid + '/plants');
    dbRef.on('value', (snapshot) => {
      const firebaseData = snapshot.val();
      if (firebaseData == null) {
        setFindings(null);
      } else {
        const dataArray = Object.values(firebaseData);
        setPlantDataID(dataArray);
      }
    });
  }


  const apiKey = '096c5c5cfe81428389e33810241604';
  const weatherPlant = async () => {
    const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=' + plantAddress + '&days=10&aqi=yes&alerts=yes')
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
      })

    setWeathDay(response?.forecast?.forecastday[0]?.day)
    // console.log(weatherIcon)
    setWeathDataAstro(response?.forecast?.forecastday[0]?.astro)

  }


  //================================================
  const refRBSheetAna = useRef();
  const refRBSheetCapture = useRef();
 
  const [open, setOpen] = useState(false);
  const onPress = () => {
    if (!open) {
      refRBSheetCapture.current.open();
    } else {
      refRBSheetCapture.current.close();
    }
  }; 


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



  // CamProperties
  let optioncam = {
    saveToPhotos: true,
    mediaType: 'photo',
    cameraType: 'back',
    selectionLimit: 1,
    includeBase64: false,
    path: 'images',
  };

  // UploadProperties
  let optionImageupload = {
    mediaType: 'photo',
    includeBase64: false,
     path: 'images',
  };
  
  useEffect(()=> { 
    uploadimages(imagePathCapture);
  },[imagePathCapture])
  
  const AndroidPermissionCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Garlic App Camera Permission",
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
        setStatus(true);
        onPress()
        alert('URIssss: ', resultImageCaptured)
      } else {
        console.log("Camera permission denied");
        alert("Camera permission denied")
      }
    } catch (error) {
      console('Catch: Please try again!'. error)
      alert("Catch: ".imagePathCapture)
    }
  }
 

  // imageUploadPermission
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
        setStatus(true);
        onPress()
      } else {
        console.log("Camera permission denied");
        alert("Camera permission denied")
      }
    } catch (error) {
      console('Catch: Please try again!'. error)
      alert("Catch: ".imagePathCapture)
    }
  }

  const uploadimages = async (imagePathCap) => {
    const currentDate = new Date();
    const dates = moment(currentDate).format('MM-DD-YYYY');


    if (imagePathCap === null) {
      console.log('Refreshing image useState!');
    } else {

      const uri = imagePathCap;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      setUploading(true);
      setTransferred2(0);
      
      
      const taskUpload = Storage().ref('garlicImageData/' + filename).putFile(uploadUri)

      taskUpload.on('state_changed', snapshot => {
        const progress2 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress2}% done`);
        console.log(`Upload complete!`);

        setTransferred2(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      });

      taskUpload.then(async () => {
        const downloadURL = await Storage().ref('garlicImageData/' + filename).getDownloadURL();

        const userdata = database().ref('/users/' + userID + '/plants/' + user.uid + title + '/images').push();
        userdata.set({
            images: downloadURL,
            title: title,
            address: plantAddress,
            name: 'James Ryan',
            datecreated: dates,
            dateuploaded: dates,
            result: 'Pending',
            status: 'Pending'
          })
          .then(async () => {
            console.log('Userdata stored!'); 
            setStatus(false);
            setModalVisible(true)
          });

        const imagedata = database().ref('/imageAnalyze/'+ user.uid ).push();
        imagedata.set({
            images: downloadURL,
            title: title,
            address: plantAddress,
            name: 'James Ryan',
            datecreated: dates,
            dateuploaded: dates,
            result: 'pending',
            status: 'Pending'
          })
          .then(async () => {
            console.log('✅Passed: Image Identification');
            setStatus(false);
            setModalVisible(true)
          });


      });
      try {
        await taskUpload;

      } catch (e) {
        setStatus(false);
        console.error(e); 
      }
    }
  }
  

  const Harea = () => {
    return (
      <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#276653', lineHeight: 17, paddingLeft: 7 }}>{area} hectare</Text>
    )
  }

  const Hsarea = () => {
    return (
      <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#276653', lineHeight: 17, paddingLeft: 7 }}>{area} hectares</Text>
    )
  }



  const checkDatass = () => {

    console.log(weathData)

    //PlantStatus(false)
    weathData.forEach(function (elem) {
      //console.log("Hour: ", elem)

      const day1 = moment(elem.date).format('ll');
      const today = moment().toDate();
      const currentDay = moment(today).format('ll');
      const rain = elem.day.daily_chance_of_rain;
      const rainCondition = elem.day.condition.text;

      //check if weather date data == current data 
      //get data if true
      // Today
      if (day1 == currentDay) {

        //push data[0] to dataa hours Humidity
        elem.hour.forEach((elem2) => {
          const timecheck = moment(elem2.time).format('LT');
          if (timecheck == '5:00 AM' || timecheck == '6:00 AM' || timecheck == '7:00 AM') {
            //console.log(timecheck)
            console.log('check', timecheck)
            if (mrhr3humidity.length <= 2) {
              mrhr3humidity.push(elem2.humidity)
            } else {
              console.log('Humidity data for this morning is updated!')
            }
          } else {
            console.log(timecheck)
          }

          if (timecheck == '1:00 PM' || timecheck == '2:00 PM' || timecheck == '3:00 PM') {
            //console.log(timecheck)
            console.log('check', timecheck)
            if (afhr3humidity.length <= 2) {
              afhr3humidity.push(elem2.humidity)
            } else {
              console.log('Humidity data for this afternoon is updated!')
            }
          } else {
            console.log(timecheck)
          }
        })

        //console.log('Rain: ',rain)
        if (rain >= 80) {
          console.log('Chance of rain: ', rain, '%', 'Condition: ', rainCondition)
          console.log('push data')
        }

        // average Temperature
        if (elem.day.avgtemp_c >= 28) {
          // assign value for irrigating plants

          console.log('Need water today!')
          // to UPCOMING activity-check schedule if matches the data of plant irrigation
          // upcoming schedule == today  == push irrigate
        } else {
          console.log('40-50% Depletion!')
        }


      }

    })

    const currentDate = new Date();

    for (let i = 0; i <= 3; i++) {
      const newDate = new Date(currentDate.getTime() + i * 14 * 24 * 60 * 60 * 1000);
      const blue = moment(newDate).format('MMMM DD YYYY')
      activities.push({
        title: 'Fertilizer',
        action: 'Spray Foliar fertilizer',
        dateAction: blue,
        status: 'on'
      });
    }

    // irrigate plant
    for (let i = 0; i <= 33; i++) {
      const newDate = new Date(currentDate.getTime() + i * 3 * 24 * 60 * 60 * 1000);
      console.log(newDate);
      const blue = moment(newDate).format()
      //irrigate
      activities.push({
        title: 'Water',
        action: 'Water plants',
        dateAction: blue,
        status: 'on'
      });
    }
    //setFoliar(newDateStack);

    console.log(plantDataID.image)
  }

  const display = () => {
    console.log('Morning: ', mrhr3humidity)
    console.log('Afternoon: ', afhr3humidity)
    console.log('Foliar: ', foliar)
    //console.table('irrigating: ',irrigate)
  }


  //Date captured = loop starteds 
  //Date planted -- 
  const [irri, setIrri] = useState([]);
  const irrigation = async () => {
    console.log('irrigation', WeatherContext.temp)
  }

  //Date captured = loop starteds 
  //Date planted --
  const [fol, setFol] = useState([]);
  const foliar = async () => {
    console.log('precipitation', WeatherContext.preci)
  }

  //Date captured = loop starteds 
  //Date planted --
  const [fungi, setFungi] = useState([]);
  const fungicide = async () => {
    console.log('wind', WeatherContext.wind)
  }

  const chectdata = () => {
    // irrigate plant
    const currentDate = new Date();
    for (let i = 0; i <= 33; i++) {
      const newDate = new Date(currentDate.getTime() + i * 3 * 24 * 60 * 60 * 1000);
      const blue = moment(newDate).format()
      //irrigate
      foliar.push({
        title: 'Water',
        action: 'Water plants',
        dateAction: blue,
      });
    }

  }

  const [activeTab, setActiveTab] = useState('tab1');

  //fetch Completed activities
  const [com, setCom] = useState([])
  const completedTaskfetch = () => {
    const red = database().ref('null/plants/' + user.uid)
    const blue = red.toString().split('/')[3];

    if (user.uid == blue) {
      const taskCom = database().ref('users/' + user.uid + '/plants/' + user.uid + title + '/taskUpcoming')
      taskCom.on('value', (snapshot) => {
        const firebaseData = snapshot.val();
        const dataArray = Object.values(firebaseData);
        const sorted = dataArray.sort((a, b) => {
          const dateA = new Date(`${a.dateAction}`).valueOf();
          const dateB = new Date(`${b.dateAction}`).valueOf();
          if (dateA > dateB) {
            return 1; // return -1 here for DESC order
          }
          return -1 // return 1 here for DESC Order
        });
        setCom(sorted);
      });
    }
  }

  //function uploading Completed Task
  useEffect(() => {
    checkerTodayTask()
    imageFindings();
  }, []);


  const [todays, setTodays] = useState([])
  const checkTodayChecker = () => {
    const userTaskToday = database().ref('null/plants/' + user.uid + '/plants/' + user.uid + title + '/taskToday')
    userTaskToday.on('value', (snapshot) => {
      const firebaseData = snapshot.val();
      if (firebaseData == null) {
        setTodays(null);
        console.log('todays is empty!')
      } else {
        const dataArray = Object.values(firebaseData);
        const sortedStatus = dataArray.sort((a, b) => {
          const dateA = new Date(`${a.dateAction}`).valueOf();
          const dateB = new Date(`${b.dateAction}`).valueOf();
          if (dateA > dateB) {
            return 1; // return -1 here for DESC order
          }
          return -1 // return 1 here for DESC Order
        });
        setTodays(sortedStatus);
        console.log('CheckToday: Completed Task found!')
      }
    });

  }


  const [loadings, setLoadings] = useState(false);
  const [sortedToday, setsortedToday] = useState([])
  const [taskToday, setTaskToday] = useState([])
  const checkerTodayTask = () => {
    setLoadings(true)
    const red = database().ref('null/plants/' + user.uid)
    const blue = red.toString().split('/')[3];

    const currentDate = new Date();
    const newDate = moment().toDate();

    if (user.uid == blue) {
      const task = database().ref('users/' + user.uid + '/plants/' + user.uid + title + '/taskUpcoming')
      task.on('value', (snapshot) => {
        const firebaseData = snapshot.val();
        const dataArray = Object.values(firebaseData);
        const sorted = dataArray.sort((a, b) => {
          const dateA = new Date(`${a.dateAction}`).valueOf();
          const dateB = new Date(`${b.dateAction}`).valueOf();
          if (dateA > dateB) {
            return 1; // return -1 here for DESC order
          }
          return -1 // return 1 here for DESC Order

        });
        sorted.forEach((index) => {

          const dA = moment(index.dateAction).format('ll');
          const nDate = new Date();
          const dnewDate = moment(nDate).format('ll');
          //console.log('dAdAdAd: ',dA)
          //console.log('current: ',dAnewDate )

          const date1 = dA;
          const date2 = dnewDate;
          console.log('Date1: ', date1)
          console.log('current: ', date2)
          if (date1 == date2) {
            sortedToday.push({ 'action': index.action, 'dateAction': index.dateAction, 'title': index.title })
            console.log('Push Date: ', dA)
          } else {
            console.log('Cannot Push Date: ', dA)
            setsortedToday(null)
          }
        })
        setTaskToday(sortedToday)

      });

    }
    setLoadings(false)
  }

  const [taskcomplete, setTaskcomplete] = useState();
  const completedtaskActivity = async ({ upcom, title }) => {

    const currentDate = new Date();
    const dates = moment(currentDate).format('MM-DD-YYYY');

    // store data in realtime database 
    //Path for databse reference data
    const dataUpload = database().ref('/users/' + user.uid + '/plants/' + user.uid + title + '/taskCompleted/' + upcom.title + '_' + dates)
      .set({
        title: upcom.title,
        action: upcom.action,
        dateAction: dates,
        plantStatus: 1,
        counts: 0,
      })
      .then(async () => {
        alert('Task done!')
        //navigation.goBack()
      });


    try {
      await dataUpload;
      //generateUpcoming2Task()
    } catch (e) {
      console.error(e);
    }



    // CALL DATABASE REALTIME DATABASE
    //CALL PLANT DETAILS
    console.log(upcom);
    alert('clicked title: ', upcom.title)

    //setTaskcomplete()
    //console.log(taskcomplete);
  }



//  findings
const imageFindings = async() => {

  const red = database().ref('null/plants/' + user.uid)
  const blue = red.toString().split('/')[3];

  if(user.uid == blue) {
    const data = database().ref('users/'+ user.uid + '/plants/' + user.uid + title + '/images');
    data.on('value', (snapshot) => {
      const dataimage = snapshot.val();
      if(dataimage == null){
        setFindings(null);
        console.log('Image  is empty!')
      }else {
        const dataArray = Object.values(dataimage);
        const sorted = dataArray.sort((a, b) => {
          const dateA = new Date(`${a.dateuploaded}`).valueOf();
          const dateB = new Date(`${b.dateuploaded}`).valueOf();
          if (dateA > dateB) {
            return 1; // return -1 here for DESC order
          }
          return -1 // return 1 here for DESC Order
        });
        setFindings(sorted)
      }

    })
  }
}

  return (
    <SafeAreaView >
      <ScrollView >
        <ImageBackground
          source={require('../../src/images/Purple7.jpg')}
          resizeMode="cover"
          style={{ flex: 1, height: 430, }}
          imageStyle={{ borderBottomLeftRadius: 60, borderBottomRightRadius: 60 }}>
          <LinearGradient colors={['#ffffff00', '#92df9748', '#5bb761ce']} style={{ flex: 1, borderBottomLeftRadius: 60, borderBottomRightRadius: 60 }}>
            {/* opacity: 0.1 */}
            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: 10, marginRight: 20, backgroundColor: 'rgba(255, 255, 255, 0.815)', padding: 8, borderRadius: 25 }}>
              <Icon name={'calendar-outline'} color={'#276653'} size={20} style={{ width: 20, marginRight: 5 }} />
              <Text style={{ color: '#276653', fontWeight: 'bold' }}>{moment(date).startOf('day').fromNow()}</Text>
            </View>
            <View style={{ marginTop: 80, width: '100%', }}>
              <View style={{ margin: 20, padding: 15, backgroundColor: 'rgba(255, 255, 255, 0.548)', borderRadius: 15, flexDirection: 'row', justifyContent: 'flex-start' }}>
                <View>

                  {
                    imageIcons === null ? (
                      <View style={{ backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', width: 100, height: 100, marginRight: 10 }}>
                        {/* <Image source={require('../../src/icons/Garlic.png')} style={{width:80, height:60}} /> */}
                        <LazyLoadImage source={{ uri: imageIcons }} style={{ width: 100, height: 100, borderRadius: 10, marginRight: 10 }} />
                      </View>
                    ) : (<LazyLoadImage source={{ uri: imageIcons }} style={{ width: 100, height: 100, borderRadius: 10, marginRight: 10 }} />)
                  }

                  {/* <Image source={require('../../src/images/Insect5.jpg')} style={{ width: 100, height: 100, borderRadius: 15, marginRight: 10 }} /> */}
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <View>
                    <Text style={{ fontSize: 18, color: 'white', fontWeight: '900' }}> {title}</Text>
                    <Text style={{ fontSize: 16, color: 'white', fontWeight: '900' }}> {moment(date).format("MMMM D, YYYY")}</Text>
                  </View>
                  

                  <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <TouchableOpacity onPress={() => refRBSheetCapture.current.open()}>
                      <View style={{ padding: 7, borderWidth: 1, borderColor: '#5BB761', backgroundColor: '#EAFFE8', borderRadius: 20, flexDirection: 'row', paddingLeft: 15, paddingRight: 10 }}>
                        <Icon name={'camera-outline'} color={' #276653'} size={20} style={{ width: 20, marginRight: 5 }} />
                        <Text style={{ fontWeight: 'bold' }}>Identify</Text>
                      </View>
                    </TouchableOpacity>
                  

                    <RBSheet
                      ref={refRBSheetCapture}
                      onOpen={() => setOpen(true)}
                      onClose={() => setOpen(false)}
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
                          Analyze Garlic Image
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
                </View>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>

        <View style={{
          flex: 2, padding: 10, borderTopRightRadius: 25,
          borderTopLeftRadius: 25, paddingTop: 30, marginTop: -160, height: undefined
        }}> 

          
          <Modal
            visible={status}
            onRequestClose={() => setStatus(false)}
            animationType="fade"
            presentationStyle="pageSheet"
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', opacity: 0.5 }}>
              <ActivityIndicator animating={true} size="large" color="#377630" />
              <Text style={{fontWeight:'bolder', fontSize:14 ,color:"#377630" }}>
                Uploading data
              </Text>
            </View>

        </Modal>


          {/* Details */}
          <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', justifyContent: 'center', borderRadius: 15, padding: 20, margin: 10 }]}>
            <View style={{ flexDirection: 'row', width: '100%', marginBottom: 25 }}>
              <View style={{ alignItems: 'center', width: '33%', }}>
                <Icon name={'thermometer'} color={'#276653'} size={30} style={{ width: 25 }} />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>{weathDataDay.avgtemp_c}</Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>°C</Text>
                </View>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#4f74698f', marginTop: -4 }}>Temperature</Text>
              </View>
              {/* wind */}
              <View style={{ alignItems: 'center', width: '33%' }}>
                <Icon name={'weather-windy'} color={'#276653'} size={30} style={{ width: 30 }} />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>{weathDataDay.maxwind_kph}</Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>kph</Text>
                </View>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#4f74698f', marginTop: -4 }}>Wind</Text>
              </View>
              {/* Humidity */}
              <View style={{ alignItems: 'center', width: '33%' }}>
                <Icon name={'water-outline'} color={'#276653'} size={30} style={{ width: 25 }} />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>{weathDataDay.avghumidity}</Text>
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
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>{weathDataDay.totalprecip_mm}</Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>mm</Text>
                </View>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#4f74698f', marginTop: -4 }}>Precipitation</Text>
              </View>
              {/* Sunrise */}
              <View style={{ alignItems: 'center', width: '33%' }}>
                <Icon name={'weather-sunset-up'} color={'#276653'} size={30} style={{ width: 30 }} />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>{weathDataAstro.sunrise}</Text>
                  {/* <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>am</Text> */}
                </View>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#4f74698f', marginTop: -4 }}>Sunrise</Text>
              </View>



              {/* Sunset */}
              <View style={{ alignItems: 'center', width: '33%' }}>
                <Icon name={'weather-sunset-down'} color={'#276653'} size={30} style={{ width: 30 }} />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>{weathDataAstro.sunset}  </Text>
                  {/* <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>pm</Text> */}
                </View>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#4f74698f', marginTop: -4 }}>Sunset</Text>
              </View>
            </View>
          </View>


          {/* Overview */}
          <View style={{ marginTop: 10, marginRight: 10, margin: 10 }}>
            <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, borderLeftWidth: 10, borderLeftColor: '#6fb96d' }]}>
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ width: '50%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#687773', }}>Variety:</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#276653', lineHeight: 17, paddingLeft: 7 }}>{variety}</Text>
                  </View>
                  <View style={{ width: '50%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#687773' }}>Location:</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#276653', lineHeight: 17, paddingLeft: 7 }}>{plantAddress}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                  <View style={{ width: '50%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#687773' }}>Area Planted:</Text>
                    {
                      area <= 1 ? (<Harea />) : (<Hsarea />)
                    }
                  </View>
                  <View style={{ width: '50%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#687773' }}>Date Planted:</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#276653', lineHeight: 17, paddingLeft: 7 }}>{moment(date).format("MMMM D, YYYY")}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          
            {/* Modal message 'Created data' */}
            <View>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}>
                <View style={styles.outerCard}>

                  <View style={{ padding: 10, alignItems: 'center', }}>
                    <Image
                      source={require('../../src/images/done.png')}
                      style={{ width: 100, height: 100, position: 'absolute', zIndex: 2 }}
                    />
                    <View style={styles.innerCard}>
                      <Text style={[{ marginTop: 30, fontSize: 18, fontWeight: 'bold' }, styles.modalText]}>Uploaded Successfully!🌱</Text>
                      <Text style={[{ marginTop: 8 }, styles.modalText]}>Your garlic image has been uploaded to database. Please wait for a few minutes to analyze your image! 🌿</Text>
                      <Pressable
                        style={{ marginTop: 20 }}
                        onPress={() => {
                          setModalVisible(!modalVisible)
                        }}>
                        <Text style={{
                          color: 'green', fontSize: 14,
                          textDecorationLine: 'underline'
                        }}>Close</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>

          {/* Findings */}

          {
              findings === null ? null : (
                <View style={{ margin: 10, marginTop: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5, alignItems: 'center' }}>
                  <Text style={{ fontSize: 17, color: '#276653', fontWeight: 'bold' }}>Uploaded samples</Text>
                </View>
                <View>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} snapToStart={true} >
                    {
                      findings.map((imageFins , findex) => {
                        return (
                          <View key={findex} style={{ marginRight: 10 }}>
                            <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, margin: 4, marginBottom: 8, padding: 8 }]}>
                              <View>
                                <View>
                                  <Image source={require('../../src/images/Tangle1.jpg')} style={{ width: 155, height: 155, borderRadius: 5, }} />
                                </View>
                              </View>
                              <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', paddingLeft: 5, paddingBottom: 8 }}>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16, }}>{imageFins.result}</Text>
                              </View>
                              <View style={{ flexDirection: 'row', marginTop: -10, alignItems: 'center', paddingLeft: 8, paddingBottom: 8 }}>
                                <Text style={{ fontWeight: 'bold', color: '#687773', fontSize: 14, }}>{imageFins.status}</Text>
                              </View>
                              <View style={{ flexDirection: 'row', paddingLeft: 8 }}>
                              <Text style={{ fontWeight: 'bold', fontSize: 12, }}>{ imageFins.dateuploaded } </Text>
                                {/* <Text style={{ fontWeight: 'bold', fontSize: 12, }}>{ moment(imageFins.dateuploaded).format('MM-DD-YYYY')} </Text> */}
                              </View>
                            </View>
                          </View>
                        )
                      })
                    }
                  </ScrollView>
                </View>
              </View>
              )
          }
         


          {/* Task */}
          <View style={{ margin: 10, marginTop: 10, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5, alignItems: 'center' }}>
              <Text style={{ fontSize: 17, color: '#276653', fontWeight: 'bold' }}>Today's Activity</Text>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Task', {
                  title: title,
                });
              }}>
                <View>
                  <Text style={{ fontSize: 14, color: '#276653', fontWeight: 'bold' }}>Show more</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View>

              {
                taskToday.length == 0 ?
                  (

                    <View style={{ marginTop: 10 }}>
                      <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, borderLeftWidth: 10, borderLeftColor: '#FFC700' }]}>
                        <View style={{ marginTop: 5, marginBottom: 5, flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#649183' }}>No tasks for today!</Text>
                        </View>
                      </View>
                    </View>
                  ) : (null)
              }
              {
                taskToday.map((upcom, index3) => {
                  return (
                    <View key={index3} style={{ margin: 10, marginTop: 4, marginBottom: 4 }}>
                      {
                        upcom.title == 'Water' ? (<View style={[styles.cardDashboardRecentProp, { flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, width: '100%', padding: 20, borderLeftColor: '#389cdf', borderLeftWidth: 10, marginBottom: 10, alignItems: 'center' }]}>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end', marginTop: -20 }}>
                            <View style={{ padding: 5 }}>
                              <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 13, fontStyle: 'italic' }}>{moment(upcom.dateAction).format('LL')}</Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image source={require('../../src/icons/water.png')} style={{ width: 45, height: 40, marginRight: 10 }} />
                              <View>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>{upcom.title}</Text>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 14 }}>{upcom.action}</Text>
                              </View>
                            </View>
                            <View>
                              <View>
                                <TouchableOpacity
                                  onPress={() => {
                                    completedtaskActivity({ upcom, title })
                                  }}>
                                  <View style={{ borderRadius: 15, borderWidth: 1.5, borderColor: '#4a8f3cff', paddingLeft: 10, paddingRight: 10, padding: 5, marginTop: 8 }}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Done</Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>) : (null)
                      }

                      {
                        upcom.title == 'Fertilizer' ? (<View style={[styles.cardDashboardRecentProp, { flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, width: '100%', padding: 20, borderLeftColor: '#3fda54', borderLeftWidth: 10, marginBottom: 10, alignItems: 'center' }]}>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end', marginTop: -20 }}>
                            <View style={{ padding: 5 }}>
                              <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 13, fontStyle: 'italic' }}>{moment(upcom.dateAction).format('LL')}</Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image source={require('../../src/icons/Fertilizer.png')} style={{ width: 45, height: 40, marginRight: 10 }} />
                              <View>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>{upcom.title}</Text>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 14 }}>{upcom.action}</Text>
                              </View>
                            </View>
                            <View>
                              <View>
                                <TouchableOpacity
                                  onPress={() => {
                                    completedtaskActivity({ upcom, title })
                                  }
                                  }
                                >
                                  <View style={{ borderRadius: 15, borderWidth: 1.5, borderColor: '#4a8f3cff', paddingLeft: 10, paddingRight: 10, padding: 5, marginTop: 8 }}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Done</Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>) : (null)
                      }
                      {
                        upcom.title == 'Pest' ? (<View style={[styles.cardDashboardRecentProp, { flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, width: '100%', padding: 20, borderLeftColor: '#e45138', borderLeftWidth: 10, marginBottom: 10, alignItems: 'center' }]}>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end', marginTop: -20 }}>
                            <View style={{ padding: 5 }}>
                              <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 13, fontStyle: 'italic' }}>{moment(upcom.dateAction).format('LL')}</Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                              <View>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>{upcom.title}</Text>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 14 }}>{upcom.action}</Text>
                              </View>
                            </View>
                            <View>
                              <View>
                                <TouchableOpacity disabled={true}
                                // onPress={() => {
                                //   handlesubmit(upcom)
                                //   alert('clicked title: ', upcom.title, ' dateAction', upcom.dateAction, ' Action: ', upcom.Action, ' Status: ', upcom.status)
                                // }}
                                >
                                  <View style={{ borderRadius: 15, borderWidth: 1.5, borderColor: '#4a8f3cff', paddingLeft: 10, paddingRight: 10, padding: 5, marginTop: 8 }}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Done</Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>) : (null)
                      }

                      {
                        upcom.title == 'Disease' ? (<View style={[styles.cardDashboardRecentProp, { flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, width: '100%', padding: 20, borderLeftColor: '#ebde31', borderLeftWidth: 10, marginBottom: 10, alignItems: 'center' }]}>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end', marginTop: -20 }}>
                            <View style={{ padding: 5 }}>
                              <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 13, fontStyle: 'italic' }}>{moment(upcom.dateAction).format('LL')}</Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                              <View>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>{upcom.title}</Text>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 14 }}>{upcom.action}</Text>
                              </View>
                            </View>
                            <View>
                              <View>
                                <TouchableOpacity disabled={true}
                                // onPress={() => {
                                //   handlesubmit(upcom)
                                //   alert('clicked title: ', upcom.title, ' dateAction', upcom.dateAction, ' Action: ', upcom.Action, ' Status: ', upcom.status)
                                // }
                                // }
                                >
                                  <View style={{ borderRadius: 15, borderWidth: 1.5, borderColor: '#4a8f3cff', paddingLeft: 10, paddingRight: 10, padding: 5, marginTop: 8 }}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Done</Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>) : (null)
                      }


                    </View>
                  )
                })
              }


            </View>



          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PlantIdentify({ route, navigation }) {
  const [uploading, setUploading] = useState(false);    //setUploaders
  const [downloadURL, setDownloadURL] = useState(null);   //imagelink uploader getdownload image
  const [transferred, setTransferred] = useState(0);    //Progress upload  image
  const [image, setImage] = useState(null); //Test

  const [mrhr3humidity, setMRHr3humidity] = useState([])
  const [afhr3humidity, setAFHr3humidity] = useState([])

  const [activities, setActivities] = useState([])
  const [irrigate, setIrrigate] = useState([])
  const [imageIcon, setimageIcon] = useState('');

  const [humis, setHumis] = useState('');
  const [humis2, setHumis2] = useState('');
  const { title, imageIcons, area, variety, date, plantAddress } = route.params;
  const [plantDataID, setPlantDataID] = useState([])

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
    setLOCATION,
    setGpsLocationUpdate,
    holdlocation,
    setWeatherHoldLocation,
    weatherD
  } = useContext(LocationContext);

  const { data, humi,
    predHumi,
    temp,
    predTemp,
    wind,
    predWind,
    preci,
    predPreci
  } = useContext(WeatherContext);

  const [weathplantData, setWeathplantData] = useState('');
  const [findings, setFindings] = useState('')
  const [weathDataAstro, setWeathDataAstro] = useState('')
  const [weathDataDay, setWeathDay] = useState('')
  // Data
  // =================================================
  useEffect(() => {

    plantDisplayList();
    weatherPlant();
    plantFindings();
    //imageFetch();
    //wfActivities()

    completedTaskfetch()
    foliar()
    fungicide()

  }, []);

  const plantDisplayList = async () => {
    const dbRef = database().ref('/database/' + user.uid + '/plants');
    dbRef.on('value', (snapshot) => {
      const firebaseData = snapshot.val();
      if (firebaseData == null) {
        setFindings(null);
      } else {
        const dataArray = Object.values(firebaseData);
        setPlantDataID(dataArray);
      }
    });
  }

  const plantFindings = async () => {
    const dbRef = database().ref('/users/' + user.uid + '/plants/modelImages');
    dbRef.on('value', (snapshot) => {
      const firebaseData = snapshot.val();
      if (firebaseData == null) {
        setFindings(null);
      } else {
        const dataArrayfindings = Object.values(firebaseData);
        setFindings(dataArrayfindings);
      }
    });
  }

  const uploadimages = async (title) => {
    const currentDate = new Date();
    const dates = moment(currentDate).format('MM-DD-YYYY');


    if (imageAna === null) {
      alert('data not found')
    } else {

      const uri = imageAna;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      setUploading(true);
      setTransferred(0);
      
      //const imageName = uploadUri+dates;
      
      const taskUpload = Storage().ref('garlicImageData/' + filename).putFile(uploadUri)

      taskUpload.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        console.log(`Upload complete!`);

        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      });

      taskUpload.then(async () => {
        // get imageDownloadURL
        const downloadURL = await Storage().ref('garlicImageData/' + filename).getDownloadURL();

        const userdata = database().ref('/users/' + user.uid + '/plants/' + user.uid + title + '/images/' + uploadUri)
          .set({
            images: downloadURL,
            title: title,
            name: 'James',
            datecreated: dates,
            dateuploaded: dates,
            result: 'Pending',
          })
          .then(async () => {
            console.log('Userdata stored!');
          });

        const imagedata = database().ref('/image analyze/' + uploadUri)
          .set({
            images: downloadURL,
            title: title,
            name: 'James',
            datecreated: dates,
            dateuploaded: dates,
            result: 'pending',
          })
          .then(async () => {
            console.log('Imagedata stored!');
          });

        Promise.all([userdata, imagedata])
          .then(() => {
            console.log('Both database values updated successfully.');
          })
          .catch(error => {
            console.error('Error updating database values:', error);
          });


      });
      try {
        await taskUpload;

      } catch (e) {
        console.error(e);
      }

      setUploading(false);
      setImage(null);
    }
  }


  const apiKey = '096c5c5cfe81428389e33810241604';
  const weatherPlant = async () => {
    const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=' + plantAddress + '&days=10&aqi=yes&alerts=yes')
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
      })

    setWeathDay(response?.forecast?.forecastday[0]?.day)
    // console.log(weatherIcon)
    setWeathDataAstro(response?.forecast?.forecastday[0]?.astro)

  }

  // datalist
  const renderDisplayList = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate('PlantID', {
          title: item.title,
          image: item.image,
          variety: item.variety,
          area: item.area,
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


  //================================================
  const refRBSheetAna = useRef();
  const refRBSheetCapture = useRef();
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

  // CamProperties
  let optioncam = {
    saveToPhotos: true,
    mediaType: 'photo',
    cameraType: 'back',
    selectionLimit: 1,
    includeBase64: false,
    path: 'image',
  };

  // UploadProperties
  let optionImageupload = {
    mediaType: 'photo',
    includeBase64: false,
    path: 'image',
  };



  const [imageAna, setimageaAna] = useState();
  // imageCameraPermission
  const AndroidPermissionCameraAnalysis = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message:
            "Garlic App needs access to your camera " +
            "so you can take garlic images.",
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
        setimageaAna(resultImageCaptured.assets[0].uri);
        console.log('Image URI: ', imageAna.uri);
        uploadimages(title);
      } else {
        console.log("Camera permission denied");
        alert("Camera permission denied")
      }
    } catch (error) {
      alert('Please try again!')
      console.log(error)
    }
  }

  // imageUploadPermission
  const imageLibraryAnalysis = async () => {

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
        const resultImageToUpload = await launchImageLibrary(optioncam);
        if (resultImageToUpload.didCancel == true) {
          alert('Please try again!')
          // alert('No images in gallery selected!')
        }
        setimageaAna(resultImageToUpload.assets[0].uri);
        uploadimages(title);
        RBSheet.close()

      } else {
        console.log("Camera permission denied");
        alert("Camera permission denied")
      }
    } catch (error) {
      alert('Please try again!', error)
      console.log(error)
    }
  }


  return (
    <SafeAreaView >
      <ScrollView >
        <ImageBackground
          source={require('../../src/images/Purple7.jpg')}
          resizeMode="cover"
          style={{ flex: 1, height: 430, }}
          imageStyle={{ borderBottomLeftRadius: 60, borderBottomRightRadius: 60 }}>
          <LinearGradient colors={['#ffffff00', '#92df9748', '#5bb761ce']} style={{ flex: 1, borderBottomLeftRadius: 60, borderBottomRightRadius: 60 }}>
         
          </LinearGradient>
        </ImageBackground>

        <View style={{
          flex: 2, padding: 10, borderTopRightRadius: 25,
          borderTopLeftRadius: 25, paddingTop: 30, marginTop: -160, height: undefined
        }}>

          {/* Details */}
          <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', justifyContent: 'center', borderRadius: 15, padding: 20, margin: 10 }]}>
            <View style={{ flexDirection: 'row', width: '100%', marginBottom: 25 }}>
              <View style={{ alignItems: 'center', width: '33%', }}>
                <Icon name={'thermometer'} color={'#276653'} size={30} style={{ width: 25 }} />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>{weathDataDay.avgtemp_c}</Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>°C</Text>
                </View>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#4f74698f', marginTop: -4 }}>Temperature</Text>
              </View>
              {/* wind */}
              <View style={{ alignItems: 'center', width: '33%' }}>
                <Icon name={'weather-windy'} color={'#276653'} size={30} style={{ width: 30 }} />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>{weathDataDay.maxwind_kph}</Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>kph</Text>
                </View>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#4f74698f', marginTop: -4 }}>Wind</Text>
              </View>
              {/* Humidity */}
              <View style={{ alignItems: 'center', width: '33%' }}>
                <Icon name={'water-outline'} color={'#276653'} size={30} style={{ width: 25 }} />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>{weathDataDay.avghumidity}</Text>
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
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>{weathDataDay.totalprecip_mm}</Text>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>mm</Text>
                </View>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#4f74698f', marginTop: -4 }}>Precipitation</Text>
              </View>
              {/* Sunrise */}
              <View style={{ alignItems: 'center', width: '33%' }}>
                <Icon name={'weather-sunset-up'} color={'#276653'} size={30} style={{ width: 30 }} />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>{weathDataAstro.sunrise}</Text>
                  {/* <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>am</Text> */}
                </View>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#4f74698f', marginTop: -4 }}>Sunrise</Text>
              </View>



              {/* Sunset */}
              <View style={{ alignItems: 'center', width: '33%' }}>
                <Icon name={'weather-sunset-down'} color={'#276653'} size={30} style={{ width: 30 }} />
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>{weathDataAstro.sunset}  </Text>
                  {/* <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#276653', lineHeight: 25, }}>pm</Text> */}
                </View>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#4f74698f', marginTop: -4 }}>Sunset</Text>
              </View>
            </View>
          </View>


          {/* Overview */}
          <View style={{ marginTop: 10, marginRight: 10, margin: 10 }}>
            <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, borderLeftWidth: 10, borderLeftColor: '#6fb96d' }]}>
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ width: '50%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#687773', }}>Variety:</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#276653', lineHeight: 17, paddingLeft: 7 }}>{variety}</Text>
                  </View>
                  <View style={{ width: '50%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#687773' }}>Location:</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#276653', lineHeight: 17, paddingLeft: 7 }}>{plantAddress}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                  <View style={{ width: '50%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#687773' }}>Area Planted:</Text>
                    {
                      area <= 1 ? (<Harea />) : (<Hsarea />)
                    }
                  </View>
                  <View style={{ width: '50%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#687773' }}>Date Planted:</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#276653', lineHeight: 17, paddingLeft: 7 }}>{moment(date).format("MMMM D, YYYY")}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Findings */}
          <View style={{ margin: 10, marginTop: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5, alignItems: 'center' }}>
              <Text style={{ fontSize: 17, color: '#276653', fontWeight: 'bold' }}>Uploaded samples</Text>
            </View>
            <View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} snapToStart={true} >

                <View style={{ marginRight: 10 }}>
                  <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, margin: 4, marginBottom: 8, padding: 8 }]}>
                    <View>
                      <View>
                        <Image source={require('../../src/images/Tangle1.jpg')} style={{ width: 155, height: 155, borderRadius: 5, }} />
                        {/* <Image source={require('../../src/images/garlic1.jpg')} style={{ width: 175, height: 175, borderRadius: 5,zIndex:1,Bottom: -10,marginLeft: 30, opacity: 0.5}} /> */}
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', paddingLeft: 5, paddingBottom: 8 }}>
                      <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16, }}>Tangle Top</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: -10, alignItems: 'center', paddingLeft: 8, paddingBottom: 8 }}>
                      <Text style={{ fontWeight: 'bold', color: '#687773', fontSize: 14, }}>severe</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 8 }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 12, }}>Feb. 23, 2023 </Text>
                    </View>
                  </View>
                </View>

                {/* <View style={{ marginRight: 10 }}>
                    <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, margin: 4, marginBottom: 8, padding: 20 }]}>
                      <View style={{ flexDirection: 'row', }}>
                        <Text style={{ fontWeight: 'bold' }}>Feb. 23, 2023 </Text>
                      </View>
                      <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', }}>
                          <Image source={require('../../src/images/garlic1.jpg')} style={{ width: 35, height: 35, borderRadius: 25 }} />
                          <Image source={require('../../src/images/garlic1.jpg')} style={{ width: 35, height: 35, borderRadius: 25, marginLeft: -20, opacity: 0.5 }} />
                        </View><Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18, marginLeft: 5 }}>Tangle Top</Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <View style={{ marginRight: 10, justifyContent: 'flex-end', marginLeft: 50 }}><View>
                            <View style={{  marginRight: 10, borderRadius: 10, borderWidth: 1.5, borderColor: 'gray', width: 140 }}></View>
                            <View style={{  marginRight: 10, borderRadius: 10, borderWidth: 3, borderColor: '#6fb96d', marginTop: -5, width: '40%' }}></View>
                          </View>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                          <Text style={{ fontWeight: 'bold', alignSelf: 'flex-end', color: '#276653' }}>40%</Text>
                        </View>
                      </View>
                    </View>
                  </View> */}
              </ScrollView>
            </View>
          </View>


          {/* Task */}
          <View style={{ margin: 10, marginTop: 10, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5, alignItems: 'center' }}>
              <Text style={{ fontSize: 17, color: '#276653', fontWeight: 'bold' }}>Today's Activity</Text>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Task', {
                  title: title,
                });
              }}>
                <View>
                  <Text style={{ fontSize: 14, color: '#276653', fontWeight: 'bold' }}>Show more</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View>

              {
                taskToday.length == 0 ?
                  (

                    <View style={{ marginTop: 10 }}>
                      <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, borderLeftWidth: 10, borderLeftColor: '#FFC700' }]}>
                        <View style={{ marginTop: 5, marginBottom: 5, flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#649183' }}>No tasks for today!</Text>
                        </View>
                      </View>
                    </View>
                  ) : (null)
              }
              {
                taskToday.map((upcom, index3) => {
                  return (
                    <View key={index3} style={{ margin: 10, marginTop: 4, marginBottom: 4 }}>
                      {
                        upcom.title == 'Water' ? (<View style={[styles.cardDashboardRecentProp, { flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, width: '100%', padding: 20, borderLeftColor: '#389cdf', borderLeftWidth: 10, marginBottom: 10, alignItems: 'center' }]}>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end', marginTop: -20 }}>
                            <View style={{ padding: 5 }}>
                              <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 13, fontStyle: 'italic' }}>{moment(upcom.dateAction).format('LL')}</Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image source={require('../../src/icons/water.png')} style={{ width: 45, height: 40, marginRight: 10 }} />
                              <View>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>{upcom.title}</Text>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 14 }}>{upcom.action}</Text>
                              </View>
                            </View>
                            <View>
                              <View>
                                <TouchableOpacity
                                  onPress={() => {
                                    completedtaskActivity({ upcom, title })
                                  }}>
                                  <View style={{ borderRadius: 15, borderWidth: 1.5, borderColor: '#4a8f3cff', paddingLeft: 10, paddingRight: 10, padding: 5, marginTop: 8 }}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Done</Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>) : (null)
                      }

                      {
                        upcom.title == 'Fertilizer' ? (<View style={[styles.cardDashboardRecentProp, { flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, width: '100%', padding: 20, borderLeftColor: '#3fda54', borderLeftWidth: 10, marginBottom: 10, alignItems: 'center' }]}>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end', marginTop: -20 }}>
                            <View style={{ padding: 5 }}>
                              <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 13, fontStyle: 'italic' }}>{moment(upcom.dateAction).format('LL')}</Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image source={require('../../src/icons/Fertilizer.png')} style={{ width: 45, height: 40, marginRight: 10 }} />
                              <View>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>{upcom.title}</Text>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 14 }}>{upcom.action}</Text>
                              </View>
                            </View>
                            <View>
                              <View>
                                <TouchableOpacity
                                  onPress={() => {
                                    completedtaskActivity({ upcom, title })
                                  }
                                  }
                                >
                                  <View style={{ borderRadius: 15, borderWidth: 1.5, borderColor: '#4a8f3cff', paddingLeft: 10, paddingRight: 10, padding: 5, marginTop: 8 }}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Done</Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>) : (null)
                      }
                      {
                        upcom.title == 'Pest' ? (<View style={[styles.cardDashboardRecentProp, { flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, width: '100%', padding: 20, borderLeftColor: '#e45138', borderLeftWidth: 10, marginBottom: 10, alignItems: 'center' }]}>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end', marginTop: -20 }}>
                            <View style={{ padding: 5 }}>
                              <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 13, fontStyle: 'italic' }}>{moment(upcom.dateAction).format('LL')}</Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                              <View>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>{upcom.title}</Text>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 14 }}>{upcom.action}</Text>
                              </View>
                            </View>
                            <View>
                              <View>
                                <TouchableOpacity disabled={true}
                                // onPress={() => {
                                //   handlesubmit(upcom)
                                //   alert('clicked title: ', upcom.title, ' dateAction', upcom.dateAction, ' Action: ', upcom.Action, ' Status: ', upcom.status)
                                // }}
                                >
                                  <View style={{ borderRadius: 15, borderWidth: 1.5, borderColor: '#4a8f3cff', paddingLeft: 10, paddingRight: 10, padding: 5, marginTop: 8 }}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Done</Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>) : (null)
                      }

                      {
                        upcom.title == 'Disease' ? (<View style={[styles.cardDashboardRecentProp, { flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, width: '100%', padding: 20, borderLeftColor: '#ebde31', borderLeftWidth: 10, marginBottom: 10, alignItems: 'center' }]}>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end', marginTop: -20 }}>
                            <View style={{ padding: 5 }}>
                              <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 13, fontStyle: 'italic' }}>{moment(upcom.dateAction).format('LL')}</Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                              <View>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>{upcom.title}</Text>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 14 }}>{upcom.action}</Text>
                              </View>
                            </View>
                            <View>
                              <View>
                                <TouchableOpacity disabled={true}
                                // onPress={() => {
                                //   handlesubmit(upcom)
                                //   alert('clicked title: ', upcom.title, ' dateAction', upcom.dateAction, ' Action: ', upcom.Action, ' Status: ', upcom.status)
                                // }
                                // }
                                >
                                  <View style={{ borderRadius: 15, borderWidth: 1.5, borderColor: '#4a8f3cff', paddingLeft: 10, paddingRight: 10, padding: 5, marginTop: 8 }}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Done</Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>) : (null)
                      }


                    </View>
                  )
                })
              }
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


function PlantCam({ route, navigation }) {
  const { logout, user } = useContext(AuthContext);
  const [process, setProcessing] = useState(false);
  const [result, setResult] = useState('');
  const result_mapping = ['Purple blotch', 'Leaf spot', 'Tangle top', 'Common worm', 'Garlic rust', 'Root rot']

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

  const [weathplantData, setWeatherloc] = useState('');
  const [uploading, setUploading] = useState(false);    //setUploaders
  const [downloadURLModel, setDownloadURLModel] = useState(null);   //imagelink uploader getdownload image
  const [transferred, setTransferred] = useState(0);
  const { title, image, area, variety, date, plantAddress } = route.params;
  const [image1, setImage1] = useState(null)

  const imageprocessingPrediction = async (image1) => {

    const model = await getModel();
    const tensor = await convertBase64ToTensorflow(image1.base64);

    const prediction = await startPrediction(model, tensor)

    const highestPrediction = prediction.indexOf(
      Math.max.apply(null, prediction),
    )

    setResult(result_mapping[highestprediction])
  }

  // imageDefault
  const ImageDefault = () => {
    return (
      <View style={{ marginBottom: 80, paddingLeft: '5%', paddingRight: '5%', borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
        <TouchableOpacity
          onPress={AndroidPermissionCamera1}
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

        {/* <Icon name={'camera-outline'} color={'#276653'} size={200} style={{ width: 200, }} /> */}
      </View>
    )
  }

  // ImageChange1
  const ImageChange1 = (props) => {
    return (
      <View style={{ borderRadius: 10, alignItems: 'center', width: '100%', marginBottom: 30 }}>
        <View style={[styles.cardDashboardPestDiseaseProp, , { margin: 10 }]}>
          <Image source={{ uri: image1 }} style={{ width: 210, height: 210, alignItems: 'center', borderRadius: 10 }} />
        </View>
        <TouchableOpacity
          onPress={() => setImage1(null)}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: '#ad3517' }}>
            <Icon name={"image-remove"} color={'#ad3517'} size={20} style={{ width: 20, marginRight: 2 }} />
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#ad3517' }}>Remove</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

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
        setImage1(resultImageToUpload.assets[0].uri);
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

  const imageSubmit = async () => {
    console.log(' image1: ' + image1);

    // Create Data plant
    if (image1 === null) {
      alert('Select image!');
      return;
    }
    else {
      const uri = image1;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      setUploading(true);
      setTransferred(0);

      // storagePath and imagePath
      const task = Storage().ref('images/' + user.uid + '/' + filename).putFile(uploadUri)

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
        const downloadURLModel = await Storage().ref('images/' + user.uid + '/' + filename).getDownloadURL();

        // store data in realtime database
        database().ref('/users/' + user.uid + '/plants/' + user.uid + title + '/modelImages/')
          .push({
            image: downloadURLModel,
            date: moment().format('ll'),
            severity: '',
            status: 'unknown'
          })
          .then(async () => {
            alert('Plant data stored successfully!')
            navigation.goBack()
          });

        const downloadURLModel2 = await Storage().ref('plantimages/' + filename).getDownloadURL();
        database().ref('/plantdataimages/' + user.uid)
          .push({
            image: downloadURLModel2,
            user_id: user.uid,
            title: title,
            date: moment().format('ll'),
            status: 'unknown'

          })
      });

      try {
        await task;
      } catch (error) {
        console.error(error);
      }

      setUploading(false);
      setImage1(null);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ backgroundColor: '#e6fae3', width: '100%', height: '100%' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', paddingBottom: 30 }}>
            <Image source={require('../../src/images/Purple7.jpg')} style={{ marginTop: 40, width: 120, height: 120, borderRadius: 160, marginRight: 10 }} />
            <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 18, color: '#528F56' }}>Batac, Ilocos White</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', }}>July 08, 2023</Text>
          </View>

          <View style={{
            padding: 20, backgroundColor: 'white', borderTopRightRadius: 25,
            borderTopLeftRadius: 25, paddingTop: 30
          }}>
            <View style={{ paddingRight: 30, paddingLeft: 30 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Add image</Text>
                <Icon name={'information-outline'} color={' #276653'} size={25} style={{ width: 25, }} />
              </View>
              <Text style={{ paddingRight: 25, fontSize: 14, paddingTop: 5 }}>Upload clear photo of the leaf and bulb that look sick. </Text>
              <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                {
                  image1 == null ? <ImageDefault /> : <ImageChange1 />
                }
              </View>

              <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
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
      {/* Modal */}

    </SafeAreaView>
  )
}

function PlantCamResult({ route, navigation }) {
  const { logout, user } = useContext(AuthContext)
  return (
    <View>
      <Text>PlantCamResult</Text>
    </View>
  )
}

function Notes({ route, navigation }) {
  const { logout, user } = useContext(AuthContext)

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
        <View style={{ flexDirection: 'row' }}>
          <Text>Date: </Text>
          <Text>July 17, 2023</Text>
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
  useEffect(() => {
    setTimeout(Tab1Con, 1000)
    Tab2Con()
    Tab3Con()
  }, []);


  const [activeTab, setActiveTab] = useState('tab1');
  const { logout, user } = useContext(AuthContext)
  const { title } = route.params;
  const [taskUpcom, setTaskUpc] = useState([])
  const [taskCom, setTaskCom] = useState([])
  const [sortedUpcom, setsortedUpcom] = useState([])
  const [loadings, setLoadings] = useState(false);
  const [taskToday, setTaskToday] = useState([])
  const [sortedToday, setsortedToday] = useState([])

  const renderTabContent = () => {
    if (activeTab === 'tab1') {
      return <Tab1Content />;
    } else if (activeTab === 'tab2') {
      return <Tab2Content />;
    } else if (activeTab === 'tab3') {
      return <Tab3Content />;
    }
  };

  const Tab1Con = () => {
    setLoadings(true)
    const red = database().ref('null/plants/' + user.uid)
    const blue = red.toString().split('/')[3];

    const currentDate = new Date();
    const newDate = moment().toDate();

    if (user.uid == blue) {
      const task = database().ref('users/' + user.uid + '/plants/' + user.uid + title + '/taskUpcoming')
      task.on('value', (snapshot) => {
        const firebaseData = snapshot.val();
        const dataArray = Object.values(firebaseData);
        const sorted = dataArray.sort((a, b) => {
          const dateA = new Date(`${a.dateAction}`).valueOf();
          const dateB = new Date(`${b.dateAction}`).valueOf();
          if (dateA > dateB) {
            return 1; // return -1 here for DESC order
          }
          return -1 // return 1 here for DESC Order

        });
        sorted.forEach((index) => {

          const dA = moment(index.dateAction).format('ll');
          const nDate = new Date();
          const dnewDate = moment(nDate).format('ll');
          //console.log('dAdAdAd: ',dA)
          //console.log('current: ',dAnewDate )

          const date1 = dA;
          const date2 = dnewDate;
          console.log('Date1: ', date1)
          console.log('current: ', date2)
          if (date1 == date2) {
            sortedToday.push({ 'action': index.action, 'dateAction': index.dateAction, 'title': index.title })
            console.log('Push Date: ', dA)
          } else {
            console.log('Cannot Push Date: ', dA)
          }
        })
        setTaskToday(sortedToday)

      });

    }
    setLoadings(false)
  }

  const Tab2Con = () => {
    const red = database().ref('null/plants/' + user.uid)
    const blue = red.toString().split('/')[3];

    const currentDate = new Date();
    const newDate = moment().toDate();
    const DnewDate = moment(newDate).add(1, 'days');

    if (user.uid == blue) {
      const taskUp = database().ref('users/' + user.uid + '/plants/' + user.uid + title + '/taskUpcoming')
      taskUp.on('value', (snapshot) => {
        const firebaseData = snapshot.val();
        const dataArray = Object.values(firebaseData);
        const sorted = dataArray.sort((a, b) => {
          const dateA = new Date(`${a.dateAction}`).valueOf();
          const dateB = new Date(`${b.dateAction}`).valueOf();
          if (dateA > dateB) {
            return 1; // return -1 here for DESC order
          }
          return -1 // return 1 here for DESC Order

        });
        sorted.forEach((index) => {

          const dA = index.dateAction;
          const dAnewDate = DnewDate;

          //console.log('dAdAdAd: ',dA)
          //console.log('current: ',dAnewDate )

          const date1 = new Date(dA);
          const date2 = new Date(dAnewDate);

          if (date1 > date2) {
            sortedUpcom.push({ 'action': index.action, 'dateAction': index.dateAction, 'title': index.title })
            console.table('Push Date: ', dA)
          } else {
            console.table('Cannot Push Date: ', dA)
          }
        })
        setTaskUpc(sortedUpcom)

      });

    }
  }

  const Tab3Con = () => {
    const red = database().ref('null/plants/' + user.uid)
    const blue = red.toString().split('/')[3];
    if (user.uid == blue) {
      const taskCom = database().ref('users/' + user.uid + '/plants/' + user.uid + title + '/taskCompleted')
      taskCom.on('value', (snapshot) => {
        const firebaseData = snapshot.val();
        const dataArray = Object.values(firebaseData);
        const sorted = dataArray.sort((a, b) => {
          const dateA = new Date(`${a.dateAction}`).valueOf();
          const dateB = new Date(`${b.dateAction}`).valueOf();
          if (dateA > dateB) {
            return 1; // return -1 here for DESC order
          }
          return -1 // return 1 here for DESC Order
        });
        setTaskCom(sorted);
      });
    }
  }

  const Tab1Content = () => {

    const handlesubmit = (upcom) => {
      console.log('Pressed: ')
    }

    const handleReloadAll = () => {
      setLoading(true);
      Tab1Con()
    };

    return (
      <View dtyle={{ margin: 20 }} >
        {
          loadings ?
            (<Text>Loading...</Text>) :
            (<View>
              {
                taskToday.map((upcom, index2) => {
                  return (
                    <View key={index2} style={{ margin: 10, marginTop: 4, marginBottom: 4 }}>
                      {
                        upcom.title == 'Water' ? (<View style={[styles.cardDashboardRecentProp, { flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, width: '100%', padding: 20, borderLeftColor: '#389cdf', borderLeftWidth: 10, marginBottom: 10, alignItems: 'center' }]}>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end', marginTop: -20 }}>
                            <View style={{ padding: 5 }}>
                              <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 13, fontStyle: 'italic' }}>{moment(upcom.dateAction).format('ll')}</Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image source={require('../../src/icons/water.png')} style={{ width: 45, height: 40, marginRight: 10 }} />
                              <View>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>{upcom.title}</Text>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 14 }}>{upcom.action}</Text>
                              </View>
                            </View>
                            <View>
                              <TouchableOpacity disabled={true}
                                onPress={
                                  handlesubmit(upcom)
                                  // alert('clicked title: ',upcom.title, ' dateAction', upcom.dateAction, ' Action: ', upcom.Action, ' Status: ', upcom.status )}
                                }>
                                <View style={{ borderRadius: 15, borderWidth: 1.5, borderColor: '#4a8f3cff', paddingLeft: 10, paddingRight: 10, padding: 5, marginTop: 8 }}>
                                  <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Complete</Text>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>) : (null)
                      }

                      {
                        upcom.title == 'Fertilizer' ? (<View style={[styles.cardDashboardRecentProp, { flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, width: '100%', padding: 20, borderLeftColor: '#3fda54', borderLeftWidth: 10, marginBottom: 10, alignItems: 'center' }]}>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end', marginTop: -20 }}>
                            <View style={{ padding: 5 }}>
                              <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 13, fontStyle: 'italic' }}>{moment(upcom.dateAction).format('ll')}</Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image source={require('../../src/icons/Fertilizer.png')} style={{ width: 45, height: 40, marginRight: 10 }} />
                              <View>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>{upcom.title}</Text>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 14 }}>{upcom.action}</Text>
                              </View>
                            </View>
                            <View>
                              <View>
                                <TouchableOpacity disabled={true}
                                  onPress={() => {
                                    handlesubmit(upcom)
                                    alert('clicked title: ', upcom.title, ' dateAction', upcom.dateAction, ' Action: ', upcom.Action, ' Status: ', upcom.status)
                                  }
                                  }>
                                  <View style={{ borderRadius: 15, borderWidth: 1.5, borderColor: '#4a8f3cff', paddingLeft: 10, paddingRight: 10, padding: 5, marginTop: 8 }}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Complete</Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>) : (null)
                      }
                      {
                        upcom.title == 'Pest' ? (<View style={[styles.cardDashboardRecentProp, { flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, width: '100%', padding: 20, borderLeftColor: '#e45138', borderLeftWidth: 10, marginBottom: 10, alignItems: 'center' }]}>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end', marginTop: -20 }}>
                            <View style={{ padding: 5 }}>
                              <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 13, fontStyle: 'italic' }}>{moment(upcom.dateAction).format('ll')}</Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                              <View>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>{upcom.title}</Text>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 14 }}>{upcom.action}</Text>
                              </View>
                            </View>
                            <View>
                              <View>
                                <TouchableOpacity disabled={true}
                                  onPress={() => {
                                    handlesubmit(upcom)
                                    alert('clicked title: ', upcom.title, ' dateAction', upcom.dateAction, ' Action: ', upcom.Action, ' Status: ', upcom.status)
                                  }}>
                                  <View style={{ borderRadius: 15, borderWidth: 1.5, borderColor: '#4a8f3cff', paddingLeft: 10, paddingRight: 10, padding: 5, marginTop: 8 }}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Complete</Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>) : (null)
                      }

                      {
                        upcom.title == 'Disease' ? (<View style={[styles.cardDashboardRecentProp, { flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, width: '100%', padding: 20, borderLeftColor: '#ebde31', borderLeftWidth: 10, marginBottom: 10, alignItems: 'center' }]}>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end', marginTop: -20 }}>
                            <View style={{ padding: 5 }}>
                              <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 13, fontStyle: 'italic' }}>{moment(upcom.dateAction).format('ll')}</Text>
                            </View>
                          </View>
                          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                              <View>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>{upcom.title}</Text>
                                <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 14 }}>{upcom.action}</Text>
                              </View>
                            </View>
                            <View>
                              <View>
                                <TouchableOpacity disabled={true}
                                  onPress={() => {
                                    handlesubmit(upcom)
                                    alert('clicked title: ', upcom.title, ' dateAction', upcom.dateAction, ' Action: ', upcom.Action, ' Status: ', upcom.status)
                                  }
                                  }>
                                  <View style={{ borderRadius: 15, borderWidth: 1.5, borderColor: '#4a8f3cff', paddingLeft: 10, paddingRight: 10, padding: 5, marginTop: 8 }}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Complete</Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>) : (null)
                      }
                    </View>
                  )
                })
              }

              {
                taskToday.length == 0 ?
                  (
                    <View style={{ marginTop: 20, marginBottom: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#649183' }}>No tasks for today!</Text>
                    </View>
                  ) : (null)
              }
            </View>)
        }

      </View>
    )
  }

  const Tab2Content = () => {
    return (

      <View dtyle={{ margin: 20 }} >

        {
          taskUpcom.map((upcom, index2) => {
            return (
              <View key={index2} style={{ margin: 10, marginTop: 4, marginBottom: 4 }}>


                {
                  upcom.title == 'Water' ? (<View style={[styles.cardDashboardRecentProp, { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, width: '100%', padding: 20, borderLeftColor: '#3f9cda', borderLeftWidth: 10, marginBottom: 10 }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={require('../../src/icons/water.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                      <View>
                        <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>{upcom.title}</Text>
                        <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 14 }}>{upcom.action}</Text>
                      </View>
                    </View>
                    <View style={{ marginTop: -10, marginRight: -10 }}>

                      <View style={{ padding: 5 }}>
                        <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 13, fontStyle: 'italic' }}>{moment(upcom.dateAction).format('ll')}</Text>
                      </View>

                    </View>
                  </View>) : (null)
                }


                {
                  upcom.title == 'Fertilizer' ? (<View style={[styles.cardDashboardRecentProp, { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, width: '100%', padding: 20, borderLeftColor: '#3fda54', borderLeftWidth: 10, marginBottom: 10 }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={require('../../src/icons/Fertilizer.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                      <View>
                        <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>{upcom.title}</Text>
                        <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 14 }}>{upcom.action}</Text>
                      </View>
                    </View>
                    <View style={{ marginTop: -10, marginRight: -10 }}>

                      <View style={{ padding: 5 }}>
                        <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 13, fontStyle: 'italic' }}>{moment(upcom.dateAction).format('ll')}</Text>
                      </View>

                    </View>
                  </View>) : (null)
                }


                {
                  upcom.title == 'Pest' ? (<View style={[styles.cardDashboardRecentProp, { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, width: '100%', padding: 20, borderLeftColor: '#da5e3f', borderLeftWidth: 10, marginBottom: 10 }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={require('../../src/icons/Pest.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                      <View>
                        <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>{upcom.title}</Text>
                        <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 14 }}>{upcom.action}</Text>
                      </View>
                    </View>
                    <View style={{ marginTop: -10, marginRight: -10 }}>
                      <View style={{ padding: 5 }}>
                        <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 13, fontStyle: 'italic' }}>{moment(upcom.dateAction).format('ll')}</Text>
                      </View>
                    </View>
                  </View>) : (null)
                }


                {
                  upcom.title == 'Disease' ? (<View style={[styles.cardDashboardRecentProp, { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, width: '100%', padding: 20, borderLeftColor: '#dabe3f', borderLeftWidth: 10, marginBottom: 10 }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                      <View>
                        <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>{upcom.title}</Text>
                        <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 14 }}>{upcom.action}</Text>
                      </View>
                    </View>
                    <View style={{ marginTop: -10, marginRight: -10 }}>

                      <View style={{ padding: 5 }}>
                        <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 13, fontStyle: 'italic' }}>{moment(upcom.dateAction).format('ll')}</Text>
                      </View>

                    </View>
                  </View>) : (null)
                }
              </View>
            )
          })
        }

        {
          taskUpcom.length == 0 ? (
            <View style={{ marginTop: 20, marginBottom: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#649183' }}>No Upcoming activities</Text>
            </View>
          ) : (null)
        }
        <View style={{ marginBottom: 30 }} />
      </View>

    )
  }

  const Tab3Content = () => {
    return (

      <View>
        {
          taskCom.map((com, index2) => {
            return (
              <View key={index2}>
                {
                  com.title == 'Water' ?
                    (<View style={{ margin: 20, marginBottom: 0 }}>
                      <View style={[styles.cardCompleteProp, { backgroundColor: 'white', padding: 17, borderRadius: 10, width: undefined, borderRightWidth: 30, borderRightColor: '#3f9cda' }]}>
                        <View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#649183' }}>{moment(com.dateAction).format('LL')}</Text>
                          </View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginLeft: 22, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', color: '#276653' }}>{com.action}</Text>
                          </View>
                        </View>
                      </View>
                    </View>) : (null)
                }

                {
                  com.title == 'Fertilizer' ?
                    (<View style={{ margin: 20, marginBottom: 0 }}>
                      <View style={[styles.cardCompleteProp, { backgroundColor: 'white', padding: 17, borderRadius: 10, width: undefined, borderRightWidth: 30, borderRightColor: '#3fda54' }]}>
                        <View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#649183' }}>{moment(com.dateAction).format('LL')}</Text>
                          </View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginLeft: 22, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', color: '#276653' }}>{com.action}</Text>
                          </View>
                        </View>
                      </View>
                    </View>) : (null)
                }

                {
                  com.title == 'Pest' ?
                    (<View style={{ margin: 20, marginBottom: 0 }}>
                      <View style={[styles.cardCompleteProp, { backgroundColor: 'white', padding: 17, borderRadius: 10, width: undefined, borderRightWidth: 30, borderRightColor: '#da5e3f' }]}>
                        <View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#649183' }}>{moment(com.dateAction).format('LL')}</Text>
                          </View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginLeft: 22, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', color: '#276653' }}>{com.action}</Text>
                          </View>
                        </View>
                      </View>
                    </View>) : (null)
                }

                {
                  com.title == 'Disease' ?
                    (<View style={{ margin: 20, marginBottom: 0 }}>
                      <View style={[styles.cardCompleteProp, { backgroundColor: 'white', padding: 17, borderRadius: 10, width: undefined, borderRightWidth: 30, borderRightColor: '#dabe3f' }]}>
                        <View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#649183' }}>{moment(com.dateAction).format('LL')}</Text>
                          </View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginLeft: 22, fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', color: '#276653' }}>{com.action}</Text>
                          </View>
                        </View>
                      </View>
                    </View>) : (null)
                }
                {
                  com.length == 0 ? (
                    <View style={{ marginTop: 20, marginBottom: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#649183' }}>You don't have any completed activity yet</Text>
                    </View>
                  ) : (null)
                }


              </View>
            )
          })
        }


        <View style={{ marginBottom: 30 }} />
      </View>
    )
  }

  //  Main Content of Task()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 20, backgroundColor: 'white', height: '100%' }}>
        <View >
          <ScrollView horizontal={true} style={{ paddingBottom: 10 }}>
            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: undefined, height: undefined }}>
                  <Image source={require('../../src/icons/water.png')} resizeMode={'cover'} style={{ width: 60, height: 55, marginRight: 10, borderWidth: 1 }} />
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>Water</Text>
                    <Text style={{ fontWeight: 'bold', color: '#649183', fontSize: 14, marginTop: -5 }}>Every 3 days</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: undefined, height: undefined }}>
                  <Image source={require('../../src/icons/Foliar.png')} resizeMode={'cover'} style={{ width: 65, height: 55, marginRight: 10, borderWidth: 1 }} />
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>Fertilizer</Text>
                    <Text style={{ fontWeight: 'bold', color: '#649183', fontSize: 14, marginTop: -5 }}>Every 14 days</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: undefined, height: undefined }}>
                  <Image source={require('../../src/icons/Pest.png')} resizeMode={'cover'} style={{ width: 65, height: 55, marginRight: 10, borderWidth: 1 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Insecticide</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View >
          <View >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'gray', marginBottom: 5 }}>
              <TouchableOpacity onPress={() => setActiveTab('tab1')} style={[styles.tabItem, activeTab === 'tab1' && styles.activeTab]}>
                <View style={{ padding: 20 }}>
                  <Text style={[activeTab === 'tab1' && styles.activeText, { fontWeight: 'bold', fontSize: 16 }]}>Today</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab('tab2')} style={[styles.tabItem, activeTab === 'tab2' && styles.activeTab]}>
                <View style={{ padding: 20 }}>
                  <Text style={[activeTab === 'tab2' && styles.activeText, { fontWeight: 'bold', fontSize: 16 }]}>Upcoming</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setActiveTab('tab3')} style={[styles.tabItem, activeTab === 'tab3' && styles.activeTab]}>
                <View style={{ padding: 20 }}>
                  <Text style={[activeTab === 'tab3' && styles.activeText, { fontWeight: 'bold', fontSize: 16 }]}>Completed</Text>
                </View>
              </TouchableOpacity>

            </View>
            <View style={{ height: Dimensions.get('window').height / 1.6 }}>
              <ScrollView style={{ paddingTop: 7 }}>
                {renderTabContent()}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}



const PlantStack = createNativeStackNavigator();

export default function GarlicPlantScreen({ navigation }) {
  return (
    <PlantStack.Navigator>
      <PlantStack.Screen name="PlantDash" component={PlantDash} />
      <PlantStack.Screen name="PlantNew" component={PlantNew}
        options={
          { headerShown: false }
        } />
          <PlantStack.Screen name="PlantIdentify" component={PlantIdentify}
        options={
          { headerShown: false }
        } />
      <PlantStack.Screen name="PlantID" component={PlantID} />
      {/* <PlantStack.Screen name="Completed" component={PlantCompleted} /> */}
      {/* <PlantStack.Screen name="PlantCam" component={PlantCam} />
      <PlantStack.Screen name="PlantCamResult" component={PlantCamResult} />
      <PlantStack.Screen name="Note" component={Note} /> */}
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
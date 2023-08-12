// React&React Native
import React, { useEffect, useState, useFonts, useContext, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FloatingAction } from "react-native-floating-action";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Storage from '@react-native-firebase/storage';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

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

// other Packages
//import axios from 'axios';
import _, { templateSettings } from 'lodash';
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
const dbRef = database().ref('images');


function PlantDash({ route, navigation }) {
  const { logout, user } = useContext(AuthContext)
  const [plants, setPlants] = useState('');
  const [plantData, setPlantData] = useState([])

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
    const plantData = database().ref('/plants/'+ user.uid);
    console.log(plantData)
  }, [navigation])

  useEffect(() => {
    displayList();
    
  }, []);

  const displayList = async () => {
    const dbRef = database().ref('/users/'+ user.uid + '/plants' );
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
          area:item.area,
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
        </View>
      </ScrollView>

      {/* Add button            */}
    <View style={{zIndex:2}}>
    <TouchableOpacity 
      onPress={() => { 
        navigation.navigate('PlantNew')}}>
        <View style={styles.addBtn}>
          <Icon name={"plus"} color={'white'} size={23} style={{ fontWeight: 'bold' }} />
        </View>
      </TouchableOpacity>
    </View>
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
  const [upcoming, setUpcoming] = useState([])
  const [completed, setCompleted] = useState([])
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


      const currentDate = new Date();
      // Spray foliar
      for (let i = 0; i <= 3; i++) {
        const newDate = new Date(currentDate.getTime() + i * 14 * 24 * 60 * 60 * 1000);
        const blue = moment(newDate).format()
        upcoming.push({
          title: 'Fertilizer',
          action: 'Spray foliar fertilizer',
          dateAction: blue,
        });
      }

      // irrigate plant
      for (let i = 0; i <= 33; i++) {
        const newDate = new Date(currentDate.getTime() + i * 3 * 24 * 60 * 60 * 1000);
        const blue = moment(newDate).format()
        upcoming.push({
          title:'Water',
          action: 'Water plants',
          dateAction: blue,
        });
      }


      // storagePath and imagePath
      const task = Storage().ref('images/'+ filename).putFile(uploadUri)

      // const task= Storage().ref('images/' + user.uid+'/'+filename).putFile(uploadUri)
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
        const downloadURL = await Storage().ref('images/'+filename).getDownloadURL();

        // store data in realtime database
        //database().ref('/plants/' + user.uid + plantTitle)
        database().ref('/users/' + user.uid+'/plants/' + user.uid + plantTitle )
          .set({
            image: downloadURL,
            title: plantTitle,
            variety: plantVariety,
            area: plantArea,
            date: plantDate.toISOString(),
            taskUpcoming: upcoming,
            taskCompleted: null,
            plantAddress: plantAddress,
            plantStatus:'false'
          })
          .then(async () => {
            alert('Plant data stored successfully!')
            navigation.goBack()
          });

          database().ref('/images/plantimages/' + plantTitle )
          .set({
            image: modelDownloadURL,
            userid: user.uid,
            identified:'',
            severity:'',
            status:'true',
          })
          .then(async () => {
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

function PlantID({ route, navigation }) {
  const [mrhr3humidity, setMRHr3humidity] = useState([])
  const [afhr3humidity, setAFHr3humidity] = useState([])

  const [foliar, setFoliar] = useState([])  
  const [irrigate, setIrrigate] = useState([])

  const [humis, setHumis] = useState('');
  const [humis2, setHumis2] = useState('');
  const { title, image, area  , variety, date, plantAddress } = route.params;
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

  const { data,humi, 
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
    //wfActivities()
  }, []);

  const plantDisplayList = async () => {
    const dbRef = database().ref('/database/'+ user.uid + '/plants');
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
    const dbRef = database().ref('/users/'+ user.uid + '/plants/modelImages');
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


  const apiKey = 'eb40ebc2fe0c4d02b2735258230304';
  const weatherPlant  =  async () => {    
    const response =  await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q='+ plantAddress +'&days=10&aqi=yes&alerts=yes')
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

  const showEmptyListView = () => {
    return (
      <View style={{ marginTop: 200, flexDirection: 'row', justifyContent: 'center', alignItem: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', alignItem: 'center', justifyContent: 'center', }}><Icon name={"plus-circle"} color={'#276653'} size={30} style={{ width: 20 }} />Add a plant to get started!  </Text>
      </View>
    )
  }

  // =================================================
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

  const Harea = () => {
    return(
      <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#276653', lineHeight: 17, paddingLeft: 7 }}>{area} hectare</Text>
    )
  }

  const Hsarea = () => {
    return(
      <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#276653', lineHeight: 17, paddingLeft: 7 }}>{area} hectares</Text>
    )
  }

  const checkDatas = () => {
 const datas ={
  "location": {
      "name": "Batac",
      "region": "Ilocos Norte",
      "country": "Philippines",
      "lat": 18.05,
      "lon": 120.57,
      "tz_id": "Asia/Manila",
      "localtime_epoch": 1689737505,
      "localtime": "2023-07-19 11:31"
  },
  "current": {
      "last_updated_epoch": 1689737400,
      "last_updated": "2023-07-19 11:30",
      "temp_c": 31.0,
      "temp_f": 87.8,
      "is_day": 1,
      "condition": {
          "text": "Partly cloudy",
          "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
          "code": 1003
      },
      "wind_mph": 5.6,
      "wind_kph": 9.0,
      "wind_degree": 310,
      "wind_dir": "NW",
      "pressure_mb": 1009.0,
      "pressure_in": 29.8,
      "precip_mm": 0.0,
      "precip_in": 0.0,
      "humidity": 66,
      "cloud": 25,
      "feelslike_c": 38.3,
      "feelslike_f": 101.0,
      "vis_km": 10.0,
      "vis_miles": 6.0,
      "uv": 8.0,
      "gust_mph": 6.7,
      "gust_kph": 10.8,
      "air_quality": {
          "co": 330.5,
          "no2": 0.5,
          "o3": 48.599998474121094,
          "so2": 0.30000001192092896,
          "pm2_5": 4.199999809265137,
          "pm10": 4.400000095367432,
          "us-epa-index": 1,
          "gb-defra-index": 1
      }
  },
  "forecast": {
      "forecastday": [
          {
              "date": "2023-07-19",
              "date_epoch": 1689724800,
              "day": {
                  "maxtemp_c": 32.1,
                  "maxtemp_f": 89.8,
                  "mintemp_c": 26.5,
                  "mintemp_f": 79.7,
                  "avgtemp_c": 28.2,
                  "avgtemp_f": 82.8,
                  "maxwind_mph": 7.6,
                  "maxwind_kph": 12.2,
                  "totalprecip_mm": 7.9,
                  "totalprecip_in": 0.31,
                  "totalsnow_cm": 0.0,
                  "avgvis_km": 9.9,
                  "avgvis_miles": 6.0,
                  "avghumidity": 79.0,
                  "daily_will_it_rain": 1,
                  "daily_chance_of_rain": 92,
                  "daily_will_it_snow": 0,
                  "daily_chance_of_snow": 0,
                  "condition": {
                      "text": "Moderate rain",
                      "icon": "//cdn.weatherapi.com/weather/64x64/day/302.png",
                      "code": 1189
                  },
                  "uv": 6.0,
                  "air_quality": {
                      "co": 345.80799560546876,
                      "no2": 0.8000000107288361,
                      "o3": 60.24800018310547,
                      "so2": 0.33200000584125516,
                      "pm2_5": 7.5239999389648435,
                      "pm10": 7.82399995803833,
                      "us-epa-index": 1,
                      "gb-defra-index": 1
                  }
              },
              "astro": {
                  "sunrise": "05:32 AM",
                  "sunset": "06:37 PM",
                  "moonrise": "06:32 AM",
                  "moonset": "07:56 PM",
                  "moon_phase": "Waxing Crescent",
                  "moon_illumination": "2",
                  "is_moon_up": 1,
                  "is_sun_up": 1
              },
              "hour": [
                  {
                      "time_epoch": 1689696000,
                      "time": "2023-07-19 00:00",
                      "temp_c": 27.1,
                      "temp_f": 80.8,
                      "is_day": 0,
                      "condition": {
                          "text": "Partly cloudy",
                          "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png",
                          "code": 1003
                      },
                      "wind_mph": 3.6,
                      "wind_kph": 5.8,
                      "wind_degree": 119,
                      "wind_dir": "ESE",
                      "pressure_mb": 1010.0,
                      "pressure_in": 29.82,
                      "precip_mm": 0.0,
                      "precip_in": 0.0,
                      "humidity": 82,
                      "cloud": 51,
                      "feelslike_c": 30.8,
                      "feelslike_f": 87.4,
                      "windchill_c": 27.1,
                      "windchill_f": 80.8,
                      "heatindex_c": 30.8,
                      "heatindex_f": 87.4,
                      "dewpoint_c": 23.8,
                      "dewpoint_f": 74.8,
                      "will_it_rain": 0,
                      "chance_of_rain": 0,
                      "will_it_snow": 0,
                      "chance_of_snow": 0,
                      "vis_km": 10.0,
                      "vis_miles": 6.0,
                      "gust_mph": 5.4,
                      "gust_kph": 8.6,
                      "uv": 1.0,
                      "air_quality": {
                          "co": 310.3999938964844,
                          "no2": 1.2999999523162842,
                          "o3": 40.400001525878906,
                          "so2": 0.30000001192092896,
                          "pm2_5": 2.700000047683716,
                          "pm10": 2.799999952316284,
                          "us-epa-index": 1,
                          "gb-defra-index": 1
                      }
                  },
                  {
                      "time_epoch": 1689699600,
                      "time": "2023-07-19 01:00",
                      "temp_c": 26.9,
                      "temp_f": 80.4,
                      "is_day": 0,
                      "condition": {
                          "text": "Patchy rain possible",
                          "icon": "//cdn.weatherapi.com/weather/64x64/night/176.png",
                          "code": 1063
                      },
                      "wind_mph": 3.6,
                      "wind_kph": 5.8,
                      "wind_degree": 101,
                      "wind_dir": "ESE",
                      "pressure_mb": 1009.0,
                      "pressure_in": 29.8,
                      "precip_mm": 0.1,
                      "precip_in": 0.0,
                      "humidity": 83,
                      "cloud": 72,
                      "feelslike_c": 30.5,
                      "feelslike_f": 86.9,
                      "windchill_c": 26.9,
                      "windchill_f": 80.4,
                      "heatindex_c": 30.5,
                      "heatindex_f": 86.9,
                      "dewpoint_c": 23.8,
                      "dewpoint_f": 74.8,
                      "will_it_rain": 1,
                      "chance_of_rain": 86,
                      "will_it_snow": 0,
                      "chance_of_snow": 0,
                      "vis_km": 10.0,
                      "vis_miles": 6.0,
                      "gust_mph": 5.1,
                      "gust_kph": 8.3,
                      "uv": 1.0,
                      "air_quality": {
                          "co": 310.3999938964844,
                          "no2": 1.399999976158142,
                          "o3": 39.0,
                          "so2": 0.30000001192092896,
                          "pm2_5": 2.5,
                          "pm10": 2.5999999046325684,
                          "us-epa-index": 1,
                          "gb-defra-index": 1
                      }
                  },
                  // {
                  //     "time_epoch": 1689703200,
                  //     "time": "2023-07-19 02:00",
                  //     "temp_c": 26.7,
                  //     "temp_f": 80.1,
                  //     "is_day": 0,
                  //     "condition": {
                  //         "text": "Partly cloudy",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png",
                  //         "code": 1003
                  //     },
                  //     "wind_mph": 3.4,
                  //     "wind_kph": 5.4,
                  //     "wind_degree": 112,
                  //     "wind_dir": "ESE",
                  //     "pressure_mb": 1009.0,
                  //     "pressure_in": 29.78,
                  //     "precip_mm": 0.0,
                  //     "precip_in": 0.0,
                  //     "humidity": 84,
                  //     "cloud": 33,
                  //     "feelslike_c": 30.1,
                  //     "feelslike_f": 86.2,
                  //     "windchill_c": 26.7,
                  //     "windchill_f": 80.1,
                  //     "heatindex_c": 30.1,
                  //     "heatindex_f": 86.2,
                  //     "dewpoint_c": 23.7,
                  //     "dewpoint_f": 74.7,
                  //     "will_it_rain": 0,
                  //     "chance_of_rain": 0,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 10.0,
                  //     "vis_miles": 6.0,
                  //     "gust_mph": 4.9,
                  //     "gust_kph": 7.9,
                  //     "uv": 1.0,
                  //     "air_quality": {
                  //         "co": 333.79998779296875,
                  //         "no2": 2.0999999046325684,
                  //         "o3": 36.5,
                  //         "so2": 0.4000000059604645,
                  //         "pm2_5": 3.200000047683716,
                  //         "pm10": 3.299999952316284,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // },
                  // {
                  //     "time_epoch": 1689706800,
                  //     "time": "2023-07-19 03:00",
                  //     "temp_c": 26.5,
                  //     "temp_f": 79.7,
                  //     "is_day": 0,
                  //     "condition": {
                  //         "text": "Partly cloudy",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png",
                  //         "code": 1003
                  //     },
                  //     "wind_mph": 3.1,
                  //     "wind_kph": 5.0,
                  //     "wind_degree": 107,
                  //     "wind_dir": "ESE",
                  //     "pressure_mb": 1008.0,
                  //     "pressure_in": 29.77,
                  //     "precip_mm": 0.0,
                  //     "precip_in": 0.0,
                  //     "humidity": 83,
                  //     "cloud": 28,
                  //     "feelslike_c": 29.7,
                  //     "feelslike_f": 85.5,
                  //     "windchill_c": 26.5,
                  //     "windchill_f": 79.7,
                  //     "heatindex_c": 29.7,
                  //     "heatindex_f": 85.5,
                  //     "dewpoint_c": 23.4,
                  //     "dewpoint_f": 74.1,
                  //     "will_it_rain": 0,
                  //     "chance_of_rain": 0,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 10.0,
                  //     "vis_miles": 6.0,
                  //     "gust_mph": 4.7,
                  //     "gust_kph": 7.6,
                  //     "uv": 1.0,
                  //     "air_quality": {
                  //         "co": 343.79998779296875,
                  //         "no2": 2.299999952316284,
                  //         "o3": 35.099998474121094,
                  //         "so2": 0.4000000059604645,
                  //         "pm2_5": 3.5,
                  //         "pm10": 3.700000047683716,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // },
                  // {
                  //     "time_epoch": 1689710400,
                  //     "time": "2023-07-19 04:00",
                  //     "temp_c": 26.6,
                  //     "temp_f": 79.9,
                  //     "is_day": 0,
                  //     "condition": {
                  //         "text": "Partly cloudy",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png",
                  //         "code": 1003
                  //     },
                  //     "wind_mph": 2.2,
                  //     "wind_kph": 3.6,
                  //     "wind_degree": 104,
                  //     "wind_dir": "ESE",
                  //     "pressure_mb": 1008.0,
                  //     "pressure_in": 29.77,
                  //     "precip_mm": 0.0,
                  //     "precip_in": 0.0,
                  //     "humidity": 83,
                  //     "cloud": 28,
                  //     "feelslike_c": 29.8,
                  //     "feelslike_f": 85.6,
                  //     "windchill_c": 26.6,
                  //     "windchill_f": 79.9,
                  //     "heatindex_c": 29.8,
                  //     "heatindex_f": 85.6,
                  //     "dewpoint_c": 23.4,
                  //     "dewpoint_f": 74.1,
                  //     "will_it_rain": 0,
                  //     "chance_of_rain": 0,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 10.0,
                  //     "vis_miles": 6.0,
                  //     "gust_mph": 3.4,
                  //     "gust_kph": 5.4,
                  //     "uv": 1.0,
                  //     "air_quality": {
                  //         "co": 350.5,
                  //         "no2": 2.200000047683716,
                  //         "o3": 34.0,
                  //         "so2": 0.30000001192092896,
                  //         "pm2_5": 3.700000047683716,
                  //         "pm10": 3.9000000953674316,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // },
                  // {
                  //     "time_epoch": 1689714000,
                  //     "time": "2023-07-19 05:00",
                  //     "temp_c": 26.5,
                  //     "temp_f": 79.7,
                  //     "is_day": 0,
                  //     "condition": {
                  //         "text": "Partly cloudy",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png",
                  //         "code": 1003
                  //     },
                  //     "wind_mph": 3.4,
                  //     "wind_kph": 5.4,
                  //     "wind_degree": 100,
                  //     "wind_dir": "E",
                  //     "pressure_mb": 1008.0,
                  //     "pressure_in": 29.77,
                  //     "precip_mm": 0.0,
                  //     "precip_in": 0.0,
                  //     "humidity": 82,
                  //     "cloud": 30,
                  //     "feelslike_c": 29.6,
                  //     "feelslike_f": 85.3,
                  //     "windchill_c": 26.5,
                  //     "windchill_f": 79.7,
                  //     "heatindex_c": 29.6,
                  //     "heatindex_f": 85.3,
                  //     "dewpoint_c": 23.2,
                  //     "dewpoint_f": 73.8,
                  //     "will_it_rain": 0,
                  //     "chance_of_rain": 0,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 10.0,
                  //     "vis_miles": 6.0,
                  //     "gust_mph": 5.1,
                  //     "gust_kph": 8.3,
                  //     "uv": 1.0,
                  //     "air_quality": {
                  //         "co": 353.79998779296875,
                  //         "no2": 2.0999999046325684,
                  //         "o3": 33.29999923706055,
                  //         "so2": 0.30000001192092896,
                  //         "pm2_5": 3.9000000953674316,
                  //         "pm10": 4.099999904632568,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // },
                  // {
                  //     "time_epoch": 1689717600,
                  //     "time": "2023-07-19 06:00",
                  //     "temp_c": 26.6,
                  //     "temp_f": 79.9,
                  //     "is_day": 1,
                  //     "condition": {
                  //         "text": "Partly cloudy",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
                  //         "code": 1003
                  //     },
                  //     "wind_mph": 3.8,
                  //     "wind_kph": 6.1,
                  //     "wind_degree": 92,
                  //     "wind_dir": "E",
                  //     "pressure_mb": 1008.0,
                  //     "pressure_in": 29.78,
                  //     "precip_mm": 0.0,
                  //     "precip_in": 0.0,
                  //     "humidity": 81,
                  //     "cloud": 31,
                  //     "feelslike_c": 29.7,
                  //     "feelslike_f": 85.5,
                  //     "windchill_c": 26.6,
                  //     "windchill_f": 79.9,
                  //     "heatindex_c": 29.7,
                  //     "heatindex_f": 85.5,
                  //     "dewpoint_c": 23.1,
                  //     "dewpoint_f": 73.6,
                  //     "will_it_rain": 0,
                  //     "chance_of_rain": 0,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 10.0,
                  //     "vis_miles": 6.0,
                  //     "gust_mph": 5.8,
                  //     "gust_kph": 9.4,
                  //     "uv": 7.0,
                  //     "air_quality": {
                  //         "co": 357.20001220703125,
                  //         "no2": 2.0,
                  //         "o3": 32.20000076293945,
                  //         "so2": 0.30000001192092896,
                  //         "pm2_5": 4.099999904632568,
                  //         "pm10": 4.300000190734863,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // },
                  // {
                  //     "time_epoch": 1689721200,
                  //     "time": "2023-07-19 07:00",
                  //     "temp_c": 27.1,
                  //     "temp_f": 80.8,
                  //     "is_day": 1,
                  //     "condition": {
                  //         "text": "Sunny",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
                  //         "code": 1000
                  //     },
                  //     "wind_mph": 3.6,
                  //     "wind_kph": 5.8,
                  //     "wind_degree": 95,
                  //     "wind_dir": "E",
                  //     "pressure_mb": 1009.0,
                  //     "pressure_in": 29.78,
                  //     "precip_mm": 0.0,
                  //     "precip_in": 0.0,
                  //     "humidity": 79,
                  //     "cloud": 21,
                  //     "feelslike_c": 30.4,
                  //     "feelslike_f": 86.7,
                  //     "windchill_c": 27.1,
                  //     "windchill_f": 80.8,
                  //     "heatindex_c": 30.4,
                  //     "heatindex_f": 86.7,
                  //     "dewpoint_c": 23.2,
                  //     "dewpoint_f": 73.8,
                  //     "will_it_rain": 0,
                  //     "chance_of_rain": 0,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 10.0,
                  //     "vis_miles": 6.0,
                  //     "gust_mph": 4.9,
                  //     "gust_kph": 7.9,
                  //     "uv": 7.0,
                  //     "air_quality": {
                  //         "co": 350.5,
                  //         "no2": 1.7000000476837158,
                  //         "o3": 32.20000076293945,
                  //         "so2": 0.30000001192092896,
                  //         "pm2_5": 4.0,
                  //         "pm10": 4.199999809265137,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // },
                  // {
                  //     "time_epoch": 1689724800,
                  //     "time": "2023-07-19 08:00",
                  //     "temp_c": 27.9,
                  //     "temp_f": 82.2,
                  //     "is_day": 1,
                  //     "condition": {
                  //         "text": "Sunny",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
                  //         "code": 1000
                  //     },
                  //     "wind_mph": 2.5,
                  //     "wind_kph": 4.0,
                  //     "wind_degree": 99,
                  //     "wind_dir": "E",
                  //     "pressure_mb": 1009.0,
                  //     "pressure_in": 29.79,
                  //     "precip_mm": 0.0,
                  //     "precip_in": 0.0,
                  //     "humidity": 76,
                  //     "cloud": 14,
                  //     "feelslike_c": 31.6,
                  //     "feelslike_f": 88.9,
                  //     "windchill_c": 27.9,
                  //     "windchill_f": 82.2,
                  //     "heatindex_c": 31.6,
                  //     "heatindex_f": 88.9,
                  //     "dewpoint_c": 23.3,
                  //     "dewpoint_f": 73.9,
                  //     "will_it_rain": 0,
                  //     "chance_of_rain": 0,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 10.0,
                  //     "vis_miles": 6.0,
                  //     "gust_mph": 3.1,
                  //     "gust_kph": 5.0,
                  //     "uv": 7.0,
                  //     "air_quality": {
                  //         "co": 347.1000061035156,
                  //         "no2": 1.2000000476837158,
                  //         "o3": 35.400001525878906,
                  //         "so2": 0.20000000298023224,
                  //         "pm2_5": 3.799999952316284,
                  //         "pm10": 4.0,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // },
                  // {
                  //     "time_epoch": 1689728400,
                  //     "time": "2023-07-19 09:00",
                  //     "temp_c": 28.5,
                  //     "temp_f": 83.3,
                  //     "is_day": 1,
                  //     "condition": {
                  //         "text": "Sunny",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
                  //         "code": 1000
                  //     },
                  //     "wind_mph": 0.9,
                  //     "wind_kph": 1.4,
                  //     "wind_degree": 152,
                  //     "wind_dir": "SSE",
                  //     "pressure_mb": 1009.0,
                  //     "pressure_in": 29.79,
                  //     "precip_mm": 0.0,
                  //     "precip_in": 0.0,
                  //     "humidity": 73,
                  //     "cloud": 18,
                  //     "feelslike_c": 32.3,
                  //     "feelslike_f": 90.1,
                  //     "windchill_c": 28.5,
                  //     "windchill_f": 83.3,
                  //     "heatindex_c": 32.3,
                  //     "heatindex_f": 90.1,
                  //     "dewpoint_c": 23.3,
                  //     "dewpoint_f": 73.9,
                  //     "will_it_rain": 0,
                  //     "chance_of_rain": 0,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 10.0,
                  //     "vis_miles": 6.0,
                  //     "gust_mph": 1.1,
                  //     "gust_kph": 1.8,
                  //     "uv": 7.0,
                  //     "air_quality": {
                  //         "co": 340.5,
                  //         "no2": 0.800000011920929,
                  //         "o3": 40.79999923706055,
                  //         "so2": 0.20000000298023224,
                  //         "pm2_5": 3.799999952316284,
                  //         "pm10": 4.0,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // },
                  // {
                  //     "time_epoch": 1689732000,
                  //     "time": "2023-07-19 10:00",
                  //     "temp_c": 28.9,
                  //     "temp_f": 84.0,
                  //     "is_day": 1,
                  //     "condition": {
                  //         "text": "Sunny",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
                  //         "code": 1000
                  //     },
                  //     "wind_mph": 3.4,
                  //     "wind_kph": 5.4,
                  //     "wind_degree": 272,
                  //     "wind_dir": "W",
                  //     "pressure_mb": 1009.0,
                  //     "pressure_in": 29.78,
                  //     "precip_mm": 0.0,
                  //     "precip_in": 0.0,
                  //     "humidity": 73,
                  //     "cloud": 20,
                  //     "feelslike_c": 33.0,
                  //     "feelslike_f": 91.4,
                  //     "windchill_c": 28.9,
                  //     "windchill_f": 84.0,
                  //     "heatindex_c": 33.0,
                  //     "heatindex_f": 91.4,
                  //     "dewpoint_c": 23.5,
                  //     "dewpoint_f": 74.3,
                  //     "will_it_rain": 0,
                  //     "chance_of_rain": 0,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 10.0,
                  //     "vis_miles": 6.0,
                  //     "gust_mph": 4.0,
                  //     "gust_kph": 6.5,
                  //     "uv": 7.0,
                  //     "air_quality": {
                  //         "co": 333.79998779296875,
                  //         "no2": 0.6000000238418579,
                  //         "o3": 45.099998474121094,
                  //         "so2": 0.20000000298023224,
                  //         "pm2_5": 3.9000000953674316,
                  //         "pm10": 4.0,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // },
                  // {
                  //     "time_epoch": 1689735600,
                  //     "time": "2023-07-19 11:00",
                  //     "temp_c": 32.1,
                  //     "temp_f": 89.8,
                  //     "is_day": 1,
                  //     "condition": {
                  //         "text": "Sunny",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
                  //         "code": 1000
                  //     },
                  //     "wind_mph": 5.8,
                  //     "wind_kph": 9.4,
                  //     "wind_degree": 290,
                  //     "wind_dir": "WNW",
                  //     "pressure_mb": 1009.0,
                  //     "pressure_in": 29.78,
                  //     "precip_mm": 0.0,
                  //     "precip_in": 0.0,
                  //     "humidity": 74,
                  //     "cloud": 8,
                  //     "feelslike_c": 41.5,
                  //     "feelslike_f": 106.7,
                  //     "windchill_c": 32.1,
                  //     "windchill_f": 89.8,
                  //     "heatindex_c": 41.5,
                  //     "heatindex_f": 106.7,
                  //     "dewpoint_c": 26.8,
                  //     "dewpoint_f": 80.2,
                  //     "will_it_rain": 0,
                  //     "chance_of_rain": 0,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 10.0,
                  //     "vis_miles": 6.0,
                  //     "gust_mph": 6.7,
                  //     "gust_kph": 10.8,
                  //     "uv": 8.0,
                  //     "air_quality": {
                  //         "co": 330.5,
                  //         "no2": 0.5,
                  //         "o3": 48.599998474121094,
                  //         "so2": 0.30000001192092896,
                  //         "pm2_5": 4.199999809265137,
                  //         "pm10": 4.400000095367432,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // },
                  // {
                  //     "time_epoch": 1689739200,
                  //     "time": "2023-07-19 12:00",
                  //     "temp_c": 30.2,
                  //     "temp_f": 86.4,
                  //     "is_day": 1,
                  //     "condition": {
                  //         "text": "Sunny",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
                  //         "code": 1000
                  //     },
                  //     "wind_mph": 7.6,
                  //     "wind_kph": 12.2,
                  //     "wind_degree": 298,
                  //     "wind_dir": "WNW",
                  //     "pressure_mb": 1008.0,
                  //     "pressure_in": 29.77,
                  //     "precip_mm": 0.0,
                  //     "precip_in": 0.0,
                  //     "humidity": 75,
                  //     "cloud": 22,
                  //     "feelslike_c": 36.5,
                  //     "feelslike_f": 97.7,
                  //     "windchill_c": 30.2,
                  //     "windchill_f": 86.4,
                  //     "heatindex_c": 36.5,
                  //     "heatindex_f": 97.7,
                  //     "dewpoint_c": 25.2,
                  //     "dewpoint_f": 77.4,
                  //     "will_it_rain": 0,
                  //     "chance_of_rain": 0,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 10.0,
                  //     "vis_miles": 6.0,
                  //     "gust_mph": 8.7,
                  //     "gust_kph": 14.0,
                  //     "uv": 8.0,
                  //     "air_quality": {
                  //         "co": 337.1000061035156,
                  //         "no2": 0.699999988079071,
                  //         "o3": 52.20000076293945,
                  //         "so2": 0.4000000059604645,
                  //         "pm2_5": 5.5,
                  //         "pm10": 5.699999809265137,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // },
                  // {
                  //     "time_epoch": 1689742800,
                  //     "time": "2023-07-19 13:00",
                  //     "temp_c": 30.1,
                  //     "temp_f": 86.2,
                  //     "is_day": 1,
                  //     "condition": {
                  //         "text": "Patchy rain possible",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/day/176.png",
                  //         "code": 1063
                  //     },
                  //     "wind_mph": 7.4,
                  //     "wind_kph": 11.9,
                  //     "wind_degree": 318,
                  //     "wind_dir": "NW",
                  //     "pressure_mb": 1008.0,
                  //     "pressure_in": 29.76,
                  //     "precip_mm": 0.1,
                  //     "precip_in": 0.0,
                  //     "humidity": 75,
                  //     "cloud": 73,
                  //     "feelslike_c": 36.4,
                  //     "feelslike_f": 97.5,
                  //     "windchill_c": 30.1,
                  //     "windchill_f": 86.2,
                  //     "heatindex_c": 36.4,
                  //     "heatindex_f": 97.5,
                  //     "dewpoint_c": 25.2,
                  //     "dewpoint_f": 77.4,
                  //     "will_it_rain": 1,
                  //     "chance_of_rain": 77,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 10.0,
                  //     "vis_miles": 6.0,
                  //     "gust_mph": 8.9,
                  //     "gust_kph": 14.4,
                  //     "uv": 7.0,
                  //     "air_quality": {
                  //         "co": 350.5,
                  //         "no2": 0.699999988079071,
                  //         "o3": 57.20000076293945,
                  //         "so2": 0.5,
                  //         "pm2_5": 6.699999809265137,
                  //         "pm10": 7.0,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // },
                  // {
                  //     "time_epoch": 1689746400,
                  //     "time": "2023-07-19 14:00",
                  //     "temp_c": 29.8,
                  //     "temp_f": 85.6,
                  //     "is_day": 1,
                  //     "condition": {
                  //         "text": "Partly cloudy",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
                  //         "code": 1003
                  //     },
                  //     "wind_mph": 7.6,
                  //     "wind_kph": 12.2,
                  //     "wind_degree": 325,
                  //     "wind_dir": "NW",
                  //     "pressure_mb": 1008.0,
                  //     "pressure_in": 29.75,
                  //     "precip_mm": 0.0,
                  //     "precip_in": 0.0,
                  //     "humidity": 75,
                  //     "cloud": 60,
                  //     "feelslike_c": 35.6,
                  //     "feelslike_f": 96.1,
                  //     "windchill_c": 29.8,
                  //     "windchill_f": 85.6,
                  //     "heatindex_c": 35.6,
                  //     "heatindex_f": 96.1,
                  //     "dewpoint_c": 25.0,
                  //     "dewpoint_f": 77.0,
                  //     "will_it_rain": 0,
                  //     "chance_of_rain": 0,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 10.0,
                  //     "vis_miles": 6.0,
                  //     "gust_mph": 9.4,
                  //     "gust_kph": 15.1,
                  //     "uv": 7.0,
                  //     "air_quality": {
                  //         "co": 353.79998779296875,
                  //         "no2": 0.699999988079071,
                  //         "o3": 64.4000015258789,
                  //         "so2": 0.5,
                  //         "pm2_5": 7.599999904632568,
                  //         "pm10": 8.0,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // },
                  // {
                  //     "time_epoch": 1689750000,
                  //     "time": "2023-07-19 15:00",
                  //     "temp_c": 29.7,
                  //     "temp_f": 85.5,
                  //     "is_day": 1,
                  //     "condition": {
                  //         "text": "Light rain shower",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/day/353.png",
                  //         "code": 1240
                  //     },
                  //     "wind_mph": 7.4,
                  //     "wind_kph": 11.9,
                  //     "wind_degree": 327,
                  //     "wind_dir": "NNW",
                  //     "pressure_mb": 1007.0,
                  //     "pressure_in": 29.74,
                  //     "precip_mm": 0.6,
                  //     "precip_in": 0.02,
                  //     "humidity": 76,
                  //     "cloud": 75,
                  //     "feelslike_c": 35.5,
                  //     "feelslike_f": 95.9,
                  //     "windchill_c": 29.7,
                  //     "windchill_f": 85.5,
                  //     "heatindex_c": 35.5,
                  //     "heatindex_f": 95.9,
                  //     "dewpoint_c": 24.9,
                  //     "dewpoint_f": 76.8,
                  //     "will_it_rain": 1,
                  //     "chance_of_rain": 76,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 10.0,
                  //     "vis_miles": 6.0,
                  //     "gust_mph": 9.2,
                  //     "gust_kph": 14.8,
                  //     "uv": 6.0,
                  //     "air_quality": {
                  //         "co": 357.20001220703125,
                  //         "no2": 0.6000000238418579,
                  //         "o3": 70.80000305175781,
                  //         "so2": 0.5,
                  //         "pm2_5": 8.399999618530273,
                  //         "pm10": 9.0,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // },
                  // {
                  //     "time_epoch": 1689753600,
                  //     "time": "2023-07-19 16:00",
                  //     "temp_c": 29.5,
                  //     "temp_f": 85.1,
                  //     "is_day": 1,
                  //     "condition": {
                  //         "text": "Light rain shower",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/day/353.png",
                  //         "code": 1240
                  //     },
                  //     "wind_mph": 6.9,
                  //     "wind_kph": 11.2,
                  //     "wind_degree": 333,
                  //     "wind_dir": "NNW",
                  //     "pressure_mb": 1007.0,
                  //     "pressure_in": 29.73,
                  //     "precip_mm": 0.2,
                  //     "precip_in": 0.01,
                  //     "humidity": 76,
                  //     "cloud": 76,
                  //     "feelslike_c": 35.1,
                  //     "feelslike_f": 95.2,
                  //     "windchill_c": 29.5,
                  //     "windchill_f": 85.1,
                  //     "heatindex_c": 35.1,
                  //     "heatindex_f": 95.2,
                  //     "dewpoint_c": 24.9,
                  //     "dewpoint_f": 76.8,
                  //     "will_it_rain": 1,
                  //     "chance_of_rain": 71,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 10.0,
                  //     "vis_miles": 6.0,
                  //     "gust_mph": 9.2,
                  //     "gust_kph": 14.8,
                  //     "uv": 6.0,
                  //     "air_quality": {
                  //         "co": 353.79998779296875,
                  //         "no2": 0.6000000238418579,
                  //         "o3": 75.80000305175781,
                  //         "so2": 0.5,
                  //         "pm2_5": 8.899999618530273,
                  //         "pm10": 9.699999809265137,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // },
                  // {
                  //     "time_epoch": 1689757200,
                  //     "time": "2023-07-19 17:00",
                  //     "temp_c": 29.1,
                  //     "temp_f": 84.4,
                  //     "is_day": 1,
                  //     "condition": {
                  //         "text": "Moderate or heavy rain shower",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/day/356.png",
                  //         "code": 1243
                  //     },
                  //     "wind_mph": 6.7,
                  //     "wind_kph": 10.8,
                  //     "wind_degree": 344,
                  //     "wind_dir": "NNW",
                  //     "pressure_mb": 1007.0,
                  //     "pressure_in": 29.73,
                  //     "precip_mm": 2.8,
                  //     "precip_in": 0.11,
                  //     "humidity": 78,
                  //     "cloud": 69,
                  //     "feelslike_c": 34.5,
                  //     "feelslike_f": 94.1,
                  //     "windchill_c": 29.1,
                  //     "windchill_f": 84.4,
                  //     "heatindex_c": 34.5,
                  //     "heatindex_f": 94.1,
                  //     "dewpoint_c": 24.9,
                  //     "dewpoint_f": 76.8,
                  //     "will_it_rain": 1,
                  //     "chance_of_rain": 74,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 7.0,
                  //     "vis_miles": 4.0,
                  //     "gust_mph": 10.7,
                  //     "gust_kph": 17.3,
                  //     "uv": 6.0,
                  //     "air_quality": {
                  //         "co": 337.1000061035156,
                  //         "no2": 0.6000000238418579,
                  //         "o3": 78.0,
                  //         "so2": 0.4000000059604645,
                  //         "pm2_5": 8.800000190734863,
                  //         "pm10": 9.5,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // },
                  // {
                  //     "time_epoch": 1689760800,
                  //     "time": "2023-07-19 18:00",
                  //     "temp_c": 28.4,
                  //     "temp_f": 83.1,
                  //     "is_day": 1,
                  //     "condition": {
                  //         "text": "Light rain shower",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/day/353.png",
                  //         "code": 1240
                  //     },
                  //     "wind_mph": 6.3,
                  //     "wind_kph": 10.1,
                  //     "wind_degree": 5,
                  //     "wind_dir": "N",
                  //     "pressure_mb": 1007.0,
                  //     "pressure_in": 29.74,
                  //     "precip_mm": 0.4,
                  //     "precip_in": 0.02,
                  //     "humidity": 82,
                  //     "cloud": 67,
                  //     "feelslike_c": 33.5,
                  //     "feelslike_f": 92.3,
                  //     "windchill_c": 28.4,
                  //     "windchill_f": 83.1,
                  //     "heatindex_c": 33.5,
                  //     "heatindex_f": 92.3,
                  //     "dewpoint_c": 25.0,
                  //     "dewpoint_f": 77.0,
                  //     "will_it_rain": 1,
                  //     "chance_of_rain": 83,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 10.0,
                  //     "vis_miles": 6.0,
                  //     "gust_mph": 11.0,
                  //     "gust_kph": 17.6,
                  //     "uv": 6.0,
                  //     "air_quality": {
                  //         "co": 323.79998779296875,
                  //         "no2": 0.6000000238418579,
                  //         "o3": 78.0,
                  //         "so2": 0.4000000059604645,
                  //         "pm2_5": 8.300000190734863,
                  //         "pm10": 8.899999618530273,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // },
                  // {
                  //     "time_epoch": 1689764400,
                  //     "time": "2023-07-19 19:00",
                  //     "temp_c": 27.9,
                  //     "temp_f": 82.2,
                  //     "is_day": 0,
                  //     "condition": {
                  //         "text": "Light rain shower",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/night/353.png",
                  //         "code": 1240
                  //     },
                  //     "wind_mph": 5.1,
                  //     "wind_kph": 8.3,
                  //     "wind_degree": 14,
                  //     "wind_dir": "NNE",
                  //     "pressure_mb": 1008.0,
                  //     "pressure_in": 29.75,
                  //     "precip_mm": 1.4,
                  //     "precip_in": 0.06,
                  //     "humidity": 83,
                  //     "cloud": 68,
                  //     "feelslike_c": 32.6,
                  //     "feelslike_f": 90.7,
                  //     "windchill_c": 27.9,
                  //     "windchill_f": 82.2,
                  //     "heatindex_c": 32.6,
                  //     "heatindex_f": 90.7,
                  //     "dewpoint_c": 24.8,
                  //     "dewpoint_f": 76.6,
                  //     "will_it_rain": 1,
                  //     "chance_of_rain": 92,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 10.0,
                  //     "vis_miles": 6.0,
                  //     "gust_mph": 10.3,
                  //     "gust_kph": 16.6,
                  //     "uv": 1.0,
                  //     "air_quality": {
                  //         "co": 313.79998779296875,
                  //         "no2": 0.699999988079071,
                  //         "o3": 75.80000305175781,
                  //         "so2": 0.5,
                  //         "pm2_5": 7.900000095367432,
                  //         "pm10": 8.399999618530273,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // },
                  // {
                  //     "time_epoch": 1689768000,
                  //     "time": "2023-07-19 20:00",
                  //     "temp_c": 28.0,
                  //     "temp_f": 82.4,
                  //     "is_day": 0,
                  //     "condition": {
                  //         "text": "Light rain shower",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/night/353.png",
                  //         "code": 1240
                  //     },
                  //     "wind_mph": 4.5,
                  //     "wind_kph": 7.2,
                  //     "wind_degree": 27,
                  //     "wind_dir": "NNE",
                  //     "pressure_mb": 1008.0,
                  //     "pressure_in": 29.76,
                  //     "precip_mm": 2.1,
                  //     "precip_in": 0.08,
                  //     "humidity": 82,
                  //     "cloud": 67,
                  //     "feelslike_c": 32.6,
                  //     "feelslike_f": 90.7,
                  //     "windchill_c": 28.0,
                  //     "windchill_f": 82.4,
                  //     "heatindex_c": 32.6,
                  //     "heatindex_f": 90.7,
                  //     "dewpoint_c": 24.6,
                  //     "dewpoint_f": 76.3,
                  //     "will_it_rain": 0,
                  //     "chance_of_rain": 69,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 10.0,
                  //     "vis_miles": 6.0,
                  //     "gust_mph": 8.5,
                  //     "gust_kph": 13.7,
                  //     "uv": 1.0,
                  //     "air_quality": {
                  //         "co": 317.1000061035156,
                  //         "no2": 0.8999999761581421,
                  //         "o3": 73.0,
                  //         "so2": 0.4000000059604645,
                  //         "pm2_5": 7.699999809265137,
                  //         "pm10": 8.0,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // },
                  // {
                  //     "time_epoch": 1689771600,
                  //     "time": "2023-07-19 21:00",
                  //     "temp_c": 27.9,
                  //     "temp_f": 82.2,
                  //     "is_day": 0,
                  //     "condition": {
                  //         "text": "Patchy rain possible",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/night/176.png",
                  //         "code": 1063
                  //     },
                  //     "wind_mph": 3.6,
                  //     "wind_kph": 5.8,
                  //     "wind_degree": 56,
                  //     "wind_dir": "ENE",
                  //     "pressure_mb": 1008.0,
                  //     "pressure_in": 29.77,
                  //     "precip_mm": 0.1,
                  //     "precip_in": 0.0,
                  //     "humidity": 82,
                  //     "cloud": 76,
                  //     "feelslike_c": 32.4,
                  //     "feelslike_f": 90.3,
                  //     "windchill_c": 27.9,
                  //     "windchill_f": 82.2,
                  //     "heatindex_c": 32.4,
                  //     "heatindex_f": 90.3,
                  //     "dewpoint_c": 24.6,
                  //     "dewpoint_f": 76.3,
                  //     "will_it_rain": 1,
                  //     "chance_of_rain": 82,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 10.0,
                  //     "vis_miles": 6.0,
                  //     "gust_mph": 5.1,
                  //     "gust_kph": 8.3,
                  //     "uv": 1.0,
                  //     "air_quality": {
                  //         "co": 333.79998779296875,
                  //         "no2": 1.2000000476837158,
                  //         "o3": 67.19999694824219,
                  //         "so2": 0.5,
                  //         "pm2_5": 7.699999809265137,
                  //         "pm10": 7.900000095367432,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // },
                  // {
                  //     "time_epoch": 1689775200,
                  //     "time": "2023-07-19 22:00",
                  //     "temp_c": 27.7,
                  //     "temp_f": 81.9,
                  //     "is_day": 0,
                  //     "condition": {
                  //         "text": "Clear",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/night/113.png",
                  //         "code": 1000
                  //     },
                  //     "wind_mph": 3.1,
                  //     "wind_kph": 5.0,
                  //     "wind_degree": 109,
                  //     "wind_dir": "ESE",
                  //     "pressure_mb": 1008.0,
                  //     "pressure_in": 29.77,
                  //     "precip_mm": 0.0,
                  //     "precip_in": 0.0,
                  //     "humidity": 83,
                  //     "cloud": 25,
                  //     "feelslike_c": 32.1,
                  //     "feelslike_f": 89.8,
                  //     "windchill_c": 27.7,
                  //     "windchill_f": 81.9,
                  //     "heatindex_c": 32.1,
                  //     "heatindex_f": 89.8,
                  //     "dewpoint_c": 24.5,
                  //     "dewpoint_f": 76.1,
                  //     "will_it_rain": 0,
                  //     "chance_of_rain": 0,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 10.0,
                  //     "vis_miles": 6.0,
                  //     "gust_mph": 4.5,
                  //     "gust_kph": 7.2,
                  //     "uv": 1.0,
                  //     "air_quality": {
                  //         "co": 340.5,
                  //         "no2": 1.2000000476837158,
                  //         "o3": 63.70000076293945,
                  //         "so2": 0.4000000059604645,
                  //         "pm2_5": 7.099999904632568,
                  //         "pm10": 7.300000190734863,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // },
                  // {
                  //     "time_epoch": 1689778800,
                  //     "time": "2023-07-19 23:00",
                  //     "temp_c": 27.5,
                  //     "temp_f": 81.5,
                  //     "is_day": 0,
                  //     "condition": {
                  //         "text": "Patchy rain possible",
                  //         "icon": "//cdn.weatherapi.com/weather/64x64/night/176.png",
                  //         "code": 1063
                  //     },
                  //     "wind_mph": 3.6,
                  //     "wind_kph": 5.8,
                  //     "wind_degree": 129,
                  //     "wind_dir": "SE",
                  //     "pressure_mb": 1008.0,
                  //     "pressure_in": 29.77,
                  //     "precip_mm": 0.1,
                  //     "precip_in": 0.0,
                  //     "humidity": 84,
                  //     "cloud": 72,
                  //     "feelslike_c": 31.8,
                  //     "feelslike_f": 89.2,
                  //     "windchill_c": 27.5,
                  //     "windchill_f": 81.5,
                  //     "heatindex_c": 31.8,
                  //     "heatindex_f": 89.2,
                  //     "dewpoint_c": 24.4,
                  //     "dewpoint_f": 75.9,
                  //     "will_it_rain": 1,
                  //     "chance_of_rain": 89,
                  //     "will_it_snow": 0,
                  //     "chance_of_snow": 0,
                  //     "vis_km": 10.0,
                  //     "vis_miles": 6.0,
                  //     "gust_mph": 5.1,
                  //     "gust_kph": 8.3,
                  //     "uv": 1.0,
                  //     "air_quality": {
                  //         "co": 337.1000061035156,
                  //         "no2": 1.0,
                  //         "o3": 61.5,
                  //         "so2": 0.30000001192092896,
                  //         "pm2_5": 6.5,
                  //         "pm10": 6.699999809265137,
                  //         "us-epa-index": 1,
                  //         "gb-defra-index": 1
                  //     }
                  // }
              ]
          },
        ]
  }
    }
    //PlantStatus(false)\

    weathData.forEach((elem) => { 
      //console.log("Hour: ", elem)

        const day1 = moment(elem.date).format('ll');
        const today = moment().toDate();  
        const currentDay =  moment(today).format('ll');
        const rain  =  elem.day.daily_chance_of_rain;
        const rainCondition =  elem.day.condition.text;

        //check if weather date data == current data 
        //get data if true
        // Today
        if(day1 == currentDay) {
 
          //push data[0] to dataa hours Humidity
          elem.hour.forEach((elem2) => {
            const timecheck = moment(elem2.time).format('LT');
            if(timecheck == '5:00 AM' || timecheck == '6:00 AM' || timecheck == '7:00 AM' ) {
                //console.log(timecheck)
                console.log('check', timecheck)
               if(mrhr3humidity.length <= 2) {
                mrhr3humidity.push(elem2.humidity)
               }else {
                console.log('Humidity data for this morning is updated!')
               }
            }else {
                console.log(timecheck)
            }

            if(timecheck == '1:00 PM' || timecheck == '2:00 PM' || timecheck == '3:00 PM' ) {
              //console.log(timecheck)
              console.log('check', timecheck)
                if(afhr3humidity.length <= 2 ) {
                afhr3humidity.push(elem2.humidity)
               }else {
                console.log('Humidity data for this afternoon is updated!')
               }
            }else {
              console.log(timecheck)
             }
          })

          //console.log('Rain: ',rain)
          if(rain >= 80 ){
            console.log('Chance of rain: ', rain, '%' , 'Condition: ', rainCondition)
            console.log('push data')
          }

          // average Temperature
          if(elem.day.avgtemp_c >= 28){
            // assign value for irrigating plants

            console.log('Need water today!')
            // to UPCOMING activity-check schedule if matches the data of plant irrigation
            // upcoming schedule == today  == push irrigate
          }else {
              console.log('40-50% Depletion!')
          }


        }

        

      // upcoming testing
      // for loop-check start and end date
      // compute for 100 days left
      // insert water irrigation sched
      // insert spray fertilzer sched
      // insert insect pests and diseases sched
      // for(let l = 0; l < 99; l++){

      // }
  
    })

    const currentDate = new Date(); 
    
    for (let i = 0; i <= 3; i++) {
      const newDate = new Date(currentDate.getTime() + i * 14 * 24 * 60 * 60 * 1000);
      const blue = moment(newDate).format('MMMM DD YYYY')
      foliar.push({
        title: 'Fertilizer',
        action: 'Spray Foliar fertilizer',
        dateAction: blue,
      });
    }

        // irrigate plant
    for (let i = 0; i <= 33; i++) {
          const newDate = new Date(currentDate.getTime() + i * 3 * 24 * 60 * 60 * 1000);
          const blue = moment(newDate).format()
          //irrigate
          foliar.push({
            title:'Water',
            action: 'Water plants',
            dateAction: blue,
          });
    }
    //setFoliar(newDateStack);
  }
 
  const display = () => {
    console.log('Morning: ',mrhr3humidity)
    console.log('Afternoon: ',afhr3humidity )
    console.log('Foliar: ',foliar)
    //console.table('irrigating: ',irrigate)
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
              <Text style={{ color: '#276653', fontWeight: 'bold' }}>{moment(date).startOf('day').fromNow()}</Text>
            </View>
            <View style={{ marginTop: 80, width: '100%', }}>
              <View style={{ margin: 20, padding: 15, backgroundColor: 'rgba(255, 255, 255, 0.548)', borderRadius: 15, flexDirection: 'row', justifyContent: 'flex-start' }}>
                <View>
                  <Image source={require('../../src/images/Insect5.jpg')} style={{ width: 100, height: 100, borderRadius: 15, marginRight: 10 }} />
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <View>
                    <Text style={{ fontSize: 18, color: 'white', fontWeight: '900' }}> {title}</Text>
                    <Text style={{ fontSize: 16, color: 'white', fontWeight: '900' }}> {moment(date).format("MMMM D, YYYY")}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <TouchableOpacity
                      onPress={() => { navigation.navigate('Note') }}>
                      <View style={{ padding: 7, borderWidth: 1, borderColor: '#5BB761', backgroundColor: '#EAFFE8', borderRadius: 20, marginRight: 5, flexDirection: 'row', paddingLeft: 15, paddingRight: 10 }}>
                        <Icon name={'notebook-plus-outline'} color={'#276653'} size={20} style={{ width: 20, marginRight: 5 }} />
                        <Text style={{ fontWeight: 'bold' }}>Add note</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => { navigation.navigate('PlantCam', {
                        title: title,
                        image: image,
                        variety: variety,
                        date: date,
                        plantAddress: plantAddress,
                      }) }}>
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
              <Text style={{ fontSize: 20, color: '#276653', fontWeight: 'bold' }}>Findings</Text>
              <TouchableOpacity >
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#276653', fontWeight: 'bold' }}>See all</Text>
                  {/* <Icon name={'arrow-right-thin'} color={'#276653'} size={} style={{ width: 35}} /> */}
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} snapToStart={true} >
                <View style={{ marginRight: 10 }}>
                  <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, margin: 4, marginBottom: 8, padding: 20 }]}>
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
                  <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, margin: 4, marginBottom: 8, padding: 20 }]}>
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
                  <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, margin: 4, marginBottom: 8, padding: 20 }]}>
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

          {/*Task1  Today checking */}
          {/* <View style={{ margin: 10, marginTop: 10, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5, alignItems: 'center' }}>
             <TouchableOpacity onPress={checkDatas}>
                <View style={{borderRadius:10, borderColor:'black' ,borderWidth:1, padding:10}}>
                  <Text style={{ color: '#276653', fontWeight: 'bold', fontSize:18 }}>Console</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View> */}

          {/*Task1  Today display checking */}
          {/* <View style={{ margin: 10, marginTop: 10, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5, alignItems: 'center' }}>
             <TouchableOpacity onPress={display}>
                <View style={{borderRadius:10, borderColor:'black' ,borderWidth:1, padding:10}}>
                  <Text style={{ color: '#276653', fontWeight: 'bold', fontSize:18 }}>Display</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View> */}

          <View style={{ margin: 10, marginTop: 10, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5, alignItems: 'center' }}>
              <Text style={{ fontSize: 20, color: '#276653', fontWeight: 'bold' }}>Today's Activity</Text>
              <TouchableOpacity onPress={() => {
                    navigation.navigate('Task', {
                      title: title,
                    });
                 }}>
                <View>
                  <Text style={{ color: '#276653', fontWeight: 'bold' }}>See all</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 15, width: '100%', padding: 20, borderLeftColor: '#80d6f0', borderLeftWidth: 10, marginBottom: 10, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 18 }}>Tangle Top</Text>
                </View>
                <View>
                  <TouchableOpacity>
                    <View style={{ borderRadius: 15, borderWidth: 1, borderColor: '#e7e43aff', paddingLeft: 10, paddingRight: 10, padding: 5 }}>
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Complete</Text>
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
  const { logout, user } = useContext(AuthContext);
  const [process, setProcessing] = useState(false);
  const [result, setResult] = useState('');
  const result_mapping = ['Purple blotch','Leaf spot', 'Tangle top','Common worm','Garlic rust', 'Root rot'  ]
    
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
  const { title, image, area  , variety, date, plantAddress } = route.params;
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
      <View style={{ marginBottom:80,paddingLeft: '5%', paddingRight: '5%', borderRadius: 10, flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
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
        <View style={{ borderRadius: 10,alignItems:'center', width:'100%',marginBottom:30 }}>
        <View style={[styles.cardDashboardPestDiseaseProp, ,{margin:10}]}>
            <Image source={{ uri: image1 }} style={{ width: 210, height: 210, alignItems: 'center', borderRadius: 10 }} />
        </View>
          <TouchableOpacity 
            onPress={() => setImage1(null)}>
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', borderBottomWidth:1, borderColor:'#ad3517'}}>
              <Icon name={"image-remove"} color={'#ad3517'} size={20} style={{ width: 20, marginRight:2 }} />
              <Text style={{fontSize:14, fontWeight:'bold', color:'#ad3517'}}>Remove</Text>
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
        const task = Storage().ref('images/' + user.uid+'/'+filename).putFile(uploadUri)
  
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
          const downloadURLModel = await Storage().ref('images/' + user.uid+'/'+filename).getDownloadURL();
  
          // store data in realtime database
          database().ref('/users/' + user.uid +'/plants/'+ user.uid + title +'/modelImages/')
            .push({
              image: downloadURLModel,
              date: moment().format('ll'),
              severity:'',
              status:'unknown'
            })
            .then(async () => {
              alert('Plant data stored successfully!')
              navigation.goBack()
            });

            const downloadURLModel2 = await Storage().ref('plantimages/'+filename).getDownloadURL();
            database().ref('/plantdataimages/' + user.uid)
            .push({
              image: downloadURLModel2,
              user_id: user.uid,
              title:title,
              date: moment().format('ll'), 
              status:'unknown'
        
            })
        });
  
        try {
          await task;
        } catch (e) {
          console.error(e);
        }
  
        setUploading(false);
        setImage1(null);
      }
  }

  //#E8F4E6
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ backgroundColor: '#e6fae3', width: '100%', height: '100%' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', paddingBottom: 30 }}>
            <Image source={require('../../src/images/Insect5.jpg')} style={{ marginTop: 40, width: 120, height: 120, borderRadius: 160, marginRight: 10 }} />
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
              <View style={{ flexDirection: 'row', marginTop: 20,justifyContent:'center', alignItems:'center', width: '100%'}}>
                
                  {
                    image1 == null ? <ImageDefault /> : <ImageChange1 />
                  }
              </View>

              <View style={{ marginTop: 10, flexDirection:'row', justifyContent: 'center', marginBottom: 10 }}>
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
        <View style={{flexDirection:'row'}}>
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

function Note ({route, navigation}) {
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [rf, setRF] = useState('');
  const [prediction, setPrediction] = useState('');


  const handleReset = () => {
    setTemperature('')
    setHumidity('')
    setWindSpeed('')
    setPrediction('Field reset!')
  }

  const handlePredict = () => {

    // Check the temperature range and humidity value
    if (temperature <= 12 && humidity >= 101 ) {
      setPrediction('Thunder'); // High temperature and high humidity may indicate thunder
    } else if (temperature >= 13 &&  temperature <= 17 && humidity >= 86 &&  humidity <= 100) {
      setPrediction('Rainy'); // Moderate temperature and humidity may indicate rain
    } else if (temperature >= 18 && temperature < 25 && humidity >= 66) {
      setPrediction('Cloudy'); // Mild temperature and lower humidity may indicate cloudy weather
    } else if (temperature >= 26 && humidity >= 45 && humidity <= 65) {
      setPrediction('Sunny'); // Low temperature and low humidity may indicate sunny weather
    } else {
      setPrediction('Unknown'); // For other conditions, the prediction is unknown
    }



  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Weather Prediction</Text>
      <TextInput
        style={styles.input}
        placeholder="Temperature"
        value={temperature}
        onChangeText={(text) => setTemperature(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Humidity"
        value={humidity}
        onChangeText={(text) => setHumidity(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Wind Speed"
        value={windSpeed}
        onChangeText={(text) => setWindSpeed(text)}
      />
      <Button title="Predict" onPress={handlePredict} />
      <Button title="Reset"  style={{marginTop:10}} onPress={handleReset} />
      {prediction !== '' && <Text style={styles.predictionText}>Predicted Weather Condition: {prediction}</Text>}

    </View>
  );
};

function Tasks({ route, navigation }) {
  const { logout, user } = useContext(AuthContext)
  const { title } = route.params;
  const [taskUpcom ,setTaskUpc] = useState([])


  const initialLayout = { height: 300,};

  // s
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      //tabStyle={{}}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#276653', margin: 8 }}>
          {route.title}
        </Text>
      )}
      activeColor={'#276653'}
      indicatorStyle={{ backgroundColor: '#276653', height: 5, borderRadius: 10 }}
      style={{ backgroundColor: 'white' }}
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
          Task
        </Text>
      </View>
    )
  }
  function SecondRoute() {
    //use useEffect for loading data -- try offline 
    const red  =  database().ref('null/plants/'+user.uid)
    const  blue =  red.toString().split('/')[3];
    if(user.uid == blue){
      const taskUp = database().ref('users/'+user.uid+'/plants/'+user.uid+title +'/taskUpcoming')
      taskUp.on('value', (snapshot) => {
        const firebaseData = snapshot.val();
          const dataArray = Object.values(firebaseData);
          const sorted = dataArray.sort((a,b)=>{
            const dateA = new Date(`${a.dateAction}`).valueOf();
            const dateB = new Date(`${b.dateAction}`).valueOf();
            if(dateA > dateB){
              return 1; // return -1 here for DESC order
            }
            return -1 // return 1 here for DESC Order
          });
          setTaskUpc(sorted);
          //console.log('firebaseData: ',taskUpcom)
      });
      //console.log('taskUp:' ,taskUpcom) 
      // Sort dates in ascending order
      //const sortedDates = [...taskUp.dateAction].sort((a, b) => a - b);
      //console.log('Date Sorted: ',sortedDates)
      //setTaskUpc(taskUp)

    }
    //else {
      // console.log('Data not fetch!')
      // console.log('User UID: ',user.uid)
      // console.log('Database: ',red)
      // console.log('Blue: ',blue)
      //console.log('Blue: ')
    //}
    //const sortedDates = [...taskUpcom].sort((a, b) => a.dateAction - b.dateAction);

    return (
      <View dtyle={{margin:20}} >
   <Text> sdfdsfsdfsdfsdfsfdfas</Text>
   


        <ScrollView  nestedScrollEnabled  >
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        {/* {
        taskUpcom.map((upcom,index2) => {
          return(
            <View key={index2} style={{borderWidth:2, margin:10,marginTop:20,marginBottom:20}}>
                <View style={{flexDirection:'row' }}>
                  <Text>
                    {upcom.action}
                  </Text>
                </View>
                <View style={{flexDirection:'row' }}>
                  <Text>
                    {upcom.dateAction}
                  </Text>
                </View>
                <View style={{flexDirection:'row' }}>
                  <Text>
                    {upcom.title}
                  </Text>
                </View>
            </View>
          )
        })
        } */}
                <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        <Text> sdfdsfsdfsdfsdfsfdfas</Text>
        
        </ScrollView>
     
      </View>
    )
  }
  function ThirdRoute() {
    return (
      <View style={{ flex: 1 }}>
            <View style={{ margin: 10, marginTop: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5, alignItems: 'center' }}>
              <Text style={{ fontSize: 20, color: '#276653', fontWeight: 'bold' }}>Findings</Text>
              <TouchableOpacity >
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#276653', fontWeight: 'bold' }}>See all</Text>
                  {/* <Icon name={'arrow-right-thin'} color={'#276653'} size={} style={{ width: 35}} /> */}
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} snapToStart={true} >
                <View style={{ marginRight: 10 }}>
                  <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, margin: 4, marginBottom: 8, padding: 20 }]}>
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
                  <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, margin: 4, marginBottom: 8, padding: 20 }]}>
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
                  <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, margin: 4, marginBottom: 8, padding: 20 }]}>
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
          <View style={{ margin: 10, marginTop: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5, alignItems: 'center' }}>
              <Text style={{ fontSize: 20, color: '#276653', fontWeight: 'bold' }}>Findings</Text>
              <TouchableOpacity >
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#276653', fontWeight: 'bold' }}>See all</Text>
                  {/* <Icon name={'arrow-right-thin'} color={'#276653'} size={} style={{ width: 35}} /> */}
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} snapToStart={true} >
                <View style={{ marginRight: 10 }}>
                  <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, margin: 4, marginBottom: 8, padding: 20 }]}>
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
                  <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, margin: 4, marginBottom: 8, padding: 20 }]}>
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
                  <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, margin: 4, marginBottom: 8, padding: 20 }]}>
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

      </View>
    )
  }
  return (
    <SafeAreaView>
      <View style={{ padding: 20, backgroundColor: 'white', height: '100%' }}>
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingBottom: 5, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, color: '#276653', fontWeight: 'bold' }}>Task</Text>
        </View> */}
        <ScrollView>
        <View >
          <ScrollView horizontal={true} style={{ paddingBottom: 10 }}>
            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>

            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>

            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={{ height: '40%'}}>
          <TabView  
          nestedScrollEnabled={true}
            swipeEnabled={false}
            tabBarScrollEnabled={true}
            navigationState={{ index, routes }}
            renderTabBar={renderTabBar}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            style={{ backgroundColor: 'white', zIndex:1 }}
          />
        </View>
        <View >
          <ScrollView horizontal={true} style={{ paddingBottom: 10 }}>
            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>

            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>

            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View >
          <ScrollView horizontal={true} style={{ paddingBottom: 10 }}>
            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>

            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>

            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View >
          <ScrollView horizontal={true} style={{ paddingBottom: 10 }}>
            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>

            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>

            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View >
          <ScrollView horizontal={true} style={{ paddingBottom: 10 }}>
            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>

            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>

            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        <View >
          <ScrollView horizontal={true} style={{ paddingBottom: 10 }}>
            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>

            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>

            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View >
          <ScrollView horizontal={true} style={{ paddingBottom: 10 }}>
            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>

            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>

            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View >
          <ScrollView horizontal={true} style={{ paddingBottom: 10 }}>
            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>

            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>

            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

function Task({ route, navigation }) {

  const [activeTab, setActiveTab] = useState('tab1');
  const { logout, user } = useContext(AuthContext)
  const { title } = route.params;
  const [taskUpcom ,setTaskUpc] = useState([])

  const renderTabContent = () => {
    if (activeTab === 'tab1') {
      return <Tab1Content />;
    } else if (activeTab === 'tab2') {
      return <Tab2Content />;
    } else if (activeTab === 'tab3') {
      return <Tab3Content />;
    }
  };

  const Tab1Content = () => {
    
    return( 
 
      <View dtyle={{margin:20}} >
      {
        taskUpcom.map((upcom,index2) => {
          return(
            <View key={index2} style={{borderWidth:2, margin:10,marginTop:20,marginBottom:20}}>
                <View style={{flexDirection:'row' }}>
                  <Text>
                    {upcom.action}
                  </Text>
                </View>
                <View style={{flexDirection:'row' }}>
                  <Text>
                    {upcom.dateAction}
                  </Text>
                </View>
                <View style={{flexDirection:'row' }}>
                  <Text>
                    {upcom.title}
                  </Text>
                </View>
            </View>
          )
        })
        }
      </View>
    )
  }
  
  const Tab2Content = () => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const red  =  database().ref('null/plants/'+user.uid)
    const  blue =  red.toString().split('/')[3];
    if(user.uid == blue){
      const taskUp = database().ref('users/'+user.uid+'/plants/'+user.uid+title +'/taskUpcoming')
      taskUp.on('value', (snapshot) => {
        const firebaseData = snapshot.val();
          const dataArray = Object.values(firebaseData);
          const sorted = dataArray.sort((a,b)=>{
            const dateA = new Date(`${a.dateAction}`).valueOf();
            const dateB = new Date(`${b.dateAction}`).valueOf();
            if(dateA > dateB){
              return 1; // return -1 here for DESC order
            }
            return -1 // return 1 here for DESC Order
          });
          setTaskUpc(sorted);
          //console.log('firebaseData: ',taskUpcom)
      });
      //console.log('taskUp:' ,taskUpcom) 
      // Sort dates in ascending order
      //const sortedDates = [...taskUp.dateAction].sort((a, b) => a - b);
      //console.log('Date Sorted: ',sortedDates)
      //setTaskUpc(taskUp)

    }
    //else {
      // console.log('Data not fetch!')
      // console.log('User UID: ',user.uid)
      // console.log('Database: ',red)
      // console.log('Blue: ',blue)
      //console.log('Blue: ')
    //}
    //const sortedDates = [...taskUpcom].sort((a, b) => a.dateAction - b.dateAction);


    return( 
 
      <View dtyle={{margin:20}} >
      {
        taskUpcom.map((upcom,index2) => {
          return(
            <View key={index2} style={{borderWidth:2, margin:10,marginTop:20,marginBottom:20}}>
                <View style={{flexDirection:'row' }}>
                  <Text>
                    {upcom.action}
                  </Text>
                </View>
                <View style={{flexDirection:'row' }}>
                  <Text>
                    {upcom.dateAction}
                  </Text>
                </View>
                <View style={{flexDirection:'row' }}>
                  <Text>
                    {upcom.title}
                  </Text>
                </View>
            </View>
          )
        })
        }
      </View>
    )
  }
  
  const Tab3Content = () => {
 
    return( 
 
      <View dtyle={{margin:20}} >
      {
        taskUpcom.map((upcom,index2) => {
          return(
            <View key={index2} style={{borderWidth:2, margin:10,marginTop:20,marginBottom:20}}>
                <View style={{flexDirection:'row' }}>
                  <Text>
                    {upcom.action}
                  </Text>
                </View>
                <View style={{flexDirection:'row' }}>
                  <Text>
                    {upcom.dateAction}
                  </Text>
                </View>
                <View style={{flexDirection:'row' }}>
                  <Text>
                    {upcom.title}
                  </Text>
                </View>
            </View>
          )
        })
        }
      </View>
    )
  }
  

 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 20, backgroundColor: 'white', height: '100%' }}>
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingBottom: 5, alignItems: 'center' }}>
          <Text style={{ fontSize: 20, color: '#276653', fontWeight: 'bold' }}>Task</Text>
        </View> */}

        <View >
          <ScrollView horizontal={true} style={{ paddingBottom: 10 }}>
            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>

            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>

            <View style={{ margin: 5 }}>
              <View style={[styles.cardDashboardPestDiseaseProp, { backgroundColor: 'white', borderRadius: 15, width: undefined, padding: 15, paddingRight: 20, paddingLeft: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
                  <Text style={{ fontWeight: 'bold', color: '#276653', fontSize: 16 }}>Water</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View >
          <View >
            <View style={{flexDirection:'row', justifyContent:'space-between',   borderBottomWidth:1 ,borderColor:'gray'}}>
            <TouchableOpacity onPress={() => setActiveTab('tab1')} style={[styles.tabItem, activeTab === 'tab1' && styles.activeTab]}>
                <View style={{padding:20}}>
                <Text style={[activeTab === 'tab1' && styles.activeText, { fontWeight:'bold', fontSize:16}]}>Today</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab('tab2')} style={[styles.tabItem, activeTab === 'tab2' && styles.activeTab]}>
                <View style={{padding:20}}>
                  <Text style={[activeTab === 'tab2' && styles.activeText, { fontWeight:'bold', fontSize:16}]}>Upcoming</Text>
                </View>
              </TouchableOpacity>
            
             <TouchableOpacity onPress={() => setActiveTab('tab3')} style={[styles.tabItem, activeTab === 'tab3' && styles.activeTab]}>
                <View style={{padding:20}}>
                <Text style={[activeTab === 'tab3' && styles.activeText, { fontWeight:'bold', fontSize:16}]}>Completed</Text>
                </View>
              </TouchableOpacity>
            
            </View>
            <View style={{height:Dimensions.get('window').height/1.6}}>
            <ScrollView  >
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
      <PlantStack.Screen name="Note" component={Note} />
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
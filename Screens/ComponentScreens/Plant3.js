//import axios from 'axios';
import moment from "moment";
import React, { useEffect, useState, useFonts, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FloatingAction } from "react-native-floating-action";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from '@react-native-firebase/storage';
import DatePicker from 'react-native-date-picker'
import database from '@react-native-firebase/database';
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
  return (

    <View style={{ flex: 1, backgroundColor: '#cbdeda' }}>
      <StatusBar
        animated={true}
        barStyle={statusBarStyle}
        translucent={true} />
      <ScrollView>
        <View style={styles.accountcontainer}>

          <View>
            <View style={styles.cardDataPlant}>
              <View style={styles.div2RowSpaceEvenNoAlignItems}>
                <Pressable
                  onPress={() => {
                    // navigation.navigate()
                    alert(plantData)
                  }}>
                  <View style={styles.div2Row}>
                    <Image source={require('../../src/images/garlic2.png')} style={{ width: 50, height: 50, borderRadius: 50 / 2, marginRight: 10 }} />
                    <View>
                      <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 17 }}>Garlic1-Suyo</Text>
                      <Text>Dec. 03, 2022</Text>
                    </View>
                  </View>
                </Pressable>
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
    </View >

  )
}

function PlantID({ route, navigation }) {

  const apiKey = 'c90f776ca6f447d182204634220807';

  const newdate = new Date();
  const [datacollect, setDataColllected] = useState('');
  const [dataArray, setDataArray] = useState([]);
  const currentTimeCheck = moment(new Date().getHours()).format('hh:mm A');

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

 
  const [open, setOpen] = useState(false)
  const [plantTitle, setPlantTitle] = useState('')
  const [plantVariety, setPlantVariety] = useState('')
  const [plantDate, setPlantDate] = useState(new Date())
  const [plantAddress, setPlantAddress] = useState('')
  const [dataloading, setDataloading] = useState(false);
  const [image, setImage] = useState(null); //Test
  const [imagePathCapture, setimagePathCapture] = useState(null);  //ImagePicker
  const [uploading, setUploading] = useState(false);    //setUploaders
  const [downloadURL, setDownloadURL] = useState(null);   //imagelink uploader getdownload image
  const [transferred, setTransferred] = useState(0);    //Progress upload  image



  // if plantDate is <= 30days
  // then Camera and upload enable


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




  // };

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
    LogBox.ignoreAllLogs();
    // const blob = await fetch(imagePathCapture).then((res) => res.blob());
    // const storageRef = database.storage().ref();
    // const imageRef = storageRef.child('images/' + new Date().getTime() + '.jpg');
    // await imageRef.put(blob);
    // const url = await imageRef.getDownloadURL();
    // setDownloadURL(url);
    // dbRef.push({ url });
    // alert('Test');


    const uri  = imagePathCapture;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);

    alert(filename)
    alert(uploadUri)
    console.log('cls')
    console.log(filename)

    const task = database.storage().ref().child('images').putFile(uploadUri);
    const imageU = await  task.getDownloadURL();
    setDownloadURL(imageU)
    // set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
      alert(downloadURL)
    });

    // try {
    //   await task;
    //      database()
    //     .ref('plants/' + user.uid + plantTitle)
    //     .set({
    //       image: downloadURL,
    //       title: plantTitle,
    //       variety: plantVariety,
    //       date: plantDate.toISOString(),
    //       plantAddress: plantAddress
    //     }).then(() => {
    //        navigation.goBack();
    //       alert('Plant data stored successfully!')

    //     });
    // } catch (e) {
    //   console.log(e);
    // }

    // setUploading(false);

    // Alert.alert(
    //   'Photo uploaded!',
    //   'Your photo has been uploaded to Firebase Cloud Storage!'
    // );

    // setImage(null);


    // if(!imagePathCapture.trim()){
    //   alert('Insertt images')
    // }
    //   else if (!plantTitle.trim()) {
    //   alert('Please enter title!');
    //   return;
    // } else if (!plantVariety.trim()) {
    //   alert('Please enter variety!');
    //   return;
    // } else if (!plantAddress.trim()) {
    //   alert('Please enter address!');
    //   return;
    // }
    // else {
    //   database()
    //     .ref('plants/' + user.uid + plantTitle)
    //     .set({
    //       title: plantTitle,
    //       variety: plantVariety,
    //       date: plantDate.toISOString(),
    //       plantAddress: plantAddress
    //     }).then(() => {
    //       // console.log('Plant data stored successfully!')
    //       // navigation.navigate('PlantID')
    //       alert('Plant data stored successfully!')

    //     });

    // }
    // console.log('TITLE', plantTitle)
    // console.log('VARIETY', plantVariety)
    // console.log('DATE', plantsDate.toISOString())
    // console.log('PLANT ADDRESS', plantAddress)
    
  }

  const dataUpload = async () => {

  }

  return (
    <View style={{ flex: 1, backgroundColor: '#AADCB6' }}>
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


             {
              uploading ? ( <View style={styles.progressBarContainer}>
                                <Progress.Bar progress={transferred} width={300} />
                            </View>
                            ) : null
              }

              {/* Test */}
              {/* {image !== null ? (
                <Image source={{ uri: image.uri }} style={styles.imageBox} />
              ) : null}
              {uploading ? (
                <View style={styles.progressBarContainer}>
                  <Progress.Bar progress={transferred} width={300} />
                </View>
              ) : (
                <TouchableOpacity style={{zIndex:100}} onPress={uploadImage}>
                  <Text style={styles.buttonText}>Upload image</Text>
                </TouchableOpacity>
              )} */}


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
      <PlantStack.Screen name="PlantID" component={PlantID} />
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
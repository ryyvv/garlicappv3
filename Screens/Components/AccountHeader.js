import moment from 'moment';
import React, { useContext, useState, useRef, useEffect } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { AuthContext } from '../Context/AuthProvider';
import RBSheet from "react-native-raw-bottom-sheet";
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Button,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    PermissionsAndroid,
    Platform,
    TextInput,
    Alert,
    ActivityIndicator,
    Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from '../Components/BottomSheet'
import styles from '../../src/css/styles';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';

import database from '@react-native-firebase/database';


export default function AccountHeader({ navigation }) {
    const refRBSheet = useRef();
    const { logout, user } = useContext(AuthContext)
    const hidden = true;
    const statusBarStyle = 'dark-content';
    const [imagePathCapture, setimagePathCapture] = useState();
    const [imageContent, setimageContent] = useState('');
    const [uploadingImage, setuploadingImage] = useState(false)
    const [transferedImage, settransferedImage] = useState(0)
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [dateSync, setdateSync] = useState('')

    const userID = 'userData/' + user.id;  // userID

    // updateUserData
    const UserUpdate = async () => {
        // const storage = getStorage();
        // const imagesRef = ref(storage, 'userProfilepic');
        // const spaceRef = ref(storage, 'images/space.jpg');
        // if (imageContent === null) {
        //     alert('Please choose an image!');
        // }
        // else {
        //     //create data to realtime database       
        //     database()
        //         .ref('userData/1112tsghtwehr3q')
        //         .set({
        //             userid: '1112tsghtwehr3q',
        //             email: email,
        //             Address: address,
        //             dataSync: now,
        //             userProfile: 'NONE'

        //         }).then(() => {
        //             console.log('Data synced')
        //         });
        // }
        // const url = storage().ref('/userProfilepic/' + imagePathCapture).getDownloadURL();
        // console.log(url)

        const uploadURI = imagePathCapture;
        let filename = uploadURI.substring(uploadURI.lastIndexOf('/') + 1);
        console.log(filename)

        const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/` + filename;
        // uploads file
        console.log(pathToFile)
        await storage().ref('userProfilepic/').putFile(pathToFile);
        // setuploadingImage(true)
        // settransferedImage(0)
        // const task = storage().ref('/userProfilepic/' + filename).putFile(uploadURI);
        // // set transfered state
        // task.on('state_changed', taskSnapshot => {
        //     console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);

        //     // loadingState
        //     settransferedImage(
        //         Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
        //     );
        // });

        // task.then(() => {
        //     console.log('Image uploaded to the bucket!');
        //     let imageRef = storage().ref('userProfilepic/' + filename)
        //     imageRef.getDownloadURL()
        //         .then((url) => {
        //             //from url you can fetched the uploaded image easily
        //             setimagePathCapture(url);
        //         })
        //         .catch((e) => console.log('getting downloadURL of image error => ', e));

        // });
        // try {
        //     // uploading image file
        //     await task

        //     setuploadingImage(false)
        //     Alert.alert(
        //         'Image uploaded!',
        //         'Your image has been uploaded to database successfully!'
        //     )
        // } catch (e) {
        //     console.log(e)
        // }

        // let userUid = auth().currentUser.uid
        // database()
        //     .ref('userData/' + userUid)
        //     .set({
        //         userid: userUid,
        //         email: email,
        //         Address: address,
        //         dataSync: now,
        //         userProfile: imagePathCapture,

        //     }).then(() => {
        //         console.log('Data synced')
        //     });
        // setimagePathCapture(null)
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


    //UserProfile
    const UserProfile = async (imageContent) => {
        const url = await storage().ref('/userProfilepic/' + imageContent).getDownloadURL();
    }
    // userName
    const UserName = async () => {
        await database().ref('/userData/' + user.uid).once('value').then(snapshot => {
            // console.log('UserD data: ', snapshot.val().Address);
            const val = snapshot.val().userName;
            setName(val)
        })
    }

    // userName
    const UserEmail = () => {
        setEmail(user.email);
    }
    
    // userAddress
    const UserAddress = async () => {
        await database().ref('/userData/' + user.uid).once('value').then(snapshot => {
            // console.log('UserD data: ', snapshot.val().Address);
            const val = snapshot.val().Address;
            setAddress(val)
        })
    }

    // userName
    const UserDate = async () => {
        await database().ref('/userData/' + user.uid).once('value').then(snapshot => {
            // console.log('UserD data: ', snapshot.val().Address);
            const val = snapshot.val().dateSync;
            setdateSync(val)
        })
    }

    useEffect(() => {
        // Date 
        let now = moment().utcOffset(15.2).format('l');

        UserEmail(); // userEmail
        UserName();  //userName
        UserAddress(); //userAddress
        UserDate(); // last date synced

    }, []);




    // imageDefault
    const ImageDefault = () => {
        return (
            <Image source={require('../../src/icons/useraccount.png')} style={{ width: 33, height: 30, margin: 20 }} />
        )
    }

    // ImageChange
    const ImageChange = (props) => {
        return (
            <Image source={{ uri: imagePathCapture }} style={{ width: '100%', height: 70, alignItems: 'center', borderRadius: 10 }} />
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
        <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#AADCB6' }}>
            <ImageBackground source={require('../../src/images/garlicbg2.png')} resizeMode="cover" style={{ flex: 1, }}>
                <ScrollView>
                    <View style={{ margin: 15 }}>
                        <View style={styles.div2RowSpaceBetween}>
                            <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 30 }}>My Account</Text>
                            {/* <Text>userID: {user.uid}</Text> */}
                        </View>

                        {/* icon */}
                        <View style={{ marginTop: 60 }}>
                            <View style={{ marginBottom: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: '27%', backgroundColor: '#AADCB6', padding: 10, borderRadius: 20 }}>
                                    <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                                        <View style={{ borderRadius: 15 }}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 15 }}>
                                                {
                                                    imagePathCapture == null ? <ImageDefault /> : <ImageChange />
                                                }
                                            </View>
                                            <View style={{ position: 'absolute', backgroundColor: 'white', marginTop: 48, marginLeft: -15, padding: 5, borderRadius: 10, borderWidth: 1, borderColor: '#AADCB6' }}>
                                                <Icon name={"pencil-outline"} color={'#276653'} size={20} style={{ width: -33 }} />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <RBSheet
                            ref={refRBSheet}
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
                                    Add Profile Picture
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

                        {
                            uploadingImage ? (

                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={true}
                                    onRequestClose={() => {
                                        Alert.alert("Modal has been closed.");
                                        setModalVisible(!modalVisible);
                                    }}
                                >
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <Text>{transferedImage}% of Completed!</Text>
                                            <ActivityIndicator size="small" color="#276653" />
                                        </View>
                                    </View>
                                </Modal>) : null

                        }
                        <View>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={{ paddingLeft: 15, color: '#8eb4a9', fontWeight: 'bold' }}>Name</Text>
                                <View style={[styles.profileTextIcon, styles.div2Row]}>
                                    <Icon name={"account-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 8 }} />
                                    <TextInput placeholder={name} value={name} onChangeText={text => setName(text)} style={styles.profileTextinput} />
                                </View>
                            </View>

                            <View style={{ marginBottom: 15 }}>
                                <Text style={{ paddingLeft: 15, color: '#8eb4a9', fontWeight: 'bold' }}>Email</Text>
                                <View style={[styles.profileTextIcon, styles.div2Row]}>
                                    <Icon name={"email-outline"} color={'#276653'} size={23} style={{ width: 22, marginRight: 8 }} />
                                    <TextInput placeholder={email} value={email} onChangeText={text => setEmail(text)} style={styles.profileTextinput} />
                                </View>
                            </View>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={{ paddingLeft: 15, color: '#8eb4a9', fontWeight: 'bold' }}>Address</Text>
                                <View style={[styles.profileTextIcon, styles.div2Row]}>
                                    <Icon name={"map-marker-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 8 }} />
                                    <TextInput placeholder={address} value={address} onChangeText={text => setAddress(text)} style={styles.profileTextinput} />
                                </View>
                            </View>
                            <View style={{ marginTop: 10, alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={UserUpdate} >
                                    <View style={[styles.dataSyncicon, styles.div2Row]}>
                                        <Icon name={"cached"} color={'white'} size={20} style={{ marginRight: 1 }} />
                                        <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold', padding: 3 }}>Data sync</Text>
                                    </View>
                                </TouchableOpacity>
                                <View>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 5 }}>Last sync: Tuesday, Dec. 23, 2022 </Text>
                                </View>
                            </View>
                        </View>
                        {/* Logout */}
                        <View style={{ marginTop: 40 }}>
                            <View style={{ marginTop: 20, alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => { logout() }}>
                                    <View style={[styles.profilelogoutbutton, styles.cardprofileicon, styles.div2Row]}>
                                        <Icon name={"logout"} color={'#276653'} size={25} style={{ marginRight: 8 }} />
                                        <Text style={{ fontSize: 16, color: '#276653', fontWeight: 'bold', }}>Logout</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </ImageBackground >
        </SafeAreaView >
    )
}

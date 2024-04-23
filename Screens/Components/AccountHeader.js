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
    Pressable
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from '../Components/BottomSheet'
import styles from '../../src/css/styles';


import database from '@react-native-firebase/database';
import Storage from '@react-native-firebase/storage';
import { LazyLoadImage } from 'react-native-lazy-load-image';
import checkGIF from '../../src/images/CheckComplete.gif'
import successCheck from '../../src/images/successCheck.png'

export default function AccountHeader({ navigation }) {
    const refRBSheet = useRef();
    const { logout, user } = useContext(AuthContext)
    const hidden = true;
    const statusBarStyle = 'dark-content';
    const [imagePathCaptureUserProfile, setimagePathCaptureUserProfile] = useState('icon');
    const [imageContent, setimageContent] = useState('icon');
    const [uploadingImage, setuploadingImage] = useState(false)
    const [transferedImage, settransferedImage] = useState(0)
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('Please enter your address')
    const [message, setMessage] = useState('Connected')
    const [dateSync, setdateSync] = useState('')
    const [userContent, setUserContent] = useState([])
    const [modalVisible, setModalVisible] = useState(false);

    const userID = 'userData/' + user.id;  // userID

    useEffect(() => {
        // Date 
        let now = moment().utcOffset(15.2).format('l');
        displayAccountDetails();
    }, []);


    const displayAccountDetails = async () => {
        const dataImage = database().ref('/users/' + user.uid + '/userData/')
        dataImage.on('value', (snapshot) => {
            const userProfileVal = snapshot.val()

            setimageContent(userProfileVal.userProfile)
            setName(userProfileVal.userName)
            setEmail(userProfileVal.email)
            setAddress(userProfileVal.Address)
            setMessage(userProfileVal.message)
            setdateSync(userProfileVal.dataSync)
            setUserContent(userProfileVal)
           
        })
    }

    const uploadUserData = async () => {
        console.log('dataSync Clicked!')
        console.log('UserDetails-AcountHeader:  ', userContent);
        //let now = moment().utcOffset(15.2).format('l');
        const date = new Date();
        let now = moment(date).format('LL');

        if (imageContent == null || imageContent == '') {
            console.log('imageContent == null&_!');
            if (imagePathCaptureUserProfile != null) {
                setdateSync(now)
                const imagePath = imagePathCaptureUserProfile;
                let filename = imagePath.substring(imagePath.lastIndexOf('/') + 1);
                const uploadUri = Platform.OS === 'ios' ? imagePath.replace('file://', '') : imagePath;
                setuploadingImage(true);
                settransferedImage(0);

                console.log('Upload new user profile! ', filename);
                 
                // storagePath and imagePath
                const imageURL = Storage().ref('userProfilepic/' + filename).putFile(uploadUri)

                imageURL.on('state_changed', snapshot => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                    console.log(`Upload complete!`);

                    setTransferred(
                        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                });

                //imageURL then
                imageURL.then(async () => {
                    // get imageDownloadURL
                    const downloadURL = await Storage().ref('userProfilepic/' + filename).getDownloadURL();

                    //store data in realtime database
                    //database().ref('/plants/' + user.uid + plantTitle)
                    database().ref('/users/'+ user.uid + '/userData/')
                        .set({
                            userid: user.uid,
                            userProfile: downloadURL,
                            name: name,
                            email: email,
                            Address: address,
                            message: message,
                            dataSync: dateSync,
                        })
                        .then(async () => {
                            //alert('UserData updated successfully!') 
                            setModalVisible(true)
                        });
 
                });

                try {
                    await imageURL;

                } catch (e) {
                    console.error(e);
                }

                setuploadingImage(false);
                //setImage(null);
            }
        } else {
            console.log('imageContent != null!');
            if (imagePathCaptureUserProfile != null) {
                setdateSync(now)
                const imagePath = imagePathCaptureUserProfile;
                let filename = imagePath.substring(imagePath.lastIndexOf('/') + 1);
                const uploadUri = Platform.OS === 'ios' ? imagePath.replace('file://', '') : imagePath;
                setuploadingImage(true);
                settransferedImage(0);

                //console.log('Upload new user profile! ', imageName);
                 
                // storagePath and imagePath
                const imageURL = Storage().ref('userProfilepic/' + filename).putFile(uploadUri)

                imageURL.on('state_changed', snapshot => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                    console.log(`Upload complete!`);

                    setTransferred(
                        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                });

                //imageURL then
                imageURL.then(async () => {
                    // get imageDownloadURL
                    const downloadURL = await Storage().ref('userProfilepic/' + filename).getDownloadURL();

                    //store data in realtime database
                    //database().ref('/plants/' + user.uid + plantTitle)
                    database().ref('/users/'+ user.uid + '/userData/')
                        .set({
                            userProfile: downloadURL,
                            name: name,
                            email: email,
                            Address: address,
                            userid: user.uid,
                            message:'Connected',
                            dataSync: dateSync,
                        })
                        .then(async () => {
                            //alert('UserData updated successfully!') 
                            setModalVisible(true)
                        });
 
                });

                try {
                    await imageURL;

                } catch (e) {
                    console.error(e);
                }

                setuploadingImage(false);
                //setImage(null);
            }else {
                setdateSync(now)
                database().ref('/users/'+ user.uid + '/userData/')
                .set({
                    userProfile: imageContent,
                    name: name,
                    email: email,
                    Address: address,
                    userid: user.uid,
                    message:'Connected',
                    dataSync: dateSync,
                })
                .then(async () => {
                    //alert('UserData updated successfully!') 
                    setModalVisible(true)
                });
            }
        }
    }


    // imageDefault
    const ImageDefault = () => {
        return (
            <Image source={require('../../src/icons/useraccount.png')} style={{ width: 33, height: 30, margin: 20 }} />
        )
    }

    // ImageChange
    const ImageChange = (props) => {
        return (
            //<Image source={{ uri: imagePathCaptureUserProfile }} style={{ width: '100%', height: 70, alignItems: 'center', borderRadius: 10 }} />
             <LazyLoadImage source={{ uri: imageContent }} resizeMode='center' style={{ width: 70,height: 70, alignItems: 'center', borderRadius: 10 }} />
        )
    }

    // CamProperties
    let optioncam = {
        saveToPhotos: true,
        mediaType: 'photo',
        cameraType: 'front',
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

    // imageCameraPermission
    const AndroidPermissionCameraUserProfile = async () => {
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
                    alert('No images in gallery selected!')
                }
                setimagePathCaptureUserProfile(resultImageCaptured.assets[0].uri);

            } else {
                console.log("Camera permission denied");
                alert("Camera permission denied")
            }
        } catch (error) {
            //alert('Please try again!')
            console.log(error)
        }
    }

    // imageUploadPermission
    const imageLibraryUserProfile = async () => {

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

                if (resultImageToUpload.didCancel == true) {
                    alert('Please try again!')
                    // alert('No images in gallery selected!')
                }
                setimagePathCaptureUserProfile(resultImageToUpload.assets[0].uri);
                //alert(imagePathCaptureUserProfile)
                RBSheet.close()
            } else {
                console.log("Camera permission denied");
                alert("Camera permission denied")
            }
        } catch (error) {
            //alert('Please try again!', error)
            console.log(error)
        }
    }

    const profileClose = () => {
        console.log("Location changed!")
        refRBSheet.current.close()
    }


    return (
        <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#AADCB6' }}>
            <ImageBackground source={require('../../src/images/garlicbg2.png')} resizeMode="cover" style={{ flex: 1, }}>
                <ScrollView>
                    <View style={{ margin: 15 }}>
                        <View style={styles.div2RowSpaceBetween}>
                            <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 30 }}>My Account</Text>
                            
                        </View>

                        {/* icon */}
                        <View style={{ marginTop: 60 }}>
                            <View style={{ marginBottom: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: '27%', backgroundColor: '#AADCB6', padding: 10, borderRadius: 20 }}>
                                    <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                                        <View style={{ borderRadius: 15 }}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 15 }}>
                                                {
                                                    imageContent == 'icon' ? <ImageDefault /> : <ImageChange />
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
                        
                        {/* Modal Camera */}
                        <RBSheet
                            ref={refRBSheet}
                            closeOnDragDown={true}
                            closeOnPressMask={true}
                            closeDuration={300}
                            openDuration={300}
                            height={230}
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
                            <View style={{ marginTop: 5, paddingLeft: 48, paddingRight: 25, flexDirection: 'row', marginBottom: 15 }}>
                                <Text style={styles.textCamTitle}>
                                    Add Profile Picture
                                </Text>
                            </View>
                            <View style={{ marginTop: 5, paddingLeft: 25, paddingRight: 25, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <TouchableOpacity
                                    onPress={AndroidPermissionCameraUserProfile}
                                    style={[styles.cardCamera, styles.cardCameraProps]}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ padding: 16, backgroundColor: '#f0f9f6', borderRadius: 10 }}>
                                            <Icon name={"camera-plus-outline"} color={'#6fb591'} size={45} style={{ width: 50 }} />
                                        </View>
                                        <Text style={styles.textCam}>Take a photo</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={imageLibraryUserProfile}
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

                        {/* Modal message */}
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
                                            <Text style={[{ marginTop: 30, fontSize: 18, fontWeight: 'bold' }, styles.modalText]}>Update Personal Info</Text>
                                            <Text style={[{ marginTop: 8 }, styles.modalText]}>Successfully updated your personal Information</Text>
                                            <Pressable
                                                style={{ marginTop: 20 }}
                                                onPress={() => setModalVisible(!modalVisible)}>
                                                <Text style={{ color: 'green', fontSize: 14, textDecorationLine: 'underline' }}>Close</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>


                        {/* form */}
                        <View>
                            <View style={{ marginBottom: 15 }}>
                                {/* <Text style={{ paddingLeft: 15, color: '#8eb4a9', fontWeight: 'bold' }}>{imageContent}</Text> */}
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
                                    <TextInput editable={false} placeholder={email} value={email} onChangeText={text => setEmail(text)} style={styles.profileTextinput}  />
                                    
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
                                    onPress={uploadUserData} >
                                    <View style={[styles.dataSyncicon, styles.div2Row]}>
                                        <Icon name={"cached"} color={'white'} size={20} style={{ marginRight: 1 }} />
                                        <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold', padding: 3 }}>Data sync</Text>
                                    </View>
                                </TouchableOpacity>
                                <View>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 5 }}>Last sync: {dateSync} </Text>
                                </View>
                            </View>
                            {/* endform */}
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

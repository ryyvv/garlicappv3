import React, { useContext, useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { AuthContext } from '../Context/AuthProvider';
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
    TextInput
} from 'react-native';

export default function Camera() {
    const [imagePath, setimagePath] = useState();
    const [imageCaptured, setimageCaptured] = useState();

    let optioncam = {
        saveToPhotos: true,
        mediaType: 'photo',
        cameraType: 'back',
        selectionLimit: 1,
        includeBase64: false,
        // path: 'image',
    };

    let optionImageupload = {
        mediaType: 'photo',
        includeBase64: false,
        // path: 'image',
    };


    // permissionAndroidCamera
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
                alert("You can use the camera");
                const resultImageCaptured = await launchCamera(optioncam)
                if (resultImageCaptured.didCancel == true) {
                    alert('No images selected!')
                }
                setimageCaptured(resultImageCaptured.assets[0].uri);
                console.log("You can use the camera");

            } else {
                console.log("Camera permission denied");
                alert("Camera permission denied")
            }
        } catch (error) {
            alert('No images selected!', error)
        }
    }

    const imageLibrary = async () => {

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
                alert("Gallery opened!");
                const resultImageToUpload = await launchImageLibrary(optionImageupload)
                setimagePath(resultImageToUpload.assets[0].uri);
                if (resultImageToUpload.didCancel == true) {
                    alert('No images in gallery selected!')
                }
                console.log("You can use the camera");

            } else {
                console.log("Camera permission denied");
                alert("Camera permission denied")
            }
        } catch (error) {
            alert('No images in gallery selected!', error)
        }
    }

    return (
        <View>
            <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity
                    onPress={AndroidPermissionCamera}
                    style={{
                        backgroundColor: '#AADCB6', borderColor: '#276653', borderWidth: 0.8, borderRadius: 10, padding: 10,
                    }}>
                    <Text>Open Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={imageLibrary}
                    style={{
                        backgroundColor: '#AADCB6', borderColor: '#276653', borderWidth: 0.8, borderRadius: 10, padding: 10,
                    }}>
                    <Text>Open Gallery</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
                <View>
                    <Text>Image Captured</Text>
                    <Image style={{ width: 100, height: 100 }} source={{ uri: imageCaptured }} />
                </View>
                <View>
                    <Text>Image Uploaded</Text>
                    <Image style={{ width: 100, height: 100 }} source={{ uri: imagePath }} />
                </View>
            </View>
        </View >
    )
}
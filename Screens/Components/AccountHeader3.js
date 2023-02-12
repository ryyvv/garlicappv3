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
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AccountHeader({ navigation }) {
    const { logout, user } = useContext(AuthContext)
    const hidden = true;
    const statusBarStyle = 'dark-content';


    // useEffect()

    const ImageDefault = () => {
        return (
            <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 15 }}>
                <Icon name={"account-outline"} color={'#276653'} size={33} style={{ width: -33 }} />
            </View>
        )
    }

    const ImageChange = (props) => {
        return (
            <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Icon name={"account-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 8 }} />
            </View>
        )
    }

    return (
        <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#AADCB6' }}>
            <ImageBackground source={require('../../src/images/garlicbg2.png')} resizeMode="cover" style={{ flex: 1, }}>
                <ScrollView>
                    <View style={{ margin: 15 }}>
                        <View style={styles.div2RowSpaceBetween}>
                            <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 30 }}>My Account</Text>
                            <Text>userID: {user.uid}</Text>
                        </View>

                        {/* icon */}
                        <View>
                            <View style={{ marginBottom: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: '27%', backgroundColor: '#AADCB6', padding: 10, borderRadius: 20 }}>
                                    <TouchableOpacity>
                                        <ImageDefault />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* <TouchableOpacity>
                                <View >
                                    <View>
                                        <Icon name={"home-outline"} color={'#276653'} size={30} style={{ marginVertical: -50, marginHorizontal: 130 }} />
                                    </View>
                                </View>
                                <View style={{ backgroundColor: 'white' }}>
                                    <Icon name={"pencil-outline"} color={'#276653'} size={30} style={{ marginVertical: -50, marginHorizontal: 130 }} />
                                </View>
                            </TouchableOpacity> */}
                        </View>
                        <View>
                            {/* <View style={{ marginBottom: 15 }}>
                            <Text style={{ paddingLeft: 15, color: '#8eb4a9', fontWeight: 'bold' }}>Name</Text>
                            <View style={[styles.profileTextIcon, styles.div2Row]}>
                                <Icon name={"account-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 8 }} />
                                <TextInput placeholder='Name' style={styles.profileTextinput} />
                            </View>
                        </View> */}

                            {/* <View style={{ marginBottom: 15 }}>
                                <Text style={{ paddingLeft: 15, color: '#8eb4a9', fontWeight: 'bold' }}>Email</Text>
                                <View style={[styles.profileTextIcon, styles.div2Row]}>
                                    <Icon name={"email-outline"} color={'#276653'} size={23} style={{ width: 22, marginRight: 8 }} />
                                    <TextInput placeholder='pascualryan134@gmail.com' style={styles.profileTextinput} />
                                </View>
                            </View>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={{ paddingLeft: 15, color: '#8eb4a9', fontWeight: 'bold' }}>Address</Text>
                                <View style={[styles.profileTextIcon, styles.div2Row]}>
                                    <Icon name={"map-marker-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 8 }} />
                                    <TextInput placeholder='Address' style={styles.profileTextinput} />
                                </View>
                            </View>
                            <View style={{ marginTop: 10, alignItems: 'center' }}>
                                <TouchableOpacity>
                                    <View style={[styles.dataSyncicon, styles.div2Row]}>
                                        <Icon name={"cached"} color={'white'} size={20} style={{ marginRight: 1 }} />
                                        <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold', padding: 3 }}>Data sync</Text>
                                    </View>
                                </TouchableOpacity>
                                <View>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold', marginTop: 5 }}>Last sync: Tuesday, Dec. 23, 2022 </Text>
                                </View>
                            </View> */}
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

const styles = StyleSheet.create({
    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center'
    },
    images: {
        width: 150,
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
    },
    btnParentSection: {
        alignItems: 'center',
        marginTop: 10
    },
    btnSection: {
        width: 225,
        height: 50,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 10
    },
    btnText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 14,
        fontWeight: 'bold'
    }
}); 
import { View, Text, ImageBackground, StatusBar, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext, useState } from 'react'
import styles from '../../src/css/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../Context/AuthProvider';
import { RDatabase } from '@react-native-firebase/database';
import ImagePicker from 'react-native-image-picker';

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];
export default function AccountHeader({ navigation }) {
    const { logout, user } = useContext(AuthContext)
    const { profile, setProfile } = useState(false);
    const hidden = true;
    const statusBarStyle = 'dark-content';



    return (
        <SafeAreaView edges={['top']} style={{ flex: 1 }}>
            <ImageBackground source={require('../../src/images/garlicbg2.png')} resizeMode="cover" style={{ flex: 1, }}>
                <StatusBar animated={true} barStyle={statusBarStyle} translucent={true} />
                <ScrollView>
                    <View style={styles.accountcontainer}>
                        <View style={styles.div2RowSpaceBetween}>
                            <Text style={{ color: '#276653', fontWeight: 'bold', fontSize: 30 }}>My Account</Text>
                            <Text>userID: {user.uid}</Text>
                        </View>
                        {/* icon */}
                        <View>
                            <TouchableOpacity>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={styles.cardProfile}>
                                        <View style={styles.cardProfilepic}>
                                            {/* {profile == '' ? null : isEnabledlogpass == false ? eyesOutline() : eyesOff()} */}
                                            {/* if null set icon::Capture&Upload */}
                                            {/* Dimension */}
                                            <Icon name={"account"} color={'white'} size={30} />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ backgroundColor: 'white' }}>
                                    <Icon name={"pencil-outline"} color={'#276653'} size={30} style={{ marginVertical: -50, marginHorizontal: 130 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={{ paddingLeft: 15, color: '#8eb4a9', fontWeight: 'bold' }}>Name</Text>
                                <View style={[styles.profileTextIcon, styles.div2Row]}>
                                    <Icon name={"account-outline"} color={'#276653'} size={23} style={{ width: 20, marginRight: 8 }} />
                                    <TextInput placeholder='Name' style={styles.profileTextinput} />
                                </View>
                            </View>
                            <View style={{ marginBottom: 15 }}>
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
        </SafeAreaView>
    )
}
import React, { useEffect, useState, useFonts, useContext, createContext } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, Text,
  View, Image, TextInput, TouchableOpacity,
  LogBox, Button
} from 'react-native';
// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { AuthContext } from '../Context/AuthProvider';
import auth from '@react-native-firebase/auth';

export default function Resetpass({ navigation }) {
  LogBox.ignoreAllLogs();
  const [email, setEmail] = useState('');
  const { forgotPassword } = useContext(AuthContext);

  //   Check email format
  const handleloginquery = () => {
    const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

    if (!strongRegex.test(email)) {
      alert('please enter a valid email address');
    } else {
      forgotPassword(email)
      // navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar animated={true} />
      {/* <ImageBackground source={require('../resource/img/garlicLeaf.png')} resizeMode="cover" blurRadius={95} style={styles.image}> */}
      <View style={{ marginLeft: 50, marginRight: 50 }}>
        <View style={{ marginTop: 25 }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 16 }}>
              To reset your password, enter your email address you use to sign in.
            </Text>
          </View>
          {/* username */}
          <View style={styles.loginTextContainer}>
            <Icon name={'account-outline'} style={{ color: 'green' }} size={23} />
            <TextInput placeholder="email" style={styles.loginTextinput} onChangeText={text => setEmail(text)}
              value={email}
            />
            <TouchableOpacity onPress={() => {
              setEmail('');
            }}>
              {email == '' ? null : (
                <Icon name={'close-circle'} style={{ color: 'gray' }} size={23} />
              )}
            </TouchableOpacity>
          </View>

          {/* button */}
          <View>
            <TouchableOpacity
              onPress={() => { handleloginquery() }}
              style={styles.btnLogin}>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/*
  </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  textLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInput: {
    border: 2,
    borderColor: 'green',
    fontSize: 24,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  loginTextContainer: {
    marginTop: 7,
    flexDirection: 'row',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: -25,
    paddingBottom: 5,
    borderRadius: 10,
    borderColor: 'green',
    paddingBottom: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginToSign: {
    marginTop: 7,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: -25,
    paddingBottom: 5,
    borderRadius: 10,
    borderColor: 'green',
    paddingBottom: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginTextinput: {
    flex: 1,
    fontSize: 14,
  },
  btnLogin: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 15,
    paddingTop: 15,
    marginTop: 15,
    borderRadius: 6,
  },
});
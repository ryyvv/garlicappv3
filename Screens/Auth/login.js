import React, { useEffect, useState, useFonts, useContext, createContext } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet, Text,
  View, Image, TextInput, TouchableOpacity,
  LogBox, Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../Context/AuthProvider';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Register from './Register';
import Resetpass from './Resetpass';
import ActivityIndicators from '../ComponentScreens/ActivityIndicators';
// import {UserAuth} from '../Hooks/UserAuth';

export default function Login({ navigation }) {
  LogBox.ignoreAllLogs();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEnabledlogpass, setIsEnabledlogpass] = useState(true);
  const { login, forgotPassword } = useContext(AuthContext);
  const navigate = useNavigation();

  const eyesOff = () => {
    return <Icon name={'eye-outline'} style={{ color: 'gray' }} size={23} />;
  };

  const eyesOutline = () => {
    return <Icon name={'eye-off-outline'} style={{ color: 'gray' }} size={23} />;
  };

  const handleloginquery = () => {
    const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

    if (!login) {
      <ActivityIndicators />
    }
    if (!strongRegex.test(email)) {
      alert('please enter a valid email address');
      return null;
    } else if (password.length < 8) {
      alert('Password should be min 8 char!');
      return null;
    } else {
      login(email, password)
      console.log('Please wait...');
    }
  }


  return (
    <View style={styles.container}>
      <StatusBar animated={true} />
      {/* <ImageBackground source={require('../resource/img/garlicLeaf.png')} resizeMode="cover" blurRadius={95} style={styles.image}> */}
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',

      }}>
        <Image source={require('../../src/images/garliclogo.png')} style={{ width: 210, height: 200 }} />
      </View>
      <View style={{ marginLeft: 50, marginRight: 50 }}>
        <View>
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
          {/* password */}
          <View style={styles.loginTextContainer}>
            <Icon name={'lock-outline'} style={{ color: 'green' }} size={23} />
            <TextInput name={password}
              placeholder="password"
              style={styles.loginTextinput}
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry={isEnabledlogpass}
            // secureTextEntry={isEnabled}
            />
            <TouchableOpacity onPress={() => {
              isEnabledlogpass == true ? setIsEnabledlogpass(false) : setIsEnabledlogpass(true);
            }}>
              {password == '' ? null : isEnabledlogpass == false ? eyesOutline() : eyesOff()}
            </TouchableOpacity>
          </View>

          {/* ForgotPassword */}
          <View style={{ alignItems: 'flex-end', marginTop: 8 }}>
            <TouchableOpacity
              onPress={() => { navigation.navigate(Resetpass) }}>
              <Text style={{
                fontStyle: 'italic',
                color: '#219ebc',
                textDecorationLine: 'underline',
              }}>
                Forgot password
              </Text>
            </TouchableOpacity>
          </View>

          {/* button */}
          <View>
            <TouchableOpacity
              onPress={() => { handleloginquery() }}
              style={styles.btnLogin}>
              <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>

          {/* SignUp */}
          <View style={styles.loginToSign}>
            <Text style={{ color: 'gray', fontSize: 16 }}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => { navigation.navigate(Register) }}>
              <Text style={{
                fontStyle: 'italic',
                fontWeight: 'bold',
                color: '#219ebc',
                fontSize: 16,
              }}> Sign up</Text>
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
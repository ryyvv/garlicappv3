import React, { useEffect, useState, useContext, useFonts } from 'react';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  LogBox
} from 'react-native';
import { AuthContext } from '../Context/AuthProvider';
import auth from '@react-native-firebase/auth';
import Login from './login';

const Register = ({ navigation }) => {
  LogBox.ignoreAllLogs();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpass, setConfirmpass] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);
  const [isEnabled2, setIsEnabled2] = useState(true);
  const { register } = useContext(AuthContext)

  const eyeOff = () => {
    return <Icon name={'eye-outline'} style={{ color: 'gray' }} size={23} />;
  };

  const eyeOutline = () => {
    return <Icon name={'eye-off-outline'} style={{ color: 'gray' }} size={23} />;
  };

  const registerquery = () => {
    // setErrortext('');
    const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
    if (!strongRegex.test(email)) {
      alert('please enter a valid email address');
      return null;
    }
    else if (password.length < 8) {
      alert('Password should be min 8 char!');
      return null;
    }
    else if (confirmpass.length < 8) {
      alert('Confirm-password should be min 8 char!');
      return null;
    }
    else if (password != confirmpass) {
      alert('Password not matched!');
      return null;
    } else {
      register(email, password)
      console.log('User account created successfully!')
    }
  }

  return (
    // <SafeAreaView>
    // <StatusBar animated={true} />
    <View style={styles.container}>
      {/* <ImageBackground source={require('../resource/img/garlicLeaf.png')} resizeMode="cover" blurRadius={95} style={styles.image}> */}
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Image
          source={require('../../src/images/garliclogo.png')}
          style={{ width: 210, height: 200 }}
        />
      </View>
      <View style={{ marginLeft: 50, marginRight: 50 }}>
        <View>
          {/* username */}
          {/* <View style={styles.loginTextContainer}>
              <Icon
                name={'account-outline'}
                style={{color: 'green'}}
                size={23}
              />
              <TextInput
                placeholder="username"
                style={styles.loginTextinput}
                onChangeText={text => setUsername(text)}
                value={username}
              />
              <TouchableOpacity
                onPress={() => {
                  setUsername('');
                }}>
                {username == '' ? null : (
                  <Icon
                    name={'close-circle'}
                    style={{color: 'gray'}}
                    size={23}
                  />
                )}
              </TouchableOpacity>
            </View> */}

          {/* Email */}
          <View style={styles.loginTextContainer}>
            <Icon
              name={'email-outline'}
              style={{ color: 'green' }}
              size={23}
            />
            <TextInput
              placeholder="email"
              style={styles.loginTextinput}
              onChangeText={text => setEmail(text)}
              value={email}
            />
            <TouchableOpacity
              onPress={() => {
                setEmail('');
              }}>
              {email == '' ? null : (
                <Icon
                  name={'close-circle'}
                  style={{ color: 'gray' }}
                  size={23}
                />
              )}
            </TouchableOpacity>
          </View>
          {/* password */}
          <View style={styles.loginTextContainer}>
            <Icon name={'lock-outline'} style={{ color: 'green' }} size={23} />
            <TextInput
              name={password}
              placeholder="password"
              style={styles.loginTextinput}
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry={isEnabled}
            />
            <TouchableOpacity
              onPress={() => {
                isEnabled == true ? setIsEnabled(false) : setIsEnabled(true);
              }}>
              {password == ''
                ? null
                : isEnabled == false
                  ? eyeOutline()
                  : eyeOff()}
            </TouchableOpacity>
          </View>
          {/* Confirmpassword */}
          <View style={styles.loginTextContainer}>
            <Icon name={'lock-outline'} style={{ color: 'green' }} size={23} />
            <TextInput
              name={confirmpass}
              placeholder="Confirm-password"
              style={styles.loginTextinput}
              onChangeText={text => setConfirmpass(text)}
              value={confirmpass}
              secureTextEntry={isEnabled2}
            />
            <TouchableOpacity
              onPress={() => {
                isEnabled2 == true ? setIsEnabled2(false) : setIsEnabled2(true);
              }}>
              {confirmpass == ''
                ? null
                : isEnabled2 == false
                  ? eyeOutline()
                  : eyeOff()}
            </TouchableOpacity>
          </View>
          {/* button */}
          <View>
            <TouchableOpacity style={styles.btnLogin} onPress={() => { registerquery() }}>
              <Text
                style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
          {/* SignUp */}
          <View style={styles.loginToSign}>
            <Text style={{ color: 'gray', fontSize: 16 }}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => { navigation.navigate('Login') }}>
              <Text
                style={{
                  fontStyle: 'italic',
                  fontWeight: 'bold',
                  color: '#219ebc',
                  fontSize: 16,
                }}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* </ImageBackground> */}
    </View>
    // </SafeAreaView>
  );
}

export default Register;
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

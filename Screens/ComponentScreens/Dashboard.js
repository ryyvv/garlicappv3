//import axios from 'axios';
import moment from "moment";
import React, { useEffect, useState, useRef, useFonts, useContext } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View, Image, LogBox, TouchableOpacity, ImageBackground } from 'react-native';
// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from '../../src/css/styles';
import { AuthContext } from '../Context/AuthProvider';
// import { TouchableOpacity } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";


export default function Dashboard({ navigation }) {
  const refRBSheets = useRef();
  const { logout, user } = useContext(AuthContext)
  const apiKey = 'c90f776ca6f447d182204634220807';
  const newdate = new Date();
  const [currentC, setCurrent] = useState('');
  const [currentDay, setCurrentDay] = useState([]);
  const [currentDayCondition, setCurrentDayCondition] = useState([]);
  const [loc, setLoc] = useState('Batac, Ilocos Norte');
  const [location, setLocation] = useState('');
  const [localTime, setLocaTime] = useState('');
  const [perDay, setperDay] = useState([]);
  const [perHour, setperHour] = useState([]);
  const [conditions, setCondition] = useState('');
  // const currentTimeCheck = moment(new Date().getHours()).format('hh:mm A');

  const getApiCurrent = async () => {
    const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=' + loc + '&days=3&aqi=yes&alerts=yes')
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
      });
    setLocation(response?.location)
    setCurrent(response?.current?.last_updated)
    // setCondition(response?.forecast?.forecastday[0]?.day.condition)
    // setLocaTime(response?.location)
    setperHour(response?.forecast?.forecastday[0]?.hour)
    setperDay(response?.forecast?.forecastday)
    setCurrentDay(response?.forecast?.forecastday[0]?.day)
    setCurrentDayCondition(response?.forecast?.forecastday[0]?.day?.condition)
    //check
    console.log('Current Location: ', location.name)
    console.log('CurrentDate: ', currentC)
    console.log('DayDate: ', currentDay.avgtemp_c)
    console.log('DayMaxTemp: ', currentC.maxtemp_c)
    console.log('CurrentCondition: ', localTime.localtime)
    console.log('CurrentCondition: ', perHour)
    //check
    console.log('Current Location: ', location.name)
    return perHour;
  };

  // PestandDiseasedata
  // const PNDsea = [
  //   {
  //     id: 1,
  //     name: 'Common Worm',
  //     category: 'Pest',
  //     image: [
  //       { image1: require('../../src/PND/Worm1.JPG') },
  //       { image2: require('../../src/PND/Worm2.JPG') },
  //       { image3: require('../../src/PND/Worm3.JPG') },
  //       { image4: require('../../src/PND/Worm4.JPG') },
  //       { image5: require('../../src/PND/Worm5.JPG') },
  //     ]
  //   },
  //   {
  //     id: 2,
  //     name: 'worm',
  //     category: 'Disease',
  //     image: [
  //       { image1: require('../../src/PND/Worm1.JPG') },
  //       { image2: require('../../src/PND/Worm2.JPG') },
  //       { image3: require('../../src/PND/Worm3.JPG') },
  //       { image4: require('../../src/PND/Worm4.JPG') },
  //       { image5: require('../../src/PND/Worm5.JPG') },
  //     ]
  //   },

  // ]



  useEffect(() => {
    getApiCurrent();


  }, []);
  let now = moment().utcOffset(15.2).format('ll');
  const statusBarStyle = 'dark-content';
  return (

    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      {/* <ImageBackground source={require('../../src/images2/Worm5.jpg')} resizeMode="cover" style={{
        flex: 1,
        justifyContent: "center"
      }}> */}
      <ImageBackground source={require('../../src/images/Worm5.jpg')} resizeMode="cover" style={{
        flex: 1,
        justifyContent: "center"
      }}>
        <ScrollView>

          <View style={styles.container}>
            <View style={styles.dashboardWeather}>
              <View style={{ marginBottom: 10, marginTop: 130 }}>
                {/* location */}
                <View style={{ marginBottom: 40 }}>
                  <TouchableOpacity
                    onPress={() => refRBSheets.current.open()}
                  >
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#276653' }}>{loc}</Text>
                      <Text style={{ fontSize: 16, color: '#7D8F69', fontWeight: 'bold' }}>{now}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <RBSheet
                  ref={refRBSheets}
                  closeOnDragDown={true}
                  closeOnPressMask={true}
                  closeDuration={300}
                  openDuration={300}
                  height={550}
                  animationType={'fade'}
                  customStyles={{
                    wrapper: {
                      backgroundColor: 'rgba(52, 52, 52, 0.4)',
                      padding: 40
                    },
                    draggableIcon: {
                      backgroundColor: "#276653",
                    },
                    container: {
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }
                  }}>
                  <View style={{ marginTop: 5, paddingLeft: 38, paddingRight: 35, flexDirection: 'row', }}>
                    <Text style={styles.textCamTitle}>
                      Location
                    </Text>
                  </View>
                  <View style={{ marginTop: 5, paddingLeft: 35, paddingRight: 35, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <ScrollView>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Adams, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Adams</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Bacarra, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Bacarra</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Badoc, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Badoc</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Bangui, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Bangui</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Banna, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Banna</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Batac ,Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Batac</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Burgos, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Burgos</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Carasi, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Carasi</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Currimao, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Currimao</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Dingras, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Dingras</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Dumalneg, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Dumalneg</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Laoag, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Laoag</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Marcos, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Marcos</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Nueva Era, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Nueva Era</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Pagudpud, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Pagudpud</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Paoay, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Paoay</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Pasuquin, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Pasuquin</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Piddig, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Piddig</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Pinili, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Pinili</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('San Nicolas, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>San Nicolas</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Sarrat, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Sarrat</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Solsona, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Solsona</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginBottom: 8 }} >
                        <TouchableOpacity
                          onPress={() => {
                            setLoc('Vintar, Ilocos Norte')
                          }}>
                          <View style={{ padding: 15, borderColor: 'green', borderWidth: 1, borderRadius: 10, }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Vintar</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </ScrollView>
                  </View>
                </RBSheet>
                <View style={[styles.cardDashboard, styles.cardDashboardProp, styles.overlay]}>
                  {/* Data */}
                  <View style={[styles.div2RowSpaceEven, { marginTop: 15 }]}>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ color: '#8eb4a9', fontWeight: 'bold' }}>Temp</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#276653' }}>23°C</Text>
                        <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20 }} />
                      </View>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ color: '#8eb4a9', fontWeight: 'bold' }}>Wind</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#276653' }}>18.7km/h</Text>
                        <Icon name={"weather-windy"} color={'#276653'} size={24} style={{ paddingLeft: 5, marginLeft: -5, width: 20 }} />
                      </View>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ color: '#8eb4a9', fontWeight: 'bold' }}>Humidity</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#276653' }}>75%</Text>
                        <Icon name={"water-outline"} color={'#276653'} size={24} style={{ paddingLeft: -3, marginLeft: -5, width: 25 }} />
                      </View>
                    </View>
                  </View>
                </View>

                {/* WeatherIcon */}
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 100 }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 130, height: 120, marginBottom: 15 }} />
                  <Text style={{ fontWeight: 'bold', fontSize: 19, color: '#276653' }}>Partly cloudly</Text>
                </View>

              </View>
            </View>



            {/* Hourly */}
            <View style={styles.dashboardHourly}>
              <ScrollView horizontal={true}>
                {
                  perHour.map((hours, u) => {
                    return (
                      <View key={u} style={{ marginRight: 12, marginBottom: 10 }}>
                        <View style={[styles.cardDashboardHourly, styles.cardDashboardHourlyProp]}>
                          <View style={styles.div2RowSpaceEven}>
                            <View style={{ padding: 4 }}>
                              <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 45, height: 45 }} />
                            </View>
                            <View style={{ justifyContent: 'flex-end' }}>
                              <Text style={{ fontSize: 14 }}>{moment(hours.time).format("hh:mmA")}</Text>
                              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{hours.temp_c}°C</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  })
                }
              </ScrollView>
            </View>


            {/* Card info */}
            <View style={styles.dashboardRecent}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#8eb4a9' }}>Pest and Diseases</Text>

              {/* flexDirection=row&2Cols */}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                <View style={{ borderRadius: 10, margin: 5, marginTop: 8 }}>
                  <TouchableOpacity>
                    <ImageBackground source={require('../../src/images/sunRAsset2.png')} style={{ width: 160, height: 185 }}>
                      <View style={{ marginTop: '80%', padding: 10, paddingBottom: 20, flexDirection: 'column-reverse' }}>
                        <Text style={{ color: 'white' }}>Pest</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Ryan James Pascual</Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>




              </View>


              <View style={[styles.cardDashboardweatherplantinfo, styles.cardDashboardRecentProp]}>
                <View style={styles.cardDashboardweatherplantinfoinside}>
                  <View style={[styles.div2Row, { margin: 10, paddingLeft: 20, paddingRight: 20 }]}>
                    <View style={styles.div2columnRecent}>
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}> Day</Text>
                      <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'red', opacity: 0.7, marginTop: -6 }}>11</Text>
                    </View>
                    <View style={styles.div2column}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Title_Garlic_1</Text>
                      <Text>09-21-2022 Batac</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={[styles.cardDashboardweatherplantinfo, styles.cardDashboardRecentProp]}>
                <View style={styles.cardDashboardweatherplantinfoinside}>
                  <View style={[styles.div2Row, { margin: 10, paddingLeft: 20, paddingRight: 20 }]}>
                    <View style={styles.div2columnRecent}>
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}> Day</Text>
                      <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'red', opacity: 0.7, marginTop: -6 }}>11</Text>
                    </View>
                    <View style={styles.div2column}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Title_Garlic_1</Text>
                      <Text>09-21-2022 Batac</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={[styles.cardDashboardweatherplantinfo, styles.cardDashboardRecentProp]}>
                <View style={styles.cardDashboardweatherplantinfoinside}>
                  <View style={[styles.div2Row, { margin: 10, paddingLeft: 20, paddingRight: 20 }]}>
                    <View style={styles.div2columnRecent}>
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}> Day</Text>
                      <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'red', opacity: 0.7, marginTop: -6 }}>11</Text>
                    </View>
                    <View style={styles.div2column}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Title_Garlic_1</Text>
                      <Text>09-21-2022 Batac</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>



            {/* <View style={styles.dashboardRecent}>
              <Text style={{ fontSize: 16, marginTop: 70, fontWeight: 'bold', color: '#8eb4a9' }}>Weather Evaluation</Text>
              <View style={[styles.cardDashboardweatherplantinfo, styles.cardDashboardRecentProp]}>

                <View style={styles.cardDashboardweatherplantinfoinside}>
                  <View style={[styles.div2Row, { margin: 10, paddingLeft: 20, paddingRight: 20 }]}>
                    <View style={styles.div2columnRecent}>
                      <Text style={{ fontSize: 12, fontWeight: 'bold' }}> Day</Text>
                      <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'red', opacity: 0.7, marginTop: -6 }}>11</Text>
                    </View>
                    <View style={styles.div2column}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Title_Garlic_1</Text>
                      <Text>09-21-2022 Batac</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View> */}
          </View>
        </ScrollView>
      </ImageBackground>
    </View >
  );
}
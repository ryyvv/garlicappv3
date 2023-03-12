//import axios from 'axios';
import moment from "moment";
import React, { useEffect, useState, useFonts, useContext, useRef } from 'react';
import { SafeAreaView, TouchableOpacity, ScrollView, StatusBar, Text, View, Image, LogBox, ImageBackground } from 'react-native';
// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from '../../src/css/styles';
import { AuthContext } from '../Context/AuthProvider';
import { LocationContext } from '../Context/LocationProvider';
import RBSheet from "react-native-raw-bottom-sheet";

export default function Dashboard({ navigation }) {
  const refRBSheets = useRef();
  const { logout, user } = useContext(AuthContext);
  const [listPD, setListPD] = useState([]);
  const { locations, setLocation, locationList, weatherloc, weatherDate, weatherIcon,
    weatherData, weatherPerHour, weatherCondition, setLOCATION, holdlocation, setWeatherHoldLocation,
    adamsloc, adamsDate, adamsIcon, adamsData, adamsPerHour, adamsCondition,
    bacarraloc, bacarraDate, bacarraIcon, bacarraData, bacarraPerHour, bacarraCondition,
    badocloc, badocDate, badocIcon, badocData, badocPerHour, badocCondition,
    banguiloc, banguiDate, banguiIcon, banguiData, banguiPerHour, banguiCondition,
    batacloc, batacDate, batacIcon, batacData, batacPerHour, batacCondition,
    burgosloc, burgosDate, burgosIcon, burgosData, burgosPerHour, burgosCondition,
    carasiloc, carasiDate, carasiIcon, carasiData, carasiPerHour, carasiCondition,
    currimaoloc, currimaoDate, currimaoIcon, currimaoData, currimaoPerHour, currimaoCondition,
    dingrasloc, dingrasDate, dingrasIcon, dingrasData, dingrasPerHour, dingrasCondition,
    dumalnegloc, dumalnegDate, dumalnegIcon, dumalnegData, dumalnegPerHour, dumalnegCondition,
    espirituloc, espirituDate, espirituIcon, espirituData, espirituPerHour, espirituCondition,
    laoagloc, laoagDate, laoagIcon, laoagData, laoagPerHour, laoagCondition,
    marcosloc, marcosDate, marcosIcon, marcosData, marcosPerHour, marcosCondition,
    nuevaeraloc, nuevaeraDate, nuevaeraIcon, nuevaeraData, nuevaeraPerHour, nuevaeraCondition,
    pagudpudloc, pagudpudDate, pagudpudIcon, pagudpudData, pagudpudPerHour, pagudpudCondition,
    paoayloc, paoayDate, paoayIcon, paoayData, paoayPerHour, paoayCondition,
    pasuquinloc, pasuquinDate, pasuquinIcon, pasuquinData, pasuquinPerHour, pasuquinCondition,
    piddigloc, piddigDate, piddigIcon, piddigData, piddigPerHour, piddigCondition,
    pinililoc, piniliDate, piniliIcon, piniliData, piniliPerHour, piniliCondition,
    sanicolasloc, sanicolasDate, sanicolasIcon, sanicolasData, sanicolasPerHour, sanicolasCondition,
    sarratloc, sarratDate, sarratIcon, sarratData, sarratPerHour, sarratCondition,
    solsonaloc, solsonaDate, solsonaIcon, solsonaData, solsonaPerHour, solsonaCondition,
    vintarloc, vintarDate, vintarIcon, vintarData, vintarPerHour, vintarCondition,

  } = useContext(LocationContext)
  const apiKey = 'c90f776ca6f447d182204634220807';
  const newdate = new Date();

  useEffect(() => {
    PNDiseases();
  }, []);


  const PNDiseases = async () => {
    const dataPD = [
      {
        id: 1,
        pnd: 'Disease',
        name: 'Purple blotch',
        spname: 'Alternaria, Ellis Lif',
        description: 'Disease',
        images: [
          '../../src/images2/Purple1.JPG',
          '../../src/images2/Purple2.JPG',
          '../../src/images2/Purple3.JPG',
          '../../src/images2/Purple4.JPG',
          '../../src/images2/Purple5.JPG',

        ]

      },
      {
        id: 2,
        pnd: 'Insect Pest',
        name: 'Mites',
        spname: 'Aceria tulipae',
        description: 'Insect pest',
        images: [
          '../../src/images2/Tangle1.JPG',
          '../../src/images2/Tangle2.JPG',
          '../../src/images2/Tangle3.JPG',
          '../../src/images2/Tangle4.JPG',
          '../../src/images2/Tangle5.JPG',
        ]

      },
      {
        id: 3,
        pnd: 'Insect Pest',
        name: 'Common worm',
        spname: 'Worm',
        description: 'Insect pest',
        images: [
          '../../src/images2/Purple1.JPG',
          '../../src/images2/Purple2.JPG',
          '../../src/images2/Purple3.JPG',
          '../../src/images2/Purple4.JPG',
          '../../src/images2/Purple5.JPG',
        ]

      },
      {
        id: 4,
        pnd: 'Disease',
        name: 'Garlic rust',
        spname: 'Rust',
        description: 'Disease',
        images: [
          '../../src/images2/Purple1.JPG',
          '../../src/images2/Purple2.JPG',
          '../../src/images2/Purple3.JPG',
          '../../src/images2/Purple4.JPG',
          '../../src/images2/Purple5.JPG',
        ]

      },
      {
        id: 5,
        pnd: 'Disease',
        name: 'Bulb/Root rot',
        spname: 'Fusarium & Sclerotium',
        description: 'Disease',
        images: [
          '../../src/images2/Purple1.JPG',
          '../../src/images2/Purple2.JPG',
          '../../src/images2/Purple3.JPG',
          '../../src/images2/Purple4.JPG',
          '../../src/images2/Purple5.JPG',
        ]

      },
      {
        id: 6,
        pnd: 'Insect Pest',
        name: 'Thrips',
        spname: 'Thrips tabaci Lindeman',
        description: 'Insect pest',
        images: [
          '../../src/images2/Purple1.JPG',
          '../../src/images2/Purple2.JPG',
          '../../src/images2/Purple3.JPG',
          '../../src/images2/Purple4.JPG',
          '../../src/images2/Purple5.JPG',
        ]

      },
      {
        id: 7,
        pnd: 'Disease',
        name: 'Cercospora leaf spot ',
        spname: 'Cercospora duddiae Welles',
        description: 'Disease',
        images: [
          '../../src/images2/Purple1.JPG',
          '../../src/images2/Purple2.JPG',
          '../../src/images2/Purple3.JPG',
          '../../src/images2/Purple4.JPG',
          '../../src/images2/Purple5.JPG',
        ]

      },
      {
        id: 8,
        pnd: 'Disease',
        name: 'Leafolder     ',
        spname: 'Cercospora duddiae Welles',
        description: 'Disease',
        images: [
          '../../src/images2/Purple1.JPG',
          '../../src/images2/Purple2.JPG',
          '../../src/images2/Purple3.JPG',
          '../../src/images2/Purple4.JPG',
          '../../src/images2/Purple5.JPG'
        ],
      }
    ]
    setListPD(dataPD)
  }


  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ImageBackground source={require('../../src/images/garlicbg1.png')} resizeMode="cover" style={{
        flex: 1,
        justifyContent: "center"
      }}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.dashboardWeather}>
              {/* card2 */}
              <View style={{ marginBottom: 10, marginTop: 90 }}>
                {/* location */}
                <View style={{ marginBottom: 40 }}>
                  <TouchableOpacity
                    onPress={() => refRBSheets.current.open()}
                  >
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#276653' }}>{weatherloc.name}, {weatherloc.region}</Text>
                      <Text style={{ fontSize: 16, color: '#7D8F69', fontWeight: 'bold' }}>{moment(weatherDate.date).format("MMMM D, YYYY")}</Text>
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
                      padding: 20,
                      paddingBottom: 30
                    },
                    draggableIcon: {
                      backgroundColor: "#276653",
                    },
                    container: {
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }
                  }}>
                  <View style={{ marginTop: 5, marginBottom: 5, paddingLeft: 25, paddingRight: 35, flexDirection: 'row', }}>
                    <Text style={styles.textCamTitle}>
                      Location
                    </Text>
                  </View>
                  <View style={{ paddingLeft: 15, paddingRight: 15, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <ScrollView style={{ marginBottom: 90 }}>
                      {/* current Location */}
                      <View >
                        <TouchableOpacity
                          onPress={() => {
                            // setLoc('Adams, Ilocos Norte')
                          }}>
                          <View style={styles.dashboardForecastDay}>
                            <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, backgroundColor: '#EAEEE5' }]}>
                              <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>Current location</Text>
                              </View>
                              <View style={styles.div2RowFlexStart}>
                                <View style={{ marginLeft: 18 }}>
                                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                </View>
                                <View style={{ marginRight: 10, }}>
                                  <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                  <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>24</Text>
                                    <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                  </View>
                                  <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>Sunny</Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>


                      {/* List */}
                      <View>
                        <Text>Location {holdlocation}</Text>
                      </View>

                      {/* Adams */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Adams')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{adamsloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{adamsData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{adamsCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* Bacarra */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Bacarra')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{bacarraloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{bacarraData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{bacarraCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* Badoc */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Badoc')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{badocloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{badocData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', }}>{badocCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* bangui */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Bangui')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{banguiloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{banguiData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{banguiCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* Batac */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Batac')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{batacloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{batacData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{batacCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* Burgos */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Burgos')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{burgosloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{burgosData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{burgosCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* Carasi */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Carasi')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{carasiloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{carasiData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{carasiCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* Currimao */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Currimao')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{currimaoloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{currimaoData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{currimaoCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* Dingras */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Dingras')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{dingrasloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{dingrasData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{dingrasCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* Dumalneg */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Dumalneg')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{dumalnegloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{dumalnegData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{dumalnegCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* Espiritu */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Espiritu')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{espirituloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{espirituData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{espirituCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* Laoag */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Laoag')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{laoagloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{laoagData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{laoagCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* Marcos */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Marcos')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{marcosloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{marcosData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{marcosCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* Nueva Era */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Adams')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{nuevaeraloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{nuevaeraData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{nuevaeraCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* Pagudpud */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Adams')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{pagudpudloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{pagudpudData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{pagudpudCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* Paoay */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Paoay')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{paoayloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{paoayData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{paoayCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* Pasuquin */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Adams')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{pasuquinloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{pasuquinData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{pasuquinCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* Piddig */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Piddig')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{piddigloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{piddigData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{piddigCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* Pinili */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Pinili')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{pinililoc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{piniliData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{piniliCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* San Nicolas */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('San Nicolas')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{sanicolasloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{sanicolasData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{sanicolasCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* Sarrat */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Sarrat')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{sarratloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{sarratData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{sarratCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* Solsona */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Solsona')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{solsonaloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{solsonaData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{solsonaCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }

                      {/* Vintar */}
                      {
                        <View>
                          <TouchableOpacity
                            onPress={() => {
                              setLOCATION('Vintar')
                            }}>
                            <View style={styles.dashboardLocationDay}>
                              <View style={[styles.cardDashboardLocations, styles.cardDashboardLocationsProp, { marginBottom: 8, }]}>
                                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                                  <Icon name={"map"} color={'#276653'} size={25} style={{ width: 30 }} />
                                  <Text style={{ fontSize: 18, fontWeight: '800', justifyContent: 'flex-end', color: '#276653' }}>{vintarloc.name}</Text>
                                </View>
                                <View style={styles.div2RowFlexStart}>
                                  <View style={{ marginLeft: 18 }}>
                                    <Image source={require('../../src/images/sunRAsset2.png')} style={{ paddingleft: 20, width: 80, height: 80 }} />
                                  </View>
                                  <View style={{ marginRight: 10, }}>
                                    <Text style={{ fontSize: 16, fontWeight: '800', color: '#3E7E55', paddingLeft: 20 }}>Ave. Temp</Text>
                                    <View style={{ flexDirection: 'row', }}>
                                      <Text style={{ fontSize: 28, fontWeight: '800', paddingLeft: 20, color: '#276653' }}>{vintarData.maxtemp_c}</Text>
                                      <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20, }} />
                                    </View>
                                    <Text style={{ fontSize: 14, fontWeight: '800', paddingLeft: 1, color: '#3E7E55', paddingLeft: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>{vintarCondition.text}</Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      }


                    </ScrollView>
                  </View>
                </RBSheet>

                <View style={[styles.cardDashboard, styles.cardDashboardProp, styles.overlay]}>
                  {/* Data */}
                  <View style={styles.div2RowSpaceEven}>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ color: '#8eb4a9', fontWeight: '800' }}>Temp</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: '900', fontSize: 20, color: '#276653' }}>{weatherData.avgtemp_c}</Text>
                        <Icon name={"thermometer"} color={'#276653'} size={23} style={{ width: 20 }} />
                      </View>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ color: '#8eb4a9', fontWeight: '800' }}>Wind</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: '900', fontSize: 20, color: '#276653' }}>{weatherData.maxwind_kph}</Text>
                        <Icon name={"weather-windy"} color={'#276653'} size={24} style={{ paddingLeft: 5, marginLeft: -5, width: 20 }} />
                      </View>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ color: '#8eb4a9', fontWeight: '800' }}>Humidity</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: '900', fontSize: 20, color: '#276653' }}>{weatherData.avghumidity}%</Text>
                        <Icon name={"water-outline"} color={'#276653'} size={24} style={{ paddingLeft: -3, marginLeft: -5, width: 25 }} />
                      </View>
                    </View>
                  </View>
                </View>

                {/* WeatherIcon */}
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 100 }}>
                  <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 130, height: 120, marginBottom: 15 }} />
                  <Text style={{ fontWeight: '900', fontSize: 18, color: '#276653' }}>{weatherCondition.text}</Text>
                </View>

              </View>
            </View>

            {/* Hours */}
            <View style={styles.dashboardHourly}>
              {/* <Text style={{fontSize:18, fontWeight:'bold'}}>Hourly</Text> */}
              <ScrollView horizontal={true}>
                {
                  weatherPerHour.map((wperhour, p) => {
                    return (
                      <View key={p} style={{ marginRight: 12, marginBottom: 10 }}>
                        <View style={[styles.cardDashboardHourly, styles.cardDashboardHourlyProp]}>
                          <View style={styles.div2RowSpaceEven}>
                            <View style={{ padding: 4 }}>
                              <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 45, height: 45 }} />
                            </View>
                            <View style={{ justifyContent: 'flex-end' }}>
                              <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#8eb4a9', }}>{moment(wperhour.time).format("hh:mmA")}</Text>
                              <Text style={{ fontSize: 20, fontWeight: '900', color: '#276653' }}>{wperhour.temp_c}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    )
                  })
                }
              </ScrollView>
            </View>

            {/* Recent */}
            <View style={styles.dashboardHourly}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#276653' }}>Insect Pests and Diseases</Text>

              {
                listPD.map((itemsD, d) => {
                  return (
                    <View key={d} style={[styles.cardDashboardPestDisease, styles.cardDashboardPestDiseaseProp]}>
                      <View style={[styles.div2Row2, { backgroundColor: 'white', justifyContent: 'space-between', borderRadius: 11 }]}>
                        <View style={[{ padding: 10, margin: 10, width: '40%' }]}>
                          {
                            itemsD.pnd == 'Disease' ? (
                              <View style={{ backgroundColor: '#C7D36F', marginTop: 10, marginBottom: 15, borderRadius: 5, width: '78%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontWeight: '900', padding: 2, color: 'white', }}>Disease</Text>
                              </View>
                            ) : (
                              <View style={{ backgroundColor: '#3E7E55', marginTop: 10, marginBottom: 15, borderRadius: 5, width: '78%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, fontWeight: '900', padding: 2, color: 'white', }}>Insect pest</Text>
                              </View>
                            )
                          }
                          <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#276653' }}>{itemsD.name}</Text>
                          <Text style={{ fontSize: 14, color: '#8eb4a9', fontWeight: 'bold', fontStyle: 'italic' }}>{itemsD.spname}</Text>
                        </View>

                        <View>
                          <Image source={require('../../src/images/sunRAsset2.png')} style={{ width: 165, height: 180, borderTopRightRadius: 11, borderBottomRightRadius: 11 }} />
                        </View>


                        {/* {
                          itemsD.map((itemsE, e) => {
                            return (
                              <View key={e}>
                                <Image source={itemsE.images} style={{ width: 165, height: 180, borderTopRightRadius: 11, borderBottomRightRadius: 11 }} />
                              </View>
                            )
                          })
                        } */}
                      </View>
                    </View>
                  )
                })
              }

              {/* 
              <View style={[styles.cardDashboardPestDisease, styles.cardDashboardPestDiseaseProp]}>
                <View style={[styles.div2Row2, { backgroundColor: 'white', justifyContent: 'space-between', borderRadius: 11 }]}>
                  <View style={[{ padding: 10, margin: 10, width: '40%' }]}>
                    <View style={{ backgroundColor: '#7ABD87', marginTop: 10, marginBottom: 15, borderRadius: 5, width: '78%', alignItems: 'center' }}>
                      <Text style={{ fontSize: 14, fontWeight: '900', padding: 2, color: 'white', }}>Insect Pest</Text>
                    </View>
                    <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#276653' }}>Leafolder</Text>
                    <Text style={{ fontSize: 14, color: '#8eb4a9', fontWeight: 'bold', fontStyle: 'italic' }}>Homona coffearia</Text>
                  </View>
                  <View>
                    <Image source={require('../../src/images/garlic2.png')} style={{ width: 165, height: 165, borderTopRightRadius: 11, borderBottomRightRadius: 11 }} />
                  </View>
                </View>
              </View> */}


            </View>
          </View>
        </ScrollView >
      </ImageBackground >
    </View >
  );
}
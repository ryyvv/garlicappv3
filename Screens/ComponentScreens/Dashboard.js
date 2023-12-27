//import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState, useFonts, useContext, useRef } from 'react';
import {
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Text,
  View,
  Image,
  LogBox,
  ImageBackground,
} from 'react-native';
// icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LazyLoadImage } from 'react-native-lazy-load-image';

import styles from '../../src/css/styles';
import { AuthContext } from '../Context/AuthProvider';
import { LocationContext } from '../Context/LocationProvider';
import RBSheet from 'react-native-raw-bottom-sheet';
import Carousel from 'react-native-reanimated-carousel';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import PNDs from '../ComponentScreens/PNDs';

export default function Dashboard({ navigation }) {
  const refRBSheets = useRef();
  //const { logout, user } = useContext(AuthContext);
  const [listPD, setListPD] = useState(null); 
  const [imageIcon, setimageIcon] = useState(null);

  const {
    gpsName,
    gpsUrl,
    gpsWeathData,
    gpsWeathCondition,
    locationList,
    weathloc,
    weathDate,
    weathIcon,
    weathData,
    weathPerHour,
    weathCondition, 
    weathPerDay,
    setLOCATION,
    setGpsLocationUpdate,
    holdlocation,
    setWeatherHoldLocation,
    adamloc,
    adamDate,
    adamIcon,
    adamData,
    adamPerHour,
    adamCondition,
    adamPerDay,
    bacarraloc,
    bacarraDate,
    bacarraIcon,
    bacarraData,
    bacarraPerHour,
    bacarraCondition,
    badocloc,
    badocDate,
    badocIcon,
    badocData,
    badocPerHour,
    badocCondition,
    banguiloc,
    banguiDate,
    banguiIcon,
    banguiData,
    banguiPerHour,
    banguiCondition,
    batacloc,
    batacDate,
    batacIcon,
    batacData,
    batacPerHour,
    batacCondition,
    burgosloc,
    burgosDate,
    burgosIcon,
    burgosData,
    burgosPerHour,
    burgosCondition,
    carasiloc,
    carasiDate,
    carasiIcon,
    carasiData,
    carasiPerHour,
    carasiCondition,
    currimaoloc,
    currimaoDate,
    currimaoIcon,
    currimaoData,
    currimaoPerHour,
    currimaoCondition,
    dingrasloc,
    dingrasDate,
    dingrasIcon,
    dingrasData,
    dingrasPerHour,
    dingrasCondition,
    dumalnegloc,
    dumalnegDate,
    dumalnegIcon,
    dumalnegData,
    dumalnegPerHour,
    dumalnegCondition,
    espirituloc,
    espirituDate,
    espirituIcon,
    espirituData,
    espirituPerHour,
    espirituCondition,
    laoagloc,
    laoagDate,
    laoagIcon,
    laoagData,
    laoagPerHour,
    laoagCondition,
    marcosloc,
    marcosDate,
    marcosIcon,
    marcosData,
    marcosPerHour,
    marcosCondition,
    nuevaeraloc,
    nuevaeraDate,
    nuevaeraIcon,
    nuevaeraData,
    nuevaeraPerHour,
    nuevaeraCondition,
    pagudpudloc,
    pagudpudDate,
    pagudpudIcon,
    pagudpudData,
    pagudpudPerHour,
    pagudpudCondition,
    paoayloc,
    paoayDate,
    paoayIcon,
    paoayData,
    paoayPerHour,
    paoayCondition,
    pasuquinloc,
    pasuquinDate,
    pasuquinIcon,
    pasuquinData,
    pasuquinPerHour,
    pasuquinCondition,
    piddigloc,
    piddigDate,
    piddigIcon,
    piddigData,
    piddigPerHour,
    piddigCondition,
    pinililoc,
    piniliDate,
    piniliIcon,
    piniliData,
    piniliPerHour,
    piniliCondition,
    sanicolasloc,
    sanicolasDate,
    sanicolasIcon,
    sanicolasData,
    sanicolasPerHour,
    sanicolasCondition,
    sarratloc,
    sarratDate,
    sarratIcon,
    sarratData,
    sarratPerHour,
    sarratCondition,
    solsonaloc,
    solsonaDate,
    solsonaIcon,
    solsonaData,
    solsonaPerHour,
    solsonaCondition,
    vintarloc,
    vintarDate,
    vintarIcon,
    vintarData,
    vintarPerHour,
    vintarCondition,
    weatherD,
  } = useContext(LocationContext);
  const newdate = new Date();

  useEffect(() => {
    setInterval(PNDiseases, 3500); 
  }, []);

  const PNDiseases = () => {
    const dataPD = 
    [
      { id: 1,
        pnd: 'Disease',
        name: 'Purple blotch',
        imageb:   require('../../src/images/Purple1.jpg'),
        spname: 'Alternaria, Ellis Lif',
        description: [
          'Initial symptoms of purple blotch occurred at bulb initiation stage (development of 9th to 10th leaf) in early and regular planting while during late planting it started to appear during vegetative stage (development of 7th to 8th leaf). It first appear in older leaves as whitish sunken area that elongates and develop purplish centers and later become large and oval with concentric rings surrounded by zones of yellow and later covered with visible fruiting bodies (spores). Older leaves are more susceptible to purple blotch than younger ones. If purple blotch only attack the plant after bulb formation, then yield is not very much affected.',
          'Purple blotch infects garlic fields during periods of warm weather with high relative humidity. The disease spread rapidly reaching a very high damage when the relative humidity is consistently higher than 90% or there is an occurrence of rainfall but did not progress rapidly when the relative humidity is below 85%. There is no occurrence of this disease during the initial or early vegetative stages of the crop even if there is high relative humidity (>90%) and occurrence of rainfall'
        ],
        images: [
          require('../../src/images/Purple1.jpg'),
          require('../../src/images/Purple2.jpg'),
          require('../../src/images/Purple3.jpg'),
          require('../../src/images/Purple4.jpg'),
          require('../../src/images/Purple5.jpg'),
        ],
      },
      { id: 2,
        pnd: 'Insect Pest',
        name: 'Mites',
        imageb:    require('../../src/images/Tangle1.jpg'),
        spname: 'Aceria tulipae',
        description: ['Aceria tulipae, locally known as ayam Tangle top is twisting or curling of the leaves, with yellowish or pale green streak. This damage is attributed to virus disease transmitted by mites Aceria Tulipae. Bulb development is slow, and the bulbs are small if the plants are attacked at the early stages of growth.'],
        images: [
          require('../../src/images/Tangle1.jpg'),
          require('../../src/images/Tangle2.jpg'),
          require('../../src/images/Tangle3.jpg'),
          require('../../src/images/Tangle4.jpg'),
          require('../../src/images/Tangle5.jpg'),
        ],
      },
      { id: 3,
        pnd: 'Insect Pest',
        name: 'Common worm',
        imageb:   require('../../src/images/Worm1.jpg'),
        spname: 'Worm',
        description: 'Insect pest',
        images: [
          require('../../src/images/Worm1.jpg'),
          require('../../src/images/Worm2.jpg'),
          require('../../src/images/Worm3.jpg'),
          require('../../src/images/Worm4.jpg'),
          require('../../src/images/Worm5.jpg'),
        ],
      },
      { id: 4,
        pnd: 'Disease',
        name: 'Garlic rust',
        imageb:  require('../../src/images/Rust1.jpg'),
        spname: 'Rust',
        description: 'Disease',
        images: [
          require('../../src/images/Rust1.jpg'),
          require('../../src/images/Rust2.jpg'),
          require('../../src/images/Rust3.jpg'),
          require('../../src/images/Rust4.jpg'),
          require('../../src/images/Rust5.jpg'),
        ],
      },
      { id: 5,
        pnd: 'Disease',
        name: 'Bulb/Root rot',
        imageb:  require('../../src/images/Rootrot1.jpg'),
        spname: 'Fusarium & Sclerotium',
        description: [ 
          'The disease is caused by Fusarium and Sclerotium species. This is a soil borne fungus which attacks the basal part causing yellowing and wilting of the leaves followed by total collapse of the tops.',
          'Root rot disease increases in water-logged soils and it is more prevalent with prolong moisture in the soil.  Incidence is more visible at vegetative stage to bulb initiation stage during early planting  (October) and regular planting (November).  Lesser incidence is observe during late planting.'
      ],
        images: [
          require('../../src/images/Rootrot1.jpg'),
          require('../../src/images/Rootrot2.jpg'),
          require('../../src/images/Rootrot3.jpg'),
          require('../../src/images/Rootrot4.jpg'),
          require('../../src/images/Rootrot5.jpg'),
        ],
      },
      { id: 6,
        pnd: 'Disease',
        name: 'Cercospora leaf spot ',
        imageb:    require('../../src/images/Leap1.jpg'),
        spname: 'Cercospora duddiae Welles',
        description: [
          'This disease causes spots on foliage and these spots kill the plant cells. A plant’s yield will be reduced from the limited photosynthetic capacity.',
          'Initial symptoms of the pathogen is observe during bulb development to bulb maturity during early and regular planting, while during late planting symptoms started to appear as early as vegetative stage. Low infection is observed during early planting. During regular planting, a low infection is observed during bulb development.  Like purple blotch infection of the disease is higher during late planting, because it attacked all the different growth stages of the plant.',
          'Cercospora produces spores during warm, humid weather. The spores are transported primarily by wind carried by water or equipment. Favorable conditions such as overhead irrigation and rainy, windy weather increase the rate of spread.'
        ],
        managementControl:[
          'Avoid planting infected bulbs',
          'Crop Hygiene',
          'Crop Rotation',
          'Early Planting', 
          'Good soil drainage',
          'Spray of fungicide when there are heavy rains',
          'Chemical fungicides can be used if infestation is high',
          'Spray at bolting stage especially when there is an occurrence of rainfall and a relative humidity of more than 85%',
          'Spray compost tea (GM tea)',
          'Plant Tolerant Varieties',
        ],
        images: [
          require('../../src/images/Leap1.jpg'),
          require('../../src/images/Leap2.jpg'),
          require('../../src/images/Leap3.jpg'),
          require('../../src/images/Leap4.jpg'),
          require('../../src/images/Leap5.jpg'),
        ],
      },
      { id: 7,
        pnd: 'Insect Pest',
        name: 'Thrips',
        imageb:   require('../../src/images/Insect1.jpg'),
        spname: 'Thrips tabaci Lindeman',
        description: [
          'Thrips feed under the leaf folds and in the protected inner leaves, both adults and nymphs cause damage. They suck the sap of the plant from younger leaves to the growing points. The older leaves become withered or silvery white blotches/blasted in appearance. Thrips are most prevalent during dry and warmer condition.',
          'Thrips are most damaging when they feed during the early bulbing stage. Thrip damage appeared as early as the development of the 4th leaf (initial stage) when there is a change (low to high) in air temperature.'
      ],
        managementControl:[
          'Early planting in October to November to avoid heavy infestation.',
          'Overhead irrigation with the use of a sprinkler hose may also minimize infestation buy washing off the thrips (Overhead irrigation should be followed by spraying if  infestation is high).',
          'Use of botanical extract  and colored (blue) sticky trap.',
          'Spraying with water and soap solution at high pressure  are also effective.',
          'Make sure that the spray material is getting into the center of the plant where thrips are found.'
      ] , 
        images: [
          require('../../src/images/Insect1.jpg'),
          require('../../src/images/Insect2.jpg'),
          require('../../src/images/Insect3.jpg'),
          require('../../src/images/Insect4.jpg'),
          require('../../src/images/Insect5.jpg'),
        ]

      },
      { id: 8,
        pnd: 'Insect Pest',
        name: 'Leaf Folder     ',
        imageb:   require('../../src/images/Insect1.jpg'),
        spname: 'Homona coffearia',
        description: ['Insect PestLeaf folder larvae make leaf net by webbing the leaves using silken threads and feed from the inside leaf net. Young larva prefers tender leaves while older larva is seen in the mature leaves. Leaf folder can be observed regardless of planting dates, and varieties during vegetative and bulbing stages.  '],
        images: [
          require('../../src/images/Insect1.jpg'),
          require('../../src/images/Insect2.jpg'),
          require('../../src/images/Insect3.jpg'),
          require('../../src/images/Insect4.jpg'),
          require('../../src/images/Insect5.jpg'),
        ],
      }
    ];
    // data set to listPD
    setListPD(dataPD); 
  };

  const TestPND = async data => {
    listPD.forEach(items => {
      if (items.name == data) {
        alert(items.name);
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ImageBackground
        source={require('../../src/images/garlicbg1.png')}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.dashboardWeather}>
              <View style={{ marginBottom: 10, marginTop: 90 }}>
                {/* shimmer */}
                  {weathloc ? (
                    <View>
                      <View style={{ marginBottom: 40 }}>
                      <TouchableOpacity onPress={() => refRBSheets.current.open()}>
                        <View
                          style={{ justifyContent: 'center', alignItems: 'center' }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              fontSize: 25,
                              color: '#276653',
                            }}>
                           {weathloc.name}, {weathloc.region} 
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#7D8F69',
                              fontWeight: 'bold',
                            }}>
                            {moment(weathDate.localtime).format("MMMM D, YYYY")}
                          </Text>
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
                            paddingBottom: 30,
                          },
                          draggableIcon: {
                            backgroundColor: '#276653',
                          },
                          container: {
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                          },
                        }}>
                        <View
                          style={{
                            marginTop: 5,
                            marginBottom: 5,
                            paddingLeft: 25,
                            paddingRight: 35,
                            flexDirection: 'row',
                          }}>
                          <Text style={styles.textCamTitle}>Location</Text>
                        </View>
                        <View
                          style={{
                            paddingLeft: 15,
                            paddingRight: 15,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                          }}>
                          <ScrollView style={{ marginBottom: 90 }}>
                            {/* current Location */}
                            <View>
                              <TouchableOpacity
                                onPress={() => {
                                 setGpsLocationUpdate(gpsUrl)
                                }}>
                                <View style={styles.dashboardForecastDay}>
                                  <View
                                    style={[
                                      styles.cardDashboardLocations,
                                      styles.cardDashboardLocationsProp,
                                      { marginBottom: 8, backgroundColor: '#EAEEE5' },
                                    ]}>
                                    <View
                                      style={{
                                        marginBottom: 10,
                                        flexDirection: 'row',
                                      }}>
                                      <Icon
                                        name={'map'}
                                        color={'#276653'}
                                        size={25}
                                        style={{ width: 30 }}
                                      />
                                      <Text
                                        style={{
                                          fontSize: 18,
                                          fontWeight: '800',
                                          justifyContent: 'flex-end',
                                          color: '#276653',
                                        }}>
                                        {gpsName} (GPS)
                                      </Text>
                                  
                                    </View>
                                    <View style={styles.div2RowFlexStart}>

                                      <View style={{ marginLeft: 18 }}>
                                      <View>

                                        {
                                          gpsWeathCondition.code == 1000 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1000.png')}
                                                style={{
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1003 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1003.png')}
                                                style={{
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1006 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1006.png')}
                                                style={{
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1009 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1009.png')}
                                                style={{
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1063 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1063.png')}
                                                style={{
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1087 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1087.png')}
                                                style={{
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1135 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1135.png')}
                                                style={{
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1135 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1135.png')}
                                                style={{
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1150 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1150.png')}
                                                style={{
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1153 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1153.png')}
                                                style={{
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1171 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1171.png')}
                                                style={{
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1180 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1180.png')}
                                                style={{
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1183 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1183.png')}
                                                style={{
                  
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1186 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1186.png')}
                                                style={{
                  
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1189 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1189.png')}
                                                style={{
                  
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1193 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1193.png')}
                                                style={{
                  
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1195 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1195.png')}
                                                style={{
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1198 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1198.png')}
                                                style={{
                  
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1201 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1201.png')}
                                                style={{
                  
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1240 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1240.png')}
                                                style={{
                  
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1243 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1243.png')}
                                                style={{
                  
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                         {
                                          gpsWeathCondition.code == 1246 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1246.png')}
                                                style={{
                  
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1249 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1249.png')}
                                                style={{
                  
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1273 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1273.png')}
                                                style={{
                  
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          gpsWeathCondition.code == 1276 ?
                                            (
                                              <Image resizeMode={'contain'}
                                                source={require('../../src/weathericon/1276.png')}
                                                style={{
                                                  width: 100,
                                                  height: 80,
                                                }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {/* <Text>{gpsWeathCondition.code}</Text> */}
                                      </View>
                                      </View>

                                      <View style={{ marginRight: 10 }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            fontWeight: '800',
                                            color: '#3E7E55',
                                            paddingLeft: 20,
                                          }}>
                                          Ave. Temp
                                        </Text>
                                        <View style={{ flexDirection: 'row' }}>
                                          <Text
                                            style={{
                                              fontSize: 28,
                                              fontWeight: '800',
                                              paddingLeft: 20,
                                              color: '#276653',
                                            }}>
                                             {gpsWeathData.avgtemp_c}°C
                                          </Text>
                                          <Icon
                                            name={'thermometer'}
                                            color={'#276653'}
                                            size={23}
                                            style={{ width: 20 }}
                                          />
                                        </View>
                                        <Text
                                          style={{
                                            fontSize: 14,
                                            fontWeight: '800',
                                            paddingLeft: 1,
                                            color: '#3E7E55',
                                            paddingLeft: 20,
                                            flexWrap: 'wrap',
                                            alignItems: 'flex-start',
                                          }}> 
                                            {gpsWeathCondition.text}
                                        </Text>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            </View>

                            {/* List */}
                            {/* <View>
                              <Text style={{color:'red'}}>Location {holdlocation}</Text>
                            </View> */}

                            {/* Adams */}
                            {
                              <View>
                                <TouchableOpacity
                                  onPress={() => {
                                    setLOCATION('Adams');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {adamloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>


                                        <View style={{ marginLeft: 18 }}>
                                          {
                                            adamIcon.code == 1000 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1003 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1006 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1009 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1063 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1087 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1135 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1135 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1150 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1153 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1171 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1180 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1183 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1186 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1189 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1193 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1195 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1198 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1201 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1240 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1243 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                             {
                                            adamIcon.code == 1246 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1246.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1249 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1273 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            adamIcon.code == 1276 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 80, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            
                                        </View>


                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {adamData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {adamCondition.text}
                                          </Text>
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
                                    setLOCATION('Bacarra');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {bacarraloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            bacarraIcon.code == 1000 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1003 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1006 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1009 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1063 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1087 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1135 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1135 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1150 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1153 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1171 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1180 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1183 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1186 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1189 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1193 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1195 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1198 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1201 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1240 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1243 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1249 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1273 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1276 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            {/* <Text>{adamIcon.code}</Text> 

                                          <Image resizeMode={'contain'}
                                            source={require('../../src/images/sunRAsset2.png')}
                                            style={{
                                              paddingleft: 20,
                                              width: 80,
                                              height: 80,
                                            }}
                                          /> */}
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {bacarraData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {bacarraCondition.text}
                                          </Text>
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
                                    setLOCATION('Badoc');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {badocloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            bacarraIcon.code == 1000 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1003 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1006 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1009 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1063 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1087 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1150 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1153 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1171 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1180 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1183 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1186 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1189 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1193 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1195 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1198 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1201 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1240 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1243 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1249 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1273 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            bacarraIcon.code == 1276 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            {/* <Text>{adamIcon.code}</Text> 

                                          <Image
                                            source={require('../../src/images/sunRAsset2.png')}
                                            style={{
                                              paddingleft: 20,
                                              width: 80,
                                              height: 80,
                                            }}
                                          /> */}
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {badocData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                            }}>
                                            {badocCondition.text}
                                          </Text>
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
                                    setLOCATION('Bangui');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {banguiloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            banguiIcon.code == 1000 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1003 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1006 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1009 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1063 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1087 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1150 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1153 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1171 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1180 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1183 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1186 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1189 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1193 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1195 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1198 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1201 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1240 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1243 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1249 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1273 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            banguiIcon.code == 1276 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            {/* <Text>{adamIcon.code}</Text> 

                                          <Image
                                            source={require('../../src/images/sunRAsset2.png')}
                                            style={{
                                              paddingleft: 20,
                                              width: 80,
                                              height: 80,
                                            }}
                                          /> */}
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {banguiData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {banguiCondition.text}
                                          </Text>
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
                                    setLOCATION('Batac');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {batacloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            batacIcon.code == 1000 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1003 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1006 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1009 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1063 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1087 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1150 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1153 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1171 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1180 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1183 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1186 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1189 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1193 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1195 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1198 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1201 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1240 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1243 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1249 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1273 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            batacIcon.code == 1276 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            {/* <Text>{adamIcon.code}</Text> 

                                          <Image
                                            source={require('../../src/images/sunRAsset2.png')}
                                            style={{
                                              paddingleft: 20,
                                              width: 80,
                                              height: 80,
                                            }}
                                          /> */}
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {batacData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {batacCondition.text}
                                          </Text>
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
                                    setLOCATION('Burgos');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {burgosloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            burgosIcon.code == 1000 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1003 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1006 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1009 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1063 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1087 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1150 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1153 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1171 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1180 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1183 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1186 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1189 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1193 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1195 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1198 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1201 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1240 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1243 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1249 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1273 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            burgosIcon.code == 1276 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            {/* <TexburgosIcont>{adamIcon.code}</Text> 

                                          <Image
                                            source={require('../../src/images/sunRAsset2.png')}
                                            style={{
                                              paddingleft: 20,
                                              width: 80,
                                              height: 80,
                                            }}
                                          /> */}
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {burgosData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {burgosCondition.text}
                                          </Text>
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
                                    setLOCATION('Carasi');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {carasiloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            carasiIcon.code == 1000 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1003 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1006 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1009 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1063 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1087 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1150 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1153 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1171 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1180 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1183 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1186 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1189 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1193 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1195 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1198 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1201 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1240 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1243 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1249 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1273 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            carasiIcon.code == 1276 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            {/* <Text>{adamIcon.code}</Text> 

                                          <Image
                                            source={require('../../src/images/sunRAsset2.png')}
                                            style={{
                                              paddingleft: 20,
                                              width: 80,
                                              height: 80,
                                            }}
                                          /> */}
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {carasiData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {carasiCondition.text}
                                          </Text>
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
                                    setLOCATION('Currimao');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {currimaoloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            currimaoIcon.code == 1000 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1003 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1006 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1009 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1063 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1087 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1150 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1153 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1171 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1180 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1183 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1186 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1189 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1193 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1195 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1198 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1201 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1240 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1243 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1249 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1273 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            currimaoIcon.code == 1276 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            {/* <Text>{adamIcon.code}</Text> 

                                          <Image
                                            source={require('../../src/images/sunRAsset2.png')}
                                            style={{
                                              paddingleft: 20,
                                              width: 80,
                                              height: 80,
                                            }}
                                          /> */}
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {currimaoData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {currimaoCondition.text}
                                          </Text>
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
                                    setLOCATION('Dingras');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {dingrasloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            dingrasIcon.code == 1000 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1003 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1006 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1009 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1063 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1087 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1150 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1153 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1171 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1180 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1183 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1186 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1189 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1193 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1195 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1198 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1201 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1240 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1243 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1249 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1273 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dingrasIcon.code == 1276 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            {/* <Text>{adamIcon.code}</Text> 

                                          <Image
                                            source={require('../../src/images/sunRAsset2.png')}
                                            style={{
                                              paddingleft: 20,
                                              width: 80,
                                              height: 80,
                                            }}
                                          /> */}
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {dingrasData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {dingrasCondition.text}
                                          </Text>
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
                                    setLOCATION('Dumalneg');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {dumalnegloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            dumalnegIcon.code == 1000 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1003 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1006 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1009 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1063 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1087 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1150 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1153 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1171 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1180 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1183 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1186 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1189 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1193 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1195 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1198 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1201 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1240 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1243 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1249 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1273 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            dumalnegIcon.code == 1276 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            {/* <Text>{adamIcon.code}</Text> 

                                          <Image
                                            source={require('../../src/images/sunRAsset2.png')}
                                            style={{
                                              paddingleft: 20,
                                              width: 80,
                                              height: 80,
                                            }}
                                          /> */}
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {dumalnegData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {dumalnegCondition.text}
                                          </Text>
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
                                    setLOCATION('Espiritu');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {espirituloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            espirituIcon.code == 1000 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1003 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1006 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1009 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1063 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1087 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1150 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1153 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1171 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1180 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1183 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1186 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1189 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1193 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1195 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1198 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1201 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1240 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1243 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1249 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1273 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            espirituIcon.code == 1276 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            {/* <Text>{adamIcon.code}</Text> 

                                          <Image
                                            source={require('../../src/images/sunRAsset2.png')}
                                            style={{
                                              paddingleft: 20,
                                              width: 80,
                                              height: 80,
                                            }}
                                          /> */}
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {espirituData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {espirituCondition.text}
                                          </Text>
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
                                    setLOCATION('Laoag');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {laoagloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            laoagIcon.code == 1000 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1003 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1006 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1009 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1063 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1087 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1150 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1153 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1171 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1180 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1183 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1186 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1189 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1193 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1195 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1198 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1201 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1240 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1243 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1249 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1273 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            laoagIcon.code == 1276 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            {/* <Text>{adamIcon.code}</Text> 

                                          <Image
                                            source={require('../../src/images/sunRAsset2.png')}
                                            style={{
                                              paddingleft: 20,
                                              width: 80,
                                              height: 80,
                                            }}
                                          /> */}
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {laoagData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {laoagCondition.text}
                                          </Text>
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
                                    setLOCATION('Marcos');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {marcosloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            marcosIcon.code == 1000 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1003 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1006 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1009 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1063 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1087 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1150 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1153 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1171 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1180 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1183 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1186 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1189 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1193 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1195 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1198 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1201 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1240 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1243 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1249 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1273 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            marcosIcon.code == 1276 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            {/* <Text>{adamIcon.code}</Text> 

                                          <Image
                                            source={require('../../src/images/sunRAsset2.png')}
                                            style={{
                                              paddingleft: 20,
                                              width: 80,
                                              height: 80,
                                            }}
                                          /> */}
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {marcosData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {marcosCondition.text}
                                          </Text>
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
                                    setLOCATION('Nuevaera');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {nuevaeraloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            nuevaeraIcon.code == 1000 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1003 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1006 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1009 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1063 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1087 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1150 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1153 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1171 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1180 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1183 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1186 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1189 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1193 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1195 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1198 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1201 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1240 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1243 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1249 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1273 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            nuevaeraIcon.code == 1276 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            {/* <Text>{adamIcon.code}</Text> 

                                          <Image
                                            source={require('../../src/images/sunRAsset2.png')}
                                            style={{
                                              paddingleft: 20,
                                              width: 80,
                                              height: 80,
                                            }}
                                          /> */}
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {nuevaeraData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {nuevaeraCondition.text}
                                          </Text>
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
                                    setLOCATION('Adams');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {pagudpudloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            pagudpudIcon.code == 1000 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1003 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1006 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1009 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1063 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1087 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1150 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1153 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1171 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1180 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1183 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1186 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1189 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1193 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1195 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1198 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1201 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1240 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1243 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1249 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1273 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pagudpudIcon.code == 1276 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            {/* <Text>{adamIcon.code}</Text> 

                                          <Image
                                            source={require('../../src/images/sunRAsset2.png')}
                                            style={{
                                              paddingleft: 20,
                                              width: 80,
                                              height: 80,
                                            }}
                                          /> */}
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {pagudpudData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {pagudpudCondition.text}
                                          </Text>
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
                                    setLOCATION('Paoay');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {paoayloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            paoayIcon.code == 1000 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1003 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1006 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1009 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1063 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1087 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1150 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1153 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1171 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1180 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1183 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1186 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1189 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1193 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1195 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1198 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1201 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1240 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1243 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1249 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1273 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            paoayIcon.code == 1276 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            {/* <Text>{adamIcon.code}</Text> 

                                          <Image
                                            source={require('../../src/images/sunRAsset2.png')}
                                            style={{
                                              paddingleft: 20,
                                              width: 80,
                                              height: 80,
                                            }}
                                          /> */}
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {paoayData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {paoayCondition.text}
                                          </Text>
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
                                    setLOCATION('Adams');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {pasuquinloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            pasuquinIcon.code == 1000 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1003 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1006 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1009 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1063 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1087 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1150 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1153 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1171 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1180 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1183 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1186 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1189 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1193 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1195 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1198 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1201 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1240 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1243 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1249 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1273 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            pasuquinIcon.code == 1276 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            {/* <Text>{adamIcon.code}</Text> 

                                          <Image
                                            source={require('../../src/images/sunRAsset2.png')}
                                            style={{
                                              paddingleft: 20,
                                              width: 80,
                                              height: 80,
                                            }}
                                          /> */}
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {pasuquinData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {pasuquinCondition.text}
                                          </Text>
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
                                    setLOCATION('Piddig');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {piddigloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            piddigIcon.code == 1000 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1003 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1006 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1009 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1063 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1087 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1150 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1153 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1171 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1180 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1183 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1186 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1189 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1193 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1195 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1198 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1201 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1240 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1243 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1249 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1273 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piddigIcon.code == 1276 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            {/* <Text>{adamIcon.code}</Text> 

                                          <Image
                                            source={require('../../src/images/sunRAsset2.png')}
                                            style={{
                                              paddingleft: 20,
                                              width: 80,
                                              height: 80,
                                            }}
                                          /> */}
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {piddigData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {piddigCondition.text}
                                          </Text>
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
                                    setLOCATION('Pinili');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {pinililoc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            piniliIcon.code == 1000 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1003 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1006 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1009 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1063 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1087 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1150 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1153 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1171 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1180 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1183 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1186 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1189 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1193 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1195 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1198 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1201 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1240 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1243 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1249 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1273 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            piniliIcon.code == 1276 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            {/* <Text>{adamIcon.code}</Text> 

                                          <Image
                                            source={require('../../src/images/sunRAsset2.png')}
                                            style={{
                                              paddingleft: 20,
                                              width: 80,
                                              height: 80,
                                            }}
                                          /> */}
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {piniliData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {piniliCondition.text}
                                          </Text>
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
                                    setLOCATION('San Nicolas');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {sanicolasloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            sanicolasIcon.code == 1000 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1003 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1006 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1009 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1063 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1087 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1150 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1153 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1171 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1180 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1183 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1186 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1189 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1193 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1195 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1198 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1201 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1240 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1243 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1249 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1273 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sanicolasIcon.code == 1276 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            {/* <Text>{adamIcon.code}</Text> 

                                          <Image
                                            source={require('../../src/images/sunRAsset2.png')}
                                            style={{
                                              paddingleft: 20,
                                              width: 80,
                                              height: 80,
                                            }}
                                          /> */}
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {sanicolasData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {sanicolasCondition.text}
                                          </Text>
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
                                    setLOCATION('Sarrat');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {sarratloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            sarratIcon.code == 1000 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1003 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1006 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1009 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1063 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1087 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1150 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1153 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1171 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1180 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1183 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1186 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1189 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1193 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1195 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1198 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1201 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1240 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1243 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1249 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1273 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            sarratIcon.code == 1276 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            {/* <Text>{adamIcon.code}</Text> 

                                          <Image
                                            source={require('../../src/images/sunRAsset2.png')}
                                            style={{
                                              paddingleft: 20,
                                              width: 80,
                                              height: 80,
                                            }}
                                          /> */}
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {sarratData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {sarratCondition.text}
                                          </Text>
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
                                    setLOCATION('Solsona');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {solsonaloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            solsonaIcon.code == 1000 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1003 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1006 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1009 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1063 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1087 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1135 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1150 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1153 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1171 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1180 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1183 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1186 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1189 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1193 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1195 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1198 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1201 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1240 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1243 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1249 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1273 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            solsonaIcon.code == 1276 ?
                                              (
                                                <Image
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                            {/* <Text>{adamIcon.code}</Text> 

                                          <Image
                                            source={require('../../src/images/sunRAsset2.png')}
                                            style={{
                                              paddingleft: 20,
                                              width: 80,
                                              height: 80,
                                            }}
                                          /> */}
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {solsonaData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {solsonaCondition.text}
                                          </Text>
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
                                    setLOCATION('Vintar');
                                  }}>
                                  <View style={styles.dashboardLocationDay}>
                                    <View
                                      style={[
                                        styles.cardDashboardLocations,
                                        styles.cardDashboardLocationsProp,
                                        { marginBottom: 8 },
                                      ]}>
                                      <View
                                        style={{
                                          marginBottom: 10,
                                          flexDirection: 'row',
                                        }}>
                                        <Icon
                                          name={'map'}
                                          color={'#276653'}
                                          size={25}
                                          style={{ width: 30 }}
                                        />
                                        <Text
                                          style={{
                                            fontSize: 18,
                                            fontWeight: '800',
                                            justifyContent: 'flex-end',
                                            color: '#276653',
                                          }}>
                                          {vintarloc.name}
                                        </Text>
                                      </View>
                                      <View style={styles.div2RowFlexStart}>
                                      
                                      <View style={{ marginLeft: 18 }}>
                                          {
                                            vintarIcon.code == 1000 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1000.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            vintarIcon.code == 1003 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1003.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            vintarIcon.code == 1006 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1006.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            vintarIcon.code == 1009 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1009.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            vintarIcon.code == 1063 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1063.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            vintarIcon.code == 1087 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1087.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                      
                                          {
                                            vintarIcon.code == 1135 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1135.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            vintarIcon.code == 1150 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1150.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            vintarIcon.code == 1153 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1153.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            vintarIcon.code == 1171 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1171.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            vintarIcon.code == 1180 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1180.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            vintarIcon.code == 1183 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1183.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            vintarIcon.code == 1186 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1186.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            vintarIcon.code == 1189 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1189.png')}
                                                  style={{ width: 65, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            vintarIcon.code == 1193 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1193.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            vintarIcon.code == 1195 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1195.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            vintarIcon.code == 1198 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1198.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            vintarIcon.code == 1201 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1201.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            vintarIcon.code == 1240 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1240.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            vintarIcon.code == 1243 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1243.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                             {
                                            vintarIcon.code == 1246 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1246.png')}
                                                  style={{ width: 65, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            vintarIcon.code == 1249 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1249.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            vintarIcon.code == 1273 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1273.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          {
                                            vintarIcon.code == 1276 ?
                                              (
                                                <Image resizeMode={'contain'}
                                                  source={require('../../src/weathericon/1276.png')}
                                                  style={{ width: 45, height: 45 }}
                                                />
                                              )
                                              :
                                              (null)
                                          }
                                          <View>
                                            <Text>{vintarIcon.code}</Text>
                                          </View>
                          
                                      </View>

                                        <View style={{ marginRight: 10 }}>
                                          <Text
                                            style={{
                                              fontSize: 16,
                                              fontWeight: '800',
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                            }}>
                                            Ave. Temp
                                          </Text>
                                          <View style={{ flexDirection: 'row' }}>
                                            <Text
                                              style={{
                                                fontSize: 28,
                                                fontWeight: '800',
                                                paddingLeft: 20,
                                                color: '#276653',
                                              }}>
                                              {vintarData.maxtemp_c}
                                            </Text>
                                            <Icon
                                              name={'thermometer'}
                                              color={'#276653'}
                                              size={23}
                                              style={{ width: 20 }}
                                            />
                                          </View>
                                          <Text
                                            style={{
                                              fontSize: 14,
                                              fontWeight: '800',
                                              paddingLeft: 1,
                                              color: '#3E7E55',
                                              paddingLeft: 20,
                                              flexWrap: 'wrap',
                                              alignItems: 'flex-start',
                                            }}>
                                            {vintarCondition.text}
                                          </Text>
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

                      {/* Customize ov0erlay View000layer   */}
                      <View style={[ styles.cardDashboard, styles.cardDashboardProp,styles.overlay]}>
                            {/* Data */}
                            <View style={styles.div2RowSpaceEven}>
                              <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: '#8eb4a9', fontWeight: '800' }}>
                                  Ave_temp
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                  <Text style={{ fontWeight: '900', fontSize: 18, color: '#276653'}}>
                                  {weathData.avgtemp_c}°C
                                  </Text>
                                  <Icon
                                    name={'thermometer'}
                                    color={'#276653'}
                                    size={23}
                                    style={{ width: 20 }}
                                  />
                                </View>
                              </View>

                              <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: '#8eb4a9', fontWeight: '800' }}>
                                  Wind
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                  <Text
                                    style={{
                                      fontWeight: '900',
                                      fontSize: 18,
                                      color: '#276653',
                                    }}>
                                   {weathData.maxwind_kph}kph
                                  </Text>
                                  <Icon
                                    name={'weather-windy'}
                                    color={'#276653'}
                                    size={24}
                                    style={{ paddingLeft: 5, marginLeft: -5, width: 20 }}
                                  />
                                </View>
                              </View>

                              <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: '#8eb4a9', fontWeight: '800' }}>
                                  Humidity
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                  <Text
                                    style={{
                                      fontWeight: '900',
                                      fontSize: 18,
                                      color: '#276653',
                                    }}>
                                    {weathData.avghumidity}%
                                  </Text>
                                  <Icon
                                    name={'water-outline'}
                                    color={'#276653'}
                                    size={24}
                                    style={{ paddingLeft: -3, marginLeft: -5, width: 25 }}
                                  />
                                </View>
                              </View>
                            </View>
                      </View>

                      {/* WeatherIcon */}
                      <View  style={{justifyContent: 'center',alignItems: 'center',marginTop: -450,marginBottom: 80}}>
                      
                      <View>

                        {
                          weathCondition.code == 1000 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1000.png')}
                              style={{ width: 230, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1003 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1003.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1006 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1006.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1009 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1009.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1063 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1063.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1087 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1087.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1135 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1135.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1135 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1135.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1150 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1150.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1153 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1153.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1171 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1171.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1180 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1180.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1183 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1183.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1186 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1186.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1189 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1189.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1193 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1193.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1195 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1195.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1198 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1198.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1201 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1201.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1240 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1240.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1243 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1243.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1249 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1249.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1273 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1273.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }
                        {
                          weathCondition.code == 1276 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1276.png')}
                              style={{ width: 380, height:210 }} 
                              />
                            )
                            :
                            (null)
                        }

                      </View>


                        <Text style={{ fontWeight: '900', fontSize: 18, color: '#276653' }}>
                          {weathCondition.text}
                        </Text>
                      </View>
                    
                      {/* Hours */}
                      <View style={[styles.cardDashboardProp, styles.dashboardHourly, { backgroundColor: 'white', width: '100%', borderRadius: 10 }]}>
                        <ScrollView horizontal={true}
                          showsVerticalScrollIndicator={false}>
                          <View style={{ flexDirection: 'row', paddingTop:10,paddingBottom:10 }}>
                            {weathPerHour.map((wperhour, p) => {
                              return (
                                <View key={p} style={{ marginRight: 12, }}>
                                  <View style={{ alignItems: 'center', margin: 5,marginLeft: 10 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                      <Text style={{fontSize: 14, fontWeight: 'bold', color: '#8eb4a9'}}>{moment(wperhour.time).format('hh:mmA')}
                                      </Text>

                                      <View >
                                        {
                                          wperhour.condition.code == 1000 ?
                                            (
                                              <Image
                                                resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1000.png')}
                                                style={{ width: 65, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1003 ?
                                            (
                                              <Image
                                              resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1003.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1006 ?
                                            (
                                              <Image
                                              resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1006.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1009 ?
                                            (
                                              <Image
                                              resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1009.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1063 ?
                                            (
                                              <Image
                                              resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1063.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1087 ?
                                            (
                                              <Image
                                              resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1087.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1135 ?
                                            (
                                              <Image
                                              resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1135.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1135 ?
                                            (
                                              <Image
                                              resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1135.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1150 ?
                                            (
                                              <Image
                                              resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1150.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1153 ?
                                            (
                                              <Image
                                              resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1153.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1171 ?
                                            (
                                              <Image
                                              resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1171.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1180 ?
                                            (
                                              <Image 
                                              resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1180.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1183 ?
                                            (
                                              <Image
                                              resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1183.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1186 ?
                                            (
                                              <Image  resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1186.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1189 ?
                                            (
                                              <Image  resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1189.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1193 ?
                                            (
                                              <Image  resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1193.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1195 ?
                                            (
                                              <Image  resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1195.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1198 ?
                                            (
                                              <Image  resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1198.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1201 ?
                                            (
                                              <Image  resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1201.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1240 ?
                                            (
                                              <Image  resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1240.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        
                                        {
                                          wperhour.condition.code == 1243 ?
                                            (
                                              <Image  resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1243.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1246 ?
                                            (
                                              <Image  resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1246.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1249 ?
                                            (
                                              <Image  resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1249.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1273 ?
                                            (
                                              <Image  resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1273.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }
                                        {
                                          wperhour.condition.code == 1276 ?
                                            (
                                              <Image  resizeMode={'contain'}  
                                                source={require('../../src/weathericon/1276.png')}
                                                style={{ width: 85, height: 55 }}
                                              />
                                            )
                                            :
                                            (null)
                                        }

                                        {/* <Text>{wperhour.condition.code}</Text> */}
                                      </View>

                                      <Text style={{ fontSize: 20, fontWeight: '900', color: '#276653'}}>
                                        {wperhour.temp_c}°C
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              );
                            })}
                          </View>
                        </ScrollView>
                      </View>
                    </View>
                  ) : (
                   <View>
                     <View style={{flexDirection:'row'}}>
                      <Text style={{ fontWeight: '900', fontSize: 18, color: '#276653' }}>
                        DASHBOARD
                      </Text>
                     </View>
 
                    <SkeletonPlaceholder borderRadius={4} backgroundColor='white' highlightColor='#c7c4c4'>
                            <View style={{flexDirection: 'row', alignItems: 'center' ,justifyContent:'center'}}>
                              <Image style={{marginTop: 6,width: 290, height: 40}}   />
                            </View>
                            

                            <View style={{flexDirection: 'row', alignItems: 'center' ,justifyContent:'center'}}>
                              <Image style={{marginTop: 6,width: 220, height: 190}}   />
                            </View>
                        
                            <View style={{marginTop: 16,flexDirection: 'row', alignItems: 'center' ,justifyContent:'space-between'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center',marginRight:10}}>
                                  <View style={{width: 40, height: 40}} />
                                  <View style={{marginLeft: 5}}>
                                    <Image style={{width: 50, height: 15}}   />
                                    <Text style={{marginTop: 6, fontSize: 14, lineHeight: 18}}>Hello world</Text>
                                  </View>
                                </View>
                                
                                <View style={{flexDirection: 'row', alignItems: 'center',marginRight:10}}>
                                  <View style={{width: 40, height: 40}} />
                                  <View style={{marginLeft: 5}}>
                                  <Image style={{width: 50, height: 15}}   />
                                    <Text style={{marginTop: 6, fontSize: 14, lineHeight: 18}}>Hello world</Text>
                                  </View>
                                </View>

                                <View style={{flexDirection: 'row', alignItems: 'center', marginRight:10}}>
                                  <View style={{width: 40, height: 40}} />
                                  <View style={{marginLeft: 5}}>
                                  <Image style={{width: 50, height: 15}}   />
                                    <Text style={{marginTop: 6, fontSize: 14, lineHeight: 18}}>Hello world</Text>
                                  </View>
                                </View>

                            </View>

                            <View style={{marginTop: 20,flexDirection: 'row', alignItems: 'center' ,justifyContent:'space-between'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center',marginRight:10}}>
                                  <View style={{width: 60, height: 60}} />
                                  <View style={{marginLeft: 5}}>
                                    <Text style={{marginTop: 6, fontSize: 14, lineHeight: 18}}>Hello world</Text>
                                    <Image style={{marginTop: 6,width: 90, height: 35}}   />
                                  </View>
                                </View>
                                
                                <View style={{flexDirection: 'row', alignItems: 'center',marginRight:10}}>
                                  <View style={{width: 60, height: 60}} />
                                  <View style={{marginLeft: 5}}>
                                    <Text style={{ fontSize: 14, lineHeight: 18}}>Hello world</Text>
                                    <Image style={{marginTop: 6,width: 90, height: 35}}   />
                                  </View>
                                </View>

                                <View style={{flexDirection: 'row', alignItems: 'center',marginRight:10}}>
                                  <View style={{width: 60, height: 60}} />
                                  <View style={{marginLeft: 5}}>
                                    <Text style={{marginTop: 6, fontSize: 14, lineHeight: 18}}>Hello world</Text>
                                    <Image style={{marginTop: 6,width: 90, height: 35}}   />
                                  </View>
                                </View>

                            </View>
                    </SkeletonPlaceholder>
          
                   </View>
                )}
              </View>
            </View>

            <View style={styles.dashboardRecent}>
            {
            listPD == null  ?  (
              <View>
                 <SkeletonPlaceholder borderRadius={4} backgroundColor='white' highlightColor='#c7c4c4'>
                  <View style={{marginTop: 10,flexDirection: 'row', justifyContent:'space-between'}}>
                    <View style={{flexDirection: 'row',}}>
                        <View style={{marginLeft: 5}}>
                          <Text style={{fontSize: 14, lineHeight: 26}}>Hello world</Text>
                          <Image style={{marginTop: 9,width: 200, height: 26 }}   />
                          <Image style={{marginTop: 9,width: 200, height: 65}}   />
                        </View>
                      <View style={{marginLeft: 10, width: 120, height: 140,  borderRadius:10}} />
                    </View>     
                  </View>
                  <View style={{marginTop: 20,flexDirection: 'row', justifyContent:'space-between'}}>
                    <View style={{flexDirection: 'row',}}>
                        <View style={{marginLeft: 5}}>
                          <Text style={{fontSize: 14, lineHeight: 26}}>Hello world</Text>
                          <Image style={{marginTop: 9,width: 200, height: 26 }}   />
                          <Image style={{marginTop: 9,width: 200, height: 65}}   />
                        </View>
                      <View style={{marginLeft: 10, width: 120, height: 140,  borderRadius:10}} />
                    </View>     
                  </View>
                  <View style={{marginTop: 20,flexDirection: 'row', justifyContent:'space-between'}}>
                    <View style={{flexDirection: 'row',}}>
                        <View style={{marginLeft: 5}}>
                          <Text style={{fontSize: 14, lineHeight: 26}}>Hello world</Text>
                          <Image style={{marginTop: 9,width: 200, height: 26 }}   />
                          <Image style={{marginTop: 9,width: 200, height: 65}}   />
                        </View>
                      <View style={{marginLeft: 10, width: 120, height: 140,  borderRadius:10}} />
                    </View>     
                  </View>
                  <View style={{marginTop: 20,flexDirection: 'row', justifyContent:'space-between'}}>
                    <View style={{flexDirection: 'row',}}>
                        <View style={{marginLeft: 5}}>
                          <Text style={{fontSize: 14, lineHeight: 26}}>Hello world</Text>
                          <Image style={{marginTop: 9,width: 200, height: 26 }}   />
                          <Image style={{marginTop: 9,width: 200, height: 65}}   />
                        </View>
                      <View style={{marginLeft: 10, width: 120, height: 140,  borderRadius:10}} />
                    </View>     
                  </View>
                  </SkeletonPlaceholder>
              </View>
                ) : (
                  <View>
                    <Text
                      style={{ fontSize: 18, fontWeight: 'bold', color: '#276653' }}>
                      Insect Pests and Diseases
                    </Text>
                      {listPD.map((itemsD, d) => {
                          return (
                            <View
                              key={d}
                              style={[
                                styles.cardDashboardPestDisease,
                                styles.cardDashboardPestDiseaseProp,
                              ]}>
                              <Pressable
                                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
                                onPress={() => {
                                  navigation.navigate('PNDs', {
                                    id: itemsD.id,
                                    pnd: itemsD.pnd,
                                    name: itemsD.name,
                                    imageb: itemsD.imageb,
                                    spname: itemsD.spname,
                                    description: itemsD.description,
                                    images: [itemsD.images],
                                  });
                                  console.log('Pressed');
                                }}>
                                <View
                                  style={[
                                    styles.div2Row2,
                                    {
                                      backgroundColor: 'white',
                                      justifyContent: 'space-between',
                                      borderRadius: 11,
                                    },
                                  ]}>
                                  <View style={[{ padding: 10, margin: 10, width: '40%' }]}>
                                    {itemsD.pnd == 'Disease' ? (
                                      <View
                                        style={{
                                          backgroundColor: '#C7D36F',
                                          marginTop: 10,
                                          marginBottom: 15,
                                          borderRadius: 5,
                                          width: '78%',
                                          alignItems: 'center',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 14,
                                            fontWeight: '900',
                                            padding: 2,
                                            color: 'white',
                                          }}>
                                          Disease
                                        </Text>
                                      </View>
                                    ) : (
                                      <View
                                        style={{
                                          backgroundColor: '#3E7E55',
                                          marginTop: 10,
                                          marginBottom: 15,
                                          borderRadius: 5,
                                          width: '78%',
                                          alignItems: 'center',
                                        }}>
                                        <Text
                                          style={{
                                            fontSize: 14,
                                            fontWeight: '900',
                                            padding: 2,
                                            color: 'white',
                                          }}>
                                          Insect pest
                                        </Text>
                                      </View>
                                    )}
                                    <Text
                                      style={{
                                        fontSize: 19,
                                        fontWeight: 'bold',
                                        color: '#276653',
                                      }}>
                                      {itemsD.name}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        color: '#8eb4a9',
                                        fontWeight: 'bold',
                                        fontStyle: 'italic',
                                      }}>
                                      {itemsD.spname}
                                    </Text>
                                  </View>

                                  {/* Insect pest and diseases */}
                                  {/* OnPress */}
                                  <View>
                                    <Carousel
                                      loop
                                      width={165}
                                      height={180}
                                      autoPlay={true}
                                      data={[...new Array(4).keys()]}
                                      scrollAnimationDuration={3000}
                                      // onSnapToItem={(index) => console.log('current index:', index)}
                                      renderItem={({ index }) => (
                                        <View>
                                          <Image
                                            source={itemsD.images[index]}
                                            style={{
                                              width: 165,
                                              height: 180,
                                              borderTopRightRadius: 11,
                                              borderBottomRightRadius: 11,
                                            }}
                                          />
                                        </View>
                                      )}
                                    />
                                  </View>

                                </View>
                              </Pressable>
                            </View>
                          );
                        })}
                  </View>
                )
            }
            </View>

          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

//import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState, useFonts, useContext, useRef, useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Text,
  View,
  Image,
  Button,
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
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';


import PNDs from '../ComponentScreens/PNDs';

export default function Dashboard({ navigation }) {
  const refRBSheets = useRef();
  //const { logout, user } = useContext(AuthContext);
  const [listPD, setListPD] = useState(null);
  const [imageIcon, setimageIcon] = useState(null);

  // BottomSheetDashboard Modal
  const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);

	const bottomSheetRef = useRef();

	const handleClosePress = () => bottomSheetRef.current?.close();
	const handleOpenPress = () => bottomSheetRef.current?.expand();
	const handleCollapsePress = () => bottomSheetRef.current?.collapse();
	const snapeToIndex = (index) => bottomSheetRef.current?.snapToIndex(index);
	const renderBackdrop = useCallback(
		(props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
		[]
	);



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
        {
          id: 1,
          pnd: 'Disease',
          name: 'Purple blotch',
          imageb: require('../../src/images/Purple1.jpg'),
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
        {
          id: 2,
          pnd: 'Insect Pest',
          name: 'Mites',
          imageb: require('../../src/images/Tangle1.jpg'),
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
        {
          id: 3,
          pnd: 'Insect Pest',
          name: 'Common worm',
          imageb: require('../../src/images/Worm1.jpg'),
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
        {
          id: 4,
          pnd: 'Disease',
          name: 'Garlic rust',
          imageb: require('../../src/images/Rust1.jpg'),
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
        {
          id: 5,
          pnd: 'Disease',
          name: 'Bulb/Root rot',
          imageb: require('../../src/images/Rootrot1.jpg'),
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
        {
          id: 6,
          pnd: 'Disease',
          name: 'Cercospora leaf spot ',
          imageb: require('../../src/images/Leap1.jpg'),
          spname: 'Cercospora duddiae Welles',
          description: [
            'This disease causes spots on foliage and these spots kill the plant cells. A plant’s yield will be reduced from the limited photosynthetic capacity.',
            'Initial symptoms of the pathogen is observe during bulb development to bulb maturity during early and regular planting, while during late planting symptoms started to appear as early as vegetative stage. Low infection is observed during early planting. During regular planting, a low infection is observed during bulb development.  Like purple blotch infection of the disease is higher during late planting, because it attacked all the different growth stages of the plant.',
            'Cercospora produces spores during warm, humid weather. The spores are transported primarily by wind carried by water or equipment. Favorable conditions such as overhead irrigation and rainy, windy weather increase the rate of spread.'
          ],
          managementControl: [
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
        {
          id: 7,
          pnd: 'Insect Pest',
          name: 'Thrips',
          imageb: require('../../src/images/Insect1.jpg'),
          spname: 'Thrips tabaci Lindeman',
          description: [
            'Thrips feed under the leaf folds and in the protected inner leaves, both adults and nymphs cause damage. They suck the sap of the plant from younger leaves to the growing points. The older leaves become withered or silvery white blotches/blasted in appearance. Thrips are most prevalent during dry and warmer condition.',
            'Thrips are most damaging when they feed during the early bulbing stage. Thrip damage appeared as early as the development of the 4th leaf (initial stage) when there is a change (low to high) in air temperature.'
          ],
          managementControl: [
            'Early planting in October to November to avoid heavy infestation.',
            'Overhead irrigation with the use of a sprinkler hose may also minimize infestation buy washing off the thrips (Overhead irrigation should be followed by spraying if  infestation is high).',
            'Use of botanical extract  and colored (blue) sticky trap.',
            'Spraying with water and soap solution at high pressure  are also effective.',
            'Make sure that the spray material is getting into the center of the plant where thrips are found.'
          ],
          images: [
            require('../../src/images/Insect1.jpg'),
            require('../../src/images/Insect2.jpg'),
            require('../../src/images/Insect3.jpg'),
            require('../../src/images/Insect4.jpg'),
            require('../../src/images/Insect5.jpg'),
          ]

        },
        {
          id: 8,
          pnd: 'Insect Pest',
          name: 'Leaf Folder     ',
          imageb: require('../../src/images/Insect1.jpg'),
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
            {/* Weather Dashboard */}
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



                    {/* Customize ov0erlay View000layer   */}
                    <View style={[styles.cardDashboard, styles.cardDashboardProp, styles.overlay]}>
                      {/* Data */}
                      <View style={styles.div2RowSpaceEven}>
                        <View style={{ alignItems: 'center' }}>
                          <Text style={{ color: '#8eb4a9', fontWeight: '800' }}>
                            Ave_temp
                          </Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: '900', fontSize: 18, color: '#276653' }}>
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
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: -450, marginBottom: 80 }}>

                      <View>

                        {
                          weathCondition.code == 1000 ?
                            (
                              <Image resizeMode={'contain'}
                                source={require('../../src/weathericon/1000.png')}
                                style={{ width: 230, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                                style={{ width: 380, height: 210 }}
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
                        <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                          {weathPerHour.map((wperhour, p) => {
                            return (
                              <View key={p} style={{ marginRight: 12, }}>
                                <View style={{ alignItems: 'center', margin: 5, marginLeft: 10 }}>
                                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#8eb4a9' }}>{moment(wperhour.time).format('hh:mmA')}
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
                                            <Image resizeMode={'contain'}
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
                                            <Image resizeMode={'contain'}
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
                                            <Image resizeMode={'contain'}
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
                                            <Image resizeMode={'contain'}
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
                                            <Image resizeMode={'contain'}
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
                                            <Image resizeMode={'contain'}
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
                                            <Image resizeMode={'contain'}
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
                                            <Image resizeMode={'contain'}
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
                                            <Image resizeMode={'contain'}
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
                                            <Image resizeMode={'contain'}
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
                                            <Image resizeMode={'contain'}
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
                                            <Image resizeMode={'contain'}
                                              source={require('../../src/weathericon/1276.png')}
                                              style={{ width: 85, height: 55 }}
                                            />
                                          )
                                          :
                                          (null)
                                      }

                                      {/* <Text>{wperhour.condition.code}</Text> */}
                                    </View>

                                    <Text style={{ fontSize: 20, fontWeight: '900', color: '#276653' }}>
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
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: '900', fontSize: 18, color: '#276653' }}>
                        DASHBOARD
                      </Text>
                    </View>

                    <SkeletonPlaceholder borderRadius={4} backgroundColor='white' highlightColor='#c7c4c4'>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ marginTop: 6, width: 290, height: 40 }} />
                      </View>


                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ marginTop: 6, width: 220, height: 190 }} />
                      </View>

                      <View style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                          <View style={{ width: 40, height: 40 }} />
                          <View style={{ marginLeft: 5 }}>
                            <Image style={{ width: 50, height: 15 }} />
                            <Text style={{ marginTop: 6, fontSize: 14, lineHeight: 18 }}>Hello world</Text>
                          </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                          <View style={{ width: 40, height: 40 }} />
                          <View style={{ marginLeft: 5 }}>
                            <Image style={{ width: 50, height: 15 }} />
                            <Text style={{ marginTop: 6, fontSize: 14, lineHeight: 18 }}>Hello world</Text>
                          </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                          <View style={{ width: 40, height: 40 }} />
                          <View style={{ marginLeft: 5 }}>
                            <Image style={{ width: 50, height: 15 }} />
                            <Text style={{ marginTop: 6, fontSize: 14, lineHeight: 18 }}>Hello world</Text>
                          </View>
                        </View>

                      </View>

                      <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                          <View style={{ width: 60, height: 60 }} />
                          <View style={{ marginLeft: 5 }}>
                            <Text style={{ marginTop: 6, fontSize: 14, lineHeight: 18 }}>Hello world</Text>
                            <Image style={{ marginTop: 6, width: 90, height: 35 }} />
                          </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                          <View style={{ width: 60, height: 60 }} />
                          <View style={{ marginLeft: 5 }}>
                            <Text style={{ fontSize: 14, lineHeight: 18 }}>Hello world</Text>
                            <Image style={{ marginTop: 6, width: 90, height: 35 }} />
                          </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                          <View style={{ width: 60, height: 60 }} />
                          <View style={{ marginLeft: 5 }}>
                            <Text style={{ marginTop: 6, fontSize: 14, lineHeight: 18 }}>Hello world</Text>
                            <Image style={{ marginTop: 6, width: 90, height: 35 }} />
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
                listPD == null ? (
                  // Loading BarShimmering 
                  <View>
                    <SkeletonPlaceholder borderRadius={4} backgroundColor='white' highlightColor='#c7c4c4'>
                      <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', }}>
                          <View style={{ marginLeft: 5 }}>
                            <Text style={{ fontSize: 14, lineHeight: 26 }}>Hello world</Text>
                            <Image style={{ marginTop: 9, width: 200, height: 26 }} />
                            <Image style={{ marginTop: 9, width: 200, height: 65 }} />
                          </View>
                          <View style={{ marginLeft: 10, width: 120, height: 140, borderRadius: 10 }} />
                        </View>
                      </View>
                      <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', }}>
                          <View style={{ marginLeft: 5 }}>
                            <Text style={{ fontSize: 14, lineHeight: 26 }}>Hello world</Text>
                            <Image style={{ marginTop: 9, width: 200, height: 26 }} />
                            <Image style={{ marginTop: 9, width: 200, height: 65 }} />
                          </View>
                          <View style={{ marginLeft: 10, width: 120, height: 140, borderRadius: 10 }} />
                        </View>
                      </View>
                      <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', }}>
                          <View style={{ marginLeft: 5 }}>
                            <Text style={{ fontSize: 14, lineHeight: 26 }}>Hello world</Text>
                            <Image style={{ marginTop: 9, width: 200, height: 26 }} />
                            <Image style={{ marginTop: 9, width: 200, height: 65 }} />
                          </View>
                          <View style={{ marginLeft: 10, width: 120, height: 140, borderRadius: 10 }} />
                        </View>
                      </View>
                      <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', }}>
                          <View style={{ marginLeft: 5 }}>
                            <Text style={{ fontSize: 14, lineHeight: 26 }}>Hello world</Text>
                            <Image style={{ marginTop: 9, width: 200, height: 26 }} />
                            <Image style={{ marginTop: 9, width: 200, height: 65 }} />
                          </View>
                          <View style={{ marginLeft: 10, width: 120, height: 140, borderRadius: 10 }} />
                        </View>
                      </View>
                    </SkeletonPlaceholder>
                  </View>
                ) : (
                  // Loading Data
                  <View>
                    {/* Section_Insect Pests and Diseases */}
                    <Text
                      style={{ fontSize: 18, fontWeight: 'bold', color: '#276653' }}>
                      Insect Pests and Diseases
                    </Text>
                    {listPD.map((itemsD, d) => {
                      return (
                        <View
                          key={d}
                          style={[styles.cardDashboardPestDisease, styles.cardDashboardPestDiseaseProp,]}>
                          <Pressable
                            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
                            onPress={() => {
                              // Passing DataID
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
          <View style={{
              flex: 1,
              padding: 24,
              backgroundColor: 'grey',
            }}>
              <Button title="Open" onPress={handleOpenPress} />
              <Button title="Close" onPress={handleClosePress} />
              <Button title="Collapse" onPress={handleCollapsePress} />
              <Button title="Snap To 0" onPress={() => snapeToIndex(0)} />
              <Button title="Snap To 1" onPress={() => snapeToIndex(1)} />
              <Button title="Snap To 2" onPress={() => snapeToIndex(2)} />

              <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                handleIndicatorStyle={{ backgroundColor: '#fff' }}
                backgroundStyle={{ backgroundColor: '#1d0f4e' }}
                backdropComponent={renderBackdrop}
              >
                <View style={styles.contentContainer}>
                  <Text style={styles.containerHeadline}>Awesome Bottom Sheet 🎉</Text>
                  <Button title="Close" onPress={handleClosePress} />
                </View>
              </BottomSheet>

            </View>
        </ScrollView>
        
      </ImageBackground>
    </View>
  );
}

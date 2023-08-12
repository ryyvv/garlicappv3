import moment from 'moment';
import axios from 'axios';
import React, { useEffect, createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
//import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {


    
    const apiKey = 'eb40ebc2fe0c4d02b2735258230304';
    // const [locations, setLocation] = useState('http://api.weatherapi.com/v1/forecast.json?key=eb40ebc2fe0c4d02b2735258230304&q=batac, ilocos norte&days=7&aqi=yes&alerts=yes')
    const [loooo, setLoooo] = useState(null)
    const [locas, setLocas] = useState([])

    const [gpsName, setGpsName] = useState();
    const [gpsUrl, setGpsUrl] = useState();
    const [gpsWeathCondition, setGpsWeathCondition] = useState('');
    const [gpsWeathData, setGpsWeathData] = useState('');

    const [locationList, setLocationList] = useState([])
    const [weatherD, setWeatherD] = useState(null);

    const [holdlocation, setWeatherHoldLocation] = useState('');
    // FOR DASHBOARD

    

    useEffect(() => {
        // PermissionRequestUpdate
        requestLocationPermission();
    },[])

    useEffect(() => {

        //gpsGet();

        setLOCATION: (data) =>{
            fetchUpdateDashboard(data);
            fetchDatas()
        }
        datahold();
        //fetchUpdateDashboard();
        lAdams();
        lBacarra();
        lBadoc();
        lBangui();
        lBatac();
        lBurgos();
        lCarasi();
        lCurrimao();
        lDingras();
        lDumalneg();
        lEspiritu();
        lLaoag();
        lMarcos();
        lNuevaEra();
        lPagudpud();
        lPaoay();
        lPasuquin();
        lPiddig();
        lPinili();
        lSanicolas();
        lSarrat();
        lSolsona();
        lVintar(); 
    

    }, [])


    const [weathloc, setWeatherloc] = useState('');
    const [weathDate, setWeatherDate] = useState('')
    const [weathIcon, setWeatherIcon] = useState('');
    const [weathData, setWeatherData] = useState([]);
    const [weathPerHour, setWeatherPerHour] = useState([]);
    const [weathCondition, setWeatherCondition] = useState('')
    const [weathPerDay, setWeatherPerDay] = useState([]);

    const [adamloc, setadamloc] = useState('');
    const [adamDate, setadamDate] = useState('')
    const [adamIcon, setadamIcon] = useState('');
    const [adamData, setadamData] = useState('');
    const [adamPerHour, setadamPerHour] = useState([]);
    const [adamCondition, setadamCondition] = useState('')
    const [adamPerDay, setadamPerDay] = useState([]);

    const [bacarraloc, setbacarraloc] = useState('');
    const [bacarraDate, setbacarraDate] = useState('')
    const [bacarraIcon, setbacarraIcon] = useState('');
    const [bacarraData, setbacarraData] = useState('');
    const [bacarraPerHour, setbacarraPerHour] = useState([]);
    const [bacarraCondition, setbacarraCondition] = useState('')
    const [bacarraPerDay, setbacarraPerDay] = useState([]);

    const [badocloc, setbadocloc] = useState('');
    const [badocDate, setbadocDate] = useState('')
    const [badocIcon, setbadocIcon] = useState('');
    const [badocData, setbadocData] = useState('');
    const [badocPerHour, setbadocPerHour] = useState([]);
    const [badocCondition, setbadocCondition] = useState('')
    const [badocPerDay, setbadocPerDay] = useState([]);

    const [banguiloc, setbanguiloc] = useState('');
    const [banguiDate, setbanguiDate] = useState('')
    const [banguiIcon, setbanguiIcon] = useState('');
    const [banguiData, setbanguiData] = useState('');
    const [banguiPerHour, setbanguiPerHour] = useState([]);
    const [banguiCondition, setbanguiCondition] = useState('')
    const [banguiPerDay, setbanguiPerDay] = useState([]);

    const [batacloc, setbatacloc] = useState('');
    const [batacDate, setbatacDate] = useState('')
    const [batacIcon, setbatacIcon] = useState('');
    const [batacData, setbatacData] = useState('');
    const [batacPerHour, setbatacPerHour] = useState([]);
    const [batacCondition, setbatacCondition] = useState('')
    const [batacPerDay, setbatacPerDay] = useState([]);

    const [burgosloc, setburgosloc] = useState('');
    const [burgosDate, setburgosDate] = useState('')
    const [burgosIcon, setburgosIcon] = useState('');
    const [burgosData, setburgosData] = useState('');
    const [burgosPerHour, setburgosPerHour] = useState([]);
    const [burgosCondition, setburgosCondition] = useState('')
    const [burgosPerDay, setburgosPerDay] = useState([]);

    const [carasiloc, setcarasiloc] = useState('');
    const [carasiDate, setcarasiDate] = useState('')
    const [carasiIcon, setcarasiIcon] = useState('');
    const [carasiData, setcarasiData] = useState('');
    const [carasiPerHour, setcarasiPerHour] = useState([]);
    const [carasiCondition, setcarasiCondition] = useState('')
    const [carasiPerDay, setcarasiPerDay] = useState([]);

    const [currimaoloc, setcurrimaoloc] = useState('');
    const [currimaoDate, setcurrimaoDate] = useState('')
    const [currimaoIcon, setcurrimaoIcon] = useState('');
    const [currimaoData, setcurrimaoData] = useState('');
    const [currimaoPerHour, setcurrimaoPerHour] = useState([]);
    const [currimaoCondition, setcurrimaoCondition] = useState('')
    const [currimaoPerDay, setcurrimaoPerDay] = useState([]);


    const [dingrasloc, setdingrasloc] = useState('');
    const [dingrasDate, setdingrasDate] = useState('')
    const [dingrasIcon, setdingrasIcon] = useState('');
    const [dingrasData, setdingrasData] = useState('');
    const [dingrasPerHour, setdingrasPerHour] = useState([]);
    const [dingrasCondition, setdingrasCondition] = useState('')
    const [dingrasPerDay, setdingrasPerDay] = useState([]);

    const [dumalnegloc, setdumalnegloc] = useState('');
    const [dumalnegDate, setdumalnegDate] = useState('')
    const [dumalnegIcon, setdumalnegIcon] = useState('');
    const [dumalnegData, setdumalnegData] = useState('');
    const [dumalnegPerHour, setdumalnegPerHour] = useState([]);
    const [dumalnegCondition, setdumalnegCondition] = useState('')
    const [dumalnegPerDay, setdumalnegPerDay] = useState([]);

    const [espirituloc, setespirituloc] = useState('');
    const [espirituDate, setespirituDate] = useState('')
    const [espirituIcon, setespirituIcon] = useState('');
    const [espirituData, setespirituData] = useState('');
    const [espirituPerHour, setespirituPerHour] = useState([]);
    const [espirituCondition, setespirituCondition] = useState('')
    const [espirituPerDay, setespirituPerDay] = useState([]);

    const [laoagloc, setlaoagloc] = useState('');
    const [laoagDate, setlaoagDate] = useState('')
    const [laoagIcon, setlaoagIcon] = useState('');
    const [laoagData, setlaoagData] = useState('');
    const [laoagPerHour, setlaoagPerHour] = useState([]);
    const [laoagCondition, setlaoagCondition] = useState('')
    const [laoagPerDay, setlaoagPerDay] = useState([]);

    // marcos
    const [marcosloc, setmarcosloc] = useState('');
    const [marcosDate, setmarcosDate] = useState('')
    const [marcosIcon, setmarcosIcon] = useState('');
    const [marcosData, setmarcosData] = useState('');
    const [marcosPerHour, setmarcosPerHour] = useState([]);
    const [marcosCondition, setmarcosCondition] = useState('')
    const [marcosPerDay, setmarcosPerDay] = useState([]);

    // nuevaera
    const [nuevaeraloc, setnuevaeraloc] = useState('');
    const [nuevaeraDate, setnuevaeraDate] = useState('')
    const [nuevaeraIcon, setnuevaeraIcon] = useState('');
    const [nuevaeraData, setnuevaeraData] = useState('');
    const [nuevaeraPerHour, setnuevaeraPerHour] = useState([]);
    const [nuevaeraCondition, setnuevaeraCondition] = useState('')
    const [nuevaeraPerDay, setnuevaeraPerDay] = useState([]);


    // pagundpud
    const [pagudpudloc, setpagudpudloc] = useState('');
    const [pagudpudDate, setpagudpudDate] = useState('')
    const [pagudpudIcon, setpagudpudIcon] = useState('');
    const [pagudpudData, setpagudpudData] = useState('');
    const [pagudpudPerHour, setpagudpudPerHour] = useState([]);
    const [pagudpudCondition, setpagudpudCondition] = useState('')
    const [pagudpudPerDay, setpagudpudPerDay] = useState([]);


    // paoay
    const [paoayloc, setpaoayloc] = useState('');
    const [paoayDate, setpaoayDate] = useState('')
    const [paoayIcon, setpaoayIcon] = useState('');
    const [paoayData, setpaoayData] = useState('');
    const [paoayPerHour, setpaoayPerHour] = useState([]);
    const [paoayCondition, setpaoayCondition] = useState('')
    const [paoayPerDay, setpaoayPerDay] = useState([]);

    // pasuquin
    const [pasuquinloc, setpasuquinloc] = useState('');
    const [pasuquinDate, setpasuquinDate] = useState('')
    const [pasuquinIcon, setpasuquinIcon] = useState('');
    const [pasuquinData, setpasuquinData] = useState('');
    const [pasuquinPerHour, setpasuquinPerHour] = useState([]);
    const [pasuquinCondition, setpasuquinCondition] = useState('')
    const [pasuquinPerDay, setpasuquinPerDay] = useState([]);

    // piddig
    const [piddigloc, setpiddigloc] = useState('');
    const [piddigDate, setpiddigDate] = useState('')
    const [piddigIcon, setpiddigIcon] = useState('');
    const [piddigData, setpiddigData] = useState('');
    const [piddigPerHour, setpiddigPerHour] = useState([]);
    const [piddigCondition, setpiddigCondition] = useState('')
    const [piddigPerDay, setpiddigPerDay] = useState([]);

    // pinili
    const [pinililoc, setpinililoc] = useState('');
    const [piniliDate, setpiniliDate] = useState('')
    const [piniliIcon, setpiniliIcon] = useState('');
    const [piniliData, setpiniliData] = useState('');
    const [piniliPerHour, setpiniliPerHour] = useState([]);
    const [piniliCondition, setpiniliCondition] = useState('')
    const [piniliPerDay, setpiniliPerDay] = useState([]);

    // sannicolas
    const [sanicolasloc, setsanicolasloc] = useState('');
    const [sanicolasDate, setsanicolasDate] = useState('')
    const [sanicolasIcon, setsanicolasIcon] = useState('');
    const [sanicolasData, setsanicolasData] = useState('');
    const [sanicolasPerHour, setsanicolasPerHour] = useState([]);
    const [sanicolasCondition, setsanicolasCondition] = useState('')
    const [sanicolasPerDay, setsanicolasPerDay] = useState([]);

    // sarrat
    const [sarratloc, setsarratloc] = useState('');
    const [sarratDate, setsarratDate] = useState('')
    const [sarratIcon, setsarratIcon] = useState('');
    const [sarratData, setsarratData] = useState('');
    const [sarratPerHour, setsarratPerHour] = useState([]);
    const [sarratCondition, setsarratCondition] = useState('')
    const [sarratPerDay, setsarratPerDay] = useState([]);

    // solsona
    const [solsonaloc, setsolsonaloc] = useState('');
    const [solsonaDate, setsolsonaDate] = useState('')
    const [solsonaIcon, setsolsonaIcon] = useState('');
    const [solsonaData, setsolsonaData] = useState('');
    const [solsonaPerHour, setsolsonaPerHour] = useState([]);
    const [solsonaCondition, setsolsonaCondition] = useState('')
    const [solsonaPerDay, setsolsonaPerDay] = useState([]);

    // vintar
    const [vintarloc, setvintarloc] = useState('');
    const [vintarDate, setvintarDate] = useState('')
    const [vintarIcon, setvintarIcon] = useState('');
    const [vintarData, setvintarData] = useState('');
    const [vintarPerHour, setvintarPerHour] = useState([]);
    const [vintarCondition, setvintarCondition] = useState('')
    const [vintarPerDay, setvintarPerDay] = useState([]);


        // permissionLocation
        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
              try {
                const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                  {
                    title: 'Location Permission',
                    message: 'We need your permission to access your location for weather information.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                  }
                );
      
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  getCurrentLocation();
                  console.log("✔ passed 1")
                } else {
                    alert('Location permission denied');
                    console.log('Location permission denied');
                }
              } catch (error) {
                    console.error('Error requesting location permission:', error);
              }
            } else if (Platform.OS === 'ios') {
                    getCurrentLocation();
            }
        };

        // getUserLocation      
        const getCurrentLocation = () => {
            Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherData(latitude, longitude);
            },
            error => {
                console.error('Error getting current location:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        };

        // getdatalocation
        const fetchWeatherData = async (latitude, longitude) => {
                const apiKey = 'eb40ebc2fe0c4d02b2735258230304';
                const  baseURL1 =`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=7&aqi=yes&alerts=yes`;
               console.log('Url: ',baseURL1)
               fetchDatas(baseURL1);
               gpsLoc(baseURL1);
    
        };


 

    const datahold = async () => {
        let data = [
            {
                id: 1,
                location: 'Adams',
                isChecked: false,
                // url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Adams&days=7&aqi=yes&alerts=yes'
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Adams, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 2,
                location: 'Bacarra',
                isChecked: false,
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Bacarra, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 3,
                location: 'Badoc',
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Badoc, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 4,
                location: 'Bangui',
                isChecked: false,
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Bangui, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 5,
                location: 'Batac',
                isChecked: false,
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Batac, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 6,
                location: 'Burgos',
                isChecked: false,
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Burgos, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 7,
                location: 'Carasi',
                isChecked: false,
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Carasi, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 8,
                location: 'Currimao',
                isChecked: false,
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Currimao, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 9,
                location: 'Dingras',
                isChecked: false,
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Dingras, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 10,
                location: 'Dumalneg',
                isChecked: false,
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Dumalneg, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 11,
                location: 'Espiritu',
                isChecked: false,
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Espiritu, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 12,
                location: 'Laoag',
                isChecked: false,
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Laoag, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 13,
                location: 'Marcos',
                isChecked: false,
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Marcos, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 14,
                isChecked: false,
                location: 'Nueva Era',
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Nueva Era, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 15,
                isChecked: false,
                location: 'Pagudpud',
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Pagudpud, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 16,
                isChecked: false,
                location: 'Paoay',
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Paoay, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 17,
                location: 'Pasuquin',
                isChecked: false,
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Pasuquin, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 18,
                location: 'Piddig',
                isChecked: false,
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Piddig, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 19,
                location: 'Pinili',
                isChecked: false,
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Pinili, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 20,
                location: 'San Nicolas',
                isChecked: false,
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=San Nicolas, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 21,
                location: 'Sarrat',
                isChecked: false,
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Sarrat, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 22,
                location: 'Solsona',
                isChecked: false,
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Solsona, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },
            {
                id: 23,
                location: 'Vintar',
                isChecked: false,
                url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Vintar, Ilocos Norte&days=7&aqi=yes&alerts=yes`
            },

        ];
        setLocationList(data)
    }
 
    // RawData
    const fetchDatas = async (loooo) => {
    
    const  datas =   {
        "location": {
            "name": "Batac",
            "region": "Ilocos Norte",
            "country": "Philippines",
            "lat": 18.05,
            "lon": 120.57,
            "tz_id": "Asia/Manila",
            "localtime_epoch": 1689737505,
            "localtime": "2023-07-19 11:31"
        },
        "current": {
            "last_updated_epoch": 1689737400,
            "last_updated": "2023-07-19 11:30",
            "temp_c": 31.0,
            "temp_f": 87.8,
            "is_day": 1,
            "condition": {
                "text": "Partly cloudy",
                "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
                "code": 1003
            },
            "wind_mph": 5.6,
            "wind_kph": 9.0,
            "wind_degree": 310,
            "wind_dir": "NW",
            "pressure_mb": 1009.0,
            "pressure_in": 29.8,
            "precip_mm": 0.0,
            "precip_in": 0.0,
            "humidity": 66,
            "cloud": 25,
            "feelslike_c": 38.3,
            "feelslike_f": 101.0,
            "vis_km": 10.0,
            "vis_miles": 6.0,
            "uv": 8.0,
            "gust_mph": 6.7,
            "gust_kph": 10.8,
            "air_quality": {
                "co": 330.5,
                "no2": 0.5,
                "o3": 48.599998474121094,
                "so2": 0.30000001192092896,
                "pm2_5": 4.199999809265137,
                "pm10": 4.400000095367432,
                "us-epa-index": 1,
                "gb-defra-index": 1
            }
        },
        "forecast": {
            "forecastday": [
                {
                    "date": "2023-07-19",
                    "date_epoch": 1689724800,
                    "day": {
                        "maxtemp_c": 32.1,
                        "maxtemp_f": 89.8,
                        "mintemp_c": 26.5,
                        "mintemp_f": 79.7,
                        "avgtemp_c": 28.2,
                        "avgtemp_f": 82.8,
                        "maxwind_mph": 7.6,
                        "maxwind_kph": 12.2,
                        "totalprecip_mm": 7.9,
                        "totalprecip_in": 0.31,
                        "totalsnow_cm": 0.0,
                        "avgvis_km": 9.9,
                        "avgvis_miles": 6.0,
                        "avghumidity": 79.0,
                        "daily_will_it_rain": 1,
                        "daily_chance_of_rain": 92,
                        "daily_will_it_snow": 0,
                        "daily_chance_of_snow": 0,
                        "condition": {
                            "text": "Moderate rain",
                            "icon": "//cdn.weatherapi.com/weather/64x64/day/302.png",
                            "code": 1189
                        },
                        "uv": 6.0,
                        "air_quality": {
                            "co": 345.80799560546876,
                            "no2": 0.8000000107288361,
                            "o3": 60.24800018310547,
                            "so2": 0.33200000584125516,
                            "pm2_5": 7.5239999389648435,
                            "pm10": 7.82399995803833,
                            "us-epa-index": 1,
                            "gb-defra-index": 1
                        }
                    },
                    "astro": {
                        "sunrise": "05:32 AM",
                        "sunset": "06:37 PM",
                        "moonrise": "06:32 AM",
                        "moonset": "07:56 PM",
                        "moon_phase": "Waxing Crescent",
                        "moon_illumination": "2",
                        "is_moon_up": 1,
                        "is_sun_up": 1
                    },
                    "hour": [
                        {
                            "time_epoch": 1689696000,
                            "time": "2023-07-19 00:00",
                            "temp_c": 27.1,
                            "temp_f": 80.8,
                            "is_day": 0,
                            "condition": {
                                "text": "Partly cloudy",
                                "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png",
                                "code": 1003
                            },
                            "wind_mph": 3.6,
                            "wind_kph": 5.8,
                            "wind_degree": 119,
                            "wind_dir": "ESE",
                            "pressure_mb": 1010.0,
                            "pressure_in": 29.82,
                            "precip_mm": 0.0,
                            "precip_in": 0.0,
                            "humidity": 82,
                            "cloud": 51,
                            "feelslike_c": 30.8,
                            "feelslike_f": 87.4,
                            "windchill_c": 27.1,
                            "windchill_f": 80.8,
                            "heatindex_c": 30.8,
                            "heatindex_f": 87.4,
                            "dewpoint_c": 23.8,
                            "dewpoint_f": 74.8,
                            "will_it_rain": 0,
                            "chance_of_rain": 0,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 5.4,
                            "gust_kph": 8.6,
                            "uv": 1.0,
                            "air_quality": {
                                "co": 310.3999938964844,
                                "no2": 1.2999999523162842,
                                "o3": 40.400001525878906,
                                "so2": 0.30000001192092896,
                                "pm2_5": 2.700000047683716,
                                "pm10": 2.799999952316284,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689699600,
                            "time": "2023-07-19 01:00",
                            "temp_c": 26.9,
                            "temp_f": 80.4,
                            "is_day": 0,
                            "condition": {
                                "text": "Patchy rain possible",
                                "icon": "//cdn.weatherapi.com/weather/64x64/night/176.png",
                                "code": 1063
                            },
                            "wind_mph": 3.6,
                            "wind_kph": 5.8,
                            "wind_degree": 101,
                            "wind_dir": "ESE",
                            "pressure_mb": 1009.0,
                            "pressure_in": 29.8,
                            "precip_mm": 0.1,
                            "precip_in": 0.0,
                            "humidity": 83,
                            "cloud": 72,
                            "feelslike_c": 30.5,
                            "feelslike_f": 86.9,
                            "windchill_c": 26.9,
                            "windchill_f": 80.4,
                            "heatindex_c": 30.5,
                            "heatindex_f": 86.9,
                            "dewpoint_c": 23.8,
                            "dewpoint_f": 74.8,
                            "will_it_rain": 1,
                            "chance_of_rain": 86,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 5.1,
                            "gust_kph": 8.3,
                            "uv": 1.0,
                            "air_quality": {
                                "co": 310.3999938964844,
                                "no2": 1.399999976158142,
                                "o3": 39.0,
                                "so2": 0.30000001192092896,
                                "pm2_5": 2.5,
                                "pm10": 2.5999999046325684,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689703200,
                            "time": "2023-07-19 02:00",
                            "temp_c": 26.7,
                            "temp_f": 80.1,
                            "is_day": 0,
                            "condition": {
                                "text": "Partly cloudy",
                                "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png",
                                "code": 1003
                            },
                            "wind_mph": 3.4,
                            "wind_kph": 5.4,
                            "wind_degree": 112,
                            "wind_dir": "ESE",
                            "pressure_mb": 1009.0,
                            "pressure_in": 29.78,
                            "precip_mm": 0.0,
                            "precip_in": 0.0,
                            "humidity": 84,
                            "cloud": 33,
                            "feelslike_c": 30.1,
                            "feelslike_f": 86.2,
                            "windchill_c": 26.7,
                            "windchill_f": 80.1,
                            "heatindex_c": 30.1,
                            "heatindex_f": 86.2,
                            "dewpoint_c": 23.7,
                            "dewpoint_f": 74.7,
                            "will_it_rain": 0,
                            "chance_of_rain": 0,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 4.9,
                            "gust_kph": 7.9,
                            "uv": 1.0,
                            "air_quality": {
                                "co": 333.79998779296875,
                                "no2": 2.0999999046325684,
                                "o3": 36.5,
                                "so2": 0.4000000059604645,
                                "pm2_5": 3.200000047683716,
                                "pm10": 3.299999952316284,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689706800,
                            "time": "2023-07-19 03:00",
                            "temp_c": 26.5,
                            "temp_f": 79.7,
                            "is_day": 0,
                            "condition": {
                                "text": "Partly cloudy",
                                "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png",
                                "code": 1003
                            },
                            "wind_mph": 3.1,
                            "wind_kph": 5.0,
                            "wind_degree": 107,
                            "wind_dir": "ESE",
                            "pressure_mb": 1008.0,
                            "pressure_in": 29.77,
                            "precip_mm": 0.0,
                            "precip_in": 0.0,
                            "humidity": 83,
                            "cloud": 28,
                            "feelslike_c": 29.7,
                            "feelslike_f": 85.5,
                            "windchill_c": 26.5,
                            "windchill_f": 79.7,
                            "heatindex_c": 29.7,
                            "heatindex_f": 85.5,
                            "dewpoint_c": 23.4,
                            "dewpoint_f": 74.1,
                            "will_it_rain": 0,
                            "chance_of_rain": 0,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 4.7,
                            "gust_kph": 7.6,
                            "uv": 1.0,
                            "air_quality": {
                                "co": 343.79998779296875,
                                "no2": 2.299999952316284,
                                "o3": 35.099998474121094,
                                "so2": 0.4000000059604645,
                                "pm2_5": 3.5,
                                "pm10": 3.700000047683716,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689710400,
                            "time": "2023-07-19 04:00",
                            "temp_c": 26.6,
                            "temp_f": 79.9,
                            "is_day": 0,
                            "condition": {
                                "text": "Partly cloudy",
                                "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png",
                                "code": 1003
                            },
                            "wind_mph": 2.2,
                            "wind_kph": 3.6,
                            "wind_degree": 104,
                            "wind_dir": "ESE",
                            "pressure_mb": 1008.0,
                            "pressure_in": 29.77,
                            "precip_mm": 0.0,
                            "precip_in": 0.0,
                            "humidity": 83,
                            "cloud": 28,
                            "feelslike_c": 29.8,
                            "feelslike_f": 85.6,
                            "windchill_c": 26.6,
                            "windchill_f": 79.9,
                            "heatindex_c": 29.8,
                            "heatindex_f": 85.6,
                            "dewpoint_c": 23.4,
                            "dewpoint_f": 74.1,
                            "will_it_rain": 0,
                            "chance_of_rain": 0,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 3.4,
                            "gust_kph": 5.4,
                            "uv": 1.0,
                            "air_quality": {
                                "co": 350.5,
                                "no2": 2.200000047683716,
                                "o3": 34.0,
                                "so2": 0.30000001192092896,
                                "pm2_5": 3.700000047683716,
                                "pm10": 3.9000000953674316,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689714000,
                            "time": "2023-07-19 05:00",
                            "temp_c": 26.5,
                            "temp_f": 79.7,
                            "is_day": 0,
                            "condition": {
                                "text": "Partly cloudy",
                                "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png",
                                "code": 1003
                            },
                            "wind_mph": 3.4,
                            "wind_kph": 5.4,
                            "wind_degree": 100,
                            "wind_dir": "E",
                            "pressure_mb": 1008.0,
                            "pressure_in": 29.77,
                            "precip_mm": 0.0,
                            "precip_in": 0.0,
                            "humidity": 82,
                            "cloud": 30,
                            "feelslike_c": 29.6,
                            "feelslike_f": 85.3,
                            "windchill_c": 26.5,
                            "windchill_f": 79.7,
                            "heatindex_c": 29.6,
                            "heatindex_f": 85.3,
                            "dewpoint_c": 23.2,
                            "dewpoint_f": 73.8,
                            "will_it_rain": 0,
                            "chance_of_rain": 0,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 5.1,
                            "gust_kph": 8.3,
                            "uv": 1.0,
                            "air_quality": {
                                "co": 353.79998779296875,
                                "no2": 2.0999999046325684,
                                "o3": 33.29999923706055,
                                "so2": 0.30000001192092896,
                                "pm2_5": 3.9000000953674316,
                                "pm10": 4.099999904632568,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689717600,
                            "time": "2023-07-19 06:00",
                            "temp_c": 26.6,
                            "temp_f": 79.9,
                            "is_day": 1,
                            "condition": {
                                "text": "Partly cloudy",
                                "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
                                "code": 1003
                            },
                            "wind_mph": 3.8,
                            "wind_kph": 6.1,
                            "wind_degree": 92,
                            "wind_dir": "E",
                            "pressure_mb": 1008.0,
                            "pressure_in": 29.78,
                            "precip_mm": 0.0,
                            "precip_in": 0.0,
                            "humidity": 81,
                            "cloud": 31,
                            "feelslike_c": 29.7,
                            "feelslike_f": 85.5,
                            "windchill_c": 26.6,
                            "windchill_f": 79.9,
                            "heatindex_c": 29.7,
                            "heatindex_f": 85.5,
                            "dewpoint_c": 23.1,
                            "dewpoint_f": 73.6,
                            "will_it_rain": 0,
                            "chance_of_rain": 0,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 5.8,
                            "gust_kph": 9.4,
                            "uv": 7.0,
                            "air_quality": {
                                "co": 357.20001220703125,
                                "no2": 2.0,
                                "o3": 32.20000076293945,
                                "so2": 0.30000001192092896,
                                "pm2_5": 4.099999904632568,
                                "pm10": 4.300000190734863,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689721200,
                            "time": "2023-07-19 07:00",
                            "temp_c": 27.1,
                            "temp_f": 80.8,
                            "is_day": 1,
                            "condition": {
                                "text": "Sunny",
                                "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
                                "code": 1000
                            },
                            "wind_mph": 3.6,
                            "wind_kph": 5.8,
                            "wind_degree": 95,
                            "wind_dir": "E",
                            "pressure_mb": 1009.0,
                            "pressure_in": 29.78,
                            "precip_mm": 0.0,
                            "precip_in": 0.0,
                            "humidity": 79,
                            "cloud": 21,
                            "feelslike_c": 30.4,
                            "feelslike_f": 86.7,
                            "windchill_c": 27.1,
                            "windchill_f": 80.8,
                            "heatindex_c": 30.4,
                            "heatindex_f": 86.7,
                            "dewpoint_c": 23.2,
                            "dewpoint_f": 73.8,
                            "will_it_rain": 0,
                            "chance_of_rain": 0,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 4.9,
                            "gust_kph": 7.9,
                            "uv": 7.0,
                            "air_quality": {
                                "co": 350.5,
                                "no2": 1.7000000476837158,
                                "o3": 32.20000076293945,
                                "so2": 0.30000001192092896,
                                "pm2_5": 4.0,
                                "pm10": 4.199999809265137,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689724800,
                            "time": "2023-07-19 08:00",
                            "temp_c": 27.9,
                            "temp_f": 82.2,
                            "is_day": 1,
                            "condition": {
                                "text": "Sunny",
                                "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
                                "code": 1000
                            },
                            "wind_mph": 2.5,
                            "wind_kph": 4.0,
                            "wind_degree": 99,
                            "wind_dir": "E",
                            "pressure_mb": 1009.0,
                            "pressure_in": 29.79,
                            "precip_mm": 0.0,
                            "precip_in": 0.0,
                            "humidity": 76,
                            "cloud": 14,
                            "feelslike_c": 31.6,
                            "feelslike_f": 88.9,
                            "windchill_c": 27.9,
                            "windchill_f": 82.2,
                            "heatindex_c": 31.6,
                            "heatindex_f": 88.9,
                            "dewpoint_c": 23.3,
                            "dewpoint_f": 73.9,
                            "will_it_rain": 0,
                            "chance_of_rain": 0,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 3.1,
                            "gust_kph": 5.0,
                            "uv": 7.0,
                            "air_quality": {
                                "co": 347.1000061035156,
                                "no2": 1.2000000476837158,
                                "o3": 35.400001525878906,
                                "so2": 0.20000000298023224,
                                "pm2_5": 3.799999952316284,
                                "pm10": 4.0,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689728400,
                            "time": "2023-07-19 09:00",
                            "temp_c": 28.5,
                            "temp_f": 83.3,
                            "is_day": 1,
                            "condition": {
                                "text": "Sunny",
                                "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
                                "code": 1000
                            },
                            "wind_mph": 0.9,
                            "wind_kph": 1.4,
                            "wind_degree": 152,
                            "wind_dir": "SSE",
                            "pressure_mb": 1009.0,
                            "pressure_in": 29.79,
                            "precip_mm": 0.0,
                            "precip_in": 0.0,
                            "humidity": 73,
                            "cloud": 18,
                            "feelslike_c": 32.3,
                            "feelslike_f": 90.1,
                            "windchill_c": 28.5,
                            "windchill_f": 83.3,
                            "heatindex_c": 32.3,
                            "heatindex_f": 90.1,
                            "dewpoint_c": 23.3,
                            "dewpoint_f": 73.9,
                            "will_it_rain": 0,
                            "chance_of_rain": 0,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 1.1,
                            "gust_kph": 1.8,
                            "uv": 7.0,
                            "air_quality": {
                                "co": 340.5,
                                "no2": 0.800000011920929,
                                "o3": 40.79999923706055,
                                "so2": 0.20000000298023224,
                                "pm2_5": 3.799999952316284,
                                "pm10": 4.0,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689732000,
                            "time": "2023-07-19 10:00",
                            "temp_c": 28.9,
                            "temp_f": 84.0,
                            "is_day": 1,
                            "condition": {
                                "text": "Sunny",
                                "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
                                "code": 1000
                            },
                            "wind_mph": 3.4,
                            "wind_kph": 5.4,
                            "wind_degree": 272,
                            "wind_dir": "W",
                            "pressure_mb": 1009.0,
                            "pressure_in": 29.78,
                            "precip_mm": 0.0,
                            "precip_in": 0.0,
                            "humidity": 73,
                            "cloud": 20,
                            "feelslike_c": 33.0,
                            "feelslike_f": 91.4,
                            "windchill_c": 28.9,
                            "windchill_f": 84.0,
                            "heatindex_c": 33.0,
                            "heatindex_f": 91.4,
                            "dewpoint_c": 23.5,
                            "dewpoint_f": 74.3,
                            "will_it_rain": 0,
                            "chance_of_rain": 0,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 4.0,
                            "gust_kph": 6.5,
                            "uv": 7.0,
                            "air_quality": {
                                "co": 333.79998779296875,
                                "no2": 0.6000000238418579,
                                "o3": 45.099998474121094,
                                "so2": 0.20000000298023224,
                                "pm2_5": 3.9000000953674316,
                                "pm10": 4.0,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689735600,
                            "time": "2023-07-19 11:00",
                            "temp_c": 32.1,
                            "temp_f": 89.8,
                            "is_day": 1,
                            "condition": {
                                "text": "Sunny",
                                "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
                                "code": 1000
                            },
                            "wind_mph": 5.8,
                            "wind_kph": 9.4,
                            "wind_degree": 290,
                            "wind_dir": "WNW",
                            "pressure_mb": 1009.0,
                            "pressure_in": 29.78,
                            "precip_mm": 0.0,
                            "precip_in": 0.0,
                            "humidity": 74,
                            "cloud": 8,
                            "feelslike_c": 41.5,
                            "feelslike_f": 106.7,
                            "windchill_c": 32.1,
                            "windchill_f": 89.8,
                            "heatindex_c": 41.5,
                            "heatindex_f": 106.7,
                            "dewpoint_c": 26.8,
                            "dewpoint_f": 80.2,
                            "will_it_rain": 0,
                            "chance_of_rain": 0,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 6.7,
                            "gust_kph": 10.8,
                            "uv": 8.0,
                            "air_quality": {
                                "co": 330.5,
                                "no2": 0.5,
                                "o3": 48.599998474121094,
                                "so2": 0.30000001192092896,
                                "pm2_5": 4.199999809265137,
                                "pm10": 4.400000095367432,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689739200,
                            "time": "2023-07-19 12:00",
                            "temp_c": 30.2,
                            "temp_f": 86.4,
                            "is_day": 1,
                            "condition": {
                                "text": "Sunny",
                                "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
                                "code": 1000
                            },
                            "wind_mph": 7.6,
                            "wind_kph": 12.2,
                            "wind_degree": 298,
                            "wind_dir": "WNW",
                            "pressure_mb": 1008.0,
                            "pressure_in": 29.77,
                            "precip_mm": 0.0,
                            "precip_in": 0.0,
                            "humidity": 75,
                            "cloud": 22,
                            "feelslike_c": 36.5,
                            "feelslike_f": 97.7,
                            "windchill_c": 30.2,
                            "windchill_f": 86.4,
                            "heatindex_c": 36.5,
                            "heatindex_f": 97.7,
                            "dewpoint_c": 25.2,
                            "dewpoint_f": 77.4,
                            "will_it_rain": 0,
                            "chance_of_rain": 0,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 8.7,
                            "gust_kph": 14.0,
                            "uv": 8.0,
                            "air_quality": {
                                "co": 337.1000061035156,
                                "no2": 0.699999988079071,
                                "o3": 52.20000076293945,
                                "so2": 0.4000000059604645,
                                "pm2_5": 5.5,
                                "pm10": 5.699999809265137,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689742800,
                            "time": "2023-07-19 13:00",
                            "temp_c": 30.1,
                            "temp_f": 86.2,
                            "is_day": 1,
                            "condition": {
                                "text": "Patchy rain possible",
                                "icon": "//cdn.weatherapi.com/weather/64x64/day/176.png",
                                "code": 1063
                            },
                            "wind_mph": 7.4,
                            "wind_kph": 11.9,
                            "wind_degree": 318,
                            "wind_dir": "NW",
                            "pressure_mb": 1008.0,
                            "pressure_in": 29.76,
                            "precip_mm": 0.1,
                            "precip_in": 0.0,
                            "humidity": 75,
                            "cloud": 73,
                            "feelslike_c": 36.4,
                            "feelslike_f": 97.5,
                            "windchill_c": 30.1,
                            "windchill_f": 86.2,
                            "heatindex_c": 36.4,
                            "heatindex_f": 97.5,
                            "dewpoint_c": 25.2,
                            "dewpoint_f": 77.4,
                            "will_it_rain": 1,
                            "chance_of_rain": 77,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 8.9,
                            "gust_kph": 14.4,
                            "uv": 7.0,
                            "air_quality": {
                                "co": 350.5,
                                "no2": 0.699999988079071,
                                "o3": 57.20000076293945,
                                "so2": 0.5,
                                "pm2_5": 6.699999809265137,
                                "pm10": 7.0,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689746400,
                            "time": "2023-07-19 14:00",
                            "temp_c": 29.8,
                            "temp_f": 85.6,
                            "is_day": 1,
                            "condition": {
                                "text": "Partly cloudy",
                                "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
                                "code": 1003
                            },
                            "wind_mph": 7.6,
                            "wind_kph": 12.2,
                            "wind_degree": 325,
                            "wind_dir": "NW",
                            "pressure_mb": 1008.0,
                            "pressure_in": 29.75,
                            "precip_mm": 0.0,
                            "precip_in": 0.0,
                            "humidity": 75,
                            "cloud": 60,
                            "feelslike_c": 35.6,
                            "feelslike_f": 96.1,
                            "windchill_c": 29.8,
                            "windchill_f": 85.6,
                            "heatindex_c": 35.6,
                            "heatindex_f": 96.1,
                            "dewpoint_c": 25.0,
                            "dewpoint_f": 77.0,
                            "will_it_rain": 0,
                            "chance_of_rain": 0,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 9.4,
                            "gust_kph": 15.1,
                            "uv": 7.0,
                            "air_quality": {
                                "co": 353.79998779296875,
                                "no2": 0.699999988079071,
                                "o3": 64.4000015258789,
                                "so2": 0.5,
                                "pm2_5": 7.599999904632568,
                                "pm10": 8.0,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689750000,
                            "time": "2023-07-19 15:00",
                            "temp_c": 29.7,
                            "temp_f": 85.5,
                            "is_day": 1,
                            "condition": {
                                "text": "Light rain shower",
                                "icon": "//cdn.weatherapi.com/weather/64x64/day/353.png",
                                "code": 1240
                            },
                            "wind_mph": 7.4,
                            "wind_kph": 11.9,
                            "wind_degree": 327,
                            "wind_dir": "NNW",
                            "pressure_mb": 1007.0,
                            "pressure_in": 29.74,
                            "precip_mm": 0.6,
                            "precip_in": 0.02,
                            "humidity": 76,
                            "cloud": 75,
                            "feelslike_c": 35.5,
                            "feelslike_f": 95.9,
                            "windchill_c": 29.7,
                            "windchill_f": 85.5,
                            "heatindex_c": 35.5,
                            "heatindex_f": 95.9,
                            "dewpoint_c": 24.9,
                            "dewpoint_f": 76.8,
                            "will_it_rain": 1,
                            "chance_of_rain": 76,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 9.2,
                            "gust_kph": 14.8,
                            "uv": 6.0,
                            "air_quality": {
                                "co": 357.20001220703125,
                                "no2": 0.6000000238418579,
                                "o3": 70.80000305175781,
                                "so2": 0.5,
                                "pm2_5": 8.399999618530273,
                                "pm10": 9.0,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689753600,
                            "time": "2023-07-19 16:00",
                            "temp_c": 29.5,
                            "temp_f": 85.1,
                            "is_day": 1,
                            "condition": {
                                "text": "Light rain shower",
                                "icon": "//cdn.weatherapi.com/weather/64x64/day/353.png",
                                "code": 1240
                            },
                            "wind_mph": 6.9,
                            "wind_kph": 11.2,
                            "wind_degree": 333,
                            "wind_dir": "NNW",
                            "pressure_mb": 1007.0,
                            "pressure_in": 29.73,
                            "precip_mm": 0.2,
                            "precip_in": 0.01,
                            "humidity": 76,
                            "cloud": 76,
                            "feelslike_c": 35.1,
                            "feelslike_f": 95.2,
                            "windchill_c": 29.5,
                            "windchill_f": 85.1,
                            "heatindex_c": 35.1,
                            "heatindex_f": 95.2,
                            "dewpoint_c": 24.9,
                            "dewpoint_f": 76.8,
                            "will_it_rain": 1,
                            "chance_of_rain": 71,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 9.2,
                            "gust_kph": 14.8,
                            "uv": 6.0,
                            "air_quality": {
                                "co": 353.79998779296875,
                                "no2": 0.6000000238418579,
                                "o3": 75.80000305175781,
                                "so2": 0.5,
                                "pm2_5": 8.899999618530273,
                                "pm10": 9.699999809265137,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689757200,
                            "time": "2023-07-19 17:00",
                            "temp_c": 29.1,
                            "temp_f": 84.4,
                            "is_day": 1,
                            "condition": {
                                "text": "Moderate or heavy rain shower",
                                "icon": "//cdn.weatherapi.com/weather/64x64/day/356.png",
                                "code": 1243
                            },
                            "wind_mph": 6.7,
                            "wind_kph": 10.8,
                            "wind_degree": 344,
                            "wind_dir": "NNW",
                            "pressure_mb": 1007.0,
                            "pressure_in": 29.73,
                            "precip_mm": 2.8,
                            "precip_in": 0.11,
                            "humidity": 78,
                            "cloud": 69,
                            "feelslike_c": 34.5,
                            "feelslike_f": 94.1,
                            "windchill_c": 29.1,
                            "windchill_f": 84.4,
                            "heatindex_c": 34.5,
                            "heatindex_f": 94.1,
                            "dewpoint_c": 24.9,
                            "dewpoint_f": 76.8,
                            "will_it_rain": 1,
                            "chance_of_rain": 74,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 7.0,
                            "vis_miles": 4.0,
                            "gust_mph": 10.7,
                            "gust_kph": 17.3,
                            "uv": 6.0,
                            "air_quality": {
                                "co": 337.1000061035156,
                                "no2": 0.6000000238418579,
                                "o3": 78.0,
                                "so2": 0.4000000059604645,
                                "pm2_5": 8.800000190734863,
                                "pm10": 9.5,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689760800,
                            "time": "2023-07-19 18:00",
                            "temp_c": 28.4,
                            "temp_f": 83.1,
                            "is_day": 1,
                            "condition": {
                                "text": "Light rain shower",
                                "icon": "//cdn.weatherapi.com/weather/64x64/day/353.png",
                                "code": 1240
                            },
                            "wind_mph": 6.3,
                            "wind_kph": 10.1,
                            "wind_degree": 5,
                            "wind_dir": "N",
                            "pressure_mb": 1007.0,
                            "pressure_in": 29.74,
                            "precip_mm": 0.4,
                            "precip_in": 0.02,
                            "humidity": 82,
                            "cloud": 67,
                            "feelslike_c": 33.5,
                            "feelslike_f": 92.3,
                            "windchill_c": 28.4,
                            "windchill_f": 83.1,
                            "heatindex_c": 33.5,
                            "heatindex_f": 92.3,
                            "dewpoint_c": 25.0,
                            "dewpoint_f": 77.0,
                            "will_it_rain": 1,
                            "chance_of_rain": 83,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 11.0,
                            "gust_kph": 17.6,
                            "uv": 6.0,
                            "air_quality": {
                                "co": 323.79998779296875,
                                "no2": 0.6000000238418579,
                                "o3": 78.0,
                                "so2": 0.4000000059604645,
                                "pm2_5": 8.300000190734863,
                                "pm10": 8.899999618530273,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689764400,
                            "time": "2023-07-19 19:00",
                            "temp_c": 27.9,
                            "temp_f": 82.2,
                            "is_day": 0,
                            "condition": {
                                "text": "Light rain shower",
                                "icon": "//cdn.weatherapi.com/weather/64x64/night/353.png",
                                "code": 1240
                            },
                            "wind_mph": 5.1,
                            "wind_kph": 8.3,
                            "wind_degree": 14,
                            "wind_dir": "NNE",
                            "pressure_mb": 1008.0,
                            "pressure_in": 29.75,
                            "precip_mm": 1.4,
                            "precip_in": 0.06,
                            "humidity": 83,
                            "cloud": 68,
                            "feelslike_c": 32.6,
                            "feelslike_f": 90.7,
                            "windchill_c": 27.9,
                            "windchill_f": 82.2,
                            "heatindex_c": 32.6,
                            "heatindex_f": 90.7,
                            "dewpoint_c": 24.8,
                            "dewpoint_f": 76.6,
                            "will_it_rain": 1,
                            "chance_of_rain": 92,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 10.3,
                            "gust_kph": 16.6,
                            "uv": 1.0,
                            "air_quality": {
                                "co": 313.79998779296875,
                                "no2": 0.699999988079071,
                                "o3": 75.80000305175781,
                                "so2": 0.5,
                                "pm2_5": 7.900000095367432,
                                "pm10": 8.399999618530273,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689768000,
                            "time": "2023-07-19 20:00",
                            "temp_c": 28.0,
                            "temp_f": 82.4,
                            "is_day": 0,
                            "condition": {
                                "text": "Light rain shower",
                                "icon": "//cdn.weatherapi.com/weather/64x64/night/353.png",
                                "code": 1240
                            },
                            "wind_mph": 4.5,
                            "wind_kph": 7.2,
                            "wind_degree": 27,
                            "wind_dir": "NNE",
                            "pressure_mb": 1008.0,
                            "pressure_in": 29.76,
                            "precip_mm": 2.1,
                            "precip_in": 0.08,
                            "humidity": 82,
                            "cloud": 67,
                            "feelslike_c": 32.6,
                            "feelslike_f": 90.7,
                            "windchill_c": 28.0,
                            "windchill_f": 82.4,
                            "heatindex_c": 32.6,
                            "heatindex_f": 90.7,
                            "dewpoint_c": 24.6,
                            "dewpoint_f": 76.3,
                            "will_it_rain": 0,
                            "chance_of_rain": 69,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 8.5,
                            "gust_kph": 13.7,
                            "uv": 1.0,
                            "air_quality": {
                                "co": 317.1000061035156,
                                "no2": 0.8999999761581421,
                                "o3": 73.0,
                                "so2": 0.4000000059604645,
                                "pm2_5": 7.699999809265137,
                                "pm10": 8.0,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689771600,
                            "time": "2023-07-19 21:00",
                            "temp_c": 27.9,
                            "temp_f": 82.2,
                            "is_day": 0,
                            "condition": {
                                "text": "Patchy rain possible",
                                "icon": "//cdn.weatherapi.com/weather/64x64/night/176.png",
                                "code": 1063
                            },
                            "wind_mph": 3.6,
                            "wind_kph": 5.8,
                            "wind_degree": 56,
                            "wind_dir": "ENE",
                            "pressure_mb": 1008.0,
                            "pressure_in": 29.77,
                            "precip_mm": 0.1,
                            "precip_in": 0.0,
                            "humidity": 82,
                            "cloud": 76,
                            "feelslike_c": 32.4,
                            "feelslike_f": 90.3,
                            "windchill_c": 27.9,
                            "windchill_f": 82.2,
                            "heatindex_c": 32.4,
                            "heatindex_f": 90.3,
                            "dewpoint_c": 24.6,
                            "dewpoint_f": 76.3,
                            "will_it_rain": 1,
                            "chance_of_rain": 82,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 5.1,
                            "gust_kph": 8.3,
                            "uv": 1.0,
                            "air_quality": {
                                "co": 333.79998779296875,
                                "no2": 1.2000000476837158,
                                "o3": 67.19999694824219,
                                "so2": 0.5,
                                "pm2_5": 7.699999809265137,
                                "pm10": 7.900000095367432,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689775200,
                            "time": "2023-07-19 22:00",
                            "temp_c": 27.7,
                            "temp_f": 81.9,
                            "is_day": 0,
                            "condition": {
                                "text": "Clear",
                                "icon": "//cdn.weatherapi.com/weather/64x64/night/113.png",
                                "code": 1000
                            },
                            "wind_mph": 3.1,
                            "wind_kph": 5.0,
                            "wind_degree": 109,
                            "wind_dir": "ESE",
                            "pressure_mb": 1008.0,
                            "pressure_in": 29.77,
                            "precip_mm": 0.0,
                            "precip_in": 0.0,
                            "humidity": 83,
                            "cloud": 25,
                            "feelslike_c": 32.1,
                            "feelslike_f": 89.8,
                            "windchill_c": 27.7,
                            "windchill_f": 81.9,
                            "heatindex_c": 32.1,
                            "heatindex_f": 89.8,
                            "dewpoint_c": 24.5,
                            "dewpoint_f": 76.1,
                            "will_it_rain": 0,
                            "chance_of_rain": 0,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 4.5,
                            "gust_kph": 7.2,
                            "uv": 1.0,
                            "air_quality": {
                                "co": 340.5,
                                "no2": 1.2000000476837158,
                                "o3": 63.70000076293945,
                                "so2": 0.4000000059604645,
                                "pm2_5": 7.099999904632568,
                                "pm10": 7.300000190734863,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        },
                        {
                            "time_epoch": 1689778800,
                            "time": "2023-07-19 23:00",
                            "temp_c": 27.5,
                            "temp_f": 81.5,
                            "is_day": 0,
                            "condition": {
                                "text": "Patchy rain possible",
                                "icon": "//cdn.weatherapi.com/weather/64x64/night/176.png",
                                "code": 1063
                            },
                            "wind_mph": 3.6,
                            "wind_kph": 5.8,
                            "wind_degree": 129,
                            "wind_dir": "SE",
                            "pressure_mb": 1008.0,
                            "pressure_in": 29.77,
                            "precip_mm": 0.1,
                            "precip_in": 0.0,
                            "humidity": 84,
                            "cloud": 72,
                            "feelslike_c": 31.8,
                            "feelslike_f": 89.2,
                            "windchill_c": 27.5,
                            "windchill_f": 81.5,
                            "heatindex_c": 31.8,
                            "heatindex_f": 89.2,
                            "dewpoint_c": 24.4,
                            "dewpoint_f": 75.9,
                            "will_it_rain": 1,
                            "chance_of_rain": 89,
                            "will_it_snow": 0,
                            "chance_of_snow": 0,
                            "vis_km": 10.0,
                            "vis_miles": 6.0,
                            "gust_mph": 5.1,
                            "gust_kph": 8.3,
                            "uv": 1.0,
                            "air_quality": {
                                "co": 337.1000061035156,
                                "no2": 1.0,
                                "o3": 61.5,
                                "so2": 0.30000001192092896,
                                "pm2_5": 6.5,
                                "pm10": 6.699999809265137,
                                "us-epa-index": 1,
                                "gb-defra-index": 1
                            }
                        }
                    ]
                },] }
            }
        

        console.log('FetchData: ' , loooo)
        const response =  await fetch(loooo)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        })


    setWeatherloc(response?.location)
    setWeatherDate(response?.location)
    setWeatherCondition(response?.forecast?.forecastday[0]?.day?.condition)
    setWeatherData(response?.forecast?.forecastday)
    setWeatherPerHour(response?.forecast?.forecastday[0]?.hour)
    setWeatherPerDay(response?.forecast?.forecastday)
       


    
        datas.forEach((elem) => {
            console.log(elem)
            //const day = elem.forecast.forecastday;
            // day.forEach((elem1) => {
            //     const hourly = elem1.hour
            //     hourly.forEach((elem2) => {
            //         console.log("Hourly:  ", elem2)
                     
            //     })
            // })
        })
    }

    const fetchUpdateDashboard = (data) => {
        locationList.forEach((items) => {
            if (items.location == data) {
                fetchDatas(items.url)
                // Checked
                // console.log('place', items.location)
                // console.log('place Url', items.url)
            }
        })
        setWeatherHoldLocation(data) 
    }

    const gpsLoc = async (loooo) => {

        console.log('GPSLoc: ' , loooo)
        const responseGps =  await fetch(loooo)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        })
        
        // getLocName
        const locationName = responseGps?.location?.name+ ', '+ responseGps?.location?.region;
        console.log(locationName)
        setGpsName(locationName);
        setGpsUrl(loooo)
        setGpsWeathCondition(responseGps?.forecast?.forecastday[0]?.day?.condition)
        setGpsWeathData(responseGps?.forecast?.forecastday[0]?.day)

      
    }

    const lAdams = async () => {    
        const response =  await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Adams, ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setadamloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setadamDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setadamIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setadamCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setadamData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setadamPerHour(response?.forecast?.forecastday[0]?.hour)
        // console.log(weatherPerHour)
        setadamPerDay(response?.forecast?.forecastday?.day)
        // console.log(weatherPerHour)

        // return locations
    }

    const lBacarra = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=bacarra, ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setbacarraloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setbacarraDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setbacarraIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setbacarraCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setbacarraData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setbacarraPerDay(response?.forecast?.forecastday?.day)
        // console.log(weatherPerHour)
    }

    const lBadoc = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=badoc , ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setbadocloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setbadocDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setbadocIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setbadocCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setbadocData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setbadocPerHour(response?.forecast?.forecastday[0]?.hour)
        setbadocPerDay(response?.forecast?.forecastday?.day)
        // console.log(weatherPerHour)
    }

    const lBangui = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=bangui , ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setbanguiloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setbanguiDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setbanguiIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setbanguiCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setbanguiData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setbanguiPerHour(response?.forecast?.forecastday[0]?.hour)

        setbanguiPerDay(response?.forecast?.forecastday?.day)
        // console.log(weatherPerHour)
    }

    const lBatac = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=batac , ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setbatacloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setbatacDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setbatacIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setbatacCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setbatacData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
            
        // console.log(weatherPerHour)
    }

    const lBurgos = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=burgos , ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setburgosloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setburgosDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setburgosIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setburgosCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setburgosData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setburgosPerHour(response?.forecast?.forecastday[0]?.hour)

        setburgosPerDay(response?.forecast?.forecastday?.day)
        // console.log(weatherPerHour)
    }

    const lCarasi = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=carasi , ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setcarasiloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setcarasiDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setcarasiIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setcarasiCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setcarasiData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setcarasiPerHour(response?.forecast?.forecastday[0]?.hour)

        setcarasiPerDay(response?.forecast?.forecastday?.day)
        // console.log(weatherPerHour)
    }

    const lCurrimao = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=currimao , ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setcurrimaoloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setcurrimaoDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setcurrimaoIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setcurrimaoCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setcurrimaoData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setcurrimaoPerHour(response?.forecast?.forecastday[0]?.hour)

        setcurrimaoPerDay(response?.forecast?.forecastday?.day)
        // console.log(weatherPerHour)
        
    }

    const lDingras = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=dingras , ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setdingrasloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setdingrasDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setdingrasIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setdingrasCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setdingrasData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setdingrasPerHour(response?.forecast?.forecastday[0]?.hour)

        setdingrasPerDay(response?.forecast?.forecastday?.day)
        // console.log(weatherPerHour)

    }

    const lDumalneg = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=dumalneg , ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setdumalnegloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setdumalnegDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setdumalnegIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setdumalnegCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setdumalnegData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setdumalnegPerHour(response?.forecast?.forecastday[0]?.hour)

        setdumalnegPerDay(response?.forecast?.forecastday?.day)
        // console.log(weatherPerHour)

    }

    const lEspiritu = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=espiritu, ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setespirituloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setespirituDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setespirituIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setespirituCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setespirituData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setespirituPerHour(response?.forecast?.forecastday[0]?.hour)

        setespirituPerDay(response?.forecast?.forecastday?.day)
        // console.log(weatherPerHour)

        // return locations
    }

    const lLaoag = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=laoag , ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setlaoagloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setlaoagDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setlaoagIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setlaoagCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setlaoagData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setlaoagPerHour(response?.forecast?.forecastday[0]?.hour)

        setlaoagPerDay(response?.forecast?.forecastday?.day)
        // console.log(weatherPerHour)

    }

    const lMarcos = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=marcos , ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setmarcosloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setmarcosDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setmarcosIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setmarcosCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setmarcosData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setmarcosPerHour(response?.forecast?.forecastday[0]?.hour)
        setmarcosPerDay(response?.forecast?.forecastday?.day)
        // console.log(weatherPerHour)

        // return locations
    }

    const lNuevaEra = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=nueva era , ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setnuevaeraloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setnuevaeraDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setnuevaeraIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setnuevaeraCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setnuevaeraData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setnuevaeraPerHour(response?.forecast?.forecastday[0]?.hour)
        // console.log(weatherPerHour)
        setnuevaeraPerDay(response?.forecast?.forecastday?.day)
        // return locations
    }

    const lPagudpud = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=pagudpud , ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setpagudpudloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setpagudpudDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setpagudpudIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setpagudpudCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setpagudpudData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setpagudpudPerHour(response?.forecast?.forecastday[0]?.hour)
        // console.log(weatherPerHour)
        setpagudpudPerDay(response?.forecast?.forecastday?.day)

        // return locations
    }

    const lPaoay = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=paoay , ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setpaoayloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setpaoayDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setpaoayIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setpaoayCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setpaoayData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setpaoayPerHour(response?.forecast?.forecastday[0]?.hour)

        setpaoayPerDay(response?.forecast?.forecastday?.day)
        // console.log(weatherPerHour)

        // return locations
    }

    const lPasuquin = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=pasuquin , ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setpasuquinloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setpasuquinDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setpasuquinIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setpasuquinCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setpasuquinData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setpasuquinPerHour(response?.forecast?.forecastday[0]?.hour)
        // console.log(weatherPerHour)
        setpasuquinPerDay(response?.forecast?.forecastday?.day)

        // return locations
    }

    const lPiddig = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=piddig , ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setpiddigloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setpiddigDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setpiddigIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setpiddigCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setpiddigData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setpiddigPerHour(response?.forecast?.forecastday[0]?.hour)
        // console.log(weatherPerHour)
        setpiddigPerDay(response?.forecast?.forecastday?.day)

        //return locations
    }

    const lPinili = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=pinili, ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setpinililoc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setpiniliDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setpiniliIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setpiniliCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setpiniliData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setpiniliPerHour(response?.forecast?.forecastday[0]?.hour)
        // console.log(weatherPerHour)
        setpiniliPerDay(response?.forecast?.forecastday?.day)

        //return locations
    }

    const lSanicolas = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=san nicolas , ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setsanicolasloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setsanicolasDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setsanicolasIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setsanicolasCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setsanicolasData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setsanicolasPerHour(response?.forecast?.forecastday[0]?.hour)
        // console.log(weatherPerHour)
        setsanicolasPerDay(response?.forecast?.forecastday[0]?.day)

        //return locations
    }

    const lSarrat = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=sarrat , ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setsarratloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setsarratDate(response?.forecast?.forecastday[0])   
        // console.log(weatherDate)
        //Condition Text&Icon
        setsarratIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setsarratCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setsarratData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setsarratPerHour(response?.forecast?.forecastday[0]?.hour)
        // console.log(weatherPerHour)
        setsarratPerDay(response?.forecast?.forecastday[0]?.day)

    }

    const lSolsona = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=solsona , ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setsolsonaloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setsolsonaDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setsolsonaIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setsolsonaCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setsolsonaData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setsolsonaPerHour(response?.forecast?.forecastday[0]?.hour)
        // console.log(weatherPerHour)
        setsolsonaPerDay(response?.forecast?.forecastday[0]?.day)

        //return locations
    }

    const lVintar = async () => {
        const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=vintar , ilocos norte&days=10&aqi=yes&alerts=yes')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        setvintarloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setvintarDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        setvintarIcon(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        setvintarCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        setvintarData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        setvintarPerHour(response?.forecast?.forecastday[0]?.hour)
        // console.log(weatherPerHour)
        setvintarPerDay(response?.forecast?.forecastday?.day)

        //return locations
    }



    return (
        <LocationContext.Provider value={{
            loooo, setLoooo, gpsName, gpsUrl, gpsWeathData, gpsWeathCondition, locationList, 
            weathloc, weathDate, weathIcon, weathData, weathPerHour, weathCondition, weathPerDay, 
            setLOCATION: (data) => {
                fetchUpdateDashboard(data);
                console.log('Change to Loc list!')
            },
            setGpsLocationUpdate: (gps) => {
                fetchDatas(gps)
                console.log('Change to Gps data!')

            },  holdlocation, setWeatherHoldLocation,
            adamloc, adamDate, adamIcon, adamData, adamPerHour, adamCondition, adamPerDay,
            bacarraloc, bacarraDate, bacarraIcon, bacarraData, bacarraPerHour, bacarraCondition,bacarraPerDay,
            badocloc, badocDate, badocIcon, badocData, badocPerHour, badocCondition,bacarraPerDay,
            banguiloc, banguiDate, banguiIcon, banguiData, banguiPerHour, banguiCondition,banguiPerDay,
            batacloc, batacDate, batacIcon, batacData, batacPerHour, batacCondition,batacPerDay,
            burgosloc, burgosDate, burgosIcon, burgosData, burgosPerHour, burgosCondition,burgosPerDay,
            carasiloc, carasiDate, carasiIcon, carasiData, carasiPerHour, carasiCondition,carasiPerDay,
            currimaoloc, currimaoDate, currimaoIcon, currimaoData, currimaoPerHour, currimaoCondition,currimaoPerDay,
            dingrasloc, dingrasDate, dingrasIcon, dingrasData, dingrasPerHour, dingrasCondition,dingrasPerDay,
            dumalnegloc, dumalnegDate, dumalnegIcon, dumalnegData, dumalnegPerHour, dumalnegCondition,dumalnegPerDay,
            espirituloc, espirituDate, espirituIcon, espirituData, espirituPerHour, espirituCondition,espirituPerDay,
            laoagloc, laoagDate, laoagIcon, laoagData, laoagPerHour, laoagCondition,laoagPerDay,
            marcosloc, marcosDate, marcosIcon, marcosData, marcosPerHour, marcosCondition,marcosPerDay,
            nuevaeraloc, nuevaeraDate, nuevaeraIcon, nuevaeraData, nuevaeraPerHour, nuevaeraCondition,nuevaeraPerDay,
            pagudpudloc, pagudpudDate, pagudpudIcon, pagudpudData, pagudpudPerHour, pagudpudCondition,pagudpudPerDay,
            paoayloc, paoayDate, paoayIcon, paoayData, paoayPerHour, paoayCondition,paoayPerDay,
            pasuquinloc, pasuquinDate, pasuquinIcon, pasuquinData, pasuquinPerHour, pasuquinCondition,pasuquinPerDay,
            piddigloc, piddigDate, piddigIcon, piddigData, piddigPerHour, piddigCondition,piddigPerDay,
            pinililoc, piniliDate, piniliIcon, piniliData, piniliPerHour, piniliCondition,piniliPerDay,
            sanicolasloc, sanicolasDate, sanicolasIcon, sanicolasData, sanicolasPerHour, sanicolasCondition,sanicolasPerDay,
            sarratloc, sarratDate, sarratIcon, sarratData, sarratPerHour, sarratCondition,sarratPerDay,
            solsonaloc, solsonaDate, solsonaIcon, solsonaData, solsonaPerHour, solsonaCondition,solsonaPerDay,
            vintarloc, vintarDate, vintarIcon, vintarData, vintarPerHour, vintarCondition,vintarPerDay, weatherD
        }}>
            {children}
        </LocationContext.Provider >
    )
}


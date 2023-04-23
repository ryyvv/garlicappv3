import moment from 'moment';
import axios from 'axios';
import React, { useEffect, createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const apiKey = 'eb40ebc2fe0c4d02b2735258230304';
    const [locations, setLocation] = useState('http://api.weatherapi.com/v1/forecast.json?key=eb40ebc2fe0c4d02b2735258230304&q=batac, ilocos norte&days=7&aqi=yes&alerts=yes')
    const [locationList, setLocationList] = useState([])

    const [holdlocation, setWeatherHoldLocation] = useState('');
    // FOR DASHBOARD

    const [weathloc, setWeatherloc] = useState('');
    const [weathDate, setWeatherDate] = useState('')
    const [weathIcon, setWeatherIcon] = useState('');
    const [weathData, setWeatherData] = useState('');
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

    useEffect(() => {
        datahold();
        fetchDatas();
        fetchUpdateDashboard();
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


    const datahold = async () => {
        let data = [
            {
                id: 1,
                location: 'Adams',
                isChecked: false,
                // url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Adams&days=7&aqi=yes&alerts=yes'
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Adams, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 2,
                location: 'Bacarra',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Bacarra, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 3,
                location: 'Badoc',
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Badoc, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 4,
                location: 'Bangui',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Bangui, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 5,
                location: 'Batac',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Batac, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 6,
                location: 'Burgos',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Burgos, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 7,
                location: 'Carasi',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Carasi, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 8,
                location: 'Currimao',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Currimao, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 9,
                location: 'Dingras',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Dingras, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 10,
                location: 'Dumalneg',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Dumalneg, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 11,
                location: 'Espiritu',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Espiritu, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 12,
                location: 'Laoag',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Laoag, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 13,
                location: 'Marcos',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Marcos, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 14,
                isChecked: false,
                location: 'Nueva Era',
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Nueva Era, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 15,
                isChecked: false,
                location: 'Pagudpud',
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Pagudpud, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 16,
                isChecked: false,
                location: 'Paoay',
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Paoay, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 17,
                location: 'Pasuquin',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Pasuquin, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 18,
                location: 'Piddig',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Piddig, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 19,
                location: 'Pinili',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Pinili, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 20,
                location: 'San Nicolas',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=San Nicolas, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 21,
                location: 'Sarrat',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Sarrat, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 22,
                location: 'Solsona',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Solsona, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 23,
                location: 'Vintar',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Vintar, Ilocos Norte&days=7&aqi=yes&alerts=yes'
            },

        ];
        setLocationList(data)
    }
    
    // RawData
    const fetchDatas = async () => {
        const response = await fetch(locations)
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

 
        setWeatherloc(response?.location)
    // console.log(weatherloc)
    // setWeatherData
        setWeatherDate(response?.forecast?.forecastday[0])
    // console.log(weatherDate)
    // Condition Text&Icon
        setWeatherCondition(response?.forecast?.forecastday[0]?.day?.condition)
    // console.log(weatherIcon)
        setWeatherCondition(response?.forecast?.forecastday[0]?.day?.condition)
    // console.log(weatherCondition)
    // setWeatherData
        setWeatherData(response?.forecast?.forecastday[0]?.day)
    // console.log(weatherData)
    // setCurrent(response?.current?.last_updated) //date&Time
        setWeatherPerHour(response?.forecast?.forecastday[0]?.hour)
    // console.log(weatherPerHour)
        setWeatherPerDay(response?.forecast?.forecastday)
        return locations
    }

    // RawData
    // const fetchDatas = async () => {
    //     try {
    //         const response = await axios.get('https://api.weatherapi.com/v1/forecast.json?key=eb40ebc2fe0c4d02b2735258230304&q=batac, ilocos norte&days=7&aqi=yes&alerts=yes');
    //         console.log(response.data);
    //         setWeatherloc(response?.location)
    //         setWeatherDate(response?.forecast?.forecastday[0])
    //         setWeatherCondition(response?.forecast?.forecastday[0]?.day?.condition)
    //         setWeatherCondition(response?.forecast?.forecastday[0]?.day?.condition)
    //         setWeatherData(response?.forecast?.forecastday[0]?.day)
    //         setWeatherPerHour(response?.forecast?.forecastday[0]?.hour)
    //         setWeatherPerDay(response?.forecast)
    //       } catch (error) {
    //         console.error(error);
    //       }

       

    //     return locations
    // }

    const fetchUpdateDashboard = (data) => {
        locationList.forEach((items) => {
            if (items.location == data) {
                setLocation(items.url)
                console.log('place', items.location)
                console.log('place Url', items.url)
            }
        })
        setWeatherHoldLocation(data)
        return locations
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

        return locations
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

        return locations
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

        return locations
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
        return locations
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

        return locations
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

        return locations
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

        return locations
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

        return locations
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

        return locations
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

        return locations
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

        return locations
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

        return locations
    }



    return (
        <LocationContext.Provider value={{
            locations, setLocation, locationList, 
            weathloc, weathDate, weathIcon, weathData, weathPerHour, weathCondition, weathPerDay, 
            setLOCATION: (data) => {
                fetchUpdateDashboard(data);
                fetchDatas()
            }, holdlocation, setWeatherHoldLocation,
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
            vintarloc, vintarDate, vintarIcon, vintarData, vintarPerHour, vintarCondition,vintarPerDay,
        }
        }>
            {children}
        </LocationContext.Provider >
    )
}


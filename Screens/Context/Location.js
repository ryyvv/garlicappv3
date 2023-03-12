import moment from 'moment';
import React, { useEffect, createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const apiKey = 'c90f776ca6f447d182204634220807';
    const [locations, setLocation] = useState('http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Batac&days=7&aqi=yes&alerts=yes')
    const [locationList, setLocationList] = useState([])

    // FOR DASHBOARD
    const [weatherloc, setWeatherloc] = useState('');
    const [weatherDate, setWeatherDate] = useState('')
    const [weatherIcon, setWeatherIcon] = useState('');
    const [weatherData, setWeatherData] = useState('');
    const [weatherPerHour, setWeatherPerHour] = useState([]);
    const [weatherCondition, setWeatherCondition] = useState('')

    // weatheList
    const [listloc, setListloc] = useState('');
    const [listDate, setListDate] = useState('')
    const [listIcon, setListIcon] = useState('');
    const [listData, setListData] = useState('');
    const [listPerHour, setListPerHour] = useState([]);
    const [listCondition, setListCondition] = useState('')

    useEffect(() => {
        // const adams = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Adams&days=7&aqi=yes&alerts=yes'
        // const bacarra = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Bacarra&days=7&aqi=yes&alerts=yes'
        // const badoc = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Badoc&days=7&aqi=yes&alerts=yes'
        // const bangui = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Bangui&days=7&aqi=yes&alerts=yes'
        // const batac = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Batac&days=7&aqi=yes&alerts=yes'
        // const burgos = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Burgos&days=7&aqi=yes&alerts=yes'
        // const carasi = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Carasi&days=7&aqi=yes&alerts=yes'
        // const currimao = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Currimao&days=7&aqi=yes&alerts=yes'
        // const dingras = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Dingras&days=7&aqi=yes&alerts=yes'
        // const dumalneg = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Dumalneg&days=7&aqi=yes&alerts=yes'
        // const espiritu = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Espiritu&days=7&aqi=yes&alerts=yes'
        // const laoag = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Laoag&days=7&aqi=yes&alerts=yes'
        // const marcos = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Marcos&days=7&aqi=yes&alerts=yes'
        // const nuevaera = 'http://api.weatherapi.com/v1/forecasta.json?key=c90f776ca6f447d182204634220807&q=Nueva Era&days=7&aqi=yes&alerts=yes'
        // const pagundpud = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Pagudpud&days=7&aqi=yes&alerts=yes'
        // const paoay = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Paoay&days=7&aqi=yes&alerts=yes'
        // const pasuquin = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Pasuquin&days=7&aqi=yes&alerts=yes'
        // const piddig = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Piddig&days=7&aqi=yes&alerts=yes'
        // const pinili = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Pinili&days=7&aqi=yes&alerts=yes'
        // const sannicolas = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=San Nicolas&days=7&aqi=yes&alerts=yes'
        // const sarrat = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Sarrat&days=7&aqi=yes&alerts=yes'
        // const solsona = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Solsona&days=7&aqi=yes&alerts=yes'
        // const vintar = 'http://api.weatherapi.com/v1/forecast.json?key=c90f776ca6f447d182204634220807&q=Vintar&days=7&aqi=yes&alerts=yes'
        datahold();
        fetchdataAPI();
        fetchUpdateDashboard();
        fetchDatas();


    }, [])



    const datahold = async () => {
        let data = [
            {
                id: 1,
                location: 'Adams',
                isChecked: false,
                // url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Adams&days=7&aqi=yes&alerts=yes'
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Adams&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 2,
                location: 'Bacarra',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Bacarra&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 3,
                location: 'Badoc',
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Badoc&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 4,
                location: 'Bangui',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Bangui&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 5,
                location: 'Batac',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Batac&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 6,
                location: 'Burgos',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Burgos&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 7,
                location: 'Carasi',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Carasi&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 8,
                location: 'Currimao',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Currimao&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 9,
                location: 'Dingras',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Dingras&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 10,
                location: 'Dumalneg',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Dumalneg&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 11,
                location: 'Espiritu',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Espiritu&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 12,
                location: 'Laoag',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Laoag&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 13,
                location: 'Marcos',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Marcos&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 14,
                isChecked: false,
                location: 'Nueva Era',
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Nueva Era&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 15,
                isChecked: false,
                location: 'Pagudpud',
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Pagudpud&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 16,
                isChecked: false,
                location: 'Paoay',
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Paoay&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 17,
                location: 'Pasuquin',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Pasuquin&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 18,
                location: 'Piddig',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Piddig&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 19,
                location: 'Pinili',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Pinili&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 20,
                location: 'San Nicolas',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=San Nicolas&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 21,
                location: 'Sarrat',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Sarrat&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 22,
                location: 'Solsona',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Solsona&days=7&aqi=yes&alerts=yes'
            },
            {
                id: 23,
                location: 'Vintar',
                isChecked: false,
                url: 'http://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=Vintar&days=7&aqi=yes&alerts=yes'
            },

        ];

        setLocationList(data)
    }
    const fetchdataAPI = async () => {
        data.forEach((dloc) => {
            setListloc.id(dloc.id)
            setListloc.location(dloc.location)
            setListloc.data(response)
        })

        const response = await fetch(locations)
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        //Location
        // setWeatherloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        // setWeatherDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
        // setWeatherCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherIcon)
        // setWeatherCondition(response?.forecast?.forecastday[0]?.day?.condition)
        // console.log(weatherCondition)
        // setWeatherData
        // setWeatherData(response?.forecast?.forecastday[0]?.day)
        // console.log(weatherData)
        // setCurrent(response?.current?.last_updated) //date&Time
        // setWeatherPerHour(response?.forecast?.forecastday[0]?.hour)
        // console.log(weatherPerHour)


        //Listlocation
        setListloc(response?.location)
        setListIcon(response?.forecast?.forecastday[0]?.day?.condition)
        setWeatherCondition(response?.forecast?.forecastday[0]?.day?.condition)
        setListData(response?.forecast?.forecastday[0]?.day)
    }

    const fetchRaw = async () => {
        const response = await fetch(locations)
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
            })

        //Listlocation
        setListloc(response?.location)
        setListIcon(response?.forecast?.forecastday[0]?.day?.condition)
        setWeatherCondition(response?.forecast?.forecastday[0]?.day?.condition)
        setListData(response?.forecast?.forecastday[0]?.day)
    }

    // RawData
    const fetchDatas = async () => {
        const response = await fetch(locations)
            .then((response) => response.json())
            // .then((data) => {
            //     setLocation(JSON.stringify(data));
            // })
            .catch((error) => {
                console.error(error);

            })
        //Location
        setWeatherloc(response?.location)
        // console.log(weatherloc)
        // setWeatherData
        setWeatherDate(response?.forecast?.forecastday[0])
        // console.log(weatherDate)
        //Condition Text&Icon
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

        return locations
    }


    const fetchUpdateDashboard = (data) => {
        locationList.forEach((items) => {
            if (items.location == data) {
                setLocation(items.url)
                console.log('place', items.location)
                console.log('place Url', items.url)
            }

        })
        return locations
    }
    return (
        <LocationContext.Provider value={{
            locations, setLocation, locationList, weatherloc, weatherDate, weatherIcon,
            weatherData, weatherPerHour, weatherCondition, listloc, listIcon,
            listData, listCondition, setLOCATION: (data) => {
                fetchUpdateDashboard(data);
                fetchDatas()
            }
        }}>
            {children}
        </LocationContext.Provider>
    )
}
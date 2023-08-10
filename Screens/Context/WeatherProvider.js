import moment from 'moment';
import axios from 'axios';
import React, { useEffect, createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
//import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {


    
    const apiKey = 'eb40ebc2fe0c4d02b2735258230304';
    // const [locations, setLocation] = useState('http://api.weatherapi.com/v1/forecast.json?key=eb40ebc2fe0c4d02b2735258230304&q=batac, ilocos norte&days=7&aqi=yes&alerts=yes')
    const [loooo, setLoooo] = useState(null)
    const [locas, setLocas] = useState([])
 

    // ForecastUpdate for farmers
    // Today
    // time:'6:00 AM',
    // Humidity
    const TrainingDataHumidity = [
        { input: { humidity: 30 }, output: { lowHumidity: 1 } },		
        { input: { humidity: 31 }, output: { lowHumidity: 1 } },		
        { input: { humidity: 32 }, output: { lowHumidity: 1 } },		
        { input: { humidity: 33 }, output: { lowHumidity: 1 } },		
        { input: { humidity: 34 }, output: { lowHumidity: 1 } },		
        { input: { humidity: 35 }, output: { lowHumidity: 1 } },		
        { input: { humidity: 36 }, output: { lowHumidity: 1 } },		
        { input: { humidity: 37 }, output: { lowHumidity: 1 } },		
        { input: { humidity: 38 }, output: { lowHumidity: 1 } },		
        { input: { humidity: 39 }, output: { lowHumidity: 1 } },		
        { input: { humidity: 40 }, output: { lowHumidity: 1 } },		
        { input: { humidity: 41	}, output: { normalHumidity: 1 } },		
        { input: { humidity: 42	}, output: { normalHumidity: 1 } },		
        { input: { humidity: 43	}, output: { normalHumidity: 1 } },		
        { input: { humidity: 44	}, output: { normalHumidity: 1 } },		
        { input: { humidity: 45	}, output: { normalHumidity: 1 } },		
        { input: { humidity: 46	}, output: { normalHumidity: 1 } },		
        { input: { humidity: 47	}, output: { normalHumidity: 1 } },		
        { input: { humidity: 48	}, output: { normalHumidity: 1 } },		
        { input: { humidity: 49	}, output: { normalHumidity: 1 } },		
        { input: { humidity: 50	}, output: { normalHumidity: 1 } },		
        { input: { humidity: 51	}, output: { normalHumidity: 1 } },		
        { input: { humidity: 52	}, output: { normalHumidity: 1 } },		
        { input: { humidity: 53	}, output: { normalHumidity: 1 } },		
        { input: { humidity: 54	}, output: { normalHumidity: 1 } },		
        { input: { humidity: 55	}, output: { normalHumidity: 1 } },		
        { input: { humidity: 56	}, output: { normalHumidity: 1 } },		
        { input: { humidity: 57	}, output: { normalHumidity: 1 } },		
        { input: { humidity: 58	}, output: { normalHumidity: 1 } },		
        { input: { humidity: 59	}, output: { normalHumidity: 1 } },		
        { input: { humidity: 60	}, output: { normalHumidity: 1 } },		
        { input: { humidity: 61	}, output: { moderateHumidity: 1 } },		
        { input: { humidity: 62	}, output: { moderateHumidity: 1 } },		
        { input: { humidity: 63	}, output: { moderateHumidity: 1 } },		
        { input: { humidity: 64	}, output: { moderateHumidity: 1 } },		
        { input: { humidity: 65	}, output: { moderateHumidity: 1 } },		
        { input: { humidity: 66	}, output: { moderateHumidity: 1 } },		
        { input: { humidity: 67	}, output: { moderateHumidity: 1 } },		
        { input: { humidity: 68	}, output: { moderateHumidity: 1 } },		
        { input: { humidity: 69	}, output: { moderateHumidity: 1 } },		
        { input: { humidity: 70	}, output: { moderateHumidity: 1 } },		
        { input: { humidity: 71	}, output: { highHumidity: 1 } },		
        { input: { humidity: 72	}, output: { highHumidity: 1 } },		
        { input: { humidity: 73	}, output: { highHumidity: 1 } },		
        { input: { humidity: 74	}, output: { highHumidity: 1 } },		
        { input: { humidity: 75	}, output: { highHumidity: 1 } },		
        { input: { humidity: 76	}, output: { highHumidity: 1 } },		
        { input: { humidity: 77	}, output: { highHumidity: 1 } },		
        { input: { humidity: 78	}, output: { highHumidity: 1 } },		
        { input: { humidity: 79	}, output: { highHumidity: 1 } },		
        { input: { humidity: 80	}, output: { highHumidity: 1 } },		
        { input: { humidity: 81	}, output: { highHumidity: 1 } },		
        { input: { humidity: 82	}, output: { highHumidity: 1 } },		
        { input: { humidity: 83	}, output: { highHumidity: 1 } },		
        { input: { humidity: 84	}, output: { highHumidity: 1 } },		
        { input: { humidity: 85	}, output: { highHumidity: 1 } },		
        { input: { humidity: 86	}, output: { highHumidity: 1 } },		
        { input: { humidity: 87	}, output: { highHumidity: 1 } },		
        { input: { humidity: 88	}, output: { highHumidity: 1 } },		
        { input: { humidity: 89	}, output: { highHumidity: 1 } },		
        { input: { humidity: 90	}, output: { highHumidity: 1 } },		
        { input: { humidity: 91	}, output: { highHumidity: 1 } },		
        { input: { humidity: 92	}, output: { highHumidity: 1 } },		
        { input: { humidity: 93	}, output: { highHumidity: 1 } },		
        { input: { humidity: 94	}, output: { highHumidity: 1 } },		
        { input: { humidity: 95	}, output: { highHumidity: 1 } },		
        { input: { humidity: 96	}, output: { highHumidity: 1 } },		
        { input: { humidity: 97	}, output: { highHumidity: 1 } },		
        { input: { humidity: 98	}, output: { highHumidity: 1 } },		
        { input: { humidity: 99	}, output: { highHumidity: 1 } },		
        { input: { humidity: 100},output: { highHumidity: 1 } },		

    ]

    const TrainingDataTemperature = [
        { input: { temperature: 14 }, output: { normalTemperature: 1 } },					 
        { input: { temperature: 15 }, output: { normalTemperature: 1 } },			
        { input: { temperature: 16 }, output: { normalTemperature: 1 } },			
        { input: { temperature: 17 }, output: { normalTemperature: 1 } },			
        { input: { temperature: 18 }, output: { normalTemperature: 1 } },			
        { input: { temperature: 19 }, output: { normalTemperature: 1 } },			
        { input: { temperature: 20 }, output: { normalTemperature: 1 } },			
        { input: { temperature: 21 }, output: { normalTemperature: 1 } },			
        { input: { temperature: 22 }, output: { normalTemperature: 1 } },			
        { input: { temperature: 23 }, output: { normalTemperature: 1 } },			
        { input: { temperature: 24 }, output: { normalTemperature: 1 } },			
        { input: { temperature: 25 }, output: { normalTemperature: 1 } },			
        { input: { temperature: 26 }, output: { warmTemperature: 1 } },			
        { input: { temperature: 27 }, output: { warmTemperature: 1 } },			
        { input: { temperature: 28 }, output: { warmTemperature: 1 } },			
        { input: { temperature: 29 }, output: { warmTemperature: 1 } },			
        { input: { temperature: 30 }, output: { warmTemperature: 1 } },			
        { input: { temperature: 31 }, output: { warmTemperature: 1 } },			
        { input: { temperature: 32 }, output: { warmTemperature: 1 } },			
        { input: { temperature: 33 }, output: { warmTemperature: 1 } },			
        { input: { temperature: 34 }, output: { warmTemperature: 1 } },			
        { input: { temperature: 35 }, output: { warmTemperature: 1 } },			
        { input: { temperature: 36 }, output: { hotTemperature: 1 } },			
        { input: { temperature: 37 }, output: { hotTemperature: 1 } },			
        { input: { temperature: 38 }, output: { hotTemperature: 1 } },			
        { input: { temperature: 39 }, output: { hotTemperature: 1 } },			
        { input: { temperature: 40 }, output: { hotTemperature: 1 } },			

    ]

    const TrainingDataWind = [
        { input: { wind: 0}, output: {  lowWind: 1 } },		
        { input: { wind: 2}, output: {  lowWind: 1 } },		
        { input: { wind: 3}, output: {  lowWind: 1 } },		
        { input: { wind: 4}, output: {  lowWind: 1 } },		
        { input: { wind: 5}, output: {  lowWind: 1 } },		
        { input: { wind:6  }, output: { normalWind: 1 } },		
        { input: { wind:7  }, output: { normalWind: 1 } },		
        { input: { wind:8  }, output: { normalWind: 1 } },		
        { input: { wind:9  }, output: { normalWind: 1 } },		
        { input: { wind:10 }, output: { normalWind: 1 } },		
        { input: { wind:11 }, output: { moderateWind: 1 } },		
        { input: { wind:12 }, output: { moderateWind: 1 } },		
        { input: { wind:13 }, output: { moderateWind: 1 } },		
        { input: { wind:14 }, output: { moderateWind: 1 } },		
        { input: { wind:15 }, output: { moderateWind: 1 } },		
        { input: { wind:16 }, output: { highWind: 1 } },		
        { input: { wind:17 }, output: { highWind: 1 } },		
        { input: { wind:18 }, output: { highWind: 1 } },		
    ]

    const TrainingPrecipitation = [
        { input: {  precipitation:	0},	output: { noRainF: 1 } },		
        { input: {  precipitation:	1},	output: { lightRainF: 1 } },		
        { input: {  precipitation:	2},	output: { lightRainF: 1 } },		
        { input: {  precipitation:	3},	output: { moderateRainF: 1 } },		
        { input: {  precipitation:	4},	output: { heavyRainF: 1 } },		
        { input: {  precipitation:	5},	output: { heavyRainF: 1 } },		
            
    ]



    const TrainingDataPM = []

    // Upcoming/1day/3days/7days/15days/30days/45days/
    const TrainingDataUpcoming = [] 

    //ForecastActivities for farmers
    const TrainingDataAMAct = [
        {input: {time:'6:00 AM',temperature: 1,humidity: 1, precipitation: 1, windSpeed: 1}, output:{}}
    ]
    const TrainingDataPMAct = []

    // Upcoming/1day/3days/7days/15days/30days/45days/
    const TrainingDataUpcomingAct = [] 


   const config = {
        binaryThresh: 0.5,
        hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
        activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
        leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
    };
    // create a simple feed forward neural network with backpropagation
const net = new brain.NeuralNetwork(config);

net.train([
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] },
]);

const output = net.run([1, 0]); // [0.987]






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
    }, [])

    return (
        <WeatherContext.Provider  >
            {children}
        </WeatherContext.Provider >
    )
}


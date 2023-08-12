import moment from 'moment';
import axios from 'axios';
import React, { useEffect, createContext, useState, useContext } from 'react';
import auth from '@react-native-firebase/auth';
//import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';
import { LocationContext } from './LocationProvider';
//import { WeatherContext } from '../Context/WeatherProvider';
import { AuthContext } from '../Context/AuthProvider';


export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const { logout, user } = useContext(AuthContext)
 
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
        weatherD
      } = useContext(LocationContext);

    
    const apiKey = 'eb40ebc2fe0c4d02b2735258230304';
    // const [locations, setLocation] = useState('http://api.weatherapi.com/v1/forecast.json?key=eb40ebc2fe0c4d02b2735258230304&q=batac, ilocos norte&days=7&aqi=yes&alerts=yes')
    const [loooo, setLoooo] = useState(null)
    const [locas, setLocas] = useState([])
    const [humi, setHumi] = useState('');
    const [predHumi, setPredHumi] = useState('')
    const [temp, setTemp] = useState('');
    const [predTemp, setPredTemp] = useState('')
    const [wind, setWind] = useState('');
    const [predWind, setPredWind] = useState('')
    const [preci, setPreci] = useState('');
    const [predPreci, setPredPreci] = useState('')
    const foliar = [15, 30, 45, 60, 75, 90];               
    const water  = 3;

    function getHumidity () {
        user.address
    }

    // ForecastUpdate for farmers
    // Today
    // time:'6:00 AM',
    // Humidity
    // const humidity = async () => { 
    //     setHumi(67)
    //     const TrainingDataHumidity = [
    //         { input: { humidity: 30 }, output: { lowHumidity: 1 } },		
    //         { input: { humidity: 31 }, output: { lowHumidity: 1 } },		
    //         { input: { humidity: 32 }, output: { lowHumidity: 1 } },		
    //         { input: { humidity: 33 }, output: { lowHumidity: 1 } },		
    //         { input: { humidity: 34 }, output: { lowHumidity: 1 } },		
    //         { input: { humidity: 35 }, output: { lowHumidity: 1 } },		
    //         { input: { humidity: 36 }, output: { lowHumidity: 1 } },		
    //         { input: { humidity: 37 }, output: { lowHumidity: 1 } },		
    //         { input: { humidity: 38 }, output: { lowHumidity: 1 } },		
    //         { input: { humidity: 39 }, output: { lowHumidity: 1 } },		
    //         { input: { humidity: 40 }, output: { lowHumidity: 1 } },		
    //         { input: { humidity: 41	}, output: { normalHumidity: 1 } },		
    //         { input: { humidity: 42	}, output: { normalHumidity: 1 } },		
    //         { input: { humidity: 43	}, output: { normalHumidity: 1 } },		
    //         { input: { humidity: 44	}, output: { normalHumidity: 1 } },		
    //         { input: { humidity: 45	}, output: { normalHumidity: 1 } },		
    //         { input: { humidity: 46	}, output: { normalHumidity: 1 } },		
    //         { input: { humidity: 47	}, output: { normalHumidity: 1 } },		
    //         { input: { humidity: 48	}, output: { normalHumidity: 1 } },		
    //         { input: { humidity: 49	}, output: { normalHumidity: 1 } },		
    //         { input: { humidity: 50	}, output: { normalHumidity: 1 } },		
    //         { input: { humidity: 51	}, output: { normalHumidity: 1 } },		
    //         { input: { humidity: 52	}, output: { normalHumidity: 1 } },		
    //         { input: { humidity: 53	}, output: { normalHumidity: 1 } },		
    //         { input: { humidity: 54	}, output: { normalHumidity: 1 } },		
    //         { input: { humidity: 55	}, output: { normalHumidity: 1 } },		
    //         { input: { humidity: 56	}, output: { normalHumidity: 1 } },		
    //         { input: { humidity: 57	}, output: { normalHumidity: 1 } },		
    //         { input: { humidity: 58	}, output: { normalHumidity: 1 } },		
    //         { input: { humidity: 59	}, output: { normalHumidity: 1 } },		
    //         { input: { humidity: 60	}, output: { normalHumidity: 1 } },		
    //         { input: { humidity: 61	}, output: { moderateHumidity: 1 } },		
    //         { input: { humidity: 62	}, output: { moderateHumidity: 1 } },		
    //         { input: { humidity: 63	}, output: { moderateHumidity: 1 } },		
    //         { input: { humidity: 64	}, output: { moderateHumidity: 1 } },		
    //         { input: { humidity: 65	}, output: { moderateHumidity: 1 } },		
    //         { input: { humidity: 66	}, output: { moderateHumidity: 1 } },		
    //         { input: { humidity: 67	}, output: { moderateHumidity: 1 } },		
    //         { input: { humidity: 68	}, output: { moderateHumidity: 1 } },		
    //         { input: { humidity: 69	}, output: { moderateHumidity: 1 } },		
    //         { input: { humidity: 70	}, output: { moderateHumidity: 1 } },		
    //         { input: { humidity: 71	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 72	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 73	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 74	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 75	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 76	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 77	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 78	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 79	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 80	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 81	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 82	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 83	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 84	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 85	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 86	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 87	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 88	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 89	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 90	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 91	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 92	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 93	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 94	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 95	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 96	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 97	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 98	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 99	}, output: { highHumidity: 1 } },		
    //         { input: { humidity: 100},output: { highHumidity: 1 } },		
    
    //     ]

    //     // Step 5: Create and train the neural network
    //     const model = tf.sequential();
    //     model.add(tf.layers.dense({ units: 10, inputShape: [2], activation: 'relu' }));
    //     model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));

    //     const humidityOptimizer = tf.train.adam();
    //     model.compile({
    //     humidityOptimizer,
    //     loss: 'categoricalCrossentropy',
    //     metrics: ['accuracy'],
    //     });

    //     const humidityxs = tf.tensor2d(TrainingDataHumidity.map(item => item.input));
    //     const humidityys = tf.tensor2d(TrainingDataHumidity.map(item => item.output));
    
    //     await model.fit(humidityxs, humidityys, {
    //       epochs: 10,
    //     });

    //      // Step 6: Make predictions with the trained model
    //     const humidityData = tf.tensor2d([Number(humi)]);
    //     const humidityPredictionResult = model.predict(humidityData);
    //     const humidityPredictionData = await humidityPredictionResult.data();
        
    //     // Step 7: Interpret the prediction
    //     const humidityActivityLabel = ['lowHumidity', 'normalHumidity', 'moderateHumidity', 'highhumidity'];
    //     const maxHumidityPrediction = humidityPredictionData.indexOf(Math.max(...humidityPredictionData));
    //     const predictedHumidityActivity = humidityActivityLabel[maxHumidityPrediction];

    //     setHumi(predictedHumidityActivity);

    //     //setHumi('humidity')
    //     // console.log(humi)
    //     // console.log(predictedHumidityActivity)
    //     // console.log(predictedHumidityActivity)
    //     //console.log(humi)
    // }
  
    // const Temperature = () => {

    //     const TrainingDataTemperature = [
    //         { input: { temperature: 14 }, output: { normalTemperature: 1 } },					 
    //         { input: { temperature: 15 }, output: { normalTemperature: 1 } },			
    //         { input: { temperature: 16 }, output: { normalTemperature: 1 } },			
    //         { input: { temperature: 17 }, output: { normalTemperature: 1 } },			
    //         { input: { temperature: 18 }, output: { normalTemperature: 1 } },			
    //         { input: { temperature: 19 }, output: { normalTemperature: 1 } },			
    //         { input: { temperature: 20 }, output: { normalTemperature: 1 } },			
    //         { input: { temperature: 21 }, output: { normalTemperature: 1 } },			
    //         { input: { temperature: 22 }, output: { normalTemperature: 1 } },			
    //         { input: { temperature: 23 }, output: { normalTemperature: 1 } },			
    //         { input: { temperature: 24 }, output: { normalTemperature: 1 } },			
    //         { input: { temperature: 25 }, output: { normalTemperature: 1 } },			
    //         { input: { temperature: 26 }, output: { warmTemperature: 1 } },			
    //         { input: { temperature: 27 }, output: { warmTemperature: 1 } },			
    //         { input: { temperature: 28 }, output: { warmTemperature: 1 } },			
    //         { input: { temperature: 29 }, output: { warmTemperature: 1 } },			
    //         { input: { temperature: 30 }, output: { warmTemperature: 1 } },			
    //         { input: { temperature: 31 }, output: { warmTemperature: 1 } },			
    //         { input: { temperature: 32 }, output: { warmTemperature: 1 } },			
    //         { input: { temperature: 33 }, output: { warmTemperature: 1 } },			
    //         { input: { temperature: 34 }, output: { warmTemperature: 1 } },			
    //         { input: { temperature: 35 }, output: { warmTemperature: 1 } },			
    //         { input: { temperature: 36 }, output: { hotTemperature: 1 } },			
    //         { input: { temperature: 37 }, output: { hotTemperature: 1 } },			
    //         { input: { temperature: 38 }, output: { hotTemperature: 1 } },			
    //         { input: { temperature: 39 }, output: { hotTemperature: 1 } },			
    //         { input: { temperature: 40 }, output: { hotTemperature: 1 } },			
    
    //     ]
    //     netDataTemperature.train(TrainingDataTemperature)
    //     const PrenetDataTemperature = netDataTemperature.run(temp);
        
    //     const temperatureActivityLabel = ['normalTemperature', 'warmTemperature', 'hotTemperature'];
    //     const maxTemperaturePrediction = Object.keys(PrenetDataTemperature).reduce((a,b) => 
    //     PrenetDataTemperature[a] = PrenetDataTemperature[b] ? a : b
    //     );

    //     setPredTemp(temperatureActivityLabel[maxTemperaturePrediction]);
    //     setTemp('Temperature')
    //     console.log('Temperature: True')
    // }
   
    // const Wind = () => {

    //     const TrainingDataWind = [
    //         { input: { wind: 0}, output: {  lowWind: 1 } },		
    //         { input: { wind: 2}, output: {  lowWind: 1 } },		
    //         { input: { wind: 3}, output: {  lowWind: 1 } },		
    //         { input: { wind: 4}, output: {  lowWind: 1 } },		
    //         { input: { wind: 5}, output: {  lowWind: 1 } },		
    //         { input: { wind:6  }, output: { normalWind: 1 } },		
    //         { input: { wind:7  }, output: { normalWind: 1 } },		
    //         { input: { wind:8  }, output: { normalWind: 1 } },		
    //         { input: { wind:9  }, output: { normalWind: 1 } },		
    //         { input: { wind:10 }, output: { normalWind: 1 } },		
    //         { input: { wind:11 }, output: { moderateWind: 1 } },		
    //         { input: { wind:12 }, output: { moderateWind: 1 } },		
    //         { input: { wind:13 }, output: { moderateWind: 1 } },		
    //         { input: { wind:14 }, output: { moderateWind: 1 } },		
    //         { input: { wind:15 }, output: { moderateWind: 1 } },		
    //         { input: { wind:16 }, output: { highWind: 1 } },		
    //         { input: { wind:17 }, output: { highWind: 1 } },		
    //         { input: { wind:18 }, output: { highWind: 1 } },		
    //     ]
    
    //     netDataWind.train(TrainingDataWind)
    //     const PrenetDataWind = netDataWind.run(wind);
        
    //     const windActivityLabel = ['normalTemperature', 'warmTemperature', 'hotTemperature'];
    //     const maxWindPrediction = Object.keys(PrenetDataWind).reduce((a,b) => 
    //     PrenetDataWind[a] = PrenetDataWind[b] ? a : b
    //     );

    //     setPredWind(windActivityLabel[maxWindPrediction]);
    //     setWind('Wind')
    //     console.log('Wind: True')
    // }

    // const Precipitation = () => {

    //     const TrainingDataPrecipitation = [
    //         { input: {  precipitation:	0},	output: { noRainF: 1 } },		
    //         { input: {  precipitation:	1},	output: { lightRainF: 1 } },		
    //         { input: {  precipitation:	2},	output: { lightRainF: 1 } },		
    //         { input: {  precipitation:	3},	output: { moderateRainF: 1 } },		
    //         { input: {  precipitation:	4},	output: { heavyRainF: 1 } },		
    //         { input: {  precipitation:	5},	output: { heavyRainF: 1 } },		 
    //     ]
    
    //     netDataPrecipitation.train(TrainingDataPrecipitation)
    //     const PrenetDataPrecipitation = netDataPrecipitation.run(preci);
        
    //     const precipitationActivityLabel = ['normalTemperature', 'warmTemperature', 'hotTemperature'];
    //     const maxPrecipitationPrediction = Object.keys(PrenetDataPrecipitation).reduce((a,b) => 
    //     PrenetDataPrecipitation[a] = PrenetDataPrecipitation[b] ? a : b
    //     );

    //     setPredPreci(precipitationActivityLabel[maxPrecipitationPrediction]);
    //     setPreci('Precipitation')
    //     console.log('Precipitation: True')
    // }
 
    const TrainingDataPM = []

    // Upcoming/1day/3days/7days/15days/30days/45days/
    const TrainingDataUpcoming = [] 

    //ForecastActivities for farmers
    const TrainingDataAMAct = [
        {input: {time:'6:00 AM',temperature: 1,humidity: 1, precipitation: 1, windSpeed: 1}, output:{}}
    ]

    const TrainingDataPMAct = []

    // Upcoming/1day/3days/7days/15days/30days/45days/
    const TrainingDataUpcomingAct = [];

    useEffect(() => {
        //Temperature();
        //Wind();
        //Precipitation();
        receviedDataPlantInfo

    },[])

   const receviedDataPlantInfo = () => {
        //Get and parse data from database
        //filter activity (Today or  Upcoming)
        console.log(weathPerHour)
   }

    // const upComing =  () => {
        

    // }

    return (
        <WeatherContext.Provider 
            value={{ humi, predHumi, temp, predTemp, wind, predWind, preci, predPreci}} >
            {children}
        </WeatherContext.Provider >
    )
}


To create a machine learning model with tabular data for generating weather activity predictions in a React Native mobile application, we'll use the "@tensorflow/tfjs-react-native" package along with React Native components. In this example, we'll build a neural network to predict weather activity based on temperature and humidity features.

Step 1: Set up your React Native project and install required dependencies:

Create a new React Native project using the React Native CLI:

```bash
npx react-native init WeatherActivityApp
cd WeatherActivityApp
```

Install the required dependencies:

```bash
npm install @tensorflow/tfjs-react-native react-native-fs react-native-unimodules
```

Step 2: Create the WeatherPredictionForm component:

Create a new component called "WeatherPredictionForm.js":

```jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const WeatherPredictionForm = ({ predictWeather }) => {
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');

  const handleSubmit = () => {
    predictWeather({ temperature, humidity });
  };

  return (
    <View>
      <Text>Temperature:</Text>
      <TextInput
        value={temperature}
        onChangeText={(text) => setTemperature(text)}
        keyboardType="numeric"
      />
      <Text>Humidity:</Text>
      <TextInput
        value={humidity}
        onChangeText={(text) => setHumidity(text)}
        keyboardType="numeric"
      />
      <Button title="Predict Weather Activity" onPress={handleSubmit} />
    </View>
  );
};

export default WeatherPredictionForm;
```

Step 3: Create the WeatherActivityApp component:

Replace the content of "App.js" with the following code:

```jsx
import React from 'react';
import WeatherPredictionForm from './WeatherPredictionForm';
import * as tf from '@tensorflow/tfjs-react-native';

const WeatherActivityApp = () => {
  const predictWeather = async ({ temperature, humidity }) => {
    // Step 4: Prepare the dataset (training data)
    const trainingData = [
      { input: { temperature: 30, humidity: 80 }, output: { sunny: 1 } },
      { input: { temperature: 25, humidity: 70 }, output: { sunny: 1 } },
      { input: { temperature: 20, humidity: 60 }, output: { cloudy: 1 } },
      { input: { temperature: 10, humidity: 50 }, output: { rainy: 1 } },
    ];

    // Step 5: Create and train the neural network
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 10, inputShape: [2], activation: 'relu' }));
    model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));

    const optimizer = tf.train.adam();
    model.compile({
      optimizer,
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });

    const { inputs, labels } = convertToTensors(trainingData);

    const batchSize = 4;
    const epochs = 50;

    await model.fit(inputs, labels, {
      batchSize,
      epochs,
    });

    // Step 6: Make predictions with the trained model
    const inputWeather = tf.tensor2d([[Number(temperature), Number(humidity)]]);
    const predictions = model.predict(inputWeather);
    const predictionValues = await predictions.array();

    const weatherActivityLabels = ['sunny', 'cloudy', 'rainy'];
    const maxPredictionIndex = predictionValues[0].indexOf(Math.max(...predictionValues[0]));
    const predictedWeatherActivity = weatherActivityLabels[maxPredictionIndex];

    console.log('Input Weather:', [temperature, humidity]);
    console.log('Predicted Weather Activity:', predictedWeatherActivity);
  };

  const convertToTensors = (data) => {
    // Similar to the React example, convert data to tensors
    // ...
  };

  return (
    <View>
      <Text>Weather Activity Prediction</Text>
      <WeatherPredictionForm predictWeather={predictWeather} />
    </View>
  );
};

export default WeatherActivityApp;
```

Step 4: Link native dependencies:

Run the following command to link the native dependencies:

```bash
npx react-native link
```

Step 5: Start the development server:

Run the application using:

```bash
npx react-native run-android   # For Android
npx react-native run-ios       # For iOS
```

This will start the development server and launch the application on your connected Android or iOS device or emulator. The application will show a form where you can input temperature and humidity values. When you submit the form, the model will make predictions for the weather activity based on the provided data.

In this example, we use "@tensorflow/tfjs-react-native" to build a simple neural network for weather activity prediction based on the provided tabular data. The model is trained when the user submits the form with temperature and humidity values. After training, the user can input temperature and humidity values in the form, and the model will make predictions for the weather activity based on the provided data.

Please note that running machine learning models on mobile devices might have performance implications, especially for complex models. In real-world applications, you might consider using pre-trained models and APIs to perform weather activity predictions efficiently on mobile devices.
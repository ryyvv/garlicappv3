import { Platform } from 'react-native';
import { fetch } from 'react-native-fs';
import { tf } from '@tensorflow/tfjs-react-native';
//import { bundleResourceIO } from '@tensorflow/tfjs-react-native/dist/io/file_system';
require( '@tensorflow/tfjs-core/dist/tf-core.node.js');

export async function loadTFLiteModel() {
  const modelPath = Platform.OS === 'android'
    ? 'file:///android_asset/model.tflite'
    : tf.util.encodeString(fetch('assets/model.tflite').path());
    
  const model = await tf.loadTFLiteModel(bundleResourceIO(modelPath));
  return model;
}
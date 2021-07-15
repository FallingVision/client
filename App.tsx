import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import CameraScreen from './src/components/screens/camera/CameraScreen';

const App = () => {
  return (
    <SafeAreaView>
      <Text>Falling Vision</Text>
      <CameraScreen />
    </SafeAreaView>
  );
};

export default App;

import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';
import CameraScreen from './src/components/screens/camera/CameraScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CameraScreen />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
import CameraScreen from './src/components/screens/camera/CameraScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <CameraScreen />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

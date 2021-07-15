import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Button} from 'react-native-elements/dist/buttons/Button';

const CameraScreen = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <RNCamera style={styles.cameraStyle} />
      <View style={styles.takePhotoButtonContainer}>
        <Button style={styles.takePhotoButton} />
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  cameraStyle: {
    flex: 9,
  },
  takePhotoButtonContainer: {
    flex: 1,
  },
  takePhotoButton: {
    width: 70,
    height: 70,
    borderWidth: 10,
    borderRadius: 50,
    alignSelf: 'center',

    backgroundColor: 'pink',
  },
});

import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
import CameraScreen from './src/components/screens/camera/CameraScreen';

/* axios base */
import { configure } from 'axios-hooks';
import axios from './src/utils/axios';
import TestScreen from './src/components/screens/test/TestScreen';
import TestScreen2 from './src/components/screens/test/TestScreen2';

/* global axios instance */
configure({ axios: axios.axiosInstance });

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

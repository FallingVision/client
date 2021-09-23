import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import CameraScreen from './src/components/screens/camera/CameraScreen';

/* axios base */
import { configure } from 'axios-hooks';
import axios from './src/utils/axios';

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

import React from 'react';
import { SafeAreaView, Text } from 'react-native';
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
		<SafeAreaView style={{ flex: 1 }}>
			{/* <Text>Falling Vision</Text> */}
			{/* <CameraScreen /> */}
			<TestScreen />
			{/* <TestScreen2 /> */}
		</SafeAreaView>
	);
};

export default App;

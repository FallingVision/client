import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import CameraScreen from './src/components/screens/camera/CameraScreen';

/* axios base */
import useAxios, { configure } from 'axios-hooks';
import axios from './src/utils/axios';
import LoginPage from './src/components/screens/login/LoginPage';
import { SafeAreaView } from 'react-native-safe-area-context';

/* global axios instance */
configure({ axios: axios.axiosInstance });

const App = () => {
	const [{ data: loginData, loading: loginLoading, error: loginError }, executeLogin] = useAxios<{
		access_token: string;
	}>(
		{
			url: '/auth/login',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		},
		{
			manual: true,
		},
	);

	if (!loginLoading && !loginError && loginData) {
		return (
			<SafeAreaView style={styles.rootCameraScreen}>
				<CameraScreen />
			</SafeAreaView>
		);
	} else {
		return (
			<SafeAreaView style={styles.rootLoginPage}>
				<LoginPage executeLogin={executeLogin} />
			</SafeAreaView>
		);
	}
};

export default App;

const styles = StyleSheet.create({
	rootCameraScreen: {
		flex: 1,
	},
	rootLoginPage: {
		width: '100%',
		height: '100%',
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white',
	},
});

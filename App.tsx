import React from 'react';
import { Alert, StyleSheet } from 'react-native';
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
			url: 'http://192.168.100.123:5000/auth/login',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		},
		{
			manual: true,
		},
	);

	const alertHandler = () =>
		Alert.alert(
			'로그인 실패',
			'잘못된 이메일 또는 비밀번호를 입력하셨습니다.\n다시 시도하세요.',
			[
				{
					text: '확인',
					onPress: () => {
						// do nothing
					},
				},
			],
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
				<LoginPage executeLogin={executeLogin} alertHandler={alertHandler} />
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

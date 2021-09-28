import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { RefetchOptions } from 'axios-hooks';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import InputComponent from '../../organisms/login/InputComponent';
import LoginButton from '../../organisms/login/LoginButton';
import TitleComponent from '../../organisms/login/TitleComponent';

export interface LoginPageProps {
	executeLogin: (
		config?: AxiosRequestConfig | undefined,
		options?: RefetchOptions | undefined,
	) => AxiosPromise<any>;
}

const LoginPage = (props: LoginPageProps): JSX.Element => {
	const { executeLogin } = props;

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	/**
	 * email input handler
	 * @param e
	 */
	const handleEmail = (e: any) => {
		setEmail(e);
	};
	/**
	 * password input handler
	 * @param e
	 */
	const handlePassword = (e: any) => {
		setPassword(e);
	};

	// 로그인 버튼 disable
	const disabled: boolean = email === '' || password === '';

	return (
		<View style={styles.root}>
			<View style={styles.topContainer}>
				<TitleComponent />
			</View>

			<View style={styles.middleContainer}>
				<InputComponent
					email={email}
					password={password}
					handleEmail={handleEmail}
					handlePassword={handlePassword}
				/>
			</View>

			<View style={styles.bottomContainer}>
				<LoginButton
					executeLogin={executeLogin}
					email={email}
					password={password}
					disabled={disabled}
				/>
			</View>
		</View>
	);
};

export default LoginPage;

const styles = StyleSheet.create({
	root: {
		width: '87.2%',
		height: '100%',
		backgroundColor: 'white',
	},
	topContainer: {
		width: '100%',
		height: '10%',
	},
	middleContainer: {
		width: '100%',
		height: '70%',
	},
	bottomContainer: {
		width: '100%',
		height: '20%',
	},
});

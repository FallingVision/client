import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { RefetchOptions } from 'axios-hooks';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface LoginButtonProps {
	executeLogin: (
		config?: AxiosRequestConfig | undefined,
		options?: RefetchOptions | undefined,
	) => AxiosPromise<any>;
	alertHandler: () => void;
	email: string;
	password: string;
	disabled: boolean;
}

const LoginButton = (props: LoginButtonProps): JSX.Element => {
	const { executeLogin, alertHandler, email, password, disabled } = props;

	return (
		<TouchableOpacity
			style={styles.buttonStyle}
			disabled={disabled}
			onPress={async () => {
				await executeLogin({
					data: {
						username: email,
						password: password,
					},
				})
					.then(res => {
						if (res.data === undefined) {
							alertHandler();
						}
					})
					.catch(err => {
						console.log('err:', err);
					});
			}}
		>
			<Text style={styles.buttonTextStyle}>로그인하기</Text>
		</TouchableOpacity>
	);
};

export default LoginButton;

const styles = StyleSheet.create({
	buttonStyle: {
		width: '100%',
		height: 48,
		borderRadius: 3,
		backgroundColor: 'skyblue',
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#000000',

		justifyContent: 'center',
	},
	buttonTextStyle: {
		fontSize: 15,
		fontWeight: '500',
		fontStyle: 'normal',
		letterSpacing: 0,
		textAlign: 'center',
		color: '#000000',
	},
});

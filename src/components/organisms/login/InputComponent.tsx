import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface InputComponentProps {
	email: string;
	password: string;
	handleEmail: (e: any) => void;
	handlePassword: (e: any) => void;
}

const InputComponent = (props: InputComponentProps): JSX.Element => {
	const { email, password, handleEmail, handlePassword } = props;

	return (
		<View style={styles.root}>
			<Input
				onChangeText={(e: any) => {
					handleEmail(e);
				}}
				label="이메일"
				labelStyle={styles.emailLabelStyle}
				value={email}
				keyboardType="email-address"
				returnKeyType="done"
				autoCapitalize="none"
				maxLength={30}
				containerStyle={styles.inputContainerStyle}
			/>
			<Input
				onChangeText={(e: any) => {
					handlePassword(e);
				}}
				label="비밀번호"
				labelStyle={styles.passwordLabelStyle}
				value={password}
				secureTextEntry={true}
				keyboardType="default"
				returnKeyType="done"
				maxLength={30}
				containerStyle={styles.inputContainerStyle}
			/>

			<View style={styles.signUpContainer}>
				<TouchableOpacity
					style={styles.signUpButtonStyle}
					onPress={() => {
						// navigation.navigate('회원가입 페이지', {
						// 	type: 'local',
						// 	profile: null,
						// });
						console.log('[회원가입버튼]');
					}}
				>
					<Text style={styles.signUpButtonTextStyle}>회원가입</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default InputComponent;

const styles = StyleSheet.create({
	root: {
		width: '100%',
		marginTop: 50,
	},
	signUpContainer: {
		width: '30%',
		height: 30,
		justifyContent: 'center',
		alignSelf: 'center',
	},
	inputContainerStyle: {
		paddingLeft: 0,
		paddingRight: 0,
	},

	emailLabelStyle: {
		opacity: 0.8,
		fontSize: 15,
		fontWeight: '500',
		fontStyle: 'normal',
		letterSpacing: 0.17,
		textAlign: 'left',
		color: '#000000',
	},
	passwordLabelStyle: {
		opacity: 0.8,
		fontSize: 15,
		fontWeight: '500',
		fontStyle: 'normal',
		letterSpacing: 0.17,
		textAlign: 'left',
		color: '#000000',
	},
	signUpButtonStyle: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	signUpButtonTextStyle: {
		opacity: 0.8,
		fontSize: 15,
		fontWeight: '500',
		fontStyle: 'normal',
		letterSpacing: 0.17,
		textAlign: 'left',
		color: '#000000',
	},
});

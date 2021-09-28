import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

const TitleComponent = (): JSX.Element => {
	return (
		<View style={styles.root}>
			<Text style={styles.titleText}>로그인하기</Text>
		</View>
	);
};

export default TitleComponent;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: 'flex-end',
	},

	titleText: {
		fontSize: 21,
		fontWeight: '600',
		fontStyle: 'normal',
		letterSpacing: -1.26,
		color: '#000000',
	},
});

import useAxios from 'axios-hooks';
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Image } from 'react-native-elements/dist/image/Image';
import SearchBottomSheet from '../../organisms/search-bottom-sheet/SearchBottomSheet';

export interface CategoryText {
	category: string;
	text: string;
}

const CameraScreen = (): JSX.Element => {
	const [{ data: uploadData, loading: uploadLoading, error: uploadError }, executeUpload] =
		// useAxios<CategoryText>(
		useAxios<any>(
			{
				method: 'POST',
				url: '/upload-image',
			},
			{
				manual: true,
			},
		);

	// const { category, text } = getData
	// 	? { category: getData.category, text: getData.text }
	// 	: { category: '', text: '' };

	const cameraRef = React.useRef<RNCamera>(null);

	const takePhoto = async () => {
		if (cameraRef) {
			console.log('take photo');

			const data = await cameraRef.current?.takePictureAsync({
				quality: 1,
				exif: true,
				base64: true,
			});

			if (data) {
				executeUpload({
					data: data.base64,
				})
					.then(res => {
						// console.log('res:', res.data);
						console.log('res:', res.data);
					})
					.catch(err => {
						console.log('err:', err);
					});
			}
		}
	};

	return (
		<View style={styles.container}>
			<RNCamera
				ref={cameraRef}
				captureAudio={false}
				type={RNCamera.Constants.Type.back}
				androidCameraPermissionOptions={{
					title: 'Permission to use camera',
					message: 'We need your permission to use your camera',
					buttonPositive: 'Ok',
					buttonNegative: 'Cancel',
				}}
				style={styles.cameraStyle}
			/>
			<TouchableOpacity style={styles.takePhotoButtonContainer} onPress={takePhoto}>
				<Image
					source={require('../../../assets/images/searchCircularButton.png')}
					style={styles.takePhotoButtonImage}
				/>
			</TouchableOpacity>

			{/* <SearchBottomSheet category={category} text={text} /> */}
		</View>
	);
};

export default CameraScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	cameraStyle: {
		flex: 1,
	},
	takePhotoButtonContainer: {
		flex: 1,
		width: 100,
		height: 100,
		borderRadius: 50,
		borderWidth: 10,
		backgroundColor: 'rgb(200, 200, 200)',

		alignSelf: 'center',
		justifyContent: 'center',
		position: 'absolute',
		bottom: '5%',
		zIndex: 1,
	},
	takePhotoButtonImage: {
		width: 80,
		height: 80,

		backgroundColor: 'transparent',
	},
});

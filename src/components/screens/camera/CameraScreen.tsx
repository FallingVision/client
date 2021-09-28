import useAxios from 'axios-hooks';
import React from 'react';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Image } from 'react-native-elements/dist/image/Image';
import SearchBottomSheet from '../../organisms/search-bottom-sheet/SearchBottomSheet';

const CameraScreen = (): JSX.Element => {
	const [{ data: uploadData, loading: uploadLoading, error: uploadError }, executeUpload] =
		useAxios<{ category: string; main_text_idx: number; text_list: string[]; error: boolean }>(
			{
				method: 'POST',
				url: '/upload-image',
			},
			{
				manual: true,
			},
		);

	const cameraRef = React.useRef<RNCamera>(null);

	const takePhoto = async () => {
		if (cameraRef) {
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
				{!uploadLoading ? (
					<Image
						source={require('../../../assets/images/searchCircularButton.png')}
						style={styles.takePhotoButtonImage}
					/>
				) : (
					<View>
						<ActivityIndicator animating size="large" color="black" />
					</View>
				)}
			</TouchableOpacity>

			{uploadData && !uploadError && !uploadLoading && (
				<SearchBottomSheet data={uploadData} loading={uploadLoading} />
			)}
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
		bottom: '10%',
		zIndex: 1,
	},
	takePhotoButtonImage: {
		width: 80,
		height: 80,

		backgroundColor: 'transparent',
	},
});

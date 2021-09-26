import React, { useCallback, useRef, useMemo } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import WebView from 'react-native-webview';
import { CategoryText } from '../../screens/camera/CameraScreen';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 200,
	},
	contentContainer: {
		backgroundColor: 'red',
		flex: 1,
	},
	itemContainer: {
		padding: 6,
		margin: 6,
		backgroundColor: '#eee',
	},
});

const SearchBottomSheet = (props: CategoryText) => {
	// hooks
	const sheetRef = useRef<BottomSheet>(null);

	// variables
	const data = useMemo(
		() =>
			Array(50)
				.fill(0)
				.map((_, index) => `index-${index}`),
		[],
	);
	const snapPoints = useMemo(() => ['1%', '25%', '50%', '90%'], []);

	// callbacks
	const handleSheetChange = useCallback(index => {
		console.log('handleSheetChange', index);
	}, []);
	const handleSnapPress = useCallback(index => {
		sheetRef.current?.snapTo(index);
	}, []);
	const handleClosePress = useCallback(() => {
		sheetRef.current?.close();
	}, []);

	// render
	const renderItem = useCallback(
		item => (
			<View key={item} style={styles.itemContainer}>
				<Text>{item}</Text>
			</View>
		),
		[],
	);

	return (
		<BottomSheet
			ref={sheetRef}
			index={0}
			snapPoints={snapPoints}
			onChange={handleSheetChange}
			// enableHandlePanningGesture={false}
		>
			<BottomSheetView style={styles.contentContainer}>
				<View
					style={{
						flex: 1,
					}}
				>
					<WebView
						source={{
							uri: `https://www.google.com/search?q=${props.text}+${props.category}&biw=1200&bih=668&tbm=shop&ei=mUf2YPr1DMeGoAS_56-4AQ&oq=starbucks+mug&gs_lcp=Cgtwcm9kdWN0cy1jYxADMgIIADICCAAyBAgAEBgyBAgAEBgyBAgAEBgyBAgAEBgyBAgAEBgyBAgAEBgyBAgAEBgyBAgAEBg6CAgAELADEM0CSgQIQRgBUPQdWPQ_YLpDaAVwAHgAgAGPA4gB3AuSAQcwLjkuMC4xmAEAoAEByAEBwAEB&sclient=products-cc&ved=0ahUKEwi6pobw3vDxAhVHA4gKHb_zCxcQ4dUDCAs&uact=5`,
						}}
					/>
				</View>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default SearchBottomSheet;

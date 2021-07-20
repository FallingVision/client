import React, { useCallback, useRef, useMemo } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import WebView from 'react-native-webview';

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

const SearchBottomSheet = () => {
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
	const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

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
							uri: 'https://velog.io/@qjqdn1568/NestJS-%EA%B8%B0%EC%B4%88%EC%A4%91%EC%97%90-%EA%B8%B0%EC%B4%88-Controller-%EB%9E%80#routing-%EC%9D%98-%EC%9D%B4%ED%95%B4',
						}}
					/>
				</View>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default SearchBottomSheet;

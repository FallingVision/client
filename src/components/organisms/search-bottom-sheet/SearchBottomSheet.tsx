import React, { useCallback, useRef, useMemo } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 200,
	},
	contentContainer: {
		backgroundColor: 'white',
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
		<BottomSheet ref={sheetRef} index={0} snapPoints={snapPoints} onChange={handleSheetChange}>
			<BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
				{data.map(renderItem)}
			</BottomSheetScrollView>
		</BottomSheet>
	);
};

export default SearchBottomSheet;

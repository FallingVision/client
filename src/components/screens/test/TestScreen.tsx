import React, { useCallback, useRef, useMemo } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import SearchBottomSheet from '../../organisms/search-bottom-sheet/SearchBottomSheet';

const TestScreen = () => {
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
		<View style={styles.container}>
			<SearchBottomSheet />
		</View>
	);
};

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

export default TestScreen;

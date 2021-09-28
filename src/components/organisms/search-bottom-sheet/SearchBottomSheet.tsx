import React, { useCallback, useRef, useMemo } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Platform } from 'react-native';
import BottomSheet, { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import WebView from 'react-native-webview';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native-elements/dist/image/Image';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 200,
	},
	contentContainer: {
		flex: 1,
	},
	itemContainer: {
		padding: 6,
		margin: 6,
		backgroundColor: '#eee',
	},

	listContainer: {
		flex: 1,
		paddingTop: 22,
	},
	listItem: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
});

export interface CategoryText {
	data: {
		category: string;
		main_text_idx: number;
		text_list: string[];
		error: boolean;
	};
	loading: boolean;
}

const SearchBottomSheet = (props: CategoryText) => {
	const { data, loading } = props;
	const [openWebView, setOpenWebView] = React.useState(false);
	const [selectedText, setSelectedText] = React.useState('');

	// hooks
	const sheetRef = useRef<BottomSheet>(null);

	const data2 = data.text_list.map((each, index) => {
		if (data.error) {
			return {
				key: '분석된 텍스트가 존재하지 않습니다.',
				best: index === data.main_text_idx,
			};
		} else {
			return {
				key: each[0],
				best: index === data.main_text_idx,
			};
		}
	});

	const snapPoints = useMemo(() => ['5%', '25%', '50%', '90%'], []);

	// callbacks
	const handleSheetChange = useCallback(index => {
		console.log('handleSheetChange', index);
	}, []);

	// render
	const renderItem = useCallback(
		({ item }) => (
			<TouchableOpacity
				onPress={() => {
					setSelectedText(item.key);
					setOpenWebView(true);
				}}
				style={{
					height: 70,
					flex: 1,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'white',
					marginBottom: 4,

					...Platform.select({
						ios: {
							shadowColor: 'rgb(50, 50, 50)',
							shadowOpacity: 0.5,
							shadowRadius: 5,
							shadowOffset: {
								height: -1,
								width: 0,
							},
						},
						android: {
							elevation: 3,
						},
					}),
				}}
				key={item}
			>
				{item.best && (
					<Image
						source={require('../../../assets/images/check.png')}
						width={12}
						height={12}
						style={{
							width: 24,
							height: 24,
							alignSelf: 'center',
							marginRight: 12,
						}}
					/>
				)}

				<Text>{item.key}</Text>
			</TouchableOpacity>
		),
		[],
	);

	return (
		<BottomSheet ref={sheetRef} index={0} snapPoints={snapPoints} onChange={handleSheetChange}>
			<View
				style={{
					flex: 1,
				}}
			>
				{data && data.text_list.length > 0 ? (
					<>
						{openWebView && (
							<View
								style={{
									flex: 1,
								}}
							>
								<WebView
									source={{
										uri: `https://www.google.com/search?q=${selectedText}+${data.category}
										&biw=1200&bih=668&tbm=shop&ei=mUf2YPr1DMeGoAS_56-4AQ&oq=starbucks+mug&gs_lcp=Cgtwcm9kdWN0cy1jYxADMgIIADICCAAy
										BAgAEBgyBAgAEBgyBAgAEBgyBAgAEBgyBAgAEBgyBAgAEBgyBAgAEBgyBAgAEBg6CAgAELADEM0CSgQIQRgBUPQdWPQ_YLpDaAVwAHgAgAGPA4g
										B3AuSAQcwLjkuMC4xmAEAoAEByAEBwAEB&sclient=products-cc&ved=0ahUKEwi6pobw3vDxAhVHA4gKHb_zCxcQ4dUDCAs&uact=5`,
									}}
								/>
							</View>
						)}
						{!openWebView && (
							<>
								<View
									style={{
										flexDirection: 'column',
										marginBottom: 48,
										marginTop: 12,
										alignSelf: 'center',
									}}
								>
									<Text
										style={{
											fontSize: 20,
											fontWeight: 'bold',
											fontStyle: 'normal',
											letterSpacing: -0.8,
											textAlign: 'left',
											color: '#343434',
											marginBottom: 4,
										}}
									>
										가장{' '}
										<Text
											style={{
												color: '#339af0',
											}}
										>
											유사도가
										</Text>{' '}
										높은 텍스트를 선택해주세요!
									</Text>

									<Text
										style={{
											fontSize: 20,
											fontWeight: 'bold',
											fontStyle: 'normal',
											letterSpacing: -0.8,
											textAlign: 'left',
											color: '#343434',
											marginBottom: 12,
										}}
									>
										인식된 물건의 종류는 "
										<Text
											style={{
												color: '#74b816',
											}}
										>
											{data.category}
										</Text>{' '}
										" 입니다.
									</Text>

									<Text
										style={{
											fontSize: 13,
											fontWeight: 'bold',
											letterSpacing: -0.65,
											textAlign: 'left',
											color: 'gray',
										}}
									>
										별표가 붙은 텍스트는 모델에서 선택해준 유사 텍스트입니다.
									</Text>
								</View>

								<BottomSheetFlatList
									data={data2}
									keyExtractor={i => i.key}
									renderItem={renderItem}
									// contentContainerStyle={}
								/>
							</>
						)}
					</>
				) : (
					<View
						style={{
							flex: 1,
							alignItems: 'center',
						}}
					>
						<Text
							style={{
								fontSize: 18,
								fontWeight: 'bold',
								fontStyle: 'normal',
								letterSpacing: -0.8,
								textAlign: 'left',
								color: '#343434',
								marginTop: 0,
							}}
						>
							다시
							<Text
								style={{
									color: '#ff6b6b',
								}}
							>
								{` 이미지를 촬영`}
							</Text>
							해주세요.
						</Text>
					</View>
				)}
			</View>
		</BottomSheet>
	);
};

export default SearchBottomSheet;

{
	/* <BottomSheetView style={styles.contentContainer}> */
}
{
	/* <ListView />
	 */
}

{
	/* <View
	style={{
		flex: 1,
	}}
>
	<WebView
		source={{
			uri: `https://www.google.com/search?q=${
				data.text_list[data.main_text_idx]
			}+${data.category}
			&biw=1200&bih=668&tbm=shop&ei=mUf2YPr1DMeGoAS_56-4AQ&oq=starbucks+mug&gs_lcp=Cgtwcm9kdWN0cy1jYxADMgIIADICCAAy
			BAgAEBgyBAgAEBgyBAgAEBgyBAgAEBgyBAgAEBgyBAgAEBgyBAgAEBgyBAgAEBg6CAgAELADEM0CSgQIQRgBUPQdWPQ_YLpDaAVwAHgAgAGPA4g
			B3AuSAQcwLjkuMC4xmAEAoAEByAEBwAEB&sclient=products-cc&ved=0ahUKEwi6pobw3vDxAhVHA4gKHb_zCxcQ4dUDCAs&uact=5`,
		}}
	/>
</View> */
}
{
	/* </BottomSheetView> */
}

// const handleSnapPress = useCallback(index => {
// 	sheetRef.current?.snapTo(index);
// }, []);
// const handleClosePress = useCallback(() => {
// 	sheetRef.current?.close();
// }, []);

import React, { useState, useEffect, useContext } from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";
import { useTheme, TextInput, Card, Title, Paragraph, IconButton } from "react-native-paper";
import { api } from "../api/api";
import { FetchContext } from "../states/FetchContext";

const SearchMemes = () => {
	const theme = useTheme();
	const [memes, setMemes] = useState([]);
	const [page, setPage] = useState(1);
	const [text, setText] = useState("");
	const { setFetching, isFetching } = useContext(FetchContext);

	const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
		const paddingToBottom = 20;
		return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
	};

	const getMemes = (add = false) => {
		setFetching(true, "meme-search");
		const keywords = text.split(" ");
		const requestPage = add ? page + 1 : page;
		api()
			.get(
				`memes/search?number=10&offset=${(requestPage - 1) * 10}&keywords=${keywords.join(
					", "
				)}`
			)
			.then((res) => {
				if (add) {
					setPage(requestPage);
					let newarray =  memes.concat(res.data.memes);
					setMemes(newarray)
				}else{
					setMemes(res.data.memes)
				}
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setFetching(false, "meme-search");
			});
	};

	return (
		<View
			style={{
				display: "flex",
				flexGrow: 1,
			}}
		>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					padding: 10,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<TextInput
					style={{ flexGrow: 1 }}
					mode={"outlined"}
					label="Search"
					value={text}
					onChangeText={(text) => setText(text)}
					outlineColor={theme.colors.surfaceVariant}
					activeOutlineColor={theme.colors.primaryContainer}
				/>

				<IconButton
					icon="magnify"
					iconColor={theme.colors.onPrimaryContainer}
					size={20}
					onPress={() => getMemes()}
					mode={"contained"}
					outlineColor={theme.colors.primaryContainer}
					containerColor={theme.colors.primaryContainer}
					style={{
						marginTop: 10,
					}}
				/>
			</View>

			<ScrollView
				onScroll={({ nativeEvent }) => {
					if (isCloseToBottom(nativeEvent)) {
						getMemes(true);
					}
				}}
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<View
					style={{
						padding: 20,
						marginBottom: 75,
					}}
				>
					{memes.map((meme) => (
						<View key={parseInt(meme.id)}>
							<Card
								style={{ marginBottom: 20, display: "flex" }}
								mode={"elevated"}
								elevation={5}
							>
								<Image
									source={{ uri: meme.url }}
									style={{
										width: Dimensions.get("screen").width - 40,
										height: 400,
									}}
									resizeMode="contain"
								/>
							</Card>
						</View>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default SearchMemes;

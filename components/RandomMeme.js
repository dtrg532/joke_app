import React, { useState, useEffect, useContext } from "react";
import { Dimensions, Image, TouchableHighlight, View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { api } from "../api/api";
import { FetchContext } from "../states/FetchContext";
import SnackBar from "./SnackBar";

const RandomMeme = ({ route }) => {
	const theme = useTheme();
	const [randomMeme, setRandomMeme] = useState(null);
	const { setFetching, isFetching } = useContext(FetchContext);
	const [refresh, setRefresh] = useState(0);
	useEffect(() => {
		const getRandomMeme = () => {
			setFetching(true, "meme");
			api()
				.get("memes/random")
				.then((res) => setRandomMeme(res.data.url))
				.catch((err) => {
					console.log(err);
					setFetching(false, "meme");
				});
		};
		getRandomMeme();
	}, [route.params]);

	return (
		<View
			style={{
				display: "flex",
				padding: 20,
				flexGrow: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<TouchableHighlight
				onPress={() => setRefresh(Math.random())}
				underlayColor="transparent"
				style={{
					justifyContent: "center",
					alignItems: "center",
					flexGrow: 1,
				}}
			>
				<View
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Image
						source={{ uri: randomMeme }}
						style={{
							width: Dimensions.get("screen").width - 40,
							height: Dimensions.get("screen").width - 100,
							opacity: isFetching.meme ? 0 : 1,
						}}
						resizeMode="stretch"
						onLoadEnd={() => setFetching(false, "meme")}
					/>

					{isFetching.meme && (
						<ActivityIndicator
							animating={true}
							color={theme.colors.primaryContainer}
							size={150}
							style={{
								position: "absolute",
							}}
						/>
					)}
				</View>
			</TouchableHighlight>
			<SnackBar message={"Long press on the navigation icon to refresh!"} show={true} />
		</View>
	);
};

export default RandomMeme;

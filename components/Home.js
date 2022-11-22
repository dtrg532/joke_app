import React from "react";
import { Image, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Text } from "react-native-paper";

const Home = () => {
	const theme = useTheme();
	const danceGif = require("../assets/dange.gif");
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "space-evenly",
				alignItems: "center",
				padding: 20,
			}}
		>
			<Text variant="headlineLarge" style={{ color: theme.colors.primaryContainer }}>
				The ultimate joke app!
			</Text>
			<View style={{ display: "flex", alignItems: "center" }}>
				<Image source={danceGif} />
				<Text variant="bodyLarge" style={{ color: theme.colors.onBackground }}>
					This app was built to provide daily humor snacks while pursuing our goals. Feel
					free to browse between jokes or memes, and if you are interested in some very
					specific ones use the search options too!
				</Text>
			</View>
		</View>
	);
};

export default Home;

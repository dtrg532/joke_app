import React, { useState, useEffect, useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { api } from "../api/api";
import { FetchContext } from "../states/FetchContext";
import SnackBar from "./SnackBar";

const RandomJoke = ({ route }) => {
	const theme = useTheme();
	const [randomJoke, setRandomJoke] = useState(null);
	const { setFetching, isFetching } = useContext(FetchContext);
	const [help, setHelp] = useState(true);
	const [refresh, setRefresh] = useState(0);
	useEffect(() => {
		const getRandomJoke = () => {
			setFetching(true, "joke");
			api()
				.get("jokes/random")
				.then((res) => setRandomJoke(res.data.joke))
				.catch((err) => console.log(err))
				.finally(() => {
					setFetching(false, "joke");
				});
		};
		getRandomJoke();
	}, [route.params]);

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
		>
			<View
				style={{
					padding: 20,
				}}
			>
				<Text variant="titleLarge" style={{ color: theme.colors.onBackground }}>
					{isFetching.joke ? (
						<ActivityIndicator
							animating={true}
							color={theme.colors.primaryContainer}
							size={150}
						/>
					) : (
						randomJoke
					)}
				</Text>
			</View>
			<SnackBar message={"Long press on the navigation icon to refresh!"} show={help} />
		</ScrollView>
	);
};

export default RandomJoke;

import React, { useState, useEffect, useContext } from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";
import { useTheme, TextInput, Card, Title, Paragraph, IconButton } from "react-native-paper";
import { api } from "../api/api";
import { FetchContext } from "../states/FetchContext";

const SearchJokes = () => {
	const theme = useTheme();
	const [jokes, setJokes] = useState([]);
	const [page, setPage] = useState(1);
	const [text, setText] = useState("");
	const { setFetching } = useContext(FetchContext);

	const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
		const paddingToBottom = 20;
		return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
	};

	const getJokes = (add = false) => {
		setFetching(true, "joke-search");
		const keywords = text.split(" ");
		const requestPage = add ? page + 1 : page;
		api()
			.get(
				`jokes/search?number=10&offset=${(requestPage - 1) * 10}&keywords=${keywords.join(
					", "
				)}`
			)
			.then((res) => {
				if (add) {
					setPage(requestPage);
				}
				let newJokeArray = add ? jokes.concat(res.data.jokes) : res.data.jokes;
				setJokes(newJokeArray);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setFetching(false, "joke-search");
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
					onPress={() => getJokes()}
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
						getJokes(true);
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
					{jokes.map((joke) => (
						<View key={parseInt(joke.id)}>
							<Card style={{ marginBottom: 20 }} mode={"elevated"} elevation={5}>
								<Card.Content>
									<Title>Joke #{joke.id}</Title>
									<Paragraph>{joke.joke}</Paragraph>
								</Card.Content>
							</Card>
						</View>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default SearchJokes;

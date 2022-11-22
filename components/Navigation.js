import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import RandomJoke from "./RandomJoke";
import RandomMeme from "./RandomMeme";
import SearchJokes from "./SearchJokes";
import SearchMemes from "./SearchMemes";
import { useTheme, ActivityIndicator } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { FetchContext } from "../states/FetchContext";

const Tab = createBottomTabNavigator();
const Navigation = () => {
	const theme = useTheme();
	const navigation = useNavigation();
	const { isFetching } = useContext(FetchContext);
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={{
				tabBarActiveTintColor: theme.colors.primaryContainer,
				tabBarActiveBackgroundColor: theme.colors.surfaceVariant,
				tabBarInactiveBackgroundColor: theme.colors.surface,
				tabBarStyle: {
					height: 75,
				},
			}}
		>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					headerShown: false,
					tabBarLabel: "Home",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="home" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="RandomJoke"
				component={RandomJoke}
				options={{
					headerTitle: "Random joke just for you",
					headerTitleAlign: "center",
					headerStyle: {
						backgroundColor: theme.colors.surface,
					},
					headerTintColor: theme.colors.onSurface,
					headerTitleStyle: {
						fontWeight: "bold",
					},
					tabBarIcon: ({ color, size }) =>
						!isFetching.joke ? (
							<MaterialCommunityIcons
								name="cached"
								color={color}
								size={size}
								onPress={() => navigation.navigate("RandomJoke")}
								onLongPress={() => {
									navigation.navigate("RandomJoke", { refresh: Math.random() });
								}}
							/>
						) : (
							<ActivityIndicator
								animating={true}
								color={theme.colors.primaryContainer}
							/>
						),
				}}
			/>
			<Tab.Screen
				name="RandomMeme"
				component={RandomMeme}
				options={{
					headerTitle: "Random meme just for you",
					headerTitleAlign: "center",
					headerStyle: {
						backgroundColor: theme.colors.surface,
					},
					headerTintColor: theme.colors.onSurface,
					headerTitleStyle: {
						fontWeight: "bold",
					},
					tabBarIcon: ({ color, size }) =>
						!isFetching.meme ? (
							<MaterialCommunityIcons
								name="sync"
								color={color}
								size={size}
								onPress={() => navigation.navigate("RandomMeme")}
								onLongPress={() => {
									navigation.navigate("RandomMeme", { refresh: Math.random() });
								}}
							/>
						) : (
							<ActivityIndicator
								animating={true}
								color={theme.colors.primaryContainer}
							/>
						),
				}}
			/>
			<Tab.Screen
				name="SearchJokes"
				component={SearchJokes}
				options={{
					headerTitle: "Search jokes",
					headerTitleAlign: "center",
					headerStyle: {
						backgroundColor: theme.colors.surface,
					},
					headerTintColor: theme.colors.onSurface,
					headerTitleStyle: {
						fontWeight: "bold",
					},
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="text-search" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="SearchMemes"
				component={SearchMemes}
				options={{
					headerTitle: "Search memes",
					headerTitleAlign: "center",
					headerStyle: {
						backgroundColor: theme.colors.surface,
					},
					headerTintColor: theme.colors.onSurface,
					headerTitleStyle: {
						fontWeight: "bold",
					},
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="feature-search-outline"
							color={color}
							size={size}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default Navigation;

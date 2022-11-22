import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./Navigation";
import { Provider, adaptNavigationTheme } from "react-native-paper";
import { FetchProvider } from "../states/FetchContext";

const AppLayout = ({ theme }) => {
	const { DarkTheme } = adaptNavigationTheme({ dark: theme });
	return (
		<Provider theme={theme}>
			<FetchProvider>
				<NavigationContainer theme={DarkTheme}>
					<Navigation />
				</NavigationContainer>
			</FetchProvider>
		</Provider>
	);
};

export default AppLayout;

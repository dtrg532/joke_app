import AppLayout from "./components/AppLayout";

import { Provider as PaperProvider, MD3DarkTheme as DefaultTheme } from "react-native-paper";

export default function App() {
	const theme = {
		...DefaultTheme,

		colors: {
			primary: "rgb(218, 185, 255)",
			onPrimary: "rgb(70, 0, 132)",
			primaryContainer: "rgb(100, 5, 183)",
			onPrimaryContainer: "rgb(238, 219, 255)",
			secondary: "rgb(207, 193, 218)",
			onSecondary: "rgb(54, 45, 64)",
			secondaryContainer: "rgb(77, 67, 87)",
			onSecondaryContainer: "rgb(236, 221, 247)",
			tertiary: "rgb(242, 183, 192)",
			onTertiary: "rgb(75, 37, 44)",
			tertiaryContainer: "rgb(101, 59, 66)",
			onTertiaryContainer: "rgb(255, 217, 222)",
			error: "rgb(255, 180, 171)",
			onError: "rgb(105, 0, 5)",
			errorContainer: "rgb(147, 0, 10)",
			onErrorContainer: "rgb(255, 180, 171)",
			background: "rgb(29, 27, 30)",
			onBackground: "rgb(231, 225, 229)",
			surface: "rgb(29, 27, 30)",
			onSurface: "rgb(231, 225, 229)",
			surfaceVariant: "rgb(74, 69, 78)",
			onSurfaceVariant: "rgb(204, 196, 207)",
			outline: "rgb(149, 142, 152)",
			outlineVariant: "rgb(74, 69, 78)",
			shadow: "rgb(0, 0, 0)",
			scrim: "rgb(0, 0, 0)",
			inverseSurface: "rgb(231, 225, 229)",
			inverseOnSurface: "rgb(50, 47, 51)",
			inversePrimary: "rgb(125, 50, 208)",
			elevation: {
				level0: "transparent",
				level1: "rgb(38, 35, 41)",
				level2: "rgb(44, 40, 48)",
				level3: "rgb(50, 44, 55)",
				level4: "rgb(52, 46, 57)",
				level5: "rgb(56, 49, 62)",
			},
			surfaceDisabled: "rgba(231, 225, 229, 0.12)",
			onSurfaceDisabled: "rgba(231, 225, 229, 0.38)",
			backdrop: "rgba(51, 47, 55, 0.4)",
		},
	};
	return (
		<PaperProvider theme={theme}>
			<AppLayout theme={theme} />
		</PaperProvider>
	);
}

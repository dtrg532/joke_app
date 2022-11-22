import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { Snackbar, useTheme } from "react-native-paper";

const SnackBar = ({ message, show }) => {
	const [visible, setVisible] = useState(false);
	const theme = useTheme();
	useEffect(() => {
		console.log(show);
		setVisible(show);
	}, [show]);
	return (
		<Snackbar
			style={{ backgroundColor: theme.colors.surface }}
			visible={visible}
			onDismiss={() => setVisible(false)}
			action={{
				label: "Close",
				onPress: () => {
					setVisible(false);
				},
			}}
		>
			<Text style={{ color: theme.colors.onSurface }}>{message}</Text>
		</Snackbar>
	);
};

export default SnackBar;

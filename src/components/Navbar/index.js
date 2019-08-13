import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Navbar = () => {
	return (
		<View testID="nav" style={styles.navbar}>
			<Text>Navbar</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	navbar: {
		height: 50,
		backgroundColor: "#00b7ff"
	},
});

export default Navbar;

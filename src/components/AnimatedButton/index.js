import React from 'react'
import { Animated, Button, View, StyleSheet, Text } from 'react-native'

const AnimatedButton = () => {
	let rotationDegrees = new Animated.Value(0)

	const handlePress = () => {
		rotationDegrees.setValue(0)
		Animated.timing(rotationDegrees, {
			toValue: 100,
			duration: 4000,
			useNativeDriver: true,
		}).start()
	}

	return (
		<>
			<View style={styles.buttonContainer}>
				<Button
					testID="animated-bouncing-button"
					onPress={handlePress}
					title="Click to Animate Circle"
					color="#00b7ff"
					accessibilityLabel="Click to Toggle Animation"
					accessibilityHint="Toggles Circle Animation"
				/>
			</View>
			<Animated.View
				testID="animated-bouncing-button-container"
				accessibilityLabel="animated-bouncing-button-container"
				style={[styles.container, styles.animatedContainer(rotationDegrees)]}
			>
				<Text style={styles.text}>Circle</Text>
			</Animated.View>
		</>
	)
}

const styles = StyleSheet.create({
	animatedContainer: value => ({
		transform: [
			{
				scale: value.interpolate({
					inputRange: [0, 25, 50, 75, 100],
					outputRange: [1, 0.85, 1, 0.85, 1],
					extrapolate: 'clamp',
				}),
			},
			{
				translateX: value.interpolate({
					inputRange: [0, 50, 75, 100],
					outputRange: [0, 1300, 1500, 1500],
					extrapolate: 'clamp',
				}),
			},
		],
	}),
	text: {
		color: '#fff',
	},
	buttonContainer: {
		padding: 20,
	},
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00b7ff',
		width: 75,
		height: 75,
		borderRadius: 50,
	},
})

export default React.memo(AnimatedButton) // Required to avoid resetting animatedValues if state is set on a parent component

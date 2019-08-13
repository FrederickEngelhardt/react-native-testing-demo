import React from 'react'
import { SafeAreaView, StyleSheet, View, Text } from 'react-native'

import Main from './components/Main'
import Navbar from './components/Navbar'

const App = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Navbar />
			<Main />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
})

export default App

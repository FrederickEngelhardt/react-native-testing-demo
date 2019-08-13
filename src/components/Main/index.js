import React, { useState } from "react";
import { StyleSheet, Button, View, Text } from "react-native";
import testProps from './testProps';
import AnimatedButton from '../AnimatedButton';

const Main = props => {
  const { textOptions } = props;
  const [selectedMessageIndex, changeMOTD] = useState(0);

  const handlePress = () => {
    const increment = selectedMessageIndex + 1;
    const index = increment > textOptions.length - 1 ? 0 : increment;
    changeMOTD(index);
  };

  return (
    <View testID="screen-main" style={styles.container1}>
      <View style={styles.container3}>
        <Text style={styles.headerText}>Message of the Day</Text>
        <Text testID="message-of-the-day" style={styles.messageOfTheDayText}>
          {textOptions[selectedMessageIndex]}
        </Text>
      </View>
      <View style={styles.container2}>
        <Button
          testID="change-message-button"
          onPress={handlePress}
          title="Learn More"
          color="#00b7ff"
          accessibilityLabel="Change Message"
          accessibilityHint="Changes Message of the Day"
        />
        <AnimatedButton />
      </View>
    </View>
  );
};

Main.defaultProps = {
  textOptions: testProps.motdTextOptions
};

export default React.memo(Main)

const styles = StyleSheet.create({
  container1: {
    flex: 1
  },
  container2: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container3: {
    flex: 3
  },
  headerText: {
    fontSize: 25,
    fontWeight: "700",
    paddingBottom: 25,
    paddingTop: 25,
    textAlign: "center"
  },
  messageOfTheDayText: {
    fontWeight: "500",
    fontSize: 22,
    paddingLeft: 15
  },
  navbar: {
    height: 50,
    backgroundColor: "#00b7ff"
  },
});

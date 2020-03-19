import React from "react";
import { View, StyleSheet, Text } from "react-native";

const AnimalInputScreen = props => {
  return (
    <View style={styles.container}>
      <Text>Add new Animal!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  }
});

export default AnimalInputScreen;

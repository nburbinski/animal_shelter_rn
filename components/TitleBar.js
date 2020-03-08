import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const TitleBar = () => {
  return (
    <View style={styles.navContainer}>
      <Text style={styles.title}>Animal Shelter</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: "skyblue",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    paddingTop: 35,
    top: 0,
    position: "absolute",
    width: "100%"
  },
  title: {
    fontSize: 45,
    fontFamily: "source-sans",
    color: "white"
  }
});

export default TitleBar;

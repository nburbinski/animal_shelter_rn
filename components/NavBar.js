import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const NavBar = props => {
  return (
    <View style={styles.navContainer}>
      <TouchableOpacity onPress={() => props.loadProfile(false)}>
        <AntDesign name="home" size={32} />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign name="search1" size={32} />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign name="setting" size={32} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: "skyblue",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    paddingBottom: 25,
    bottom: 0,
    position: "absolute",
    width: "100%"
  }
});

export default NavBar;

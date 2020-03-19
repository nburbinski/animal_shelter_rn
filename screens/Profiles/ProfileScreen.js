import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ProfileScreen = props => {
  return (
    <View style={styles.container}>
      <Text> Welcome !</Text>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("AnimalForm");
        }}
      >
        <View style={styles.button}>
          <Text> Add an animal? </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "source-sans"
  }
});

export default ProfileScreen;

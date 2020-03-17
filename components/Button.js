import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Button = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.setIsTrue(!props.isTrue);
      }}
    >
      <View
        style={{
          backgroundColor: props.isTrue ? "blue" : "white",
          ...styles.buttonContainer
        }}
      >
        <Text
          style={{
            color: props.isTrue ? "white" : "blue",
            ...styles.buttonText
          }}
        >
          {props.children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10
  },
  buttonText: {
    fontFamily: "source-sans-semi-bold",
    textAlign: "center"
  }
});

export default Button;

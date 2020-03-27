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
          backgroundColor: props.isTrue ? "#3281FF" : "white",
          ...styles.buttonContainer
        }}
      >
        <Text
          style={{
            color: props.isTrue ? "white" : "#3281FF",
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
    marginBottom: 10,
    marginHorizontal: 10,
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
    fontFamily: "source-sans-semi-bold",
    textAlign: "center"
  }
});

export default Button;

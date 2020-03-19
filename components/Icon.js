import React from "react";
import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Icon = () => {
  return (
    <View style={styles.icon}>
      <AntDesign name="back" size={24} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    padding: 5
  }
});

export default Icon;

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AnimalProfile = () => {
  return (
    <View style={styles.profileContainer}>
      <Text>Test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    margin: 10
  }
});

export default AnimalProfile;

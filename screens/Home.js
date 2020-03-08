import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import AnimalList from "../components/AnimalList";

const Home = props => {
  return (
    <View style={styles.animalList}>
      <AnimalList loadProfile={props.loadProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  animalList: {
    flex: 1,
    marginTop: 50
  }
});

export default Home;

import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import AnimalList from "../components/AnimalList";

const AnimalListScreen = props => {
  return (
    <View style={styles.animalList}>
      <AnimalList
        loadProfile={props.loadProfile}
        selectAnimal={props.selectAnimal}
        navigation={props.navigation}
      />
    </View>
  );
};

AnimalListScreen.navigationOptions = navigationData => {
  return {
    headerTitle: "Animal Shelter",
    headerTitleStyle: {
      fontFamily: "source-sans",
      fontSize: 28
    }
  };
};

const styles = StyleSheet.create({
  animalList: {
    flex: 1
  }
});

export default AnimalListScreen;

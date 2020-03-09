import React from "react";
import { View, Text, StyleSheet } from "react-native";

import AnimalList from "../components/AnimalList";

const LikesScreen = props => {
  return (
    <View>
      <AnimalList
        loadProfile={props.loadProfile}
        selectAnimal={props.selectAnimal}
        navigation={props.navigation}
      />
    </View>
  );
};

LikesScreen.navigationOptions = navigationData => {
  return {
    headerTitle: "Likes",
    headerTitleStyle: {
      fontFamily: "source-sans",
      fontSize: 28
    }
  };
};

export default LikesScreen;

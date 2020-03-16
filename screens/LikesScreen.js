import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

import AnimalList from "../components/AnimalList";

const LikesScreen = props => {
  const animals = useSelector(state => state.animals.filteredAnimals);

  return (
    <View>
      <AnimalList
        animals={animals.filter(animal => animal.liked === true)}
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

import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import AnimalList from "../components/AnimalList";
import HeaderButton from "../components/HeaderButton";

const AnimalListScreen = props => {
  const [animals, setAnimals] = useState([
    {
      id: "1",
      name: "Rufus",
      type: "Dog",
      breed: "Jack Russel Terrier",
      image: "../assets/orange-cat.jpg",
      liked: true
    },
    {
      id: "2",
      name: "LadyBird",
      type: "Dog",
      breed: "Jack Russel Terrier",
      image: "../assets/orange-cat.jpg",
      liked: false
    },
    {
      id: "3",
      name: "Percy",
      type: "Naked Mole Rat",
      breed: "Jack Russel Terrier",
      image: "../assets/orange-cat.jpg",
      liked: false
    }
  ]);

  return (
    <View style={styles.animalList}>
      <AnimalList
        loadProfile={props.loadProfile}
        selectAnimal={props.selectAnimal}
        navigation={props.navigation}
        animals={animals}
        setAnimals={setAnimals}
      />
    </View>
  );
};

AnimalListScreen.navigationOptions = navigationData => {
  return {
    headerTitle: "Animal Shelter",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="filter" iconName="filter" onPress={() => {}} />
      </HeaderButtons>
    ),
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

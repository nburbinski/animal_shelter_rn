import React, { useState } from "react";
import { View } from "react-native";

import AnimalList from "../components/AnimalList";

const LikesScreen = props => {
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
    <View>
      <AnimalList
        animals={animals.filter(animal => animal.liked === true)}
        setAnimals={setAnimals}
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

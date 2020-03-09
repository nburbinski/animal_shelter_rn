import React from "react";
import { ScrollView } from "react-native";

import Animal from "./Animal";

// Demo List
const animals = [
  {
    name: "Rufus",
    type: "Dog",
    breed: "Jack Russel Terrier",
    image: "../assets/orange-cat.jpg",
    liked: false
  },
  {
    name: "LadyBird",
    type: "Dog",
    breed: "Jack Russel Terrier",
    image: "../assets/orange-cat.jpg",
    liked: false
  },
  {
    name: "Percy",
    type: "Naked Mole Rat",
    breed: "Jack Russel Terrier",
    image: "../assets/orange-cat.jpg",
    liked: false
  }
];

const AnimalList = props => {
  return (
    <ScrollView>
      {animals.map(animal => (
        <Animal
          key={animal.name}
          animal={animal}
          loadProfile={props.loadProfile}
          selectAnimal={props.selectAnimal}
          navigation={props.navigation}
        />
      ))}
    </ScrollView>
  );
};

export default AnimalList;

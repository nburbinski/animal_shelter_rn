import React from "react";
import { ScrollView } from "react-native";

import Animal from "./Animal";

const animals = [
  {
    name: "Rufus",
    type: "Dog",
    image: "../assets/orange-cat.jpg",
    liked: false
  },
  {
    name: "LadyBird",
    type: "Dog",
    image: "../assets/orange-cat.jpg",
    liked: false
  },
  {
    name: "Percy",
    type: "Naked Mole Rat",
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
        />
      ))}
    </ScrollView>
  );
};

export default AnimalList;

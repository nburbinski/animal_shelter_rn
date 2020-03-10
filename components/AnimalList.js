import React, { useState } from "react";
import { ScrollView } from "react-native";

import Animal from "./Animal";

const AnimalList = props => {
  const handleCheckPress = id => {
    const test = props.animals.map(animal =>
      animal.id === id ? { ...animal, liked: !animal.liked } : animal
    );
    props.setAnimals(test);
  };

  return (
    <ScrollView>
      {props.animals.map(animal => (
        <Animal
          key={animal.id}
          animal={animal}
          loadProfile={props.loadProfile}
          selectAnimal={props.selectAnimal}
          navigation={props.navigation}
          handleCheckPress={handleCheckPress}
        />
      ))}
    </ScrollView>
  );
};

export default AnimalList;

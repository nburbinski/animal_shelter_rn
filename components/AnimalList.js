import React from "react";
import { FlatList } from "react-native";

import Animal from "./Animal";

const AnimalList = props => {
  return (
    <FlatList
      data={props.animals}
      renderItem={animal => (
        <Animal
          id={animal.id}
          animal={animal.item}
          loadProfile={props.loadProfile}
          selectAnimal={props.selectAnimal}
          navigation={props.navigation}
        />
      )}
    />
  );
};

export default AnimalList;

import React from "react";
import { ScrollView, FlatList, SafeAreaView } from "react-native";

import Animal from "./Animal";

const AnimalList = props => {
  return (
    <SafeAreaView>
      <FlatList
        data={props.animals}
        renderItem={animal => (
          <Animal
            key={animal.id}
            animal={animal.item}
            loadProfile={props.loadProfile}
            selectAnimal={props.selectAnimal}
            navigation={props.navigation}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default AnimalList;

import React from "react";
import { FlatList, SafeAreaView } from "react-native";

import Shelter from "./Shelter";

const AnimalList = props => {
  return (
    <SafeAreaView>
      <FlatList
        data={props.shelters}
        renderItem={shelter => (
          <Shelter
            key={shelter.id}
            shelter={shelter.item}
            loadProfile={props.loadProfile}
            selectShelter={props.selectShelter}
            navigation={props.navigation}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default AnimalList;

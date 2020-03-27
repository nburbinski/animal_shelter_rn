import React from "react";
import { FlatList } from "react-native";

import Shelter from "./Shelter";

const AnimalList = props => {
  return (
    <FlatList
      onRefresh={props.loadShelters}
      refreshing={props.isLoading}
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
  );
};

export default AnimalList;

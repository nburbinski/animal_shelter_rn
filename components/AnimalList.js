import React from "react";
import { FlatList, View, StyleSheet } from "react-native";

import Animal from "./Animal";

const AnimalList = props => {
  let animals = [];

  for (var id in props.animals) {
    animals.push(props.animals[id]);
  }
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={animals}
        numColumns={2}
        renderItem={animal => {
          return (
            <Animal
              animal={animal.item}
              loadProfile={props.loadProfile}
              selectAnimal={props.selectAnimal}
              navigation={props.navigation}
            />
          );
        }}
        keyExtractor={item => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "center"
  }
});

export default AnimalList;

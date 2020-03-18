import React from "react";
import { FlatList, View, StyleSheet } from "react-native";

import Animal from "./Animal";

const AnimalList = props => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={props.animals}
        numColumns={2}
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
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "center"
  }
});

export default AnimalList;

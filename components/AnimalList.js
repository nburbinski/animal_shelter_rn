import React from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";

import Animal from "./Animal";

const AnimalList = props => {
  let animals = [];

  for (var id in props.animals) {
    animals.push(props.animals[id]);
  }

  if (animals.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "darkgrey" }}>
          No Animals added to this Shelter yet!
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.listContainer}>
      <FlatList
        refreshing={props.isLoading}
        data={animals}
        numColumns={2}
        ListHeaderComponent={props.listHeader}
        ListHeaderComponentStyle={styles.headerStyle}
        renderItem={animal => {
          return (
            <Animal
              animal={animal.item}
              loadProfile={props.loadProfile}
              selectAnimal={props.selectAnimal}
              navigation={props.navigation}
              shelter={props.shelter}
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
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  }
});

export default AnimalList;

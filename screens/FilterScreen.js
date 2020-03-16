import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Picker,
  Switch,
  TouchableOpacity
} from "react-native";

const FilterScreen = props => {
  const [isType, setIsType] = useState(false);
  const [isBreed, setIsBreed] = useState(false);

  const [type, setType] = useState("Dog");
  const [breed, setBreed] = useState("Dog");

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Type: </Text>
        <Switch
          value={isType}
          onValueChange={newValue => setIsType(newValue)}
        />
      </View>
      <Picker
        style={{ display: isType ? "flex" : "none", ...styles.picker }}
        selectedValue={type}
        onValueChange={(itemValue, itemIndex) => setType(itemValue)}
      >
        <Picker.Item label="Dog" value="dog" />
        <Picker.Item label="Cat" value="cat" />
        <Picker.Item label="Naked Mole Rat" value="nmr" />
      </Picker>
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Breed: </Text>
        <Switch
          value={isBreed}
          onValueChange={newValue => setIsBreed(newValue)}
        />
      </View>
      <Picker
        style={{ display: isBreed ? "flex" : "none", ...styles.picker }}
        selectedValue={breed}
        onValueChange={(itemValue, itemIndex) => setBreed(itemValue)}
      >
        <Picker.Item label="Dog" value="dog" />
        <Picker.Item label="Cat" value="cat" />
        <Picker.Item label="Naked Mole Rat" value="nmr" />
      </Picker>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Animals");
        }}
      >
        <View style={styles.submitButton}>
          <Text style={styles.submitText}>Apply Filters</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 20, flex: 1, alignItems: "center" },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    alignItems: "center"
  },
  picker: {
    height: 50,
    width: "60%"
  },
  filterTitle: {
    fontSize: 20
  },
  submitButton: {
    backgroundColor: "blue",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10
  },
  submitText: {
    color: "white",
    fontFamily: "source-sans-semi-bold"
  }
});

export default FilterScreen;

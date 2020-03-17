import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Picker,
  Switch,
  TouchableOpacity
} from "react-native";
import { useDispatch } from "react-redux";

import { setFilters } from "../store/actions/actions";

const FilterScreen = props => {
  const [isType, setIsType] = useState(false);
  const [isBreed, setIsBreed] = useState(false);

  const [type, setType] = useState("Dog");
  const [breed, setBreed] = useState("Dog");

  const dispatch = useDispatch();

  const handleApply = () => {
    const appliedFilters = {
      isType,
      isBreed,
      type,
      breed
    };

    dispatch(setFilters(appliedFilters));
    props.navigation.navigate("Animals");
  };

  const handleReset = () => {
    setIsBreed(false);
    setIsType(false);
    const appliedFilters = {
      isType,
      isBreed,
      type,
      breed
    };
    dispatch(setFilters(appliedFilters));
  };

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
        <Picker.Item label="Naked Mole Rat" value="naked mole rat" />
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
      <View style={styles.buttons}>
        <TouchableOpacity onPress={handleApply}>
          <View style={styles.submitButton}>
            <Text style={styles.submitText}>Apply Filters</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReset}>
          <View style={styles.submitButton}>
            <Text style={styles.submitText}>Reset Filters</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    marginTop: 10,
    marginHorizontal: 10
  },
  submitText: {
    color: "white",
    fontFamily: "source-sans-semi-bold"
  },
  buttons: {
    flexDirection: "row"
  }
});

export default FilterScreen;

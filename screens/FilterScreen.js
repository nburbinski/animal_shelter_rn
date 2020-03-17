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

import Button from "../components/Button";
import { setFilters } from "../store/actions/actions";

const FilterScreen = props => {
  const [isType, setIsType] = useState(false);
  const [isBreed, setIsBreed] = useState(false);

  const [isDog, setIsDog] = useState(false);
  const [isCat, setIsCat] = useState(false);

  const dispatch = useDispatch();

  const handleApply = () => {
    const appliedFilters = {
      isType,
      isBreed,
      isDog,
      isCat
    };

    dispatch(setFilters(appliedFilters));
    props.navigation.goBack();
  };

  const handleReset = () => {
    setIsBreed(false);
    setIsType(false);
    const appliedFilters = {
      isType,
      isBreed,
      isDog,
      isCat
    };
    dispatch(setFilters(appliedFilters));
    props.navigation.goBack();
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

      <View style={{ display: isType ? "flex" : "none", ...styles.buttons }}>
        <Button isTrue={isDog} setIsTrue={setIsDog}>
          Dog
        </Button>
        <Button isTrue={isCat} setIsTrue={setIsCat}>
          Cat
        </Button>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Breed: </Text>
        <Switch
          value={isBreed}
          onValueChange={newValue => setIsBreed(newValue)}
        />
      </View>

      <View
        style={{ display: isBreed ? "flex" : "none", ...styles.buttons }}
      ></View>

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
    flexDirection: "row",
    marginVertical: 10
  }
});

export default FilterScreen;

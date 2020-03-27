import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

import Button from "../../components/Button";
import { setFilters } from "../../store/actions/shelterActions";

const FilterScreen = props => {
  const [isType, setIsType] = useState(false);
  const [isBreed, setIsBreed] = useState(false);

  const [isDog, setIsDog] = useState(false);
  const [isCat, setIsCat] = useState(false);
  const [isNakedMoleRat, setIsNakedMoleRat] = useState(false);

  const animals = props.navigation.getParam("animals");

  const dispatch = useDispatch();

  const handleApply = () => {
    const appliedFilters = {
      isType,
      isBreed,
      isDog,
      isCat,
      isNakedMoleRat
    };

    dispatch(setFilters(appliedFilters, animals));
    props.navigation.goBack();
  };

  const handleReset = () => {
    setIsBreed(false);
    setIsType(false);
    const appliedFilters = {
      isType,
      isBreed,
      isDog,
      isCat,
      isNakedMoleRat
    };
    dispatch(setFilters(appliedFilters, animals));
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Type: </Text>
        <Switch
          color="#3281FF"
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
        <Button isTrue={isNakedMoleRat} setIsTrue={setIsNakedMoleRat}>
          Naked Mole Rat
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
          <View style={styles.resetButton}>
            <Text style={styles.resetText}>Reset Filters</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    alignItems: "center",
    marginBottom: 10
  },
  picker: {
    height: 50,
    width: "60%"
  },
  filterTitle: {
    fontSize: 20,
    fontFamily: "source-sans-semi-bold"
  },
  submitButton: {
    backgroundColor: "#3281FF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  resetButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  submitText: {
    color: "white",
    fontFamily: "source-sans-semi-bold"
  },
  resetText: {
    color: "#3281FF",
    fontFamily: "source-sans-semi-bold"
  },
  buttons: {
    flexDirection: "row",
    marginVertical: 10
  }
});

export default FilterScreen;

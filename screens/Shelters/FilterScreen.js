import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  TextInput
} from "react-native";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import Button from "../../components/Button";
import { setFilters } from "../../store/actions/shelterActions";
import { FlatList } from "react-native-gesture-handler";

const FilterScreen = props => {
  const [isType, setIsType] = useState(false);
  const [isBreed, setIsBreed] = useState(false);

  const [isDog, setIsDog] = useState(false);
  const [isCat, setIsCat] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const [filteredBreeds, setFilteredBreeds] = useState([]);

  const animals = props.navigation.getParam("animals");
  const breeds = [];

  const dispatch = useDispatch();

  for (let id in animals) {
    breeds.push(animals[id].breed);
  }

  const handleApply = () => {
    const appliedFilters = {
      isType,
      isBreed,
      isDog,
      isCat,
      isOther,
      filteredBreeds
    };

    dispatch(setFilters(appliedFilters, animals));
    props.navigation.goBack();
  };

  const handleReset = async () => {
    const appliedFilters = null;
    dispatch(setFilters(appliedFilters, animals));
    props.navigation.goBack();
  };

  const handleBreedChange = breed => {
    const newBreeds = [...filteredBreeds];
    const existingIndex = newBreeds.findIndex(b => b === breed);
    if (existingIndex < 0) {
      newBreeds.push(breed);
      setFilteredBreeds(newBreeds);
    } else {
      newBreeds.splice(existingIndex, 1);
      setFilteredBreeds(newBreeds);
    }
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
        <Button isTrue={isOther} setIsTrue={setIsOther}>
          Other
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
        style={{
          display: isBreed ? "flex" : "none",
          ...styles.buttons,
          width: "80%"
        }}
      >
        <FlatList
          data={breeds}
          numColumns={2}
          renderItem={item => (
            <TouchableOpacity onPress={() => handleBreedChange(item.item)}>
              <View
                style={{
                  backgroundColor: filteredBreeds.find(
                    breed => breed === item.item
                  )
                    ? "#3281FF"
                    : "white",
                  ...styles.buttonContainer
                }}
              >
                <Text
                  style={{
                    color: filteredBreeds.find(breed => breed === item.item)
                      ? "white"
                      : "#3281FF",
                    ...styles.buttonText
                  }}
                >
                  {item.item}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
        />
      </View>

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
    fontFamily: "source-sans-semi-bold",
    fontSize: 22
  },
  resetText: {
    color: "#3281FF",
    fontFamily: "source-sans-semi-bold",
    fontSize: 22
  },
  buttons: {
    flexDirection: "row",
    marginVertical: 10
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
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
  buttonText: {
    fontFamily: "source-sans-semi-bold",
    textAlign: "center"
  }
});

export default FilterScreen;

import React, { useReducer, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { useDispatch } from "react-redux";

import { addAnimal } from "../../store/actions/shelterActions";

const INPUT_UPDATE = "INPUT_UPDATE";
const BOOLEAN_UPDATE = "BOOLEAN_UPDATE";

const formReducer = (state, action) => {
  if (action.type === INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    return {
      ...state,
      inputValues: updatedValues
    };
  } else if (action.type === BOOLEAN_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    return {
      ...state,
      inputValues: updatedValues
    };
  }
  return state;
};

const AnimalInputScreen = props => {
  const dispatch = useDispatch();

  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      name: "",
      type: "",
      breed: "",
      image: "",
      gallery: "",
      about: "",
      cats: false,
      dogs: false
    }
  });

  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchForm({
      type: INPUT_UPDATE,
      value: text,
      input: inputIdentifier
    });
  };

  const booleanChangeHandler = (inputIdentifier, value) => {
    dispatchForm({
      type: BOOLEAN_UPDATE,
      value: !value,
      isValid: true,
      input: inputIdentifier
    });
  };

  const submitHandler = useCallback(async () => {
    await dispatch(addAnimal(formState.inputValues));

    resetForm();
  }, [dispatch, formState]);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.name}
            onChangeText={textChangeHandler.bind(this, "name")}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Type</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.type}
            onChangeText={textChangeHandler.bind(this, "type")}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Breed</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.breed}
            onChangeText={textChangeHandler.bind(this, "breed")}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.image}
            onChangeText={textChangeHandler.bind(this, "image")}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gallery Image URLs</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.gallery}
            onChangeText={textChangeHandler.bind(this, "gallery")}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>About</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.about}
            onChangeText={textChangeHandler.bind(this, "about")}
          />
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() =>
              booleanChangeHandler("cats", formState.inputValues.cats)
            }
          >
            <View
              style={{
                backgroundColor: formState.inputValues.cats ? "black" : "red",
                ...styles.button
              }}
            >
              <Text
                style={{
                  color: "white"
                }}
              >
                Cat?
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              booleanChangeHandler("dogs", formState.inputValues.dogs)
            }
          >
            <View
              style={{
                backgroundColor: formState.inputValues.dogs ? "black" : "red",
                ...styles.button
              }}
            >
              <Text
                style={{
                  color: "white"
                }}
              >
                Dog?
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            style={{ flex: 1, width: 350 }}
            onPress={submitHandler}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                ...styles.button
              }}
            >
              <Text>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

AnimalInputScreen.navigationOptions = navigationData => {
  return {
    headerTitle: "Add an animal!"
  };
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  label: {
    marginVertical: 8
  },
  inputContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 10
  },
  button: {
    marginHorizontal: 30,
    paddingHorizontal: 5,
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingVertical: 7.5,
    margin: 5
  }
});

export default AnimalInputScreen;

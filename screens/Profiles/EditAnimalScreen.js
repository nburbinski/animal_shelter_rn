import React, { useReducer, useCallback, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Image
} from "react-native";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import ImageSelector from "../../components/ImageSelector";
import { editAnimal } from "../../store/actions/shelterActions";

const INPUT_UPDATE = "INPUT_UPDATE";
const BOOLEAN_UPDATE = "BOOLEAN_UPDATE";

const formReducer = (state, action) => {
  if (action.type === INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      inputValidities: updatedValidities,
      inputValues: updatedValues,
      formIsValid: updatedFormIsValid
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

const EditAnimalScreen = props => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const animal = props.navigation.getParam("animal");

  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      name: animal.name,
      type: animal.type,
      breed: animal.breed,
      image: animal.image,
      about: animal.about,
      cats: animal.cats,
      dogs: animal.dogs,
      chip: animal.chip,
      sn: animal.sn,
      shots: animal.shots
    },
    inputValidities: {
      name: true,
      type: true,
      breed: true,
      image: true,
      about: true
    },

    formIsValid: true
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text === undefined) return;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchForm({
      type: INPUT_UPDATE,
      isValid: isValid,
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
    if (!formState.formIsValid) {
      Alert.alert("Input Invalid!", "Please check the errors in the form.", [
        { text: "Okay" }
      ]);
      return;
    }

    try {
      dispatch(editAnimal(formState.inputValues, animal.id));
      props.navigation.goBack();
    } catch (error) {
      setError(error.message);
    }
  }, [dispatch, formState]);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white" }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
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
            <Text style={styles.label}>Image</Text>
            {formState.inputValues.image.length === 0 ? (
              <ImageSelector textChangeHandler={textChangeHandler} />
            ) : (
              <View style={{ flexDirection: "row" }}>
                <ImageSelector textChangeHandler={textChangeHandler} />
                <Image
                  style={styles.selectedImage}
                  source={{ uri: formState.inputValues.image }}
                />
              </View>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>About</Text>
            <TextInput
              style={{ ...styles.input, paddingTop: 10 }}
              multiline
              numberOfLines={3}
              value={formState.inputValues.about}
              onChangeText={textChangeHandler.bind(this, "about")}
            />
          </View>

          <View style={{ width: "90%", marginBottom: 10 }}>
            <View style={styles.booleanContainer}>
              <Text style={styles.label}>Microchipped?</Text>
              <TouchableOpacity
                onPress={() =>
                  booleanChangeHandler("chip", formState.inputValues.chip)
                }
              >
                <View
                  style={{
                    backgroundColor: formState.inputValues.chip
                      ? "#3281FF"
                      : "#FFFFFF",
                    ...styles.checkMark
                  }}
                >
                  <AntDesign name="check" size={20} color={"white"} />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.booleanContainer}>
              <Text style={styles.label}>Immunization Shots?</Text>

              <TouchableOpacity
                onPress={() =>
                  booleanChangeHandler("shots", formState.inputValues.shots)
                }
              >
                <View
                  style={{
                    backgroundColor: formState.inputValues.shots
                      ? "#3281FF"
                      : "#FFFFFF",
                    ...styles.checkMark
                  }}
                >
                  <AntDesign name="check" size={20} color={"white"} />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.booleanContainer}>
              <Text style={styles.label}>Spayed/Neutered?</Text>
              <TouchableOpacity
                onPress={() =>
                  booleanChangeHandler("sn", formState.inputValues.sn)
                }
              >
                <View
                  style={{
                    backgroundColor: formState.inputValues.sn
                      ? "#3281FF"
                      : "#FFFFFF",
                    ...styles.checkMark
                  }}
                >
                  <AntDesign name="check" size={20} color={"white"} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() =>
                booleanChangeHandler("cats", formState.inputValues.cats)
              }
            >
              <View
                style={{
                  backgroundColor: formState.inputValues.cats
                    ? "#3281FF"
                    : "white",
                  ...styles.button
                }}
              >
                <Text
                  style={{
                    color: formState.inputValues.cats ? "white" : "#3281FF"
                  }}
                >
                  Good with Cats?
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
                  backgroundColor: formState.inputValues.dogs
                    ? "#3281FF"
                    : "white",
                  ...styles.button
                }}
              >
                <Text
                  style={{
                    color: formState.inputValues.dogs ? "white" : "#3281FF"
                  }}
                >
                  Good with dogs?
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
                  backgroundColor: "#FFFFFF",
                  marginTop: 20,
                  ...styles.button
                }}
              >
                <Text>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditAnimalScreen.navigationOptions = navigationData => {
  return {
    headerTitle: "Edit animal details"
  };
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingBottom: 10,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#D8E7FF",
    borderRadius: 25,
    alignItems: "center"
  },
  label: {
    marginVertical: 8,
    fontFamily: "source-sans-semi-bold"
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 10,
    marginBottom: 10
  },
  button: {
    marginHorizontal: 20,
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
    margin: 5,
    borderRadius: 5
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 5
  },
  booleanContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5
  },
  checkMark: {
    borderWidth: 2,
    borderRadius: 5,
    width: 25,
    height: 25,
    marginHorizontal: 10,
    borderColor: "#3281FF",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default EditAnimalScreen;

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
import { addAnimal } from "../../store/actions/shelterActions";

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

const AnimalInputScreen = props => {
  const dispatch = useDispatch();
  const [error, setError] = useState();

  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      name: "",
      type: "Cat",
      breed: "",
      image: "",
      about: "",
      gender: "",
      age: "",
      cats: false,
      dogs: false,
      chip: false,
      sn: false,
      shots: false
    },
    inputValidities: {
      name: false,
      type: true,
      breed: false,
      image: false,
      about: false,
      gender: false,
      age: false
    },

    formIsValid: false
  });

  console.log(formState.inputValues);
  console.log(formState.inputValidities);

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
      Alert.alert("Input Invalid!", "Please complete form!", [
        { text: "Okay" }
      ]);
      return;
    }

    try {
      dispatch(addAnimal(formState.inputValues));
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
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                onPress={() => textChangeHandler("type", "Cat")}
              >
                <View
                  style={{
                    backgroundColor:
                      formState.inputValues.type == "Cat"
                        ? "#3281FF"
                        : "#FFFFFF",
                    ...styles.typeContainer
                  }}
                >
                  <Text
                    style={{
                      color:
                        formState.inputValues.type == "Cat"
                          ? "#FFFFFF"
                          : "#3281FF",
                      ...styles.typeText
                    }}
                  >
                    Cat
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => textChangeHandler("type", "Dog")}
              >
                <View
                  style={{
                    backgroundColor:
                      formState.inputValues.type == "Dog"
                        ? "#3281FF"
                        : "#FFFFFF",
                    ...styles.typeContainer
                  }}
                >
                  <Text
                    style={{
                      color:
                        formState.inputValues.type == "Dog"
                          ? "#FFFFFF"
                          : "#3281FF",
                      ...styles.typeText
                    }}
                  >
                    Dog
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
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

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginLeft: 75
            }}
          >
            <View style={styles.inputContainer}>
              <Text style={{ ...styles.label, paddingLeft: 20 }}>Gender</Text>
              <TextInput
                style={{ ...styles.input, width: "40%" }}
                value={formState.inputValues.gender}
                onChangeText={textChangeHandler.bind(this, "gender")}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={{ ...styles.label, paddingLeft: 20 }}>Age</Text>
              <TextInput
                keyboardType={"number-pad"}
                style={{ ...styles.input, width: "30%" }}
                value={formState.inputValues.age}
                onChangeText={textChangeHandler.bind(this, "age")}
              />
            </View>
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

AnimalInputScreen.navigationOptions = navigationData => {
  return {
    headerTitle: "Add an animal"
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
  },
  typeContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  typeText: {
    fontFamily: "source-sans-semi-bold",
    fontSize: 15
  }
});

export default AnimalInputScreen;

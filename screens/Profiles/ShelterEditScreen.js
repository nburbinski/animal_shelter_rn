import React, { useReducer, useCallback, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { useDispatch } from "react-redux";

import ImageSelector from "../../components/ImageSelector";
import { editShelter } from "../../store/actions/shelterActions";

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

const ShelterEditScreen = props => {
  const dispatch = useDispatch();
  const [error, setError] = useState();

  const shelter = props.navigation.getParam("shelter");
  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      name: shelter.name,
      address: shelter.address,
      image: shelter.image ? shelter.image : shelter.url
    },
    inputValidities: {
      name: true,
      address: true,
      image: true
    },

    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
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

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Input Invalid!", "Please check the errors in the form.", [
        { text: "Okay" }
      ]);
      return;
    }

    try {
      dispatch(editShelter(formState.inputValues, shelter.id));
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
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              textContentType={"fullStreetAddress"}
              value={formState.inputValues.address}
              onChangeText={textChangeHandler.bind(this, "address")}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={{ ...styles.label, marginRight: 15 }}>Image</Text>
            {formState.inputValues.image ||
            formState.inputValues.image.length === 0 ? (
              <ImageSelector textChangeHandler={textChangeHandler} />
            ) : (
              <View>
                <Text>Image goes here</Text>
                <ImageSelector textChangeHandler={textChangeHandler} />
              </View>
            )}
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

ShelterEditScreen.navigationOptions = navigationData => {
  return {
    headerTitle: "Edit Shelter Details"
  };
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingBottom: 20,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#D8E7FF",
    borderRadius: 25
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
  }
});

export default ShelterEditScreen;

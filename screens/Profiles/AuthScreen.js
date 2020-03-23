import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const INPUT_UPDATE = "INPUT_UPDATE";

import { signup, login } from "../../store/actions/profileActions";

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
  }
  return state;
};

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const token = useSelector(state => state.profile.token);
  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.setParams({ isSignUp: isSignUp });

    setIsLoading(true);
    try {
      if (token) props.navigation.navigate("Profile");
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, []);

  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: ""
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const textChangeHandler = useCallback(
    (inputIdentifier, text) => {
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
    },
    [dispatchForm]
  );

  const submitHandler = () => {
    setIsLoading(true);
    if (!formState.formIsValid) {
      Alert.alert("Input Invalid!", "Please check the errors in the form.", [
        { text: "Okay" }
      ]);
      setIsLoading(false);
      return;
    }
    if (isSignUp) {
      dispatch(
        signup(formState.inputValues.email, formState.inputValues.password)
      );
    } else {
      dispatch(
        login(formState.inputValues.email, formState.inputValues.password)
      );
    }
    setIsLoading(false);
    props.navigation.navigate("Profile");
  };

  if (!isLoading) {
    return (
      <KeyboardAvoidingView
        behavior={"padding"}
        keyboardVerticalOffset={50}
        style={{ flex: 1, backgroundColor: "white" }}
      >
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                id="email"
                label="e-mail"
                keyboardType="email-address"
                required
                style={styles.input}
                autoCapitalize="none"
                value={formState.inputValues.email}
                onChangeText={textChangeHandler.bind(this, "email")}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                id="password"
                label="password"
                secureTextEntry
                required
                style={styles.input}
                autoCapitalize="none"
                style={styles.input}
                value={formState.inputValues.password}
                onChangeText={textChangeHandler.bind(this, "password")}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={{ flex: 1 }} onPress={submitHandler}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#FFFFFF",
                    marginTop: 20,
                    ...styles.button
                  }}
                >
                  <Text>{isSignUp ? "Sign Up" : "Login"}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  setIsSignUp(!isSignUp);
                  props.navigation.setParams({ isSignUp: !isSignUp });
                }}
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
                  <Text>{`Switch to ${isSignUp ? "Login" : "Sign Up"}`}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" />
    </View>
  );
};

AuthScreen.navigationOptions = navigationData => {
  const isSignUp = navigationData.navigation.getParam("isSignUp");

  return {
    headerTitle: isSignUp ? "Sign Up" : "Login"
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#EAEAEA",
    borderRadius: 5
  },
  label: {
    marginVertical: 8,
    fontFamily: "source-sans-semi-bold"
  },
  inputContainer: {
    width: "100%",
    padding: 10
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
  loading: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
});

export default AuthScreen;

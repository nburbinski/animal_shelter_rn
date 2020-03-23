import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { useDispatch } from "react-redux";

import { authenticate } from "../store/actions/profileActions";
import { setLikes } from "../store/actions/shelterActions";

const StartupScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLikes = async () => {
      const likedAnimals = await AsyncStorage.getItem("likedAnimals");

      if (!likedAnimals) {
        return;
      } else {
        dispatch(setLikes(JSON.parse(likedAnimals)));
      }
    };

    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Shelters");
        return;
      }
      const transData = JSON.parse(userData);
      const { token, userId, expDate } = transData;
      const expirationDate = new Date(expDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.reset({
          index: 0,
          routes: [{ name: "Shelters" }]
        });
        return;
      }
      dispatch(authenticate(token, userId));
      props.navigation.navigate("Shelters");
    };
    tryLogin();
    checkLikes();
  }, []);

  return (
    <View style={styles.loading}>
      <ActivityIndicator size={"large"} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default StartupScreen;

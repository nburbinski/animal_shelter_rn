import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { fetchShelters, setLikes } from "../../store/actions/shelterActions";
import { authenticate } from "../../store/actions/profileActions";
import ShelterList from "../../components/ShelterList";

const ShelterListScreen = props => {
  const [isLoading, setIsLoading] = useState(true);
  const shelters = useSelector(state => state.shelter.shelters);
  const dispatch = useDispatch();

  const loadShelters = useCallback(async () => {
    await dispatch(fetchShelters());
  });

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
        return;
      }
      const transData = JSON.parse(userData);
      const { token, userId, expDate } = transData;
      const expirationDate = new Date(expDate);

      if (expirationDate <= new Date() || !token || !userId) {
        return;
      }
      dispatch(authenticate(token, userId));
    };
    tryLogin();
    checkLikes();
    loadShelters();
    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.shelterList}>
      <ShelterList
        loadShelters={loadShelters}
        isLoading={isLoading}
        loadProfile={props.loadProfile}
        selectShelter={props.selectShelter}
        navigation={props.navigation}
        shelters={shelters}
      />
    </View>
  );
};

ShelterListScreen.navigationOptions = () => {
  return {
    headerTitle: "Animal Shelters"
  };
};

const styles = StyleSheet.create({
  shelterList: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingBottom: 15
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white"
  }
});

export default ShelterListScreen;

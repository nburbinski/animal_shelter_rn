import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { fetchAnimals } from "../store/actions/actions";
import AnimalList from "../components/AnimalList";

const ShelterProfileScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const shelter = props.navigation.getParam("shelter");
  const animals = useSelector(state => state.animals.filteredAnimals);

  const dispatch = useDispatch();

  const loadAnimals = useCallback(async () => {
    setIsLoading(true);
    dispatch(fetchAnimals());
    setIsLoading(false);
  });

  useEffect(() => {
    loadAnimals();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isLoading && animals.length === 0) {
    return (
      <View style={styles.loading}>
        <Text>No animals found!</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.profileContainer}>
        <View style={styles.shelterInfo}>
          <Text style={styles.shelterName}>{shelter.name}</Text>
          <Text>{shelter.address}</Text>
        </View>
        <View style={styles.animalList}>
          <AnimalList
            loadProfile={props.loadProfile}
            selectAnimal={props.selectAnimal}
            navigation={props.navigation}
            animals={animals}
          />
        </View>
      </View>
    </ScrollView>
  );
};

ShelterProfileScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Shelter Profile",
    headerTitleStyle: {
      fontFamily: "source-sans",
      fontSize: 20
    }
  };
};

const styles = StyleSheet.create({
  animalList: {
    flex: 1,
    marginHorizontal: 5
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  profileContainer: {
    flex: 1
  },
  shelterInfo: {
    alignItems: "center",
    paddingHorizontal: 5,
    marginVertical: 5
  },
  shelterName: {
    fontSize: 25,
    fontFamily: "source-sans-semi-bold"
  }
});

export default ShelterProfileScreen;

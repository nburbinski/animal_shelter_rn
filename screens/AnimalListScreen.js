import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { fetchAnimals } from "../store/actions/actions";
import AnimalList from "../components/AnimalList";
import HeaderButton from "../components/HeaderButton";

const AnimalListScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const animals = useSelector(state => state.animals.filteredAnimals);
  const dispatch = useDispatch();

  const loadAnimals = useCallback(async () => {
    setIsLoading(true);
    await dispatch(fetchAnimals());
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
    <View style={styles.animalList}>
      <AnimalList
        loadProfile={props.loadProfile}
        selectAnimal={props.selectAnimal}
        navigation={props.navigation}
        animals={animals}
      />
    </View>
  );
};

AnimalListScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Animal Shelter",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="filter"
          iconName="filter"
          onPress={() => {
            navigation.navigate({ routeName: "Filter" });
          }}
        />
      </HeaderButtons>
    ),
    headerTitleStyle: {
      fontFamily: "source-sans",
      fontSize: 28
    }
  };
};

const styles = StyleSheet.create({
  animalList: {
    flex: 1
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
});

export default AnimalListScreen;

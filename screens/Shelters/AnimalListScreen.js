import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  FlatList
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import { fetchAnimals } from "../../store/actions/shelterActions";
import Animal from "../../components/Animal";
import HeaderButton from "../../components/HeaderButton";

const AnimalListScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const animals = useSelector(state => state.shelter.filteredAnimals);
  const dispatch = useDispatch();

  const loadAnimals = useCallback(async () => {
    setIsRefreshing(true);
    await dispatch(fetchAnimals());
    setIsRefreshing(false);
  });

  useEffect(() => {
    setIsLoading(true);
    loadAnimals().then(setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
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
      <FlatList
        onRefresh={loadAnimals}
        refreshing={isRefreshing}
        data={animals}
        renderItem={animal => (
          <Animal
            id={animal.id}
            animal={animal.item}
            loadProfile={props.loadProfile}
            selectAnimal={props.selectAnimal}
            navigation={props.navigation}
          />
        )}
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
    flex: 1,
    backgroundColor: "white"
  }
});

export default AnimalListScreen;

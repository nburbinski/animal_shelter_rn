import React from "react";
import { StyleSheet, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import AnimalList from "../components/AnimalList";
import HeaderButton from "../components/HeaderButton";

const AnimalListScreen = props => {
  const animals = useSelector(state => state.animals.animals);

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
  }
});

export default AnimalListScreen;

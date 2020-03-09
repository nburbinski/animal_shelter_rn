import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import AnimalNavigator from "./navigation/AnimalNavigation";

import AnimalListScreen from "./screens/AnimalListScreen";
import AnimalProfileScreen from "./screens/AnimalProfileScreen";

const animals = [
  {
    name: "Rufus",
    type: "Dog",
    breed: "Jack Russel Terrier",
    image: "../assets/orange-cat.jpg",
    liked: false
  },
  {
    name: "LadyBird",
    type: "Dog",
    breed: "Jack Russel Terrier",
    image: "../assets/orange-cat.jpg",
    liked: false
  },
  {
    name: "Percy",
    type: "Naked Mole Rat",
    breed: "Jack Russel Terrier",
    image: "../assets/orange-cat.jpg",
    liked: false
  }
];

const fechFonts = () => {
  return Font.loadAsync({
    "source-sans": require("./assets/fonts/SourceSansPro-Regular.ttf"),
    "source-sans-semi-bold": require("./assets/fonts/SourceSansPro-SemiBold.ttf")
  });
};

export default function App() {
  const [profileLoad, setprofileLoad] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(0);

  if (!dataLoaded) {
    return (
      <AppLoading startAsync={fechFonts} onFinish={() => setDataLoaded(true)} />
    );
  }

  let content = (
    <AnimalListScreen
      loadProfile={setprofileLoad}
      selectAnimal={setSelectedAnimal}
    />
  );

  if (profileLoad) {
    content = <AnimalProfileScreen animal={animals[selectedAnimal]} />;
  }

  return <AnimalNavigator />;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#fff"
  }
});

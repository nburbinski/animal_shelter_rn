import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import AnimalNavigator from "./navigation/AnimalNavigation";

const fechFonts = () => {
  return Font.loadAsync({
    "source-sans": require("./assets/fonts/SourceSansPro-Regular.ttf"),
    "source-sans-semi-bold": require("./assets/fonts/SourceSansPro-SemiBold.ttf")
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading startAsync={fechFonts} onFinish={() => setDataLoaded(true)} />
    );
  }

  return <AnimalNavigator />;
}

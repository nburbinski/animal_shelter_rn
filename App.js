import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import Home from "./screens/Home";
import AnimalProfile from "./screens/AnimalProfile";

import NavBar from "./components/NavBar";
import TitleBar from "./components/TitleBar";

const fechFonts = () => {
  return Font.loadAsync({
    "source-sans": require("./assets/fonts/SourceSansPro-Regular.ttf")
  });
};

export default function App() {
  const [profileLoad, setprofileLoad] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading startAsync={fechFonts} onFinish={() => setDataLoaded(true)} />
    );
  }

  let content = <Home loadProfile={setprofileLoad} />;

  if (profileLoad) {
    content = <AnimalProfile />;
  }
  return (
    <View style={styles.container}>
      <TitleBar />
      {content}
      <NavBar loadProfile={setprofileLoad} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#fff"
  }
});

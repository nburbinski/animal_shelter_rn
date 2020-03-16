import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import AnimalNavigator from "./navigation/AnimalNavigation";
import { animalReducer } from "./store/reducers/animalReducer";

const fechFonts = () => {
  return Font.loadAsync({
    "source-sans": require("./assets/fonts/SourceSansPro-Regular.ttf"),
    "source-sans-semi-bold": require("./assets/fonts/SourceSansPro-SemiBold.ttf")
  });
};

const rootReducer = combineReducers({ animals: animalReducer });
const store = createStore(rootReducer);

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  // curl -d "grant_type=client_credentials&client_id=NOBl1N5lKPTdvwbNPeqUCdbs9dQMOYEnH3LPxdGcBsBvt6uwWQ&client_secret=jGB07f9LutmT04gOctg3mkGLpSTItaMqj4MH2P9o" https://api.petfinder.com/v2/oauth2/token

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(response => {
        response.json();
      })

      .catch(error => {
        console.error(error);
      });
  }, []);
  if (!dataLoaded) {
    return (
      <AppLoading startAsync={fechFonts} onFinish={() => setDataLoaded(true)} />
    );
  }

  return (
    <Provider store={store}>
      <AnimalNavigator />
    </Provider>
  );
}

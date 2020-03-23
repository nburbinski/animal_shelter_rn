import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import ShelterNavigator from "./navigation/ShelterNavigation";
import { shelterReducer } from "./store/reducers/shelterReducer";
import { profileReducer } from "./store/reducers/profileReducer";

const fechFonts = () => {
  return Font.loadAsync({
    "source-sans": require("./assets/fonts/SourceSansPro-Regular.ttf"),
    "source-sans-semi-bold": require("./assets/fonts/SourceSansPro-SemiBold.ttf")
  });
};

const rootReducer = combineReducers({
  shelter: shelterReducer,
  profile: profileReducer
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading startAsync={fechFonts} onFinish={() => setDataLoaded(true)} />
    );
  }

  return (
    <Provider store={store}>
      <ShelterNavigator />
    </Provider>
  );
}

import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import Icon from "../components/Icon";

// Screen Imports
import ShelterListScreen from "../screens/Shelters/SheltersListScreen";
import ShelterProfileScreen from "../screens/Shelters/ShelterProfileScreen";
import AnimalProfileScreen from "../screens/Shelters/AnimalProfileScreen";
import FilterScreen from "../screens/Shelters/FilterScreen";

export const ShelterNavigator = createStackNavigator(
  {
    Shelters: {
      screen: ShelterListScreen
    },
    ShelterProfile: {
      screen: ShelterProfileScreen
    },
    AnimalProfile: {
      screen: AnimalProfileScreen
    },
    Filter: FilterScreen
  },
  {
    defaultNavigationOptions: {
      headerBackTitle: " ",
      headerTitleStyle: {
        fontFamily: "source-sans-semi-bold",
        fontSize: 28,
        color: "#3281FF"
      },
      headerBackImage: () => {
        return <Icon />;
      }
    }
  }
);

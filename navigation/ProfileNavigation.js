import React from "react";
import { createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Icon from "../components/Icon";

import UserProfileScreen from "../screens/Profiles/UserProfileScreen";
import AuthScreen from "../screens/Profiles/AuthScreen";
import ShelterInputScreen from "../screens/Profiles/ShelterInputScreen";
import ShelterEditScreen from "../screens/Profiles/ShelterEditScreen";
import EditAnimalsScreen from "../screens/Profiles/EditAnimalsScreen";
import EditAnimalProfileScreen from "../screens/Profiles/EditAnimalProfileScreen";
import AnimalInputScreen from "../screens/Profiles/AnimalInputScreen";
import EditAnimalScreen from "../screens/Profiles/EditAnimalScreen";

const ProfileNavigator = createStackNavigator(
  {
    Profile: UserProfileScreen,
    AnimalForm: AnimalInputScreen,
    ShelterForm: ShelterInputScreen,
    ShelterEdit: ShelterEditScreen,
    EditAnimals: EditAnimalsScreen,
    EditAnimalProfile: EditAnimalProfileScreen,
    EditAnimal: EditAnimalScreen
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

const AuthScreenNavigator = createStackNavigator(
  {
    Auth: AuthScreen
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

export const AuthNavigator = createSwitchNavigator({
  Auth: AuthScreenNavigator,
  Profile: ProfileNavigator
});

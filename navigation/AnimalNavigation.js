import React from "react";
import { View } from "react-native";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AntDesign } from "@expo/vector-icons";

// Screen Imports
import ShelterListScreen from "../screens/SheltersListScreen";
import ShelterProfileScreen from "../screens/ShelterProfileScreen";
import AnimalListScreen from "../screens/AnimalListScreen";
import AnimalProfileScreen from "../screens/AnimalProfileScreen";
import LikesScreen from "../screens/LikesScreen";
import FilterScreen from "../screens/FilterScreen";

const AnimalNavigator = createStackNavigator({
  Shelters: ShelterListScreen,
  ShelterProfile: {
    screen: ShelterProfileScreen,
    navigationOptions: {
      gestureEnabled: true
    }
  },
  Animals: AnimalListScreen,
  AnimalProfile: AnimalProfileScreen,
  Filter: FilterScreen
});

const LikesNavigator = createStackNavigator({
  Likes: LikesScreen,
  AnimalProfile: AnimalProfileScreen
});

const AnimalTabsNavigator = createBottomTabNavigator(
  {
    Animals: {
      screen: AnimalNavigator,
      navigationOptions: {
        tabBarOptions: {
          showLabel: false
        },
        tabBarIcon: tabInfo => {
          return <AntDesign name="home" size={32} color={tabInfo.tintColor} />;
        }
      }
    },
    Likes: {
      screen: LikesNavigator,
      navigationOptions: {
        tabBarOptions: {
          showLabel: false,
          style: {}
        },
        tabBarIcon: tabInfo => {
          return (
            <AntDesign name="hearto" size={32} color={tabInfo.tintColor} />
          );
        }
      }
    }
  },
  { tabBarOptions: {} }
);

export default createAppContainer(AnimalTabsNavigator);

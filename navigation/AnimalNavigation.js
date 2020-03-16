import React from "react";
import { View } from "react-native";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AntDesign } from "@expo/vector-icons";

// Screen Imports
import AnimalListScreen from "../screens/AnimalListScreen";
import AnimalProfileScreen from "../screens/AnimalProfileScreen";
import LikesScreen from "../screens/LikesScreen";
import SearchScreen from "../screens/SearchScreen";
import FilterScreen from "../screens/FilterScreen";

const AnimalNavigator = createStackNavigator({
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
    // Search: {
    //   screen: SearchScreen,
    //   navigationOptions: {
    //     tabBarOnPress: event => {
    //       event.defaultHandler;
    //     },
    //     tabBarOptions: {
    //       showLabel: false
    //     },
    //     tabBarIcon: tabInfo => {
    //       return (
    //         <AntDesign name="search1" size={32} color={tabInfo.tintColor} />
    //       );
    //     }
    //   }
    // },
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

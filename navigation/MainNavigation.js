import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AntDesign } from "@expo/vector-icons";

import LikesScreen from "../screens/LikesScreen";
import { AuthNavigator } from "./ProfileNavigation";
import { ShelterNavigator } from "./ShelterNavigation";

import Icon from "../components/Icon";
import AnimalProfileScreen from "../screens/Shelters/AnimalProfileScreen";

const LikesNavigator = createStackNavigator(
  {
    Likes: LikesScreen,
    AnimalProfile: AnimalProfileScreen
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

const MainTabNavigator = createBottomTabNavigator({
  Shelters: {
    screen: ShelterNavigator,
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
        showLabel: false
      },
      tabBarIcon: tabInfo => {
        return <AntDesign name="hearto" size={32} color={tabInfo.tintColor} />;
      }
    }
  },
  User: {
    screen: AuthNavigator,
    navigationOptions: {
      tabBarOptions: {
        showLabel: false
      },
      tabBarIcon: tabInfo => {
        return <AntDesign name="user" size={32} color={tabInfo.tintColor} />;
      }
    }
  }
});

export default createAppContainer(MainTabNavigator);

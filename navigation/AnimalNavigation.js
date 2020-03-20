import React from "react";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AntDesign } from "@expo/vector-icons";

// Screen Imports
import ShelterListScreen from "../screens/Shelters/SheltersListScreen";
import ShelterProfileScreen from "../screens/Shelters/ShelterProfileScreen";
import AnimalProfileScreen from "../screens/Shelters/AnimalProfileScreen";
import LikesScreen from "../screens/LikesScreen";
import FilterScreen from "../screens/Shelters/FilterScreen";
import UserProfileScreen from "../screens/Profiles/UserProfileScreen";
import AuthScreen from "../screens/Profiles/AuthScreen";

import Icon from "../components/Icon";
import AnimalInputScreen from "../screens/Profiles/AnimalInputScreen";

const AnimalNavigator = createStackNavigator(
  {
    Shelters: {
      screen: ShelterListScreen,
      navigationOptions: {
        headerBackTitle: null
      }
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
      headerBackImage: () => {
        return <Icon />;
      }
    }
  }
);

const LikesNavigator = createStackNavigator({
  Likes: LikesScreen,
  AnimalProfile: AnimalProfileScreen
});

const UserNavigator = createStackNavigator({
  Profile: UserProfileScreen,
  Auth: AuthScreen,
  AnimalForm: AnimalInputScreen
});

const AnimalTabsNavigator = createBottomTabNavigator({
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
        return <AntDesign name="hearto" size={32} color={tabInfo.tintColor} />;
      }
    }
  },
  User: {
    screen: UserNavigator,
    navigationOptions: {
      tabBarOptions: {
        showLabel: false,
        style: {}
      },
      tabBarIcon: tabInfo => {
        return <AntDesign name="user" size={32} color={tabInfo.tintColor} />;
      }
    }
  }
});

export default createAppContainer(AnimalTabsNavigator);

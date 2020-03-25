import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
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
import ShelterInputScreen from "../screens/Profiles/ShelterInputScreen";
import ShelterEditScreen from "../screens/Profiles/ShelterEditScreen";

import Icon from "../components/Icon";
import AnimalInputScreen from "../screens/Profiles/AnimalInputScreen";

const ShelterNavigator = createStackNavigator(
  {
    Shelters: {
      screen: ShelterListScreen,
      navigationOptions: {
        headerLeft: () => null
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

const ProfileNavigator = createStackNavigator(
  {
    Profile: UserProfileScreen,
    AnimalForm: AnimalInputScreen,
    ShelterForm: ShelterInputScreen,
    ShelterEdit: ShelterEditScreen
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

const AuthNavigator = createSwitchNavigator({
  Auth: AuthScreenNavigator,
  Profile: ProfileNavigator
});

const ShelterTabsNavigator = createBottomTabNavigator({
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
        showLabel: false,
        style: {}
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
        showLabel: false,
        style: {}
      },
      tabBarIcon: tabInfo => {
        return <AntDesign name="user" size={32} color={tabInfo.tintColor} />;
      }
    }
  }
});

export default createAppContainer(ShelterTabsNavigator);

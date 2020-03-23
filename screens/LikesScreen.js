import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";

import AnimalList from "../components/AnimalList";

const LikesScreen = props => {
  const animals = useSelector(state => state.shelter.liked);

  if (animals.length === 0) {
    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <Text style={{ textAlign: "center", color: "darkgrey" }}>
            No animals liked yet!
          </Text>
          <Text style={{ textAlign: "center", color: "darkgrey" }}>
            Start liking some animals by checking out shelter listings!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <AnimalList
        animals={animals}
        loadProfile={props.loadProfile}
        selectAnimal={props.selectAnimal}
        navigation={props.navigation}
      />
    </SafeAreaView>
  );
};

LikesScreen.navigationOptions = navigationData => {
  return {
    headerTitle: "Likes",
    headerTitleStyle: {
      fontFamily: "source-sans",
      fontSize: 28
    }
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 15
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default LikesScreen;

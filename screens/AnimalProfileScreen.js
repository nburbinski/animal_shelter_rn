import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ImageModal from "../components/ImageModal";
import HeaderButton from "../components/HeaderButton";

const AnimalProfileScreen = props => {
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const animal = props.navigation.getParam("animal");

  return (
    <View style={styles.profileContainer}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={() => {
            setImageModalVisible(true);
          }}
        >
          <Image
            style={styles.animalImage}
            source={require("../assets/orange-cat.jpg")}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.animalName}>{animal.name}</Text>
      {/* <View style={styles.animalTypeContainer}>
        <Text style={styles.animalTypeText}>{props.animal.type}</Text>
      </View>
      <Text>{props.animal.breed}</Text> */}
      <ImageModal
        imageModalVisible={imageModalVisible}
        setImageModalVisible={setImageModalVisible}
      />
    </View>
  );
};

AnimalProfileScreen.navigationOptions = navigationData => {
  const animal = navigationData.navigation.getParam("animal");

  return {
    headerTitle: animal.name,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Like"
          iconName={animal.liked ? "heart" : "hearto"}
          onPress={() => {}}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: "center"
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 15
  },
  animalImage: {
    height: 150,
    width: 150,
    borderRadius: 10
  },
  animalName: {
    fontSize: 25,
    fontFamily: "source-sans-semi-bold"
  },
  animalTypeContainer: {
    backgroundColor: "steelblue",
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginBottom: 2,
    borderRadius: 2
  },
  animalTypeText: {
    color: "white"
  }
});

export default AnimalProfileScreen;

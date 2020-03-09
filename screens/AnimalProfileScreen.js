import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import ImageModal from "../components/ImageModal";

const AnimalProfileScreen = props => {
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const animalName = props.navigation.getParam("name");

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
      <Text style={styles.animalName}>{animalName}</Text>
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
  const animalName = navigationData.navigation.getParam("name");

  return {
    headerTitle: animalName
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

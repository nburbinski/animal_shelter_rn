import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ImageModal from "../components/ImageModal";
import HeaderButton from "../components/HeaderButton";

const AnimalProfileScreen = props => {
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const animal = props.navigation.getParam("animal");

  return (
    <ScrollView>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() => {
              setImageModalVisible(true);
            }}
          >
            <Image style={styles.animalImage} source={{ uri: animal.image }} />
          </TouchableOpacity>
        </View>
        <Text style={styles.animalName}>{animal.name}</Text>
        <View style={styles.animalTypeContainer}>
          <Text style={styles.animalTypeText}>{animal.type}</Text>
        </View>
        <Text>{animal.breed}</Text>
        <View style={styles.galleryContainer}>
          <FlatList
            horizontal={true}
            data={animal.gallery}
            renderItem={itemData => (
              <Image
                style={styles.galleryImage}
                source={{ uri: itemData.item }}
              />
            )}
          />
        </View>
        <ImageModal
          imageModalVisible={imageModalVisible}
          setImageModalVisible={setImageModalVisible}
        />
      </View>
    </ScrollView>
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
  },
  galleryContainer: {
    flex: 1
  },
  galleryImage: {
    height: 100,
    width: 100,
    margin: 5
  }
});

export default AnimalProfileScreen;

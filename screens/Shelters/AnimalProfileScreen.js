import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import ImageModal from "../../components/ImageModal";
import HeaderButton from "../../components/HeaderButton";
import { toggleLike } from "../../store/actions/shelterActions";

const AnimalProfileScreen = props => {
  const animal = props.navigation.getParam("animal");
  const url = props.navigation.getParam("url");

  const [image, setImage] = useState(animal.image);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const dispatch = useDispatch();

  const handleCheckPress = useCallback(() => {
    dispatch(toggleLike(animal.id, animal.liked));
  });

  useEffect(() => {
    props.navigation.setParams({ toggleLike: handleCheckPress });
  }, [dispatch]);

  return (
    <View style={styles.profileContainer}>
      <View style={styles.topContainer}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() => {
              setImage(animal.image);
              setImageModalVisible(true);
            }}
          >
            <Image
              style={styles.animalImage}
              source={{ uri: animal.image ? animal.image : url }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.animalInfoContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.animalName}>{animal.name}</Text>
            <View
              style={{
                backgroundColor:
                  animal.type === "Dog"
                    ? "#26547C"
                    : animal.type === "Cat"
                    ? "#06D6A0"
                    : "#EF476F",
                ...styles.animalTypeContainer
              }}
            >
              <Text style={styles.animalTypeText}>{animal.type}</Text>
            </View>
          </View>
          <Text>{animal.breed}</Text>
          <View style={styles.about}>
            <Text style={{ textAlign: "center", color: "#6e6e6e" }}>
              {animal.about}
            </Text>
          </View>
        </View>
        <View style={styles.goodWithContainer}>
          <Text style={styles.animalDetailsTitle}>Good with Cats? </Text>
          <View>
            <AntDesign
              name={animal.cats ? "check" : "close"}
              size={20}
              color={animal.cats ? "#06D6A0" : "#F2353E"}
            />
          </View>
          <Text style={styles.animalDetailsTitle}>Good with Dogs? </Text>
          <View>
            <AntDesign
              name={animal.dogs ? "check" : "close"}
              size={20}
              color={animal.dogs ? "#06D6A0" : "#F2353E"}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

AnimalProfileScreen.navigationOptions = navigationData => {
  const animal = navigationData.navigation.getParam("animal");
  const toggleLike = navigationData.navigation.getParam("toggleLike");

  return {
    headerTitle: animal.name,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Like"
          iconName={animal.liked ? "heart" : "hearto"}
          onPress={toggleLike}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingVertical: 7.5
  },
  topContainer: {
    alignItems: "center"
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 10
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
  animalInfoContainer: {
    alignItems: "center",
    marginVertical: 10
  },
  animalTypeContainer: {
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginHorizontal: 5
  },
  animalDetailsContainer: {
    padding: 10
  },
  animalDetailsTitle: {
    fontFamily: "source-sans-semi-bold"
  },
  goodWithContainer: {
    flexDirection: "row",
    alignItems: "center"
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
  },
  about: {
    margin: 5
  }
});

export default AnimalProfileScreen;

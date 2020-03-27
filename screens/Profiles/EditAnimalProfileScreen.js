import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import ImageModal from "../../components/ImageModal";
import HeaderButton from "../../components/HeaderButton";
import { toggleLike } from "../../store/actions/shelterActions";

const EditAnimalProfileScreen = props => {
  const animal = props.navigation.getParam("animal");
  const url = props.navigation.getParam("url");
  const liked = useSelector(state => state.shelter.liked);

  const [image, setImage] = useState(animal.image);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const dispatch = useDispatch();

  const handleCheckPress = useCallback(() => {
    dispatch(toggleLike(animal));
  });

  const checkIfLiked = () => {
    const existingIndex = liked.findIndex(a => a.name === animal.name);

    if (existingIndex < 0) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    const isLiked = checkIfLiked();
    props.navigation.setParams({
      toggleLike: handleCheckPress,
      isLiked: isLiked
    });
  }, [liked]);

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
              {animal.about ? animal.about : "No additional info added..."}
            </Text>
          </View>
        </View>
        <View style={styles.goodWithContainer}>
          <View style={styles.animalDetailsContainer}>
            <Text style={styles.animalDetailsTitle}>Good with Cats? </Text>
            <AntDesign
              name={animal.cats ? "check" : "close"}
              size={20}
              color={animal.cats ? "#06D6A0" : "#F2353E"}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text style={styles.animalDetailsTitle}>Good with Dogs? </Text>
            <AntDesign
              name={animal.dogs ? "check" : "close"}
              size={20}
              color={animal.dogs ? "#06D6A0" : "#F2353E"}
            />
          </View>
        </View>

        <View style={styles.goodWithContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text style={styles.animalDetailsTitle}>Microchipped? </Text>
            <AntDesign
              name={animal.chip ? "check" : "close"}
              size={20}
              color={animal.chip ? "#06D6A0" : "#F2353E"}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text style={styles.animalDetailsTitle}>Immunization Shots? </Text>
            <AntDesign
              name={animal.shots ? "check" : "close"}
              size={20}
              color={animal.shots ? "#06D6A0" : "#F2353E"}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text style={styles.animalDetailsTitle}>Spayed/Neutered?</Text>
            <AntDesign
              name={animal.sn ? "check" : "close"}
              size={20}
              color={animal.sn ? "#06D6A0" : "#F2353E"}
            />
          </View>
        </View>
      </View>
      <ImageModal
        url={animal.image ? animal.image : url}
        imageModalVisible={imageModalVisible}
        setImageModalVisible={setImageModalVisible}
      />
    </View>
  );
};

EditAnimalProfileScreen.navigationOptions = navigationData => {
  const animal = navigationData.navigation.getParam("animal");
  console.log(animal);
  return {
    headerTitle: animal.name,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Edit"
          iconName={"edit"}
          onPress={() =>
            navigationData.navigation.navigate({
              routeName: "EditAnimal",
              params: { animal: animal }
            })
          }
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
    marginTop: 10
  },
  animalTypeContainer: {
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginHorizontal: 5
  },
  animalDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  animalDetailsTitle: {
    fontFamily: "source-sans-semi-bold",
    fontSize: 17,
    textAlign: "left"
  },
  goodWithContainer: {
    justifyContent: "space-between",
    width: "90%",
    marginTop: 10
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

export default EditAnimalProfileScreen;

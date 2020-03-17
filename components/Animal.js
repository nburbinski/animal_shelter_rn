import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import { toggleLike } from "../store/actions/actions";
import ImageModal from "./ImageModal";

const Animal = props => {
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleCheckPress = useCallback(() => {
    dispatch(toggleLike(props.animal.id, props.animal.liked));
  });

  useEffect(() => {
    props.navigation.setParams({ toggleLike: handleCheckPress });
  }, [dispatch]);

  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate({
          routeName: "AnimalProfile",
          params: {
            animal: props.animal
          }
        });
      }}
    >
      <View style={styles.animalContainer}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() => {
              setImageModalVisible(true);
            }}
          >
            <Image
              style={styles.animalImage}
              source={{ uri: props.animal.image }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.animalInfo}>
          <View>
            <Text style={styles.animalNameText}>{props.animal.name}</Text>
          </View>
          <View style={styles.animalType}>
            <Text style={styles.animalTypeText}>{props.animal.type}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleCheckPress}>
          <View style={styles.likeButton}>
            <AntDesign
              name={props.animal.liked ? "heart" : "hearto"}
              size={32}
              color="#3a7ebf"
            />
          </View>
        </TouchableOpacity>

        <ImageModal
          url={props.animal.image}
          imageModalVisible={imageModalVisible}
          setImageModalVisible={setImageModalVisible}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  animalContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "space-between",
    backgroundColor: "#72bcd4",
    marginHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    elevation: 2
  },
  imageContainer: {
    marginRight: 10,
    marginLeft: 15,
    flex: 2
  },
  animalImage: {
    height: 75,
    width: 75,
    borderRadius: 50
  },
  animalInfo: {
    flex: 3,
    alignItems: "flex-start"
  },
  animalType: {
    backgroundColor: "#3a7ebf",
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 5
  },
  animalTypeText: {
    color: "white",
    textAlign: "center"
  },
  fullAnimalImageContainer: {
    flex: 1,
    backgroundColor: "black"
  },
  fullAnimalImage: {
    height: 500,
    width: 500,
    marginHorizontal: "auto",
    marginVertical: Math.round(Dimensions.get("window").height) / 6
  },
  animalName: {
    paddingBottom: 10
  },
  animalNameText: {
    fontSize: 20,
    fontFamily: "source-sans-semi-bold",
    color: "white"
  },
  likeButton: {
    padding: 15,
    flex: 1,
    justifyContent: "center"
  }
});

export default Animal;

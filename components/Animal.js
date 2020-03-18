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
    <View>
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
            <View
              style={{
                backgroundColor:
                  props.animal.type === "Dog" ? "#26547C" : "#EF476F",
                ...styles.animalType
              }}
            >
              <Text style={styles.animalTypeText}>{props.animal.type}</Text>
            </View>
            <TouchableOpacity onPress={handleCheckPress}>
              <View style={styles.likeButton}>
                <AntDesign
                  name={props.animal.liked ? "heart" : "hearto"}
                  size={32}
                  color="#F2353E"
                />
              </View>
            </TouchableOpacity>
          </View>

          <ImageModal
            url={props.animal.image}
            imageModalVisible={imageModalVisible}
            setImageModalVisible={setImageModalVisible}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  animalContainer: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    width: 150,
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    marginTop: 40,
    marginHorizontal: 15,
    borderRadius: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    marginRight: 10,
    marginLeft: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  animalImage: {
    height: 75,
    width: 75,
    borderRadius: 50
  },
  animalInfo: {
    alignItems: "center"
  },
  animalType: {
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 5
  },
  animalTypeText: {
    color: "white",
    textAlign: "center"
  },
  fullAnimalImageContainer: {
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
    color: "#000000",
    marginBottom: 2
  },
  likeButton: {
    padding: 15,
    marginBottom: 10,
    alignItems: "center"
  }
});

export default Animal;

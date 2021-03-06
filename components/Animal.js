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
import { useDispatch, useSelector } from "react-redux";
import * as firebase from "firebase";

import { toggleLike } from "../store/actions/shelterActions";
import ImageModal from "./ImageModal";

const Animal = props => {
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [url, setUrl] = useState("");

  var storage = firebase.storage();

  const imageURL = async () => {
    try {
      const url = await storage
        .ref()
        .child(`animals/${props.shelter.uID}/${props.animal.name}.jpg`)
        .getDownloadURL();

      setUrl(url);
    } catch (error) {
      console.log(error.message);
    }
  };

  const dispatch = useDispatch();

  const handleCheckPress = useCallback(() => {
    dispatch(toggleLike(props.animal));
  });

  const isLiked = () => {
    const liked = useSelector(state => state.shelter.liked);
    const existingIndex = liked.findIndex(a => a.name === props.animal.name);

    if (existingIndex < 0) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    props.navigation.setParams({ toggleLike: handleCheckPress });

    // Fetch image url from firebase storage
    imageURL();
  }, []);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate({
            routeName: "AnimalProfile",
            params: {
              animal: props.animal,
              url: url
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
                source={{
                  uri: props.animal.image
                    ? props.animal.image
                    : url.length() === 0
                    ? url
                    : "./assets/default.png"
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.animalInfo}>
            <View>
              <Text style={styles.animalNameText}>{props.animal.name}</Text>
            </View>
            <View style={styles.animalBreed}>
              <Text style={styles.animalBreedText}>{props.animal.breed}</Text>
            </View>
            <TouchableOpacity onPress={handleCheckPress}>
              <View style={styles.likeButton}>
                <AntDesign
                  name={isLiked() ? "heart" : "hearto"}
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
    paddingBottom: 20,
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 15,
    height: 150,
    width: 150,
    backgroundColor: "#ffffff",
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
  animalBreed: {
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 5,
    backgroundColor: "#3281FF"
  },
  animalBreedText: {
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
    padding: 10,
    marginBottom: 10,
    alignItems: "center"
  }
});

export default Animal;

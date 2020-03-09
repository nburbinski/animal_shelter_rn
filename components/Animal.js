import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import ImageModal from "./ImageModal";

const animals = [
  {
    name: "Rufus",
    type: "Dog",
    breed: "Jack Russel Terrier",
    image: "../assets/orange-cat.jpg",
    liked: false
  },
  {
    name: "LadyBird",
    type: "Dog",
    breed: "Jack Russel Terrier",
    image: "../assets/orange-cat.jpg",
    liked: false
  },
  {
    name: "Percy",
    type: "Naked Mole Rat",
    breed: "Jack Russel Terrier",
    image: "../assets/orange-cat.jpg",
    liked: false
  }
];

const Animal = props => {
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [checked, setChecked] = useState("checkcircleo");
  const [check, setCheck] = useState(false);

  const handleCheck = () => {
    check ? setChecked("checkcircle") : setChecked("checkcircleo");
    setCheck(!check);
  };

  return (
    <View style={styles.animalContainer}>
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
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate({
            routeName: "AnimalProfile",
            params: {
              name: props.animal.name
            }
          });
        }}
      >
        <View>
          <Text style={styles.animalName}>{props.animal.name}</Text>
          <Text>{props.animal.type}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCheck}>
        <View style={styles.likeButton}>
          <AntDesign name={checked} size={32} color="blue" />
        </View>
      </TouchableOpacity>

      <ImageModal
        imageModalVisible={imageModalVisible}
        setImageModalVisible={setImageModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animalContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "space-between"
  },
  imageContainer: {
    marginRight: 50,
    marginLeft: 15
  },
  animalImage: {
    height: 75,
    width: 75,
    borderRadius: 50
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
    fontSize: 20
  },
  likeButton: {
    marginHorizontal: 15
  }
});

export default Animal;

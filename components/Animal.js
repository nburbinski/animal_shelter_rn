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
          props.loadProfile(true);
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
      <Modal animationType="slide" visible={imageModalVisible}>
        <View style={styles.fullAnimalImageContainer}>
          <TouchableOpacity
            onPress={() => {
              setImageModalVisible(!imageModalVisible);
            }}
          >
            <Image
              style={styles.fullAnimalImage}
              source={require("../assets/orange-cat.jpg")}
            />
          </TouchableOpacity>
        </View>
      </Modal>
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

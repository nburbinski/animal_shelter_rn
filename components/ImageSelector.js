import React from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { AntDesign } from "@expo/vector-icons";

const ImageSelector = ({ textChangeHandler }) => {
  // Verify both Camera and Camera Roll permissions
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant camera permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  // Select from phone gallery
  const selectImageHandler = async () => {
    const permissionsAllowed = await verifyPermissions();
    if (!permissionsAllowed) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8
    });
    textChangeHandler("image", image.uri);
  };

  // Take a new picture
  const takeImageHandler = async () => {
    const permissionsAllowed = await verifyPermissions();
    if (!permissionsAllowed) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8
    });
    textChangeHandler("image", image.uri);
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={takeImageHandler}>
        <View style={styles.button}>
          <AntDesign name="camera" size={50} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={selectImageHandler}>
        <View style={styles.button}>
          <AntDesign name="picture" size={50} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "darkgrey",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10
  }
});

export default ImageSelector;

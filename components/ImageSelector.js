import React from "react";
import { View, Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";
import {
  FIREBASE_API_KEY,
  FB_STORAGE,
  FB_DB_URL,
  AUTH_DOMAIN,
  PROJECT_ID
} from "react-native-dotenv";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: FB_DB_URL,
  projectId: PROJECT_ID,
  storageBucket: FB_STORAGE
};

firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();
var storageRef = storage.ref();
var imagesRef = storageRef.child("images");

const uriToBlob = uri => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
      // return the blob
      resolve(xhr.response);
    };

    xhr.onerror = function() {
      // something went wrong
      reject(new Error("uriToBlob failed"));
    };

    // this helps us get a blob
    xhr.responseType = "blob";

    xhr.open("GET", uri, true);
    xhr.send(null);
  });
};

const uploadToFirebase = blob => {
  return new Promise((resolve, reject) => {
    var storageRef = firebase.storage().ref();

    storageRef
      .child("uploads/photo.jpg")
      .put(blob, {
        contentType: "image/jpeg"
      })
      .then(snapshot => {
        blob.close();

        resolve(snapshot);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const ImageSelector = props => {
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA);
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
    props.setImageTaken(image.uri);

    const blob = await uriToBlob(image.uri);
    const snapshot = await uploadToFirebase(blob);
    console.log("File uploaded");
  };
  return (
    <View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
};

export default ImageSelector;

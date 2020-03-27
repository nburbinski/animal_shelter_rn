import { AsyncStorage } from "react-native";
import * as firebase from "firebase";
import {
  FIREBASE_API_KEY,
  FB_STORAGE,
  FB_DB_URL,
  AUTH_DOMAIN,
  PROJECT_ID
} from "react-native-dotenv";

import Shelter from "../../models/shelter";

export const TOGGLE_LIKE = "TOGGLE_LIKE";
export const SET_FILTERS = "SET_FILTERS";
export const SET_ANIMALS = "SET_ANIMALS";
export const SET_SHELTERS = "SET_SHELTERS";
export const ADD_ANIMAL = "ADD_ANIMAL";
export const ADD_SHELTER = "ADD_SHELTER";
export const SET_LIKES = "SET_LIKES";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: FB_DB_URL,
  projectId: PROJECT_ID,
  storageBucket: FB_STORAGE
};

firebase.initializeApp(firebaseConfig);

export const fetchShelters = () => {
  return async dispatch => {
    const response = await fetch(
      "https://animal-shelter-6a4a9.firebaseio.com/shelters.json"
    );

    const resData = await response.json();
    const loadedShelters = [];

    for (const key in resData) {
      loadedShelters.push(
        new Shelter(
          key,
          resData[key].name,
          resData[key].address,
          resData[key].image,
          resData[key].animals,
          resData[key].uID
        )
      );
    }

    dispatch({
      type: SET_SHELTERS,
      shelters: loadedShelters
    });
  };
};

export const toggleLike = animal => {
  return async dispatch => {
    const liked = await AsyncStorage.getItem("likedAnimals");
    if (!liked) {
      await AsyncStorage.setItem("likedAnimals", JSON.stringify([animal]));
      dispatch({
        type: TOGGLE_LIKE,
        animal: animal
      });
    } else {
      const json = JSON.parse(liked);

      const existingIndex = json.findIndex(a => a.name === animal.name);

      if (existingIndex >= 0) {
        json.splice(existingIndex, 1);
        await AsyncStorage.setItem("likedAnimals", JSON.stringify(json));
      } else {
        await AsyncStorage.setItem(
          "likedAnimals",
          JSON.stringify(json.concat(animal))
        );
      }

      dispatch({
        type: TOGGLE_LIKE,
        animal: animal
      });
    }
  };
};

export const setFilters = (filtersSettings, animals) => {
  return {
    type: SET_FILTERS,
    filters: filtersSettings,
    animals: animals
  };
};

export const addShelter = shelter => {
  return async (dispatch, getState) => {
    const token = getState().profile.token;
    const uID = getState().profile.userId;

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
          .child(`shelters/${uID}.jpg`)
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

    const blob = await uriToBlob(shelter.image);
    await uploadToFirebase(blob);

    const res = await fetch(
      `https://animal-shelter-6a4a9.firebaseio.com/shelters.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: shelter.name,
          address: shelter.address,
          uID: uID
        })
      }
    );

    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error.message);
    }

    const newShelter = {
      name: shelter.name,
      address: shelter.address,
      uID: uID
    };

    dispatch({
      type: ADD_SHELTER,
      shelter: newShelter
    });
  };
};

export const addAnimal = animal => {
  return async (dispatch, getState) => {
    const token = getState().profile.token;
    const uID = getState().profile.userId;
    const shelters = getState().shelter.shelters;
    const shelter = shelters.find(shelter => shelter.uID === uID);

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
          .child(`animals/${uID}/${animal.name}.jpg`)
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

    const blob = await uriToBlob(animal.image);
    await uploadToFirebase(blob);

    const res = await fetch(
      `https://animal-shelter-6a4a9.firebaseio.com/shelters/${shelter.id}/animals.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: animal.name,
          type: animal.type,
          breed: animal.breed,
          about: animal.about,
          image: animal.image,
          gallery: animal.gallery,
          cats: animal.cats,
          dogs: animal.dogs,
          shots: animal.shots,
          chip: animal.chip,
          sn: animal.sn
        })
      }
    );

    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error.message);
    }

    dispatch({
      type: ADD_ANIMAL,
      animal: animal,
      shelter: shelter
    });
  };
};

export const setLikes = animals => {
  return {
    type: SET_LIKES,
    animals: animals
  };
};

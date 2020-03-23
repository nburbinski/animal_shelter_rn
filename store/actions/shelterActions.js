import { AsyncStorage } from "react-native";

import Shelter from "../../models/shelter";

export const TOGGLE_LIKE = "TOGGLE_LIKE";
export const SET_FILTERS = "SET_FILTERS";
export const SET_ANIMALS = "SET_ANIMALS";
export const SET_SHELTERS = "SET_SHELTERS";
export const ADD_ANIMAL = "ADD_ANIMAL";
export const SET_LIKES = "SET_LIKES";

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

export const addAnimal = animal => {
  return async (dispatch, getState) => {
    const token = getState().profile.token;
    const uID = getState().profile.userId;
    const shelters = getState().animals.shelters;
    const shelter = shelters.find(shelter => shelter.uID === uID);

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
          dogs: animal.dogs
        })
      }
    );

    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error.message);
    }

    dispatch({
      type: ADD_ANIMAL,
      animal: animal
    });
  };
};

export const setLikes = animals => {
  return {
    type: SET_LIKES,
    animals: animals
  };
};

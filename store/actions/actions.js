import Animal from "../../models/animal";
import Shelter from "../../models/shelter";

export const TOGGLE_LIKE = "TOGGLE_LIKE";
export const SET_FILTERS = "SET_FILTERS";
export const SET_ANIMALS = "SET_ANIMALS";
export const SET_SHELTERS = "SET_SHELTERS";

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
          resData[key].image
        )
      );
    }

    dispatch({
      type: SET_SHELTERS,
      shelters: loadedShelters
    });
  };
};

export const fetchAnimals = () => {
  return async dispatch => {
    const response = await fetch(
      "https://animal-shelter-6a4a9.firebaseio.com/animals.json"
    );

    const resData = await response.json();

    const loadedAnimals = [];

    for (const key in resData) {
      loadedAnimals.push(
        new Animal(
          key,
          resData[key].breed,
          resData[key].gallery,
          resData[key].image,
          resData[key].liked,
          resData[key].name,
          resData[key].type,
          resData[key].about,
          resData[key].cats,
          resData[key].dogs
        )
      );
    }

    dispatch({
      type: SET_ANIMALS,
      animals: loadedAnimals
    });
  };
};

export const toggleLike = (id, liked) => {
  return async dispatch => {
    await fetch(
      `https://animal-shelter-6a4a9.firebaseio.com/animals/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          liked: !liked
        })
      }
    );

    dispatch({
      type: TOGGLE_LIKE,
      animalID: id
    });
  };
};

export const setFilters = filtersSettings => {
  return {
    type: SET_FILTERS,
    filters: filtersSettings
  };
};

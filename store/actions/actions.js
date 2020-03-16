import Animal from "../../models/animal";

export const TOGGLE_LIKE = "TOGGLE_LIKE";
export const SET_FILTERS = "SET_FILTERS";
export const FILTERED_LIST = "FILTERED_LIST";
export const SET_ANIMALS = "SET_ANIMALS";

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
          resData[key].type
        )
      );
    }

    dispatch({
      type: SET_ANIMALS,
      animals: loadedAnimals
    });
  };
};

export const toggleLike = id => {
  return {
    type: TOGGLE_LIKE,
    animalID: id
  };
};

export const filteredList = () => {
  return {
    type: FILTERED_LIST
  };
};

export const setFilters = filtersSettings => {
  return {
    type: SET_FILTERS,
    filters: filtersSettings
  };
};

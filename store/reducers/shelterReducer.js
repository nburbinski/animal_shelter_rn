import {
  TOGGLE_LIKE,
  SET_FILTERS,
  SET_SHELTERS,
  SET_LIKES,
  ADD_SHELTER,
  ADD_ANIMAL,
  DELETE_ANIMAL,
  EDIT_SHELTER,
  EDIT_ANIMAL
} from "../actions/shelterActions";

const initialState = {
  shelters: [],
  filteredAnimals: [],
  filters: [],
  liked: []
};

export const shelterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIKES:
      return {
        ...state,
        liked: action.animals
      };
    case SET_SHELTERS:
      return {
        ...state,
        shelters: action.shelters
      };
    case ADD_SHELTER:
      return {
        ...state,
        shelters: state.shelters.concat(action.shelter)
      };
    case ADD_ANIMAL:
      const newAnimals = [action.shelter.animals];
      newAnimals.push(action.animal);

      const newShelter = { ...action.shelter, animals: newAnimals };
      const newShelters = [...state.shelters];

      newShelters.map(shelter =>
        shelter.name === newShelter.name ? newShelter : shelter
      );

      return {
        ...state,
        shelters: newShelters
      };
    case DELETE_ANIMAL:
      const newSheltersState = [...state.shelters];

      const shelter = newSheltersState.find(
        shelter => shelter.id === action.shelter.id
      );

      const animal = (shelter.animals.action.id = null);

      return {
        ...state,
        shelters: newSheltersState
      };

    case TOGGLE_LIKE:
      const existingIndex = state.liked.findIndex(
        animal => animal.name === action.animal.name
      );

      if (existingIndex >= 0) {
        const newLikedState = [...state.liked];
        newLikedState.splice(existingIndex, 1);

        return {
          ...state,
          liked: newLikedState
        };
      } else {
        return { ...state, liked: state.liked.concat(action.animal) };
      }

    case SET_FILTERS:
      const appliedFilters = action.filters;
      if (!appliedFilters) {
        return { ...state, filteredAnimals: action.animals };
      }

      const filteredAnimals = action.animals.filter(animal => {
        if (
          appliedFilters.isType &&
          appliedFilters.isDog &&
          appliedFilters.isCat &&
          appliedFilters.isOther
        ) {
          if (appliedFilters.isDog && animal.type === "Dog") return true;
          else if (appliedFilters.isCat && animal.type === "Cat") return true;
          else if (appliedFilters.isOther && animal.type === "Other")
            return true;
          else {
            return false;
          }
        } else if (appliedFilters.isBreed) {
          for (let id in appliedFilters.filteredBreeds) {
            if (appliedFilters.filteredBreeds[id] === animal.breed) {
              return true;
            }
          }
        } else {
          return true;
        }
      });
      return { ...state, filteredAnimals: filteredAnimals };
    default:
      return state;
  }
};

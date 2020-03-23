import {
  TOGGLE_LIKE,
  SET_FILTERS,
  SET_SHELTERS,
  SET_LIKES
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
      const filteredAnimals = state.animals.filter(animal => {
        if (appliedFilters.isType) {
          if (appliedFilters.isDog && animal.type === "Dog") return true;
          else if (appliedFilters.isCat && animal.type === "Cat") return true;
          else if (
            appliedFilters.isNakedMoleRat &&
            animal.type === "Naked Mole Rat"
          )
            return true;
          else {
            return false;
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

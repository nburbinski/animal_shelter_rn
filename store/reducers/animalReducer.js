import { TOGGLE_LIKE, SET_FILTERS, SET_ANIMALS } from "../actions/actions";

const initialState = {
  animals: [],
  filteredAnimals: []
};

export const animalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ANIMALS: {
      return { ...state, filteredAnimals: action.animals };
    }
    case TOGGLE_LIKE:
      const newAnimalState = state.animals.map(animal =>
        animal.id === action.animalID
          ? { ...animal, liked: !animal.liked }
          : animal
      );
      const newFilteredState = state.filteredAnimals.map(animal =>
        animal.id === action.animalID
          ? { ...animal, liked: !animal.liked }
          : animal
      );
      const existingIndex = state.likedAnimals.findIndex(
        animal => animal.id === action.animalID
      );
      if (existingIndex >= 0) {
        const updatedLikedAnimals = [...state.likedAnimals];
        updatedLikedAnimals.splice(existingIndex, 1);
        return {
          animals: newAnimalState,
          filteredAnimals: newFilteredState,
          likedAnimals: updatedLikedAnimals
        };
      } else {
        return {
          animals: newAnimalState,
          filteredAnimals: newFilteredState,
          likedAnimals: state.likedAnimals.concat(
            state.animals.find(animal => animal.id === action.animalID)
          )
        };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const filteredAnimals = state.animals.filter(animal => {
        if (appliedFilters.isBreed && animal.breed !== appliedFilters.breed)
          return false;
        if (appliedFilters.isType && animal.type !== appliedFilters.type)
          return false;

        return true;
      });
      return { ...state, filteredAnimals: filteredAnimals };
    default:
      return state;
  }
};

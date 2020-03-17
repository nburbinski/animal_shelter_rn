import { TOGGLE_LIKE, SET_FILTERS, SET_ANIMALS } from "../actions/actions";

const initialState = {
  animals: [],
  filteredAnimals: []
};

export const animalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ANIMALS: {
      return {
        ...state,
        animals: action.animals,
        filteredAnimals: action.animals
      };
    }
    case TOGGLE_LIKE:
      const animals = [...state.animals];
      const newAnimalState = animals.map(animal =>
        animal.id === action.animalID
          ? { ...animal, liked: !animal.liked }
          : animal
      );
      const newfilteredAnimals = [...state.filteredAnimals];
      const newFilteredState = newfilteredAnimals.map(animal =>
        animal.id === action.animalID
          ? { ...animal, liked: !animal.liked }
          : animal
      );
      return {
        ...state,
        animals: newAnimalState,
        filteredAnimals: newFilteredState
      };
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

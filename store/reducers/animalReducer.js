import {
  TOGGLE_LIKE,
  SET_FILTERS,
  SET_ANIMALS,
  SET_SHELTERS
} from "../actions/actions";

const initialState = {
  shelters: [],
  animals: [],
  filteredAnimals: [],
  filters: []
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
    case SET_SHELTERS:
      return {
        ...state,
        shelters: action.shelters
      };
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
        if (appliedFilters.isType) {
          if (appliedFilters.isDog && animal.type !== "Dog") return false;
          if (appliedFilters.isCat && animal.type !== "Cat") return false;
          else {
            return true;
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

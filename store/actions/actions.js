export const TOGGLE_LIKE = "TOGGLE_LIKE";
export const SET_FILTERS = "SET_FILTERS";
export const FILTERED_LIST = "FILTERED_LIST";

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

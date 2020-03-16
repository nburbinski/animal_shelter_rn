export const TOGGLE_LIKE = "TOGGLE_LIKE";

export const toggleLike = id => {
  return {
    type: TOGGLE_LIKE,
    animalID: id
  };
};

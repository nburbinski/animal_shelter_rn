import { AUTH, LOGOUT } from "../actions/profileActions";

const initialState = {
  token: null,
  userId: null
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      return {
        token: action.token,
        userId: action.userId
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

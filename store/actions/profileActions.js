import { AsyncStorage } from "react-native";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const AUTH = "AUTH";
export const LOGOUT = "LOGOUT";

import { FIREBASE_API_KEY } from "react-native-dotenv";

export const authenticate = (token, userId) => {
  return {
    type: AUTH,
    token: token,
    userId: userId
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    const resData = await res.json();

    if (!resData.ok) {
      throw new Error(resData.error.message);
    }
    dispatch(authenticate(resData.idToken, resData.localId));

    const expDate = new Date(
      new Date().getTime() + parseInt(resData.expresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expDate);
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );

    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.error.message);
    }

    const resData = await res.json();

    dispatch(authenticate(resData.idToken, resData.localId));
    const newTime = new Date().getTime() + parseInt(resData.expiresIn) * 1000;
    const expDate = new Date(newTime);
    saveDataToStorage(resData.idToken, resData.localId, expDate);
  };
};

export const logout = () => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: null,
      userId: null,
      expDate: null
    })
  );
  return {
    type: LOGOUT
  };
};

const saveDataToStorage = (token, userId, expDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expDate: expDate.toISOString()
    })
  );
};

import { AsyncStorage } from "react-native";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const AUTH = "AUTH";

import { FIREBASE_API_KEY } from "react-native-dotenv";

export const authenticate = (token, userId) => {
  return {
    type: AUTH,
    token: token,
    userId: userId
  };
};

export const signup = (email, password) => {
  return async disptach => {
    try {
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

      authenticate(resData.idToken, resData.localId);

      const expDate = new Date(
        new Date().getTime() + parseInt(resData.expresIn) * 1000
      );
      saveDataToStorage(resData.idToken, resData.localId, expDate);
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const login = (email, password) => {
  return async disptach => {
    try {
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

      const resData = await res.json();
      authenticate(resData.idToken, resData.localId);

      const newTime = parseInt(
        new Date().getTime() + parseInt(resData.expresIn) * 1000
      );

      const expDate = new Date(newTime);
      console.log(expDate);
      saveDataToStorage(resData.idToken, resData.localId, expDate);
    } catch (error) {
      console.log(error.message);
    }
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

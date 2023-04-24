import React, { useReducer } from "react";
import { AuthContext } from "./auth.context";
const isBrowser = typeof window !== "undefined";
const INITIAL_STATE = {
  isAuthenticated: isBrowser && !!localStorage.getItem("access_token"),
  currentForm: "signIn",
  profile: localStorage.getItem("thedb_auth_profile")
    ? JSON.parse(localStorage.getItem("thedb_auth_profile"))
    : {},
};

function reducer(state, action) {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...state,
        currentForm: "signIn",
      };
    case "UPDATE":
      return {
        ...state,
        profile: action.payload.profile,
        currentForm: "loginSuccess",
        isAuthenticated: true,
      };
    case "SIGNIN_SUCCESS":
      return {
        ...state,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isAuthenticated: false,
        currentForm: "signIn",
        profile: {},
      };
    case "SIGNUP":
      return {
        ...state,
        currentForm: "signUp",
      };
    case "EMAILCONFIRM":
      return {
        ...state,
        currentForm: "emailConfirm",
        isAuthenticated: false,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "SIGNUP_FAILED":
      return {
        ...state,
        isAuthenticated: false,
      };
    case "FORGOTPASS":
      return {
        ...state,
        currentForm: "forgotPass",
      };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase/config";

// firebase auth context
export const AuthContext = createContext();

// reducer setup
function authReducer(state, action) {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, user: action.payload };
    case "LOG_OUT":
      return { ...state, user: null };
    case "SIGN_UP":
      return { ...state, user: action.payload };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
}

// Auth context provider to provide auth to entire app
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null, authIsReady: false });

  // Verify user's firebase logged in state on initial render
  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });

      unsub(); // unsubscribe once verified
    });
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

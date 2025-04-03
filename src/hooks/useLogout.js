import { firebaseAuth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { setDoc } from "firebase/firestore";

export function useLogout() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  //   log user out
  const logOutUser = () => {
    console.log("Signing out");
    setIsPending(true);
    signOut(firebaseAuth)
      .then(() => {
        // Sign-out successful.
        console.log("signed out");
        // setDoc();
        setIsPending(false);
        dispatch({ type: "LOG_OUT" });
      })
      .catch((err) => {
        // An error happened.
        setIsPending(false);
        setError(err.message);
      });
  };
  return { logOutUser, isPending, error };
}

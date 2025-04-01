import { useState } from "react";
import { firebaseAuth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export function useSignUp() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const { dispatch } = useAuthContext();

  const signUpNewUser = async (email, password, displayName) => {
    let isMounted = true; // Prevent state updates if unmounted
    setError(null);
    setIsPending(true);
    setResponse(null);

    // sign up user
    try {
      const res = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      if (!res) throw new Error("Could not complete signup");

      // update new user with display name
      await updateProfile(res.user, { displayName });

      if (isMounted) {
        dispatch({ type: "SIGN_UP", payload: res.user });
        setIsPending(false);
        setResponse(res);
      }
    } catch (err) {
      console.error("Signup error:", err); // ✅ Debugging
      if (isMounted) {
        setError(err.message);
        setIsPending(false);
      }
    }

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  };
  return { error, isPending, signUpNewUser, response };
}

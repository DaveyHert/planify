import { useState } from "react";
import { firebaseAuth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export function useSignIn() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const signUserIn = async (email, password) => {
    let isMounted = true; // Prevent state updates if unmounted

    setIsPending(true);
    setError(null);

    // Sign user in
    try {
      const userRes = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      if (!userRes.user) throw new Error("Failed to sign in");

      if (isMounted) {
        setIsPending(false);
        dispatch({ type: "SIGN_IN", payload: userRes.user });
      }
    } catch (err) {
      if (isMounted) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  return { isPending, error, signUserIn };
}

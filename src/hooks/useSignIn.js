import { useState } from "react";
import { firebaseAuth, firestoreDB } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { doc, updateDoc } from "firebase/firestore";

export function useSignIn() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch, user } = useAuthContext();

  const signUserIn = async (email, password) => {
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

      // Update user's online status
      const docRef = doc(firestoreDB, "users", userRes.user.uid);
      await updateDoc(docRef, { online: true });

      setIsPending(false);
      dispatch({ type: "SIGN_IN", payload: userRes.user });
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { isPending, error, signUserIn };
}

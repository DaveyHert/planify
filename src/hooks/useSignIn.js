import { useState } from "react";
import { firebaseAuth, firestoreDB } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { doc, updateDoc } from "firebase/firestore";

export function useSignIn() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const signUserIn = async (email, password) => {
    setIsPending(true);
    setError(null);

    // Sign user in
    try {
      const res = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      if (!res.user) throw new Error("Failed to sign in");

      // Update user's online status
      const docRef = doc(firestoreDB, "users", res.user.uid);
      await updateDoc(docRef, { online: true });

      // Update global auth context
      dispatch({ type: "SIGN_IN", payload: res.user });
      setIsPending(false);

      // Handle pottential error
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { isPending, error, signUserIn };
}

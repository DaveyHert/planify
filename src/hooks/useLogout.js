import { firebaseAuth, firestoreDB } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

export function useLogout() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch, user } = useAuthContext();

  //   Log user out
  const logOutUser = async () => {
    setIsPending(true);
    setError(null);

    try {
      // Update online status
      const docRef = doc(firestoreDB, "users", user.uid);
      await updateDoc(docRef, { online: false });

      // Logout
      await signOut(firebaseAuth);
      console.log(user);

      // Update global auth context
      dispatch({ type: "LOG_OUT" });
      setIsPending(false);

      // Handle pottential error
    } catch (err) {
      setIsPending(false);
      setError(err.message);
    }
  };
  return { logOutUser, isPending, error };
}

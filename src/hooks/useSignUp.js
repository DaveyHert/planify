import { useState } from "react";
import { firebaseAuth, firebaseStorage, firestoreDB } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthContext } from "./useAuthContext";

export function useSignUp() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const { dispatch } = useAuthContext();

  const signUpNewUser = async (email, password, displayName, avatar) => {
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

      // upload users avater/profile pics
      const uploadPath = `thumnbnails/${res.user.uid}/${avatar.name}`;
      const storageRef = ref(firebaseStorage, uploadPath);
      const snapshot = await uploadBytes(storageRef, avatar);
      if (!snapshot) throw new Error("Failed to upload profile image");

      //get avatar url
      const avatarURL = await getDownloadURL(storageRef);
      console.log(avatarURL);

      // update new user with display name
      await updateProfile(res.user, { displayName, photoURL: avatarURL });
      console.log(res);
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

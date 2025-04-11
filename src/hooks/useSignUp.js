import { useState } from "react";
import { firebaseAuth, firebaseStorage, firestoreDB } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthContext } from "./useAuthContext";
import { setDoc, doc } from "firebase/firestore";

export function useSignUp() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const { dispatch } = useAuthContext();

  const signUpNewUser = async (email, password, displayName, avatar) => {
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

      // upload users avatar/profile pics
      const uploadPath = `thumnbnails/${res.user.uid}/${avatar.name}`;
      const storageRef = ref(firebaseStorage, uploadPath);
      const snapshot = await uploadBytes(storageRef, avatar);

      //get avatar url and update new user's profile with display name and photo url
      if (!snapshot) throw new Error("Failed to upload profile image");
      const avatarURL = await getDownloadURL(storageRef);
      await updateProfile(res.user, { displayName, photoURL: avatarURL });

      // create a user document for the user with their unique ID
      const docRef = doc(firestoreDB, "users", res.user.uid);
      await setDoc(docRef, { online: true, displayName, photoURL: avatarURL });

      // store current user in our global context
      dispatch({ type: "SIGN_UP", payload: res.user });
      setIsPending(false);
      setResponse(res);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };
  return { error, isPending, signUpNewUser, response };
}

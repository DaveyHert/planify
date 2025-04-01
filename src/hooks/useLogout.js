import { firebaseAuth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export function useLogout() {
  const { dispatch } = useAuthContext();

  //   log user out
  const logOutUser = () => {
    signOut(firebaseAuth)
      .then(() => {
        // Sign-out successful.
        console.log("User signed out successfully.");
        dispatch({ type: "LOG_OUT" });
      })
      .catch((err) => {
        // An error happened.
        console.error("Error signing out: ", err);
      });
  };
  return { logOutUser };
}

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// hook to consume firebase Auth Context
export function useAuthContext() {
  const context = useContext(AuthContext);

  //   check if context exist
  if (!context) {
    throw new Error("useAuthContext must be used inside an AuthProvider");
  }

  return context;
}

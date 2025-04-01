import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { firestoreDB } from "../firebase/config";

export function useAddDocument(collectionName) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const addItem = async (newItem) => {
    setIsPending(true);
    setError(null);

    try {
      const colRef = collection(firestoreDB, collectionName);
      await addDoc(colRef, { ...newItem, createdAt: Timestamp.now() });
      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { addItem, isPending, error };
}

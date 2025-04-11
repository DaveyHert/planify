import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { firestoreDB } from "../firebase/config";

export function useUpdateDocument(collectionName) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const updateItem = async (id, newItem) => {
    if (!collectionName || !id || !newItem) return;

    setIsPending(true);
    setError(null);

    try {
      const docRef = doc(firestoreDB, collectionName, id);
      const res = await updateDoc(docRef, newItem);

      console.log(res);
      setIsPending(false);
    } catch (err) {
      setError(err);
      setIsPending(false);
    }
  };

  return { updateItem, isPending, error };
}

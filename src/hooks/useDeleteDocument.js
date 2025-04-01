import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { firestoreDB } from "../firebase/config";

export function useDeleteDocument(collectionName) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const deleteItem = async (id) => {
    setIsPending(true);
    setError(null);

    try {
      const docRef = doc(firestoreDB, collectionName, id);
      await deleteDoc(docRef);
      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { deleteItem, isPending, error };
}

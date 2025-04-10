import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestoreDB } from "../firebase/config";

export function useAddDocument(collectionName) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const addItem = async (newItem) => {
    setIsPending(true);
    setError(null);
    setResponse(null);

    try {
      const colRef = collection(firestoreDB, collectionName);
      const res = await addDoc(colRef, newItem);
      setResponse(res);
      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { addItem, isPending, error, response };
}

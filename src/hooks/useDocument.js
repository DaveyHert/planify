import { useState, useEffect } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { firestoreDB } from "../firebase/config";

export function useDocument(collectionName, docId) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!collectionName || !docId) return;

    setError(null);
    const docRef = doc(firestoreDB, collectionName, docId);

    const unsub = onSnapshot(
      docRef,
      (doc) => {
        console.log(doc);
        if (doc.exists()) {
          setData({ id: doc.id, ...doc.data() });
          setIsPending(false);
        } else {
          setError("project not found");
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsub(); //cleanup function
  }, [collectionName, docId]);

  return { data, isPending, error };
}

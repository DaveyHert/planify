import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestoreDB } from "../firebase/config";

export function useCollection(collectionName, uid) {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!collectionName || !uid) return;

    // reset states
    setData(null);
    setIsPending(true);
    setError(null);

    // Get all documents in collection
    const colRef = collection(firestoreDB, "users", uid, collectionName);
    const unsub = onSnapshot(
      colRef,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(docs);
        setIsPending(false);
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsub(); // Cleanup function
  }, [collectionName, uid]);

  return { data, isPending, error };
}

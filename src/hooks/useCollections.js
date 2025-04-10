import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestoreDB } from "../firebase/config";

export function useCollection(collectionName) {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!collectionName) return;

    // reset states
    setIsPending(true);
    setError(null);
    setData([]);

    // Get all documents in collection
    const colRef = collection(firestoreDB, collectionName);
    const unsub = onSnapshot(
      colRef,
      (snapshot) => {
        // verify snapshot isn't empty
        if (snapshot.empty) {
          setError(`No ${collectionName} available yet`);
          setIsPending(false);
          return; // Prevent further execution
        }

        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // save data received
        setData(docs);
        setIsPending(false);
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsub(); // Cleanup function
  }, [collectionName]);

  return { data, isPending, error };
}

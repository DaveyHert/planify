import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestoreDB } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export function useCollection(collectionName) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  useEffect(() => {
    if (!collectionName || !user) return;

    // reset states
    setData(null);
    setIsPending(true);
    setError(null);

    // Get all documents in collection
    const colRef = collection(firestoreDB, "users", user.uid, collectionName);
    const unsub = onSnapshot(
      colRef,
      (snapshot) => {
        console.log(snapshot);

        if (snapshot.empty) {
          setError(`No ${collectionName}s available`);
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

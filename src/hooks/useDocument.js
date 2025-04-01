import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestoreDB } from "../firebase/config";

export function useDocument(collectionName, docId) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!collectionName || !docId) return;

    const fetchDocument = async () => {
      try {
        const docRef = doc(firestoreDB, collectionName, docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData({ id: docSnap.id, ...docSnap.data() });
        } else {
          throw new Error("Document not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsPending(false);
      }
    };

    fetchDocument();
  }, [collectionName, docId]);

  return { data, isPending, error };
}

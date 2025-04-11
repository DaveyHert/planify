import { useEffect, useState } from "react";
import { firestoreDB, createTimeStamp } from "../firebase/config";
import { useFirestoreContext } from "./useFirestoreContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const { dispatch } = useFirestoreContext();

export function useFirestore(uid, sortBy) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uid) return;

    // reset states
    setData(null);
    setIsPending(true);
    setError(null);

    let colRef;

    // filter by sorted if required
    if (sortBy) {
      colRef = query(
        collection(firestoreDB, "users", uid, "transactions"),
        sortBy === "amount"
          ? orderBy(sortBy, "desc")
          : sortBy === "createdAt"
          ? orderBy(sortBy, "desc")
          : orderBy(sortBy)
      );

      // If not sorting, just get all documents
    } else {
      colRef = collection(firestoreDB, "users", uid, "transactions");
    }
    const unsub = onSnapshot(
      colRef,
      (snapshot) => {
        if (snapshot.empty) {
          setIsPending(false);
          setError(`No transactions found`);
          setData(null);
          return;
        }
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(newData);
        dispatch({ type: "DATA_LOADED", payload: newData });
        setIsPending(false);
        setError(null);
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    // cleanup live database on unmount
    return () => unsub();
  }, [uid, sortBy]);

  // Add document to firestore
  const addDocument = async (newDoc) => {
    const colRef = collection(firestoreDB, "users", uid, "transactions");
    // Add time stamp
    const createdAt = createTimeStamp.now();

    try {
      await addDoc(colRef, { ...newDoc, createdAt });
    } catch (err) {
      setError(err.message);
    }
    setIsPending(false);
  };

  // Delete document on firestore
  const deleteDocument = async (id) => {
    try {
      const docRef = doc(firestoreDB, "users", uid, "transactions", id);
      await deleteDoc(docRef);
    } catch (err) {
      setError(err.message);
    }
  };

  return { data, error, isPending, addDocument, deleteDocument };
}

import { useEffect, useState } from "react";
import { firestoreDB } from "../firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";

export function useFirestoreDB(collectionName, uid) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!collection) return;

    // reset states
    setData(null);
    setError(null);
    setIsPending(true);

    const colRef = collection(firestoreDB, "users", uid, collectionName);
    const unsub = onSnapshot(
      colRef,
      (snapshot) => {
        setIsPending(false);
      },

      (err) => {
        setError(error);
        setIsPending(false);
      }
    );

    return () => unsub(); // cleanup in case of unmount
  }, [collectionName, uid]);

  // get single document project
  const getProject = async (id) => {
    // reset state
    setData(null);
    setError(null);
    setIsPending(true);

    try {
      const docRef = doc(firestoreDB, collectionName, id);
      const docSnapshot = await getDoc(docRef);
    } catch (err) {
      setError(err.message);
    }
  };

  // Add item to firestore
  const addItem = async (newItem) => {
    setError(null);
    setIsPending(true);
  };
  // delete item
  const deleteItem = async (id) => {
    // reset state
    setData(null);
    setError(null);
    setIsPending(true);

    const createdAt = Timestamp(new Date());
    try {
      const colRef = collection(firestoreDB, collectionName);
      const docRef = await addDoc(colRef, { ...newItem, createdAt });

      if (!docRef.id) throw new Error("Failed to add item to database");

      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }

    try {
      const docRef = doc(firestoreDB, collectionName, id);
      await deleteDoc(docRef);
      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { data, error, isPending, getProject, deleteItem, addItem };
}

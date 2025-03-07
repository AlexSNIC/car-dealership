import { doc, getDoc, setDoc, deleteDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

export const editCollectionId = async (collectionName, elementId, newId) => {
  try {
    const oldDocRef = doc(db, collectionName, elementId);
    const newDocRef = doc(db, collectionName, newId);

    const docSnap = await getDoc(oldDocRef);
    if (!docSnap.exists()) {
      throw new Error("Document does not exist!");
    }

    const data = docSnap.data();

    await setDoc(newDocRef, data);

    await deleteDoc(oldDocRef);

    console.log(`Document ID changed from ${elementId} to ${newId}`);
    return newDocRef;
  } catch (error) {
    console.error("Error changing document ID:", error);
  }
};

export const addDocumentToCollection = async (collection, id, newDocument) => {
  try {

    const docRef = doc(db, collection, id);

    await updateDoc(docRef, {
      documents: arrayUnion(newDocument), 
    });

    console.log("New document with id " + newDocument.id + " added to the collection successfully!");
  } catch (error) {
    console.error("Error adding document " + newDocument.id +" to collection: ", error);
  }
};
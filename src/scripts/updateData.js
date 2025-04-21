import { doc, getDoc, setDoc, deleteDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

export const updateCollectionDocumentId = async (collectionName, documentId, newId) => {
  try {
    const oldDocRef = doc(db, collectionName, documentId);
    const newDocRef = doc(db, collectionName, newId);

    const docSnap = await getDoc(oldDocRef);
    if (!docSnap.exists()) {
      throw new Error("Document does not exist!");
    }

    const data = docSnap.data();

    await setDoc(newDocRef, data);

    await deleteDoc(oldDocRef);

    console.log(`Document ID changed from ${documentId} to ${newId}`);
    return newDocRef;
  } catch (error) {
    console.error("Error changing document ID:", error);
  }
};

export const updateCollectionDocumentElementId = async (collectionName, documentId, elementId, newId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Document not found");
    }

    const data = docSnap.data();
    const documentsArray = data.documents || [];

    const updatedDocuments = documentsArray.map(doc => {
      if (doc.id === elementId) {
        return { ...doc, id: newId };
      }
      return doc;
    });

    await updateDoc(docRef, {
      documents: updatedDocuments
    });
  } catch (error) {
    console.error("Error updating document element ID:", error);
  }
};


import { doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const deleteCollectionDocument = async (collectionName, documentId) => {
  try {
    const itemRef = doc(db, collectionName, documentId);
    await deleteDoc(itemRef);
    console.log(`Document with ID: ${documentId} has been deleted successfully!`);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

export const deleteCollectionDocumentElement = async (collectionName, documentId, elementId) => {
  try {
    const documentRef = doc(db, collectionName, documentId);

    const documentSnapshot = await getDoc(documentRef);
    if (!documentSnapshot.exists()) {
      throw new Error(`Document with ID: ${documentId} does not exist.`);
    }

    const documentData = documentSnapshot.data();
    const elementsArray = documentData.documents || [];

    const updatedArray = elementsArray.filter(element => element.id !== elementId);

    await updateDoc(documentRef, { documents: updatedArray });
  } catch (error) {
    console.error("Error deleting document element: ", error);
  }
};
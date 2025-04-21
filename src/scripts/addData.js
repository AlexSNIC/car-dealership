import { db } from "../firebase";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

export async function addCollectionDocument(collection, documentId) {
  try {
    await setDoc(doc(db, collection, documentId), {});
    console.log("Document added with ID:", documentId);
  } catch (error) {
    console.error("Error adding document:", error);
  }
}
export const addCollectionDocumentElement = async (collection, documentId, newElement) => {
  try {
    const docRef = doc(db, collection, documentId);

    await updateDoc(docRef, {
      documents: arrayUnion(newElement), 
    });

    console.log("Element with ID " + newElement.id + " added to the documents array successfully!");
  } catch (error) {
    console.error("Error adding element " + newElement.id + " to documents array: ", error);
  }
};
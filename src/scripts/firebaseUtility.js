import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function isCollectionDocumentIdAvailable(collectionName, documentId) {
  const docRef = doc(db, collectionName, documentId);
  const docSnap = await getDoc(docRef);

  return !docSnap.exists();
}
export async function isCollectionDocumentElementIdAvailable(collectionName, documentId, elementId) {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.warn("Parent document not found");
      return false;
    }

    const data = docSnap.data();
    const documentsArray = data.documents || [];
    for (const doc of documentsArray) {
      if (doc && doc.id === elementId) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Error checking element ID availability:", error);
    return false;
  }
}
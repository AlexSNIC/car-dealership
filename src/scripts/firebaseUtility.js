import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function isCollectionIdAvailable(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  return !docSnap.exists();
}
export async function isDocumentIdAvailable(collectionName, elementName, documentName) {
  const docRef = doc(db, collectionName, elementName);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    
    const data = docSnap.data();
    const documentArray = data.documents || [];
    const documentExists = documentArray.some((doc) => doc.id === documentName); 

    return !documentExists; 
  } else {
    console.error("Document not found!");
    return false; 
  }
}
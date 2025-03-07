import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export async function addCollectionData(collection, elementId) {
  try {
    await setDoc(doc(db, collection, elementId), {});
    console.log("Document added with ID:", elementId);
  } catch (error) {
    console.error("Error adding document:", error);
  }
}
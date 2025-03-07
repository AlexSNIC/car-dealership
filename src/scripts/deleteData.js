import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export const deleteCollectionData = async (collectionName, itemId) => {
  try {
    const itemRef = doc(db, collectionName, itemId);
    await deleteDoc(itemRef);
    console.log(`Item with ID: ${itemId} has been deleted successfully!`);
  } catch (error) {
    console.error("Error deleting item: ", error);
  }
};
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"

export const getCollectionData = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCollectionElement = async (collectionName, elementId) => {
  try {
    const elementRef = doc(db, collectionName, elementId);
    const elementSnap = await getDoc(elementRef);

    if (elementSnap.exists()) {
      return { id: elementSnap.id, ...elementSnap.data() };
    } else {
      console.warn(`No document found with id: ${elementId}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
};
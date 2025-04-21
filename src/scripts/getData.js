import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"

export const getCollectionDocuments = async (collectionName) => {
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

export const getCollectionDocument = async (collectionName, documentId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.warn(`No document found with id: ${documentId}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
};

export const getCollectionDocumentElement = async (collectionName, documentId, elementId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Document not found");
    }

    const data = docSnap.data();
    const documentsArray = data.documents || [];

    const element = documentsArray.find(doc => doc.id === elementId);

    if (!element) {
      throw new Error("Element not found in documents array");
    }

    return element;
  } catch (error) {
    console.error("Error fetching element data:", error);
    return null;
  }
};
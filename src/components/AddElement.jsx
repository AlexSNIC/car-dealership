import { useState } from "react";
import { addCollectionData } from "../scripts/addData";
import ClickInput from "./ClickInput";
import { isCollectionIdAvailable } from "../scripts/firebaseUtility";
export default function AddElement({
  setDocument,
  setElement,
  collectionName,
  fetchData,
}) {
  const handleAddElement = async (id) => {
    try {
      const isAvailable = await isCollectionIdAvailable(collectionName, id);
      if (isAvailable) {
        await addCollectionData(collectionName, id);
        await fetchData();
        setDocument("");
        setElement({ id, documents: []});
      } else alert(`Numele "${id}" este luat!`);
    } catch (err) {
      console.error(err.message);
    }
  };

  return <ClickInput className="input" handleSubmit={handleAddElement} />;
}

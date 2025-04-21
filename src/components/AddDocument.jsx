import ClickInput from "./ClickInput";
import { isCollectionDocumentElementIdAvailable } from "../scripts/firebaseUtility";
import { addCollectionDocumentElement } from "../scripts/addData";

export default function AddDocument({
  collectionName,
  element,
  setElement,
  setDocument,
  fetchData,
}) {
  const handleAddDocument = async (id) => {
    try {
      const isAvailable = await isCollectionDocumentElementIdAvailable(collectionName, element.id, id);
      if(!isAvailable){
        alert(`Numele "${id}"este luat!`);
      }
      else{
        const newDoc = {id};
        await addCollectionDocumentElement(collectionName, element.id, newDoc);
        const data = await fetchData();
        const updatedElement = data.find(el => el.id === element.id);
        setElement(updatedElement);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return <ClickInput className="input" handleSubmit={handleAddDocument} />
}

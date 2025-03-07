import ClickInput from "./ClickInput";
import { isDocumentIdAvailable } from "../scripts/firebaseUtility";
import { addDocumentToCollection } from "../scripts/updateData";

export default function AddDocument({
  collectionName,
  element,
  setElement,
  setDocument,
  fetchData,
}) {
  const handleAddDocument = async (id) => {
    try {
      const isAvailable = await isDocumentIdAvailable(collectionName, element.id, id);
      if(!isAvailable){
        alert(`Numele "${id}"este luat!`);
      }
      else{
        const newDoc = {id};
        await addDocumentToCollection(collectionName, element.id, newDoc);
        const data = await fetchData();
        const updatedElement = data.find(el => el.id === element.id);
        setElement(updatedElement);
        console.log(updatedElement)
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return <ClickInput className="input" handleSubmit={handleAddDocument} />
}

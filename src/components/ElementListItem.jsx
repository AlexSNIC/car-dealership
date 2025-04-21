import { updateCollectionDocumentId } from "../scripts/updateData";
import { deleteCollectionDocument } from "../scripts/deleteData";
import { useState } from "react";
import Input from "./Input";
import { isCollectionDocumentIdAvailable } from "../scripts/firebaseUtility";
import { getCollectionDocument } from "../scripts/getData";

export function ElementListItem({
  database,
  element,
  innerElement,
  setDocument,
  setElement,
  fetchData,
}) {  
  let classes = "database__item";
  if (element.id === innerElement.id) classes += " database__item--selected";
  
  const [editing, setEditing] = useState(false);
  const [blurExit, setBlurExit] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const editElement = async (newId) => {
    try {
      setLoading(true);
      setEditing(false);
      setBlurExit(true);
      setTimeout(() => setBlurExit(false), 400);
      if (innerElement.id === newId) return;
      const available = await isCollectionDocumentIdAvailable(database, newId);
      if (!available) {
        alert(`Numele "${newId}" este luat!`);
      } else {
        await updateCollectionDocumentId(database, innerElement.id, newId);
        await fetchData();
        
        if (element.id === innerElement.id) {
          setElement(await getCollectionDocument(database, newId));
        }
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteElement = async () => {
    if (
      window.confirm(`Dorești să ștergi "${innerElement.id}"?`)
    ) {
      try {
        setLoading(true);
        deleteCollectionDocument(database, innerElement.id);
        await fetchData();
        if(element.id === innerElement.id){
          setElement("");
          setDocument("");
        }
      } catch (err) {
        console.error(err.message);
      }
      finally{
        setLoading(false);
      }
    }
  };
  const handleElementClick = (innerElement) => {
    setDocument("");
    setElement(innerElement.id === element.id ? "" : innerElement);
  };

  return (
    <li key={innerElement.id} className={classes} onClick={() => handleElementClick(innerElement)}>
      {editing ? (
        <Input
          className="input margin-bottom-05"
          handleSubmit={editElement}
          value={innerElement.id}
        />
      ) : (
        <>
          <span className="margin-bottom-05">{innerElement.id} </span>
          {loading && <i className="bi bi-hourglass-split" />}
        </>
      )}
      <br />
      <div className="flex flex-center gap-1">
        <button
          className="button"
          onClick={(event) => {
            if (loading) return;
            event.stopPropagation();
            if (blurExit) setBlurExit(false);
            else setEditing(true);
          }}
        >
          {editing ? (
            <i className="bi bi-check-lg" />
          ) : (
            <i className="bi bi-pencil-square" />
          )}
        </button>
        <button
          className="button"
          onClick={(event) => {
            event.stopPropagation();
            deleteElement(innerElement.id);
          }}
        >
          <i className="bi bi-trash3-fill" />
        </button>
      </div>
    </li>
  );
}

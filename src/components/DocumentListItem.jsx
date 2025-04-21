import React, { useState } from "react";
import { isCollectionDocumentElementIdAvailable } from "../scripts/firebaseUtility";
import { updateCollectionDocumentElementId } from "../scripts/updateData";
import { getCollectionDocumentElement, getCollectionDocument } from "../scripts/getData";
import { deleteCollectionDocumentElement } from "../scripts/deleteData";
import Input from "./Input";
function DocumentListItem({innerDocument, document, setDocument, setElement, database, element, fetchData}) {
  let classes = "database__item";
  if (document.id === innerDocument.id) classes += " database__item--selected";

  const [editing, setEditing] = useState(false);
  const [blurExit, setBlurExit] = useState(false);
  const [loading, setLoading] = useState(false);
  const reselectElement = async () => {
    try {
      const savedElement = await getCollectionDocument(database, element?.id);
      await setElement({});
      setTimeout(() => setElement(savedElement), 0);
    } catch (error) {
      console.error("Error reselecting element:", error);
    }
  };
  const editDocument = async (newId) => {
    try {
      setLoading(true);
      setEditing(false);
      setBlurExit(true);
      setTimeout(() => setBlurExit(false), 400);
      if (innerDocument.id === newId) return;
      
      const available = await isCollectionDocumentElementIdAvailable(database, element.id, newId);
      if (!available) {
        alert(`Numele "${newId}" este luat!`);
      } else {
        await updateCollectionDocumentElementId(database, element.id, innerDocument.id, newId);
        await fetchData();
        await reselectElement();
        if (document.id === innerDocument.id) {
          setDocument(await getCollectionDocumentElement(database, element.id, newId));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (documentId) => {
    if (window.confirm(`Are you sure you want to delete "${documentId}"?`)) {
      try {
        setLoading(true);
        await deleteCollectionDocumentElement(database, element.id, documentId);
        await fetchData();
        if (document.id === documentId) {
          await setDocument({});
        }
      } catch (error) {
        console.error("Error deleting document:", error);
      } finally {
        reselectElement();
        setLoading(false);
      }
    }
  };


  const handleDocumentClick = () => {
    setDocument(innerDocument.id === document.id ? "" : innerDocument);
  };

  return (
    <li
      key={innerDocument.id}
      className={classes}
      onClick={() => {
        handleDocumentClick();
      }}
    >
      {editing ? (
        <Input
          className="input margin-bottom-05"
          handleSubmit={editDocument}
          value={innerDocument.id}
        />
      ) : (
        <>
          <span className="margin-bottom-05">{innerDocument.id} </span>
          {loading && <i className="bi bi-hourglass-split" />}
        </>
      )}
      <br />
      <div className="flex flex-center gap-1">
        <button
          className="button"
          onClick={(event) => {
            if(loading) return;
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
            deleteDocument(innerDocument.id);
          }}
        >
          <i className="bi bi-trash3-fill" />
        </button>
      </div>
    </li>
  );
}

export default DocumentListItem;

import React from "react";

function DocumentListItem({innerDocument, document, setDocument}) {
  let classes = "database__item";
  if (document.id === innerDocument.id) classes += " database__item--selected";

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
      {innerDocument.id}
    </li>
  );
}

export default DocumentListItem;

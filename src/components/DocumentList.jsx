import AddDocument from "./AddDocument";
import DocumentListItem from "./DocumentListItem";
export default function DocumentList({
  documents,
  document,
  setDocument,
}) {
  return (
    <ul>
      {documents &&
        documents.map((innerDocument) => {
          return (
            <DocumentListItem
              key={innerDocument.id}
              innerDocument={innerDocument}
              document={document}
              setDocument={setDocument}
            />
          );
        })}
    </ul>
  );
}

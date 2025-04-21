
import AddDocument from "./AddDocument";
import DocumentListItem from "./DocumentListItem";
export default function DocumentList({
  documents,
  ...props
}) {
  return (
    <ul>
      {documents &&
        documents.map((innerDocument) => {
          return (
            <DocumentListItem
              key={innerDocument.id}
              innerDocument={innerDocument}
              {...props}
            />
          );
        })}
    </ul>
  );
}

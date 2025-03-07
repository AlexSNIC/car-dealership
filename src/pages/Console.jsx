import Database from "../components/Database";
import Display from "../components/Display";
import DocumentList from "../components/DocumentList";
import ElementList from "../components/ElementList";
import AddElement from "../components/AddElement";
import AddDocument from "../components/AddDocument";

import { useState, useEffect } from "react";
import { getCollectionData } from "../scripts/getData";

export default function Console() {
  const [database, setDatabase] = useState("cars");
  const [element, setElement] = useState("");
  const [document, setDocument] = useState("");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const items = await getCollectionData(database);
      console.log(items);
      setData(items.sort((a, b) => a.id.localeCompare(b.id)));
      setLoading(false);
      return items;
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <h2 className="absolute-center">Se încarcă...</h2>;
  if (!data) return <h2 className="absolute-center">A apărut o eroare: </h2>;
  return (
    <div className="console">
      <Database
        name="Cars"
        databaseElements={
          <>
            <ElementList
              data={data}
              element={element}
              database={database}
              setElement={setElement}
              setDocument={setDocument}
              fetchData={fetchData}
            />
            <AddElement
              setElement={setElement}
              setDocument={setDocument}
              fetchData={fetchData}
              collectionName={database}
            />
          </>
        }
      />
      <Database
        name="Documents"
        databaseElements={
          <>
            <DocumentList
              database={database}
              element={element}
              documents={element.documents}
              document={document}
              setDocument={setDocument}
              fetchData={fetchData}
            />
            {element && (
              <AddDocument
                element={element}
                collectionName={database}
                setElement={setElement}
                setDocument={setDocument}
                fetchData={fetchData}
              />
            )}
          </>
        }
      />
      <Display path={[database, element.id, document.id]} />
    </div>
  );
}

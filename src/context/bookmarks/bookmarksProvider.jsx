import { useState, createContext } from "react";
import COLLECTIONS from "../../data/collections.json";
import TOPICS from "../../data/topics.json";

let bookmarksList =[{}]

// Crear un Context y un Provider
export const BookmarksContext = createContext(null);

export const BookmarksProvider = ({ children }) => {
  const [fooCollections, setFooCollections] = useState(COLLECTIONS);
  const [idCollections, setIdCollections] = useState("");
  const [fooTopics, setFooTopics] = useState(TOPICS);
  const [idTopics, setIdTopics] = useState("");

  // Datos de entradas
  const [savedBookmarks, setSavedBookmarks] = useState(bookmarksList.collections);

  // Acciones y referencia
  const [selectedCollection, setSelectedCollection] = useState("");

  // Almacenar la cantidad de elementos
  const [numberCollections, setNumberCollections] = useState(0);
  const [numberTopics, setNumberTopics] = useState(0);
  const [numberLinks, setNumberLinks] = useState(0);

  // Exportar datos al Provider
  const [dataLinks, setDataLinks] = useState([]);
  const [titleLists, setTitleLists] = useState("");

  const value = {
    bookmarksList,
    dataLinks: { state: dataLinks, set: setDataLinks },
    numberCollections: { state: numberCollections, set: setNumberCollections },
    numberLinks: { state: numberLinks, set: setNumberLinks },
    numberTopics: { state: numberTopics, set: setNumberTopics },
    savedBookmarks: { state: savedBookmarks, set: setSavedBookmarks },
    selectedCollection: { state: selectedCollection, set: setSelectedCollection },
    titleLists: { state: titleLists, set: setTitleLists },
    // New datas
    fooCollections: { state: fooCollections, set: setFooCollections },
    fooTopics: { state: fooTopics, set: setFooTopics },
    idCollections: { state: idCollections, set: setIdCollections },
    idTopics: { state: idTopics, set: setIdTopics },
  };
  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
};

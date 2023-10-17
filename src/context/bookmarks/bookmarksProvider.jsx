import { useState, createContext } from "react";
import dataJSON from "../../data/bookmarks.json";

let bookmarksList = dataJSON;

// Crear un Context y un Provider
export const BookmarksContext = createContext(null);

export const BookmarksProvider = ({ children }) => {
  // Datos de entradas
  const [savedBookmarks, setSavedBookmarks] = useState(bookmarksList);

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
  };
  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
};

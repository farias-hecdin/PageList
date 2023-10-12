import { useState, createContext } from "react";
import dataJSON from "../../data/bookmarks.json";

const TheBookmarks = dataJSON;

// Crear un Context y un Provider
export const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  // Data de entradas (lista de marcadores)
  const [BookmarksList, setBookmarksList] = useState(TheBookmarks);

  // Acciones
  const [selectedCollection, setSelectedCollection] = useState(null);

  // Almacenar la cantidad de elementos
  const [numberOfCollections, setNumberOfCollections] = useState(0);
  const [numberOfTopics, setNumberOfTopics] = useState(0);
  const [numberOfLinks, setNumberOfLinks] = useState(0);

  // Exportar datos al Provider
  const [arrayLinks, setArrayLinks] = useState([]);
  const [titleLists, setTitleLists] = useState("");

  const value = {
    BookmarksList,
    setBookmarksList,
    arrayLinks,
    setArrayLinks,
    selectedCollection,
    setSelectedCollection,
    titleLists,
    setTitleLists,
    // Para contador de elementos
    numberOfCollections,
    setNumberOfCollections,
    numberOfTopics,
    setNumberOfTopics,
    numberOfLinks,
    setNumberOfLinks,
  };
  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
};

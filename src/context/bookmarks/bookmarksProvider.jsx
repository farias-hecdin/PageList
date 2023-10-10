import { useState, createContext } from "react";
import dataJSON from "../../data/bookmarks.json";

const dataBookmarks = dataJSON;

// Crear un Context y un Provider
export const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [cantidadDeTemas, setCantidadDeTemas] = useState(0);

  // Exportar datos
  const value = {
    dataBookmarks,
    selectedCollection,
    setSelectedCollection,
    cantidadDeTemas,
    setCantidadDeTemas,
  };
  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
};

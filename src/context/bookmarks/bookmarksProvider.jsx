import { createContext } from "react";
import { useState } from "react";
import { collection } from "../../data/level-one-data-collection.js";
import { section } from "../../data/level-two-data-section.js";
import { list } from "../../data/level-three-data-list.js";
import { item } from "../../data/level-four-data-item.js";

// Creando un Context y Provider
export const BookmarksContext = createContext();

export const BookmarksProvider = ({ children }) => {
  const [selectedCollection, setSelectedCollection] = useState([]);
  const [idSelectedCollection, setIdSelectedCollection] = useState([]);

  // Exportando datos
  const value = {
    selectedCollection,
    setSelectedCollection,
    idSelectedCollection,
    setIdSelectedCollection,
    dataCollection: collection,
    dataSection: section,
    dataList: list,
    dataItem: item,
  };
  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
};

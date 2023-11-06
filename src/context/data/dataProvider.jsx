import { createContext, useState } from "react";
import COLLECTIONS from "../../data/collections.json";
import TOPICS from "../../data/topics.json";
import LISTS from "../../data/lists.json";
import LINKS from "../../data/links.json";

// Crear un Context y un Provider
export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  // Set de datos
  const [dataCollections, setDataCollections] = useState(COLLECTIONS);
  const [dataTopics, setDataTopics] = useState(TOPICS);
  const [dataLists, setDataLists] = useState(LISTS);
  const [dataLinks, setDataLinks] = useState(LINKS);

  // Set de datos obtenidos al seleccionar un elemento
  const [selectedCollection, setSelectedCollection] = useState({ id: "None", number: 0, name: "None" });
  const [selectedList, setSelectedList] = useState({ id: "None", number: 0, name: "None" });

  // localstorage
  const [savedCollection, setSavedCollection] = useState();

  const value = {
    dataCollections,
    setDataCollections,
    dataTopics,
    setDataTopics,
    dataLists,
    setDataLists,
    dataLinks,
    setDataLinks,
    selectedCollection,
    setSelectedCollection,
    selectedList,
    setSelectedList,
    savedCollection,
    setSavedCollection,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

import { createContext, useState } from "react";
import COLLECTIONS from "../../data/collections.json";
import TOPICS from "../../data/topics.json";
import LISTS from "../../data/lists.json";
import LINKS from "../../data/links.json";

// Crear un Context y un Provider
export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  // Set de datos
  const [drawerCollections, setDrawerCollections] = useState(COLLECTIONS);
  const [drawerTopics, setDrawerTopics] = useState(TOPICS);
  const [drawerLists, setDrawerLists] = useState(LISTS);
  const [drawerLinks, setDrawerLinks] = useState(LINKS);

  // Set de datos obtenidos al seleccionar un elemento
  const [selectedCollectionX, setSelectedCollectionX] = useState({ id: "None", number: 0, name: "None" });
  const [selectedList, setSelectedList] = useState({ id: "None", number: 0, name: "None" });

  const value = {
    drawerCollections: { state: drawerCollections, set: setDrawerCollections },
    drawerLinks: { state: drawerLinks, set: setDrawerLinks },
    drawerLists: { state: drawerLists, set: setDrawerLists },
    drawerTopics: { state: drawerTopics, set: setDrawerTopics },
    selectedCollectionX: { state: selectedCollectionX, set: setSelectedCollectionX },
    selectedList: { state: selectedList, set: setSelectedList },
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

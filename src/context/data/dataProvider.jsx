import { createContext, useState } from "react";
import COLLECTIONS from "../../data/collections.json";
import TOPICS from "../../data/topics.json";
import LISTS from "../../data/lists.json";
import BOOKMARKS from "../../data/bookmarks.json";

// Crear un Context y un Provider
export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  // Set de datos
  const [dataCollections, setDataCollections] = useState(COLLECTIONS);
  const [dataTopics, setDataTopics] = useState(TOPICS);
  const [dataLists, setDataLists] = useState(LISTS);
  const [dataBookmarks, setDataBookmarks] = useState(BOOKMARKS);

  // Referencias obtenidas al seleccionar elementos
  const [selectedCollection, setSelectedCollection] = useState({
    collectionId: "0",
    collectionName: "None",
    topicId: "0",
    topicName: "None",
    listId: "0",
    listName: "None",
  });
  const [selectedList, setSelectedList] = useState({ id: "0", name: "None" });
  const [deleteItem, setDeleteItem] = useState({ id: "", name: "", data: "", set: "" });

  // localstorage
  const [savedCollection, setSavedCollection] = useState();

  const datas = {
    dataCollections,
    setDataCollections,
    dataTopics,
    setDataTopics,
    dataLists,
    setDataLists,
    dataBookmarks,
    setDataBookmarks,
  };
  const references = {
    selectedCollection,
    setSelectedCollection,
    selectedList,
    setSelectedList,
    savedCollection,
    setSavedCollection,
    deleteItem,
    setDeleteItem,
  };

  return <DataContext.Provider value={{ ...datas, ...references }}>{children}</DataContext.Provider>;
};

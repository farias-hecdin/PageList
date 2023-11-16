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

  // Referencias obtenidas al seleccionar un elemento
  const [selectedItem, setSelectedItem] = useState({
    collectionId: "0",
    collectionName: "None",
    topicId: "0",
    topicName: "None",
    listId: "0",
    listName: "None",
    bookmarkId: "0",
    bookmarkName: "None",
  });
  const [targetItem, setTargetItem] = useState({
    id: "",
    name: "",
    type: "",
    url: "",
    data: "",
    set: "",
  });
  // const [didChange, setDidChange] = useState({
  //   collection: 0,
  //   topic: 0,
  //   list: 0,
  //   bookmarks: 0,
  // })

  // localstorage
  const [savedData, setSavedData] = useState();

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
    selectedItem,
    setSelectedItem,
    savedData,
    setSavedData,
    targetItem,
    // didChange,
    // setDidChange,
    setTargetItem,
  };

  return <DataContext.Provider value={{ ...datas, ...references }}>{children}</DataContext.Provider>;
};

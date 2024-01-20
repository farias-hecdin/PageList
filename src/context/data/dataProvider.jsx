import { createContext, useState } from "react";
import COLLECTIONS from "../../data/collections.json";
import TOPICS from "../../data/topics.json";
import LISTS from "../../data/lists.json";
import BOOKMARKS from "../../data/bookmarks.json";

// Crear un Context y un Provider
export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  // Set de datos
  const [dataCollections, $dataCollections] = useState(COLLECTIONS);
  const [dataTopics, $dataTopics] = useState(TOPICS);
  const [dataLists, $dataLists] = useState(LISTS);
  const [dataBookmarks, $dataBookmarks] = useState(BOOKMARKS);

  // Referencias obtenidas al seleccionar un elemento
  const [selectedItem, $selectedItem] = useState({
    collectionId: "0",
    collectionTitle: "None",
    topicId: "0",
    topicTitle: "None",
    listId: "0",
    listTitle: "None",
    bookmarkId: "0",
    bookmarkTitle: "None",
    type: null,
  });
  const [targetItem, $targetItem] = useState({
    id: "",
    title: "",
    type: "",
    url: "",
  });

  // Pin data
  const [pinData, $pinData] = useState(false);

  // localstorage
  const [savedData, $savedData] = useState();

  const data = {
    dataCollections,
    $dataCollections,
    dataTopics,
    $dataTopics,
    dataLists,
    $dataLists,
    dataBookmarks,
    $dataBookmarks,
  };
  const references = {
    selectedItem,
    $selectedItem,
    savedData,
    $savedData,
    targetItem,
    $targetItem,
    pinData,
    $pinData,
  };

  return <DataContext.Provider value={{ ...data, ...references }}>{children}</DataContext.Provider>;
};

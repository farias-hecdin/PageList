import { createContext, useState } from "react";

// Crear un Context y un Provider
export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  // Set de datos
  const [dataCollections, $dataCollections] = useState([
    {
      id: "XnBZ0",
      title: "My first collection",
      topics: [],
    },
  ]);

  const [dataTopics, $dataTopics] = useState([
    {
      parent: "XnBZ0",
      id: "Mo1gG",
      title: "A topic",
      lists: [],
    },
  ]);

  const [dataLists, $dataLists] = useState([
    {
      parent: "Mo1gG",
      id: "RDTbX",
      title: "A list",
      bookmarks: [],
    },
  ]);

  const [dataBookmarks, $dataBookmarks] = useState([
    {
      parent: "RDTbX",
      id: "d4Coe",
      title: "Javascript.info - The Modern JavaScript Tutorial",
      url: "https://javascript.info",
      type: "Blog",
      dateAdded: "2020-01-01",
      view: "0",
      state: "None",
    },
  ]);

  // localstorage
  const [savedData, $savedData] = useState();

  const value = {
    $dataBookmarks,
    $dataCollections,
    $dataLists,
    $dataTopics,
    $savedData,
    dataBookmarks,
    dataCollections,
    dataLists,
    dataTopics,
    savedData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

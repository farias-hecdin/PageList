import db1 from "../../data/collections.json";
import db2 from "../../data/topics.json";
import db3 from "../../data/lists.json";
import db4 from "../../data/bookmarks.json";
import { createContext, useState } from "react";

// Crear un Context y un Provider
export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  // Set de datos
  const [dataCollection, $dataCollection] = useState([
    ...db1,
    {
      id: "C_XnBZ0",
      title: "My first collection",
      topics: [],
    },
  ]);

  const [dataTopic, $dataTopic] = useState([
    ...db2,
    {
      parent: "C_XnBZ0",
      id: "T_Mo1gG",
      title: "A topic",
      lists: [],
    },
  ]);

  const [dataList, $dataList] = useState([
    ...db3,
    {
      parent: "T_Mo1gG",
      id: "L_RDTbX",
      title: "A list",
      bookmarks: [],
    },
  ]);

  const [dataBookmark, $dataBookmark] = useState([
    ...db4,
    {
      parent: "L_RDTbX",
      id: "B_d4Coe",
      title: "Javascript.info - The Modern JavaScript Tutorial",
      url: "https://javascript.info",
      domain: "javascript.info",
      type: "Blog",
      dateAdded: "2020-01-01",
      view: "0",
      state: "None",
    },
    {
      parent: "Uncategorized",
      id: "Z_789abc",
      title: "Mastering Programming from Scratch",
      url: "https://tutorialesweb.com",
      domain: "tutorialesweb.com",
      type: "Blog",
      dateAdded: "2022-09-30",
      view: "6",
      state: "None",
    },
  ]);

  const [theBookmark, $theBookmark] = useState([]);

  const value = {
    $dataBookmark,
    $dataCollection,
    $dataList,
    $dataTopic,
    dataBookmark,
    dataCollection,
    theBookmark,
    $theBookmark,
    dataList,
    dataTopic,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

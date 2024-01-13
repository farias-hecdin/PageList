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
      id: "CN_aMytWtRjJY",
      title: "My first collection",
      folders: [],
    },
  ]);

  const [dataFolder, $dataFolder] = useState([
    ...db2,
    {
      parent: "CN_aMytWtRjJY",
      id: "NF_gOFGREJKyb",
      title: "No folder",
      topics: [],
    },
    {
      parent: "CN_aMytWtRjJY",
      id: "FR_QjZeOVneVi",
      title: "A topic #1",
      topics: [],
    },
    {
      parent: "CN_aMytWtRjJY",
      id: "FR_qzItRZOARH",
      title: "A topic #2",
      topics: [],
    },
  ]);

  const [dataTopic, $dataTopic] = useState([
    ...db3,
    {
      parent: "FR_qzItRZOARH",
      id: "TC_MNfbdgdjiI",
      title: "A list",
      bookmarks: [],
    },
    {
      parent: "NF_gOFGREJKyb",
      id: "TC_FBOFcGEQBy",
      title: "A list without folder",
      bookmarks: [],
    },
  ]);

  const [dataBookmark, $dataBookmark] = useState([
    ...db4,
    {
      parent: "TC_FBOFcGEQBy",
      id: "B_d4Coe",
      title: "Javascript.info - The Modern JavaScript Tutorial",
      url: "https://javascript.info",
      domain: "javascript.info",
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
      dateAdded: "2022-09-30",
      view: "6",
      state: "None",
    },
  ]);

  const [theBookmark, $theBookmark] = useState([]);

  const value = {
    $dataBookmark,
    $dataCollection,
    $dataTopic,
    $dataFolder,
    dataBookmark,
    dataCollection,
    theBookmark,
    $theBookmark,
    dataTopic,
    dataFolder,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

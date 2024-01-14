import { createContext, useState } from "react";

// Crear un Context y un Provider
export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  // Set de datos
  const [dataCollection, $dataCollection] = useState([
    {
      id: "CN_aMytWtRjJY",
      title: "Collection No.1",
      folders: [],
    },
  ]);

  const [dataFolder, $dataFolder] = useState([
    {
      parent: "CN_aMytWtRjJY",
      id: "FR_gOFGREJKyb",
      title: "",
      topics: [],
    },
    {
      parent: "CN_aMytWtRjJY",
      id: "FR_QjZeOVneVi",
      title: "Folder No.1",
      topics: [],
    },
  ]);

  const [dataTopic, $dataTopic] = useState([
    {
      parent: "FR_qzItRZOARH",
      id: "TC_MNfbdgdjiI",
      title: "Topic No.2",
      bookmarks: [],
    },
    {
      parent: "NF_gOFGREJKyb",
      id: "TC_FBOFcGEQBy",
      title: "Topic No.1 (without folder)",
      bookmarks: [],
    },
  ]);

  const [dataBookmark, $dataBookmark] = useState([
    {
      parent: "TC_FBOFcGEQBy",
      id: "BK_d4Coe",
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

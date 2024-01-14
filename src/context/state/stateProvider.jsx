import { createContext, useState } from "react";

// Crear un Context y Provider
export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  // Mostrar ventana modal
  const [openSection, $openSection] = useState({
    collectionsPane: false,
    addElem: false,
    editElem: false,
  });

  // Contador de elementos
  const [counterItem, $counterItem] = useState({
    collections: 0,
    topics: 0,
    lists: 0,
    bookmarks: 0,
  });

  // Notificacion
  const [showPopup, $showPopup] = useState({
    show: false,
    message: "",
  });

  const [selectedItem, $selectedItem] = useState({
    id: "",
    name: "",
    type: "collection",
  });

  const [targetItem, $targetItem] = useState({
    id: "",
    title: "",
    type: "",
    url: "",
  });

  // Pin data
  const [pinData, $pinData] = useState(false);

  const value = {
    openSection,
    $openSection,
    counterItem,
    $counterItem,
    showPopup,
    $showPopup,
    selectedItem,
    $selectedItem,
    pinData,
    $pinData,
    targetItem,
    $targetItem,
  };
  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};

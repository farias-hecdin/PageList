import { createContext, useState } from "react";

// Crear un Context y Provider
export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  // Mostrar ventana modal
  const [showModal, $showModal] = useState({
    collectionsPane: false,
    addBookmarks: false,
    editMode: false,
  });

  // Contadores de elementos
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

  // Exportar datos
  const value = {
    showModal,
    $showModal,
    counterItem,
    $counterItem,
    showPopup,
    $showPopup,
  };
  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};

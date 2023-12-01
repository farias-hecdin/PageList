import { createContext, useState } from "react";

// Crear un Context y Provider
export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  // Mostrar ventana modal
  const [showModal, setShowModal] = useState({
    collectionsPane: false,
    addBookmarks: false,
    editMode: false,
  });

  // Contadores de elementos
  const [counterItem, setCounterItem] = useState({
    collections: 0,
    topics: 0,
    lists: 0,
    bookmarks: 0,
  });

  // Notificacion
  const [showPopup, setShowPopup] = useState({
    show: false,
    message: "",
  });

  // Exportar datos
  const value = {
    showModal,
    setShowModal,
    counterItem,
    setCounterItem,
    showPopup,
    setShowPopup,
  };
  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};

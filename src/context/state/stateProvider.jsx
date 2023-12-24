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

  // Contador de elementos
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

  const [selectedItem, setSelectedItem] = useState({
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

  const [targetItem, setTargetItem] = useState({
    id: "",
    title: "",
    type: "",
    url: "",
  });

  // Pin data
  const [pinData, setPinData] = useState(false);

  const value = {
    showModal,
    setShowModal,
    counterItem,
    setCounterItem,
    showPopup,
    setShowPopup,
    selectedItem,
    setSelectedItem,
    targetItem,
    setTargetItem
  };
  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};

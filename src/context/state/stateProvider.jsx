import { createContext, useState } from "react";

// Crear un Context y Provider
export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  // Mostrar ventana modal
  const [openCollectionsModal, setOpenCollectionsModal] = useState(false);
  const [openModalAddBookmarks, setOpenModalAddBookmarks] = useState(false);
  const [openModalEditMode, setOpenModalEditMode] = useState(false);

  // Contadores de elementos
  const [counterCollections, setCounterCollections] = useState(0);
  const [counterTopics, setCounterTopics] = useState(0);
  const [counterLists, setCounterLists] = useState(0);
  const [counterBookmarks, setCounterBookmarks] = useState(0);

  // Exportar datos
  const modals = {
    openCollectionsModal,
    setOpenCollectionsModal,
    openModalAddBookmarks,
    setOpenModalAddBookmarks,
    openModalEditMode,
    setOpenModalEditMode,
  };
  const counters = {
    counterCollections,
    setCounterCollections,
    counterTopics,
    setCounterTopics,
    counterBookmarks,
    setCounterBookmarks,
    counterLists,
    setCounterLists,
  };
  return <StateContext.Provider value={{ ...modals, ...counters }}>{children}</StateContext.Provider>;
};

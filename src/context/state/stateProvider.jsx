import { createContext, useState } from "react";

// Crear un Context y Provider
export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  // Mostrar ventana modal
  const [showCollectionModal, setShowCollectionModal] = useState(false);

  // Exportar datos
  const value = {
    showCollectionModal: { state: showCollectionModal, set: setShowCollectionModal },
  };
  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};

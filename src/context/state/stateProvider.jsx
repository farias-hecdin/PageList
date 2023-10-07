import { createContext, useState } from "react";

// Creando un Context y Provider
export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  // Mostrar ventana modal
  const [showCollectionModal, setShowCollectionModal] = useState(false);

  // Exportando datos
  const value = {
    showCollectionModal,
    setShowCollectionModal,
  };
  return (
    <StateContext.Provider value={value}>
      {children}
    </StateContext.Provider>
  );
};

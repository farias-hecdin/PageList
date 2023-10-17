import css from "./SectionPaneModal.module.css";
import { BookmarksContext, StateContext } from "../../../context/Index.jsx";
import { ButtonBase } from "../../../components/Index.jsx";
import { SectionPaneModalTile } from "./SectionPaneModalTile";
import { useContext } from "react";
import { logC } from "../../../console";

export const SectionPaneModal = () => {
  // Mostrar ventana de la lista de colecciones -------------------------------
  const { showCollectionModal } = useContext(StateContext);

  const funcToggleModal = () => showCollectionModal.set(!showCollectionModal.state);

  // Selecionar una coleccion de marcadores -----------------------------------
  const { savedBookmarks, selectedCollection, numberTopics, numberLinks } = useContext(BookmarksContext);

  // Extraer datos de la coleccion
  const funcSaveDataFromCollection = (e, name) => {
    if (typeof name !== "string") {
      return logC(name, "SectionPaneModal (funcSaveDataFromCollection)");
    }

    let currentNumberTopics = funcGetTotalNumberTopics(e);
    let collectionName = name;
    let resetNumberLinks = 0;
    // Actualizar estados
    selectedCollection.set(collectionName);
    numberTopics.set(currentNumberTopics);
    numberLinks.set(resetNumberLinks);
    // Cerrar ventana
    funcToggleModal();
  };

  // Calcular la cantidad total de elementos
  const funcGetTotalNumberTopics = (e) => {
    let $selectedElementId = e.currentTarget.dataset.id;
    let dataList = savedBookmarks.state.collections;
    let currentNumberTopics = 0;

    for (let elem of dataList) {
      if (elem.name === $selectedElementId) {
        currentNumberTopics = elem.topics.length;
      }
    }
    return currentNumberTopics;
  };

  return (
    <>
      {showCollectionModal.state && (
        <aside className={css.Modal}>
          <div className={css.Container}>
            <p className={css.Container_text}>Choose a collection</p>
            <ul className={css.Container_list}>
              <li key={crypto.randomUUID()}>
                <SectionPaneModalTile
                  pText={"None"}
                  pStyled={selectedCollection.state === "" && "--active"}
                  pHandleClick={(e) => funcSaveDataFromCollection(e, "")}
                />
              </li>
              {typeof savedBookmarks.state === "object"
                ? savedBookmarks.state.collections.map((collections) => (
                    <li key={crypto.randomUUID()}>
                      <SectionPaneModalTile
                        pText={collections.name}
                        pDataId={collections.name}
                        pStyled={selectedCollection.state === collections.name && "--active"}
                        pNumber={collections.topics.length}
                        pHandleClick={(e) => funcSaveDataFromCollection(e, collections.name)}
                      />
                    </li>
                  ))
                : logC(savedBookmarks.state, "SectionPaneModal (savedBookmarks)")}
            </ul>
            <footer className={css.Container_footer}>
              <ButtonBase pText="Cancel" pHandleClick={funcToggleModal} />
            </footer>
          </div>
        </aside>
      )}
    </>
  );
};

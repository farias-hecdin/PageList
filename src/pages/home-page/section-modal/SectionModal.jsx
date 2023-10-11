import css from "./SectionModal.module.css";
import { BookmarksContext, StateContext } from "../../../context/Index.jsx";
import { ButtonBase } from "../../../components/Index.jsx";
import { useContext } from "react";

export const SectionModal = () => {
  // Mostrar ventana de la lista de colecciones -------------------------
  const { showCollectionModal, setShowCollectionModal } = useContext(StateContext);

  const funcToggleModal = () => setShowCollectionModal(!showCollectionModal);

  // Selecionar una coleccion de marcadores -----------------------------------
  const { BookmarksList, selectedCollection, setSelectedCollection, setNumberOfTopics } = useContext(BookmarksContext);

  const funcSelectCollection = (event, name) => {
    let currentQuantity = funcGetTotalAmountOfTopics(event);

    setSelectedCollection(() => name);
    setNumberOfTopics(() => currentQuantity);
    funcToggleModal();
  };

  // Calcular la cantidad total de elementos

  const funcGetTotalAmountOfTopics = (event) => {
    let selectedElementId = event.currentTarget.dataset.id;
    let data = BookmarksList.collections;
    let currentQuantity = 0;

    for (let i = 0; i < data.length; i++) {
      if (data[i].name === selectedElementId) {
        currentQuantity = data[i].topics.length;
      }
    }
    return currentQuantity;
  };

  return (
    <>
      {showCollectionModal && (
        <aside className={css.Modal}>
          <div className={css.Container}>
            <p className={css.Container_text}>Choose a collection</p>
            <ul className={css.Container_list}>
              <li key={crypto.randomUUID()}>
                <SectionModalCard
                  pText={"Empty"}
                  pStyled={selectedCollection === null && "--active"}
                  pHandleClick={(event) => funcSelectCollection(event, null)}
                />
              </li>
              {BookmarksList.collections.map((collections) => (
                <li key={crypto.randomUUID()}>
                  <SectionModalCard
                    pText={collections.name}
                    pId={collections.name}
                    pStyled={selectedCollection === collections.name && "--active"}
                    pHandleClick={(event) => funcSelectCollection(event, collections.name)}
                  />
                </li>
              ))}
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

export const SectionModalCard = ({ pHandleClick, pText, pStyled, pId }) => {
  return (
    <div className={`${css.Card} ${pStyled || null}`} onClick={pHandleClick} data-id={pId}>
      <p className={css.Card_text}>{pText}</p>
    </div>
  );
};

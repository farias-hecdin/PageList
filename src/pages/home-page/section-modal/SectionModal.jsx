import { useContext } from "react";
import css from "./SectionModal.module.css";
import { ButtonBase } from "../../../components/Index.jsx";
import { BookmarksContext, StateContext } from "../../../context/Index.jsx";

export const SectionModal = () => {
  // Mostrar ventana modal ----------------------------------------------------
  const { showCollectionModal, setShowCollectionModal } = useContext(StateContext);
  const ToggleModal = showCollectionModal;

  // Selecionar una colecion --------------------------------------------------
  const { dataCollection, selectedCollection, setSelectedCollection, setIdSelectedCollection } = useContext(BookmarksContext);
  const data = dataCollection;

  const fnSelectCollection = (id, name) => {
    setIdSelectedCollection(() => id);
    setSelectedCollection(() => name);
  }
  return (
    <>
      {ToggleModal && (
        <aside className={css.Modal}>
          <div className={css.Container}>
            <p className={css.Container_text}>Choose a vault: {selectedCollection}</p>
            <ul className={css.List}>
              {data.map((elem) => (
                <li key={crypto.randomUUID()}>
                  <ButtonBase pText={elem.name} pIcon="label" handleClick={() => fnSelectCollection(elem.id, elem.name)} />
                </li>
              ))}
            </ul>
            <footer className={css.Container_footer}>
              <ButtonBase pText="Cancel" handleClick={() => setShowCollectionModal(!ToggleModal)} />
            </footer>
          </div>
        </aside>
      )}
    </>
  );
};

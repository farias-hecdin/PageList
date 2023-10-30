import css from "./SectionPaneModal.module.css";
import { DataContext, StateContext } from "../../../context/Index.jsx";
import { ButtonBase, ModalBase } from "../../../components/Index.jsx";
import { SectionPaneModalTile } from "./SectionPaneModalTile";
import { useContext } from "react";

export const SectionPaneModal = ({ pShowModal }) => {
  // Mostrar ventana de la lista de colecciones -------------------------------

  const { showCollectionModal } = useContext(StateContext);

  /** Cierra la ventana modal */
  const toggleModal = () => showCollectionModal.set(!showCollectionModal.state);

  // Selecionar una coleccion de marcadores -----------------------------------

  const { drawerCollections, drawerTopics, selectedCollectionX } = useContext(DataContext);

  /** Compara `descendent.originId` con `parent.id` y retorna el numero de coincidencias.
   * @param {Array.<Object.<string, ?>>} _arrayDescendent
   * @param {String} _parentId
   */
  const compareIdAndReturnNumberMatches = (_arrayDescendent, _parentId) => {
    let numberCoincidence = 0;
    for (const item of _arrayDescendent) {
      if (item.originId === _parentId) {
        numberCoincidence++;
      }
    }
    return numberCoincidence;
  };

  /** Actualiza el estado `selectedCollection()` de acuerdo la coleccion selecionada.
   * @param {Array|string} _oneCollection
   */
  const selectCollection = (_oneCollection) => {
    try {
      // Actualizar el estado
      let elementNumbers = _oneCollection ? compareIdAndReturnNumberMatches(drawerTopics.state, _oneCollection.id) : 0;
      let elementId = _oneCollection?.id || "None";
      let elementName = _oneCollection?.name || "None";

      selectedCollectionX.set(() => ({
        id: elementId,
        number: elementNumbers,
        name: elementName,
      }));

      // Cerrar la ventana modal
      toggleModal();
    } catch (error) {
      console.warn("SectionPaneModal > selectCollection:" + error.message);
    }
  };

  return (
    <ModalBase pId="modal_pVWgBDgt4eY" pIsOpen={pShowModal}>
      <div className={css.Container_header}>
        <p className={css.Container_title}>Collections</p>
        <p className={css.Container_text}>Choose a collection boorkmarks</p>
      </div>
      <ul className={css.Container_list}>
        <li>
          <SectionPaneModalTile
            pIcon="note-stack-outline"
            pText={"None"}
            pStyled={selectedCollectionX.state.id === "None" && "--active"}
            pHandleClick={() => selectCollection("None")}
          />
        </li>
        {Array.isArray(drawerCollections.state)
          ? drawerCollections.state.map((collection) => (
              <li key={collection.id}>
                <SectionPaneModalTile
                  pIcon="note-stack-outline"
                  pText={collection.name}
                  pStyled={selectedCollectionX.state.id === collection.id && "--active"}
                  pHandleClick={() => selectCollection(collection)}
                />
              </li>
            ))
          : console.warn("SectionPaneModal > rendering list")}
      </ul>
    </ModalBase>
  );
};

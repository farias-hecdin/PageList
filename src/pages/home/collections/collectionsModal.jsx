import css from "./collectionsModal.module.css";
import { DataContext, StateContext } from "../../../context/index.jsx";
import { ButtonBase, ModalBase } from "../../../components/index.jsx";
import { CollectionsCard } from "./collectionsCard";
import { useContext } from "react";
import { useEffect } from "react";
import { compareAndCountIds } from "../../../utils/common";

export const CollectionsModal = ({ showModal }) => {
  const { dataCollections, dataTopics, selectedCollection, setSelectedCollection } = useContext(DataContext);
  const { setCounterTopics } = useContext(StateContext);

  /**
   * Actualiza el estado `selectedCollection()` de acuerdo a la coleccion selecionada.
   * @param {Array|string} data_
   */
  const selectCollectionAndUpdateState = (data_) => {
    let elementId = data_?.id || "0";
    let elementName = data_?.name || "None";

    // Actualizar el estado
    setSelectedCollection({ id: elementId, name: elementName });
  };

  /**
   * Obtener el conteo de `topics` y actualiza el estado
   * @param {Array} data_ ¿Origen del elemento?
   */
  const currentNumberElements = (data_) => {
    let elementNumbers = data_ ? compareAndCountIds(dataTopics, data_.id) : 0;
    setCounterTopics(elementNumbers);
  };
  // Actualizar el contador de `topics`
  useEffect(() => {
    currentNumberElements(selectedCollection);
  }, [dataTopics, selectedCollection]);

  return (
    <>
      <ModalBase id="modal_pVWgBDgt4eY" isOpen={showModal}>
        <div className={css.Container_header}>
          <div>
            <p className={css.Container_title}>Collections</p>
            <p className={css.Container_text}>Choose a collection boorkmarks</p>
          </div>
          <ButtonBase icon="filter-list" />
        </div>
        <ul className={css.Container_list}>
          <li>
            <CollectionsCard
              icon="note-stack-outline"
              text={"None"}
              styled={selectedCollection.id === "None" && "--active"}
              handleClick={() => selectCollectionAndUpdateState("None")}
            />
          </li>
          {dataCollections.map((pCollection) => (
            <li key={crypto.randomUUID()}>
              <CollectionsCard
                icon="note-stack-outline"
                text={pCollection.name}
                styled={selectedCollection.id === pCollection.id && "--active"}
                handleClick={() => selectCollectionAndUpdateState(pCollection)}
                hasMenu={true}
              />
            </li>
          ))}
        </ul>
      </ModalBase>
    </>
  );
};

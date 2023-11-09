import css from "./collectionsModal.module.css";
import { DataContext, StateContext } from "../../../context/index.jsx";
import { ButtonBase, ModalBase } from "../../../components/index.jsx";
import { CollectionsCard } from "./collectionsCard";
import { useContext } from "react";
import { useEffect } from "react";
import { compareAndCountIds } from "../../../utils/common";

export const CollectionsModal = ({ isOpen, handleClick }) => {
  const { dataCollections, setDataCollections, dataTopics, selectedCollection, setSelectedCollection, setDeleteItem } =
    useContext(DataContext);
  const { setCounterTopics, openModalEditMode, setOpenModalEditMode } = useContext(StateContext);

  /**
   * Actualiza el estado `selectedCollection()` de acuerdo a la coleccion selecionada.
   * @param {Array|string} data_
   */
  const selectCollectionAndUpdateState = (data_) => {
    let id = data_?.id || "0";
    let name = data_?.name || "None";

    // Actualizar el estado
    setSelectedCollection((prevState) => ({
      ...prevState,
      collectionId: id,
      collectionName: name,
    }));
  };

  /**
   * Obtener el conteo de `topics` y actualiza el estado
   * @param {Array} data_ ¿Origen del elemento?
   */
  const currentNumberElements = (data_) => {
    let elementNumbers = data_ ? compareAndCountIds(dataTopics, data_.collectionId) : 0;
    setCounterTopics(elementNumbers);
  };
  // Actualizar el contador de `topics`
  useEffect(() => {
    currentNumberElements(selectedCollection);
  }, [dataTopics, selectedCollection]);

  return (
    <>
      <ModalBase isOpen={isOpen} handleClick={handleClick}>
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
              icon="inventory-2-outline"
              text={"None"}
              styled={selectedCollection.id === "None" && "--active"}
              handleClick={() => selectCollectionAndUpdateState("None")}
            />
          </li>
          {dataCollections.map((collection) => (
            <li key={crypto.randomUUID()}>
              <CollectionsCard
                icon="inventory-2-outline"
                text={collection.name}
                styled={selectedCollection.id === collection.id && "--active"}
                handleClick={() => selectCollectionAndUpdateState(collection)}
                handleSecondClick={() => {
                  setOpenModalEditMode(!openModalEditMode);
                  setDeleteItem({
                    id: collection.id,
                    name: collection.name,
                    state: dataCollections,
                    set: setDataCollections,
                  });
                }}
                hasMenu={true}
              />
            </li>
          ))}
        </ul>
      </ModalBase>
    </>
  );
};

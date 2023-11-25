import css from "./collectionsModal.module.css";
import { DataContext, StateContext } from "../../../context/index.jsx";
import { ButtonBase, ModalBase } from "../../../components/index.jsx";
import { CollectionsCard } from "./collectionsCard";
import { useContext } from "react";
import { useEffect } from "react";
import { compareAndCountIds, onClickMissing } from "../../../utils/common";

export const CollectionsModal = ({ isOpen, handleClick }) => {
  const { dataCollections, dataTopics, selectedItem, setSelectedItem, setTargetItem } = useContext(DataContext);
  const { setCounterTopics, openModalEditMode, setOpenModalEditMode } = useContext(StateContext);

  /**
   * Actualizar el estado de acuerdo a la coleccion selecionada.
   * @param {Array|string} pData
   */
  const selectCollectionAndUpdateState = (pData) => {
    let id = pData?.id || "0";
    let title = pData?.title || "None";

    // Actualizar el estado
    setSelectedItem((prevState) => ({
      ...prevState,
      collectionId: id,
      collectionTitle: title,
    }));
  };

  /**
   * Obtener el conteo de `topics` y actualiza el estado
   * @param {Array} pData - Origen del elemento
   */
  const currentNumberElements = (pData) => {
    let elementNumbers = pData ? compareAndCountIds(dataTopics, pData.collectionId) : 0;
    setCounterTopics(elementNumbers);
  };
  // Actualizar el contador de `topics`
  useEffect(() => {
    currentNumberElements(selectedItem);
  }, [dataTopics, selectedItem]);

  return (
    <>
      <ModalBase isOpen={isOpen} handleClick={handleClick}>
        <div className={css.Container_header}>
          <div>
            <p className={css.Container_title}>Collections</p>
            <p className={css.Container_text}>Choose a collection boorkmarks</p>
          </div>
          <ButtonBase icon={<IconifyFilterList />} handleClick={onClickMissing} />
        </div>
        <ul className={css.Container_list}>
          <li>
            <CollectionsCard
              icon={<IconifyInventory2Outline />}
              text={"None"}
              styled={selectedItem.collectionId === "0" && "--active"}
              handleClick={() => selectCollectionAndUpdateState("None")}
            />
          </li>
          {dataCollections.map((collection) => (
            <li key={crypto.randomUUID()}>
              <CollectionsCard
                icon={<IconifyInventory2Outline />}
                text={collection.title}
                styled={selectedItem.collectionId === collection.id && "--active"}
                handleClick={() => selectCollectionAndUpdateState(collection)}
                handle2ndClick={() => {
                  setOpenModalEditMode(!openModalEditMode);
                  setTargetItem((prev) => ({
                    ...prev,
                    id: collection.id,
                    title: collection.title,
                    type: "collection",
                  }));
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

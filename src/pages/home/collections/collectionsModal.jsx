import css from "./collectionsModal.module.css";
import { DataContext, StateContext } from "../../../context/index.jsx";
import { ButtonBase, ModalBase } from "../../../components/index.jsx";
import { CollectionsCard } from "./collectionsCard";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { countMatchingChildIds, currentNumberElements, onClickMissing } from "../../../utils/common";

export const CollectionsModal = ({ isOpen, handleClick }) => {
  const { dataCollections, dataTopics, selectedItem, $selectedItem, $targetItem } = useContext(DataContext);
  const { $counterItem, $showModal } = useContext(StateContext);

  /**
   * Actualizar el estado de acuerdo a la coleccion selecionada.
   * @param {Array|string} pData
   */
  const selectCollectionAndUpdateState = (pData) => {
    let id = pData?.id || "0";
    let title = pData?.title || "None";
    // Actualizar el estado
    $selectedItem((prev) => ({
      ...prev,
      collectionId: id,
      collectionTitle: title,
    }));
  };

  // Actualizar el contador de `topics`
  useEffect(() => {
    currentNumberElements(selectedItem.collectionId, dataTopics, "topics", $counterItem);
  }, [dataTopics, selectedItem]);

  return (
    <>
      <ModalBase isOpen={isOpen} handleClick={handleClick}>
        <div className={css.Container_header}>
          <div className={css.Container_box}>
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
            <li key={collection.id}>
              <CollectionsCard
                icon={<IconifyInventory2Outline />}
                text={collection.title}
                styled={selectedItem.collectionId === collection.id && "--active"}
                handleClick={() => {
                  selectCollectionAndUpdateState(collection);
                  $showModal((prev) => ({ ...prev, collectionsPane: !prev.collectionsPane }));
                }}
                handle2ndClick={() => {
                  $targetItem((prev) => ({
                    ...prev,
                    id: collection.id,
                    title: collection.title,
                    type: "collection",
                  }));
                  $showModal((prev) => ({ ...prev, editMode: !prev.editMode }));
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

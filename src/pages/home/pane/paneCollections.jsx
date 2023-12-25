import css from "./paneCollections.module.css";
import { PaneSide } from "./paneSide";
import { DataContext, StateContext } from "../../../context/index.jsx";
import { useContext, useEffect } from "react";
import { CardElement } from "../card/cardElement";
import { currentNumberElements } from "../../../utils/common";

export const PaneCollections = () => {
  const { dataCollections, dataTopics } = useContext(DataContext);
  const { $counterItem, $showModal, selectedItem, $selectedItem, $targetItem } = useContext(StateContext);

  /**
   * Actualizar el estado de acuerdo a la coleccion selecionada.
   * @param {Array|string} pData
   */
  const selectCollectionAndUpdateState = (pData) => {
    let id = pData?.id || "0";
    let title = pData?.title || "None";
    // Actualizar el estado
    $selectedItem((prevState) => ({
      ...prevState,
      collectionId: id,
      collectionTitle: title,
    }));
  };

  // Actualizar el contador de `topics`
  useEffect(() => {
    currentNumberElements(selectedItem.collectionId, dataTopics, "topics", $counterItem);
  }, [dataTopics, selectedItem]);

  return (
    <PaneSide title={"Collections"} counter={0}>
      <ul className={css.Container_list}>
        <li>
          <CardElement
            icon={<IconifyInventory2Outline />}
            text={"None"}
            styled={selectedItem.collectionId === "0" && "--active"}
            handleClick={() => selectCollectionAndUpdateState("None")}
          />
        </li>
        {dataCollections.map((collection) => (
          <li key={collection.id}>
            <CardElement
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
    </PaneSide>
  );
};

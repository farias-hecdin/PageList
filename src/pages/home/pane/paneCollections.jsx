import css from "./paneCollections.module.css";
import { CardElement } from "../card/cardElement";
import { DataContext, StateContext } from "../../../context/index.jsx";
import { PaneSide } from "./paneSide";
import { currentNumberElements } from "../../../utils/common";
import { useContext, useEffect } from "react";

export const PaneCollections = () => {
  const { dataCollections, dataTopics } = useContext(DataContext);
  const { $counterItem, counterItem, $openSection, selectedItem, $selectedItem, targetItem, $targetItem } =
    useContext(StateContext);

  /**
   * Actualizar el estado de acuerdo a la coleccion selecionada.
   * @param {Array|string} pData
   */
  const selectCollectionAndUpdateState = (pData) => {
    $selectedItem((prev) => ({
      ...prev,
      collectionId: pData?.id || "0",
      collectionName: pData?.title || "None",
    }));
  };

  // Actualizar el contador de `colections`
  useEffect(() => {
    $counterItem((prev) => ({ ...prev, collection: dataCollections.length }));
    console.log(targetItem)
  }, [dataCollections, selectedItem, targetItem]);

  return (
    <PaneSide title={"All collections"} showButton={false} counter={counterItem.collection}>
      <ul className={css.Container_list}>
        {dataCollections.map((collection) => (
          <li key={collection.id}>
            <CardElement
              counter={currentNumberElements(collection.id, dataTopics)}
              icon={<IconifyInventory2Outline />}
              text={collection.title}
              styled={selectedItem.collectionId === collection.id && "--active"}
              handleClick={() => {
                const number = currentNumberElements(collection.id, dataTopics);
                selectCollectionAndUpdateState(collection);
                $counterItem((prev) => ({ ...prev, topics: number }));
                $openSection((prev) => ({ ...prev, collectionsPane: !prev.collectionsPane }));
              }}
              handleClick2={() => {
                $targetItem((prev) => ({
                  ...prev,
                  id: collection.id,
                  title: collection.title,
                  type: "collection",
                }));
                $openSection((prev) => ({ ...prev, editElem: !prev.editElem }));
              }}
            />
          </li>
        ))}
      </ul>
    </PaneSide>
  );
};

import css from "./paneCollections.module.css";
import { CardElement } from "../card/cardElement";
import { DataContext, StateContext } from "../../../context/index.jsx";
import { PaneSide } from "./paneSide";
import { currentNumberElements } from "../../../utils/common";
import { useContext, useEffect } from "react";

export const PaneCollections = () => {
  const { dataCollection, dataTopic } = useContext(DataContext);
  const { $counterItem, counterItem, $openSection, selectedItem, $selectedItem } = useContext(StateContext);
  const { targetItem, $targetItem } = useContext(StateContext);

  // Actualizar el contador de `colections`
  useEffect(() => {
    $counterItem((prev) => ({ ...prev, collection: dataCollection.length }));
  }, [dataCollection, selectedItem, targetItem]);

  return (
    <PaneSide title="All collections" showButton={false} counter={counterItem.collection}>
      <ul className={css.Container_list}>
        {dataCollection.map((collection) => (
          <li key={collection.id}>
            <CardElement
              counter={currentNumberElements(collection.id, dataTopic)}
              icon={<IconifyInventory2Outline />}
              text={collection.title}
              styled={selectedItem.collection.id === collection.id && "--active"}
              handleClick={() => {
                const number = currentNumberElements(collection.id, dataTopic);
                $selectedItem((prev) => ({ ...prev, collection: { id: collection.id, name: collection.title } }));
                $counterItem((prev) => ({ ...prev, topics: number }));
                $openSection((prev) => ({ ...prev, collectionsPane: !prev.collectionsPane }));
              }}
              handleClick2={() => {
                $targetItem((prev) => ({ ...prev, id: collection.id, title: collection.title, type: "collection" }));
                $openSection((prev) => ({ ...prev, editElem: !prev.editElem }));
              }}
            />
          </li>
        ))}
      </ul>
    </PaneSide>
  );
};

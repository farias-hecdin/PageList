import css from "./VwPaneCollections.module.css";
import * as C from "$src/components";
import { DataContext, StateContext } from "$src/context";
import { currentNumberElements } from "$src/utils/common";
import { useContext, useEffect } from "react";
import * as F from "../index";

export const VwPaneCollections = () => {
  const { dataCollection, dataTopic } = useContext(DataContext);
  const { $counterItem, counterItem, $openSection, selectedItem, $selectedItem } = useContext(StateContext);
  const { targetItem, $targetItem } = useContext(StateContext);

  // Actualizar el contador de `colections`
  useEffect(() => {
    $counterItem((prev) => ({ ...prev, collection: dataCollection.length }));
  }, [dataCollection, selectedItem, targetItem]);

  return (
    <F.VwElementsPane
      title="Collections"
      counter={counterItem.collection}
      buttons={
        <>
          <C.ButtonBase icon={<IconifySearch />} styled="is-outline" />
          <C.ButtonBase icon={<IconifyAdd />} styled="is-outline" />
        </>
      }
    >
      <ul className={css.Container_list}>
        {dataCollection.map((elem) => (
          <li key={elem.id}>
            <C.CardListing
              counter={currentNumberElements(elem.id, dataTopic)}
              icon={<IconifyInventory2Outline />}
              text={elem.title}
              styled={selectedItem.id === elem.id && "--active"}
              handleClick={() => {
                const number = currentNumberElements(elem.id, dataTopic);
                $selectedItem({ id: elem.id, name: elem.title, type: "topic" });
                $counterItem((prev) => ({ ...prev, topics: number }));
                $openSection((prev) => ({ ...prev, collectionsPane: !prev.collectionsPane }));
              }}
              handleClick2={() => {
                $targetItem((prev) => ({ ...prev, id: elem.id, title: elem.title, type: "collection" }));
                $openSection((prev) => ({ ...prev, editElem: !prev.editElem }));
              }}
            />
          </li>
        ))}
      </ul>
    </F.VwElementsPane>
  );
};

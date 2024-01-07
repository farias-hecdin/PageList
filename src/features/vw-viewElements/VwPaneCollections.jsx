import css from "./VwPaneCollections.module.css";
import * as C from "$src/components";
import { DataContext, StateContext } from "$src/context";
import { VwSidebar } from "./VwSidebar";
import { currentNumberElements } from "$src/utils/common";
import { useContext, useEffect } from "react";

export const VwPaneCollections = () => {
  const { dataCollection, dataTopic } = useContext(DataContext);
  const { $counterItem, counterItem, $openSection, selectedItem, $selectedItem } = useContext(StateContext);
  const { targetItem, $targetItem } = useContext(StateContext);

  // Actualizar el contador de `colections`
  useEffect(() => {
    $counterItem((prev) => ({ ...prev, collection: dataCollection.length }));
  }, [dataCollection, selectedItem, targetItem]);

  return (
    <VwSidebar
      title="Collections"
      counter={counterItem.collection}
      buttons={
        <>
          <C.ButtonBase icon={<IconifySearch />} styled="is-outline" />
          <C.ButtonBase icon={<IconifyAdd />} styled="is-outline" />
          <C.ButtonBase
            icon={<IconifyArrowBackIosNew />}
            handleClick={() => $selectedItem((prev) => ({ ...prev, collection: { id: "", name: "" } }))}
            styled="is-outline"
          />
        </>
      }
    >
      <ul className={css.Container_list}>
        {dataCollection.map((collection) => (
          <li key={collection.id}>
            <C.CardListing
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
    </VwSidebar>
  );
};

import css from "./VwPaneTopics.module.css";
import { VwSidebar } from "../VwSidebar";
import * as C from "$src/components";
import { useContext, useState, useEffect } from "react";
import { currentNumberElements } from "$src/utils/common";
import { DataContext, StateContext } from "$src/context";

export const VwPaneTopics = () => {
  const { dataList, dataTopic, dataBookmark, theBookmark, $theBookmark } = useContext(DataContext);
  const { $counterItem, counterItem, $selectedItem, selectedItem } = useContext(StateContext);

  /** Mostrar una lista */
  const [toggleList, $toggleList] = useState();

  // Actualizar el contador de `bookmarks`
  useEffect(() => {
    if (selectedItem.type === "list") {
      const number = currentNumberElements(selectedItem.list.id, dataBookmark);
      $counterItem((prev) => ({ ...prev, bookmarks: number }));
    } else {
      const number = dataList.reduce((count, list) => {
        return (
          count +
          dataBookmark.reduce((innerCount, bookmark) => {
            return innerCount + (bookmark.parent === list.id ? 1 : 0);
          }, 0)
        );
      }, 0);
      $counterItem((prev) => ({ ...prev, bookmarks: number }));
    }
  }, [dataBookmark, selectedItem]);

  // --------------------------------------------------------------------------

  function mapToChildData(parentData, childData) {
    return parentData.flatMap((parent) => childData.filter((child) => parent.id === child.parent));
  }

  function filterByParentId(data, parentId) {
    return data.filter((item) => item.parent === parentId);
  }

  function showBookmarks(type) {
    let data = [];
    if (type === "collection") {
      let topicInCollection = filterByParentId(dataTopic, selectedItem.collection.id);
      let listInTopic = mapToChildData(topicInCollection, dataList);
      let bookmarkInList = mapToChildData(listInTopic, dataBookmark);
      data = bookmarkInList;
    }
    // if (type === 'topic') {
    //   data = dataBookmark.map((elem) =>
    //     dataList.map((list) =>
    //       list.parent === selectedItem.list.id && elem.parent === list.id ? (
    //       ) : null
    //     )
    //   )}
    //{selectedItem.type === "list" &&
    // dataBookmark.map((elem) =>
    //   elem.parent === selectedItem.list.id ? <AnBookmark key={elem.id} data={elem} /> : null
    // )}_
    $theBookmark(data);
  }

  return (
    <VwSidebar
      title="Topics"
      counter={counterItem.topics}
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
        <li>
          <div className={css.Container_pair}>
            <C.CardListing
              text="All bookmarks"
              handleClick={() => {
                $selectedItem((prev) => ({ ...prev, type: "collection" }));
                showBookmarks("collection");
              }}
            />
            <C.CardListing
              text="Uncategorized"
              handleClick={() => {
                $selectedItem((prev) => ({ ...prev, type: "collection" }));
                showBookmarks("collection");
              }}
            />
          </div>
        </li>
        {dataTopic.map(
          (topic) =>
            topic.parent === selectedItem.collection.id && (
              <li key={topic.id}>
                {/* <PaneTopicsTree pTopic={topic} pToggleList={{ toggleList, $toggleList }} /> */}
              </li>
            )
        )}
      </ul>
    </VwSidebar>
  );
};

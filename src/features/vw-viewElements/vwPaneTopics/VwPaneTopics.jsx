import css from "./VwPaneTopics.module.css";
import * as C from "$src/components";
import { useContext, useState, useEffect } from "react";
import { currentNumberElements } from "$src/utils/common";
import { DataContext, StateContext } from "$src/context";
import * as F from "../VwElementsPane";

export const VwPaneTopics = () => {
  const { dataTopic, dataFolder, dataBookmark, theBookmark, $theBookmark } = useContext(DataContext);
  const { $counterItem, counterItem, $selectedItem, selectedItem } = useContext(StateContext);

  /** Mostrar una lista */
  const [toggleList, $toggleList] = useState();

  // Actualizar el contador de `bookmarks`
  useEffect(() => {
    if (selectedItem.type === "list") {
      const number = currentNumberElements(selectedItem.list.id, dataBookmark);
      $counterItem((prev) => ({ ...prev, bookmarks: number }));
    } else {
      const number = dataTopic.reduce((count, list) => {
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
      let topicInCollection = filterByParentId(dataFolder, selectedItem.collection.id);
      let listInTopic = mapToChildData(topicInCollection, dataTopic);
      let bookmarkInList = mapToChildData(listInTopic, dataBookmark);
      data = bookmarkInList;
    }
    // if (type === 'topic') {
    //   data = dataBookmark.map((elem) =>
    //     dataTopic.map((list) =>
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
  // !---------------------------------------------------------------------------!:

  const filteredElems = (parent, children) => {
    return children.filter((elem) => elem.parent === parent.id)
  }


  return (
    <F.VwElementsPane
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
        {
          filteredElems(selectedItem.collection, dataFolder).map(
            (folder) => folder.title === "" ? (
              filteredElems(dataFolder, dataTopic).map(
                    <li key={topic.id}>
                      <C.CardListing text={topic.title} icon={<IconifyBookmarksOutline />} counter={0} />
                    </li>
                  )
              )
             : (
              <li key={folder.id}>
                <C.CardListing text={folder.title} />
              </li>
            ))
        )}
      </ul>
    </F.VwElementsPane>
  );
};

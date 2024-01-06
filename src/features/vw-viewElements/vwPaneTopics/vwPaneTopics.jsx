import css from "./paneTopics.module.css";
import { CardElement } from "../card/cardElement";
import { DataContext, StateContext } from "../../../context/index";
import { PaneSide } from "../pane/paneSide.jsx";
import { currentNumberElements } from "../../../utils/common";
import { useContext } from "react";
import { PaneTopicsTree } from "./paneTopicsTree";

export const PaneTopics = () => {
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
    <PaneSide title={selectedItem.collection.name} counter={counterItem.topics}>
      <ul className={css.Container_list}>
        <li>
          <div className={css.Container_pair}>
            <CardElement
              text="All bookmarks"
              handleClick={() => {
                $selectedItem((prev) => ({ ...prev, type: "collection" }));
                showBookmarks("collection");
              }}
            />
            <CardElement
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
                <PaneTopicsTree pTopic={topic} pToggleList={{ toggleList, $toggleList }} />
              </li>
            )
        )}
      </ul>
    </PaneSide>
  );
};

import css from "./paneTopics.module.css";
import { DataContext, StateContext } from "../../../context/index";
import { useContext, useEffect, useState } from "react";
import { currentNumberElements } from "../../../utils/common";
import { PaneSide } from "./paneSide";
import { CardElement } from "../card/cardElement";

export const PaneTopics = () => {
  const { dataLists, dataTopics, dataBookmarks } = useContext(DataContext);

  const { $counterItem, $selectedItem, $showModal, $targetItem, selectedItem, targetItem } = useContext(StateContext);

  /** Mostrar una lista */
  const [toggleList, $toggleList] = useState();

  /**
   * Actualizar el estado de acuerdo a la lista selecionada
   * @param {Array|string} pList
   */
  const selectListAndUpdateState = (pTopic, pList, pType) => {
    let topicId = pTopic?.id || "0";
    let topicTitle = pTopic?.title || "None";
    let listId = pList?.id || "0";
    let listTitle = pList?.title || "None";
    let type = pType;
    // Actualizar el estado
    $selectedItem((prevState) => ({
      ...prevState,
      topicId: topicId,
      topicTitle: topicTitle,
      listId: listId,
      listTitle: listTitle,
      type: type,
    }));
  };

  // Actualizar el contador de `bookmarks`
  useEffect(() => {
    if (selectedItem.type === "list") {
      currentNumberElements(selectedItem.listId, dataBookmarks, "bookmarks", $counterItem);
    } else {
      let data = dataLists.filter((list) => list.parent === selectedItem.listId);
      let data2 = data.flatMap((list) => dataBookmarks.filter((bookmark) => bookmark.parent === list.id));
      let num = data2.length;
      $counterItem((prev) => ({ ...prev, bookmarks: num }));
    }
  }, [dataBookmarks, selectedItem]);

  // Components ---------------------------------------------------------------
  useEffect(() => console.log(targetItem), [targetItem]); // !here:

  const TreeHeader = ({ data }) => (
    <CardElement
      text={data.title}
      styled={selectedItem.collecId === "0" && "--active"}
      handleClick={() => $toggleList((prev) => (prev === data.id ? "" : data.id))}
      handleClick2={() => {
        $showModal((prev) => ({ ...prev, editMode: !prev.editMode }));
        $targetItem((prev) => ({
          ...prev,
          id: data.id,
          title: data.title,
          type: "topic",
        }));
      }}
    />
  );

  const TreeItem = ({ parent, data, type }) => (
    <CardElement
      icon={<IconifyFolderOutline />}
      text={data.title}
      styled={`TreeItem_51Se6 ${selectedItem.listId === "0" && "--active"}`}
      handleClick={() => selectListAndUpdateState(parent, data, type)}
      handleClick2={() => {
        $showModal((prev) => ({ ...prev, editMode: !prev.editMode }));
        $targetItem((prev) => ({
          ...prev,
          id: data.id,
          title: data.title,
          type: "list",
        }));
      }}
    />
  );

  return (
    <PaneSide title={"Topics"} counter={0}>
      <ul className={css.Container_list}>
        {dataTopics.map((topic) => {
          if (topic.parent === selectedItem.collectionId) {
            return (
              <li key={crypto.randomUUID()}>
                <div className={css.Tree}>
                  <TreeHeader data={topic} />
                  {toggleList == topic.id && (
                    <ul className={css.Tree_list}>
                      <CardElement
                        icon={<IconifyFolderOutline />}
                        text="All"
                        styled={`TreeItem_51Se6 ${selectedItem.listId === topic.id && "--active"}`}
                        handleClick={() => selectListAndUpdateState(topic, topic, "topic")}
                      />
                      {dataLists.map((list) => {
                        if (topic.id === list.parent) return <TreeItem key={list.id} parent={topic} data={list} type={"list"} />;
                      })}
                    </ul>
                  )}
                </div>
              </li>
            );
          }
        })}
      </ul>
    </PaneSide>
  );
};

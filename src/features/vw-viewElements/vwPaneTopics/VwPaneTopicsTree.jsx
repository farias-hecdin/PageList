import css from "./paneTopics.module.css";
import { CardElement } from "../card/cardElement";
import { DataContext, StateContext } from "../../../context/index";
import { currentNumberElements } from "../../../utils/common";
import { useContext } from "react";

export const PaneTopicsTree = ({ pTopic, pToggleList }) => {
  const { $openSection, $targetItem, selectedItem } = useContext(StateContext);
  const { dataList, dataBookmark } = useContext(DataContext);

  /**
   * Actualizar el estado de acuerdo a la lista selecionada
   * @param {Array|string} list
   */
  const selectListAndUpdateState = (topic, list, type) => {
    // Actualizar el estado
    $selectedItem((prev) => ({
      ...prev,
      topic: { id: topic.id, name: topic.title },
      list: { id: list.id, name: list.title },
      type: type,
    }));
  };

  return (
    <div className={css.Tree}>
      <TreeHeader
        pFunc={{ $openSection, $targetItem }}
        pSelectedItem={selectedItem}
        pToggleList={pToggleList.$toggleList}
        pTopic={pTopic}
      />
      {pToggleList.toggleList === pTopic.id && (
        <ul className={css.Tree_list}>
          <CardElement
            icon={<IconifyFolderOutline />}
            text="All"
            styled={`TreeItem_51Se6 ${selectedItem.list.id === pTopic.id && "--active"}`}
          />
          {dataList.map(
            (list) =>
              pTopic.id === list.parent && (
                <TreeItems
                  key={list.id}
                  pData={dataBookmark}
                  pFunc={{ $openSection, $targetItem }}
                  pList={list}
                  pSelectedItem={selectedItem}
                />
              )
          )}
        </ul>
      )}
    </div>
  );
};

const TreeHeader = ({ pSelectedItem, pToggleList, pTopic, pFunc }) => {
  return (
    <CardElement
      text={pTopic.title}
      styled={pSelectedItem.collection.id === "" && "--active"}
      handleClick={() => pToggleList((prev) => (prev === pTopic.id ? "" : pTopic.id))}
      handleClick2={() => {
        pFunc.$openSection((prev) => ({ ...prev, editElem: !prev.editElem }));
        pFunc.$targetItem((prev) => ({ ...prev, id: pTopic.id, title: pTopic.title, type: "topic" }));
      }}
    />
  );
};

const TreeItems = ({ pData, pFunc, pList, pSelectedItem }) => {
  return (
    <CardElement
      counter={currentNumberElements(pList.id, pData)}
      icon={<IconifyFolderOutline />}
      text={pList.title}
      styled={`TreeItem_51Se6 ${pSelectedItem.list.id === "0" && "--active"}`}
      handleClick2={() => {
        pFunc.$openSection((prev) => ({ ...prev, editElem: !prev.editElem }));
        pFunc.$targetItem((prev) => ({ ...prev, id: pList.id, title: pList.title, type: "list" }));
      }}
    />
  );
};

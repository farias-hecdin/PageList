import css from "./paneTopics.module.css";
import { CardElement } from "../card/cardElement";
import { DataContext, StateContext } from "../../../context/index";
import { PaneSide } from "./paneSide";
import { currentNumberElements } from "../../../utils/common";
import { useContext } from "react";

export const PaneTopics = () => {
  const { dataLists, dataTopics, dataBookmarks } = useContext(DataContext);
  const { $counterItem, counterItem, $selectedItem, selectedItem } = useContext(StateContext);

  /** Mostrar una lista */
  const [toggleList, $toggleList] = useState();

  /**
   * Actualizar el estado de acuerdo a la lista selecionada
   * @param {Array|string} pList
   */
  const selectListAndUpdateState = (topic, list, type) => {
    // Actualizar el estado
    $selectedItem((prev) => ({
      ...prev,
      topicId: topic?.id || "0",
      topicName: topic?.title || "None",
      listId: list?.id || "0",
      listName: list?.title || "None",
      type: type,
    }));
  };

  // Actualizar el contador de `bookmarks`
  useEffect(() => {
    if (selectedItem.type === "list") {
      const number = currentNumberElements(selectedItem.listId, dataBookmarks);
      $counterItem((prev) => ({ ...prev, bookmarks: number }));
    } else {
      const number = dataLists.reduce((count, list) => {
        return (
          count +
          dataBookmarks.reduce((innerCount, bookmark) => {
            return innerCount + (bookmark.parent === list.id ? 1 : 0);
          }, 0)
        );
      }, 0);
      $counterItem((prev) => ({ ...prev, bookmarks: number }));
    }
  }, [dataBookmarks, selectedItem]);

  return (
    <PaneSide title={selectedItem.collectionName} counter={counterItem.topics}>
      <ul className={css.Container_list}>
        <li>
          <CardElement text="All bookmarks" />
        </li>
        {dataTopics.map(
          (topic) =>
            topic.parent === selectedItem.collectionId && (
              <li key={topic.id}>
                <div className={css.Tree}>
                  <TreeHeader data={topic} setFunc={$toggleList} />
                  {toggleList === topic.id && (
                    <ul className={css.Tree_list}>
                      <CardElement
                        icon={<IconifyFolderOutline />}
                        text="All"
                        styled={`TreeItem_51Se6 ${selectedItem.listId === topic.id && "--active"}`}
                        handleClick={() => selectListAndUpdateState(topic, topic, "topic")}
                      />
                      {dataLists.map(
                        (list) =>
                          topic.id === list.parent && (
                            <TreeItem
                              key={list.id}
                              parent={topic}
                              data={list}
                              type={"list"}
                              func={selectListAndUpdateState}
                            />
                          )
                      )}
                    </ul>
                  )}
                </div>
              </li>
            )
        )}
      </ul>
    </PaneSide>
  );
};

const TreeHeader = ({ data, setFunc }) => {
  const { $openSection, $targetItem, selectedItem } = useContext(StateContext);

  return (
    <CardElement
      text={data.title}
      styled={selectedItem.collecId === "0" && "--active"}
      handleClick={() => setFunc((prev) => (prev === data.id ? "" : data.id))}
      handleClick2={() => {
        $openSection((prev) => ({ ...prev, editElem: !prev.editElem }));
        $targetItem((prev) => ({ ...prev, id: data.id, title: data.title, type: "topic" }));
      }}
    />
  );
};

const TreeItem = ({ parent, data, type, func }) => {
  const { dataBookmarks } = useContext(DataContext);
  const { $openSection, $targetItem, selectedItem } = useContext(StateContext);

  useEffect(() => {
    console.log(data.id);
  }, [selectedItem]);

  return (
    <CardElement
      counter={currentNumberElements(data.id, dataBookmarks)}
      icon={<IconifyFolderOutline />}
      text={data.title}
      styled={`TreeItem_51Se6 ${selectedItem.listId === "0" && "--active"}`}
      handleClick={() => func(parent, data, type)}
      handleClick2={() => {
        $openSection((prev) => ({ ...prev, editElem: !prev.editElem }));
        $targetItem((prev) => ({
          ...prev,
          id: data.id,
          title: data.title,
          type: "list",
        }));
      }}
    />
  );
};

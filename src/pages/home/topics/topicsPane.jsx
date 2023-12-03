import css from "./topicsPane.module.css";
import { ButtonBase } from "../../../components/index.jsx";
import { DataContext, StateContext } from "../../../context/index";
import { useContext, useEffect } from "react";
import { currentNumberElements } from "../../../utils/common";
import { Fragment } from "react";

export const TopicsPane = () => {
  const { dataLists, dataTopics, dataBookmarks, setSelectedItem, selectedItem, setTargetItem } =
    useContext(DataContext);
  const { counterItem, setCounterItem, setShowModal } = useContext(StateContext);

  /**
   * Actualizar el estado de acuerdo a la lista selecionada
   * @param {Array|string} pData
   */
  const selectListAndUpdateState = (pData) => {
    let id = pData?.id || "0";
    let title = pData?.title || "None";
    // Actualizar el estado
    setSelectedItem((prevState) => ({
      ...prevState,
      listId: id,
      listTitle: title,
    }));
  };

  // Actualizar el contador de `bookmarks`
  useEffect(() => {
    currentNumberElements(selectedItem.listId, dataBookmarks, "bookmarks", setCounterItem);
  }, [dataBookmarks, selectedItem]);

  // Components ---------------------------------------------------------------

  const TreeHeader = ({ data }) => (
    <div className={css.Tree_header}>
      <p className={css.Tree_title}>{data.title}</p>
      <ButtonBase
        icon={<IconifyMoreVert />}
        styled="--ghost TopicsPane_WQkiS"
        handleClick={() => {
          setShowModal((prev) => ({ ...prev, editMode: !prev.editMode }));
          setTargetItem((prev) => ({
            ...prev,
            id: data.id,
            title: data.title,
            type: "topic",
          }));
        }}
      />
    </div>
  );

  const TreeList = ({ data }) => (
    <li className={css.Tree_item} onClick={() => selectListAndUpdateState(data)}>
      <IconifyFolderOutline />
      <p className={css.Tree_text}>{data.title}</p>
      <ButtonBase
        icon={<IconifyMoreVert />}
        styled="--ghost TopicsPane_WQkiS"
        handleClick={() => {
          setShowModal((prev) => ({ ...prev, editMode: !prev.editMode }));
          setTargetItem((prev) => ({
            ...prev,
            id: data.id,
            title: data.title,
            type: "list",
          }));
        }}
      />
    </li>
  );

  return (
    <>
      <section className={css.Container}>
        <header className={css.Header}>
          <div className={css.Header_box}>
            <h2 className={css.Header_title}>{selectedItem.collectionTitle}</h2>
            <ButtonBase icon={<IconifyFilterList />} />
          </div>
          <p className={css.Header_text}>{counterItem.topics} Lists</p>
        </header>
        <ul className={css.List}>
          {dataTopics.map((topic) => {
            if (topic.parent === selectedItem.collectionId) {
              return (
                <li key={crypto.randomUUID()}>
                  <div className={css.Tree}>
                    <TreeHeader data={topic} />
                    <ul className={css.Tree_list}>
                      {dataLists.map((list) => {
                        if (topic.id === list.parent) {
                          return (
                            <Fragment key={crypto.randomUUID()}>
                              <TreeList data={list} />
                            </Fragment>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </section>
    </>
  );
};

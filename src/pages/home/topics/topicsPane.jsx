import css from "./topicsPane.module.css";
import { ButtonBase } from "../../../components/index.jsx";
import { DataContext, StateContext } from "../../../context/index";
import { useContext, useEffect, useState } from "react";
import { currentNumberElements } from "../../../utils/common";
import { Fragment } from "react";

export const TopicsPane = () => {
  const { dataLists, dataTopics, dataBookmarks, setSelectedItem, selectedItem, setTargetItem } =
    useContext(DataContext);
  const { counterItem, setCounterItem, setShowModal } = useContext(StateContext);

  /** Mostrar una lista */
  const [toggleList, setToggleList] = useState()

  /**
   * Actualizar el estado de acuerdo a la lista selecionada
   * @param {Array|string} pData
   */
  const selectListAndUpdateState = (pData, pType) => {
    let id = pData?.id || "0";
    let title = pData?.title || "None";
    let type = pType;
    // Actualizar el estado
    setSelectedItem((prevState) => ({
      ...prevState,
      listId: id,
      listTitle: title,
      type: type,
    }));
  };

  // Actualizar el contador de `bookmarks`
  useEffect(() => {
    if (selectedItem.type === 'list') {
      currentNumberElements(selectedItem.listId, dataBookmarks, "bookmarks", setCounterItem);
    }
    else {
      let data = dataLists.filter(list => list.parent === selectedItem.listId)
      let data2 = data.flatMap(list => dataBookmarks.filter(bookmark => bookmark.parent === list.id))
      let num = data2.length
      setCounterItem(prev => ({...prev, bookmarks: num}))
    }
  }, [dataBookmarks, selectedItem]);


  // Components ---------------------------------------------------------------

  const TreeHeader = ({ data }) => (
    <div className={css.Tree_header} onClick={() => setToggleList(prev => prev === data.id ? "" : data.id)}>
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

  const TreeList = ({ data, type }) => (
    <li className={css.Tree_item} onClick={() => selectListAndUpdateState(data, type)}>
      <div className={`${css.Tree_subheader} ${selectedItem.listId === data.id && "--active"}`}>
        <div>
          <IconifyFolderOutline />
        </div>
        <p className={css.Tree_text}>{data.title}</p>
      </div>
      <ButtonBase
        icon={<IconifyMoreVert />}
        styled={`--ghost TopicsPane_WQkiS`}
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
            <p className={css.Header_text}>
              {counterItem.topics} {counterItem.topics > 1 ? "topics" : "topic"}
            </p>
          </div>
          <ButtonBase icon={<IconifyFilterList />} />
        </header>
        <ul className={css.Container_list}>
          {dataTopics.map((topic) => {
            if (topic.parent === selectedItem.collectionId) {
              return (
                <li key={crypto.randomUUID()}>
                  <div className={css.Tree}>
                    <TreeHeader data={topic} />
                    { toggleList == topic.id &&
                    <ul className={css.Tree_list}>
                      <li className={css.Tree_item} onClick={() => selectListAndUpdateState(topic, "topic")}>
                        <div className={`${css.Tree_subheader} ${selectedItem.listId === topic.id && "--active"}`}>
                          <div>
                            <IconifyFolderOutline />
                          </div>
                          <p className={css.Tree_text}>All</p>
                        </div>
                      </li>
                      {dataLists.map((list) => {
                        if (topic.id === list.parent) {
                          return (
                            <Fragment key={list.id}>
                              <TreeList data={list} type={"list"} />
                            </Fragment>
                          );
                        }
                      })}
                    </ul>
                  }
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

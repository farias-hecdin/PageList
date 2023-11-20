import css from "./topicsPane.module.css";
import { ButtonBase } from "../../../components/index.jsx";
import { DataContext, StateContext } from "../../../context/index";
import { useContext, useEffect } from "react";
import { compareAndCountIds } from "../../../utils/common";

export const TopicsPane = () => {
  const {
    dataLists,
    dataTopics,
    dataBookmarks,
    setSelectedItem,
    selectedItem,
    setTargetItem,
  } = useContext(DataContext);
  const { counterTopics, setCounterLists, openModalEditMode, setOpenModalEditMode } = useContext(StateContext);

  /**
   * Actualizar el estado de acuerdo a la lista selecionada
   * @param {Array|string} pData
   */
  const selectListAndUpdateState = (pData) => {
    let id = pData?.id || "0";
    let title = pData?.title || "None";

    setSelectedItem((prevState) => ({
      ...prevState,
      listId: id,
      listTitle: title,
    }));
  };

  /**
   * Obtener el conteo de `bookmarks` y actualiza el estado
   * @param {Array} pData - Datos de origen del elemento
   */
  const currentNumberElements = (pData) => {
    let elementNumbers = pData ? compareAndCountIds(dataBookmarks, pData.listId) : 0;
    setCounterLists(elementNumbers);
  };
  // Actualizar el contador de `topics`
  useEffect(() => {
    currentNumberElements(selectedItem);
  }, [dataBookmarks, selectedItem]);

  return (
    <>
      <section className={css.Container}>
        <header className={css.Header}>
          <div>
            <h2 className={css.Header_title}>{selectedItem.collectionTitle}</h2>
            <p className={css.Header_text}>{counterTopics} Lists</p>
          </div>
          <ButtonBase icon={<IconifyFilterList />} />
        </header>
        <ul className={css.List}>
          {dataTopics.map((/** @type {object} */ topic) => {
            if (topic.parent === selectedItem.collectionId) {
              return (
                <li key={crypto.randomUUID()}>
                  <div className={css.Tree}>
                    <div className={css.Tree_header}>
                      <p className={css.Tree_title}>{topic.title}</p>
                      <ButtonBase
                        icon={<IconifyMoreVert/>}
                        styled="--ghost TopicsPane_WQkiS"
                        handleClick={() => {
                          setOpenModalEditMode(!openModalEditMode);
                          setTargetItem((prev) => ({
                            ...prev,
                            id: topic.id,
                            title: topic.title,
                            type: "topic",
                          }));
                        }}
                      />
                    </div>
                    <ul className={css.Tree_list}>
                      {dataLists.map((/** @type {object} */ list) => {
                        if (topic.id === list.parent) {
                          return (
                            <li
                              key={crypto.randomUUID()}
                              className={css.Tree_item}
                              onClick={() => selectListAndUpdateState(list)}
                            >
                              <IconifyBookmarksOutline/>
                              <p className={css.Tree_text}>{list.title}</p>
                              <ButtonBase
                                icon={<IconifyMoreVert/>}
                                styled="--ghost TopicsPane_WQkiS"
                                handleClick={() => {
                                  setOpenModalEditMode(!openModalEditMode);
                                  setTargetItem((prev) => ({
                                    ...prev,
                                    id: list.id,
                                    title: list.title,
                                    type: "list",
                                  }));
                                }}
                              />
                            </li>
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

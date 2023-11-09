import css from "./topicsPane.module.css";
import { ButtonBase } from "../../../components/index.jsx";
import { DataContext, StateContext } from "../../../context/index";
import { useContext, useEffect } from "react";
import { compareAndCountIds } from "../../../utils/common";

// Nodo previo: ../../home/homePage.jsx

export const TopicsPane = () => {
  const {
    setDataLists,
    dataLists,
    setDataTopics,
    dataTopics,
    dataBookmarks,
    setSelectedCollection,
    selectedCollection,
    setDeleteItem,
  } = useContext(DataContext);
  const { counterTopics, setCounterLists, openModalEditMode, setOpenModalEditMode } = useContext(StateContext);

  /**
   * Actualizar el estado de acuerdo a la lista selecionada.
   * @param {object} data_
   */
  const selectListAndUpdateState = (data_) => {
    let id = data_?.id || "0";
    let name = data_?.name || "None";

    setSelectedCollection((prevState) => ({
      ...prevState,
      listId: id,
      listName: name,
    }));
  };

  /**
   * Obtener el conteo de `bookmarks` y actualiza el estado
   * @param {Array} data_ ¿Origen del elemento?
   */
  const currentNumberElements = (data_) => {
    let elementNumbers = data_ ? compareAndCountIds(dataBookmarks, data_.listId) : 0;
    console.log(selectedCollection);
    setCounterLists(elementNumbers);
  };
  // Actualizar el contador de `topics`
  useEffect(() => {
    currentNumberElements(selectedCollection);
  }, [dataBookmarks, selectedCollection]);

  return (
    <>
      <section className={css.Container}>
        <header className={css.Header}>
          <div>
            <h2 className={css.Header_title}>{selectedCollection.collectionName}</h2>
            <p className={css.Header_text}>{counterTopics} Lists</p>
          </div>
          <ButtonBase icon="filter-list" />
        </header>
        <div className={css.List}>
          <ul className={css.List_items}>
            {dataTopics.map((/** @type {object} */ topic) => {
              if (topic.originId === selectedCollection.collectionId) {
                return (
                  <li key={crypto.randomUUID()}>
                    <div className={css.Tree}>
                      <div className={css.Tree_header}>
                        <p className={css.Tree_title}>{topic.name}</p>
                        <ButtonBase
                          icon="more-vert"
                          styled="--ghost TopicsPane_WQkiS"
                          handleClick={() => {
                            setOpenModalEditMode(!openModalEditMode);
                            setDeleteItem({
                              id: topic.id,
                              name: topic.name,
                              state: dataTopics,
                              set: setDataTopics,
                            });
                          }}
                        />
                      </div>
                      <ul className={css.Tree_list}>
                        {dataLists.map((/** @type {object} */ list) => {
                          if (topic.id === list.originId) {
                            return (
                              <li
                                key={crypto.randomUUID()}
                                className={css.Tree_item}
                                onClick={() => selectListAndUpdateState(list)}
                              >
                                <iconify-icon icon={`material-symbols:bookmarks-outline`}></iconify-icon>
                                <p className={css.Tree_text}>{list.name}</p>
                                <ButtonBase
                                  icon="more-vert"
                                  styled="--ghost TopicsPane_WQkiS"
                                  handleClick={() => {
                                    setOpenModalEditMode(!openModalEditMode);
                                    setDeleteItem({
                                      id: list.id,
                                      name: list.name,
                                      state: dataLists,
                                      set: setDataLists,
                                    });
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
        </div>
      </section>
    </>
  );
};

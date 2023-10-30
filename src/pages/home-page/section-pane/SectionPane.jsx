import css from "./SectionPane.module.css";
import { ButtonBase } from "../../../components/Index.jsx";
import { DataContext } from "../../../context/Index";
import { useContext, useState } from "react";

export const SectionPane = () => {
  // Importar datos -----------------------------------------------------------
  const { drawerTopics, drawerLists, selectedCollectionX } = useContext(DataContext);
  const [generateList, setGenerateList] = useState([]);

  /** Al hacer clic a un tema, compara el `parent.id` con el `child.originId` y
  retona los item que coinciden.
  * @param {string} _parentId
  * @param {Array.<Object.<string, ?>>} _child
  */
  const getTheListOfTopic = (_child, _parentId) => {
    let listElements = [];
    for (const elem of _child) {
      if (elem.originId === _parentId) {
        listElements.push(elem);
      }
    }
    return listElements;
  };

  /** Desplegar la lista de un tema */
  const displayTheListOfTopic = (_event) => {
    let $node = _event.currentTarget;
    if (!$node.classList.contains("--expand")) {
      $node.classList.remove("--expand");
    } else {
      $node.classList.add("--expand");
    }
  };

  /**
   * @param {Object.<string, ?>} _topics
   * @param {HTMLBodyElementEventMap} _event
   */
  const selectTopic = (_event, _topics) => {
    try {
      // Generar la lista del tema selecionado
      let newListOfElement = getTheListOfTopic(drawerLists.state, _topics.id);
      setGenerateList(newListOfElement);

      displayTheListOfTopic(_event);
    } catch (error) {
      console.warn("SectionPane > selectTopic:" + error.message);
    }
  };

  return (
    <section className={css.Container}>
      <header className={css.Header}>
        <div>
          <h2 className={css.Header_title}>{selectedCollectionX.state.name}</h2>
          <p className={css.Header_text}>{selectedCollectionX.state.number} Lists</p>
        </div>
        <ButtonBase pIcon="edit" />
      </header>
      <div className={css.List}>
        <ul className={css.List_items}>
          {drawerTopics.state.map((/** @type {Object.<string, ?>} */ itemTopic) => {
            if (itemTopic.originId === selectedCollectionX.state.id) {
              return (
                <li key={crypto.randomUUID()}>
                  <div className={css.Tree}>
                    <div className={css.Tree_header} onClick={(e) => selectTopic(e, itemTopic)}>
                      <p className={css.Tree_title}>{itemTopic.name}</p>
                    </div>
                    <ul className={css.Tree_list}>
                      {drawerLists.state.map((/** @type {Object.<string, ?>} */ itemList) => {
                        if (itemTopic.id === itemList.originId) {
                          return (
                            <li key={crypto.randomUUID()} className={css.Tree_item}>
                              <div>
                                <span className={css.Tree_itemIcon}>
                                  <iconify-icon icon={`material-symbols:folder-outline`}></iconify-icon>
                                </span>
                                <p className={css.Tree_itemText}>{itemList.name}</p>
                              </div>
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
  );
};

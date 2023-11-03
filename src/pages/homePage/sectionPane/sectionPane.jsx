import css from "./sectionPane.module.css";
import { ButtonBase } from "../../../components/index.jsx";
import { DataContext } from "../../../context/index";
import { useContext, useState } from "react";
import { deleteThisElement } from "../../../utils/common";
import { HomePageModalEditMode } from "../homePage-modal-editMode";
import { Fragment } from "react";

export const SectionPane = () => {
  // Importar datos -----------------------------------------------------------
  const { drawerTopics, drawerLists, selectedCollectionX, selectedList } = useContext(DataContext);
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

  /** @param _elementSelected {Object.<string, ?>} */
  const selectAnList = (_elementSelected) => {
    selectedList.set({
      id: _elementSelected.id,
      name: _elementSelected.name,
      number: 0,
    });
  };

  // Activar el modo edicion
  const [editMode, setEditMode] = useState(true);
  const enabledEditMode = () => setEditMode(!editMode);

  const [onModal, setOnModal] = useState(false);
  const [elementData, setElementData] = useState();
  const enterOnEditMode = (_data) => {
    setOnModal(!onModal);
    setElementData(_data);
  };

  return (
    <>
      <HomePageModalEditMode pShowModal={onModal} pDataElement={elementData} />
      <section className={css.Container}>
        <header className={css.Header}>
          <div>
            <h2 className={css.Header_title}>{selectedCollectionX.state.name}</h2>
            <p className={css.Header_text}>{selectedCollectionX.state.number} Lists</p>
          </div>
          <ButtonBase pIcon="edit" pHandleClick={enabledEditMode} />
        </header>
        <div className={css.List}>
          <ul className={css.List_items}>
            {drawerTopics.state.map((/** @type {Object.<string, ?>} */ _topic) => {
              if (_topic.originId === selectedCollectionX.state.id) {
                return (
                  <Fragment key={crypto.randomUUID()}>
                    <li>
                      <div className={css.Tree}>
                        <div className={css.Tree_header} onClick={(e) => selectTopic(e, _topic)}>
                          <p className={css.Tree_title}>{_topic.name}</p>
                          <ButtonBase
                            pIcon="more-vert"
                            pStyled="--ghost SectionPane_WQkiS"
                            pHandleClick={() => enterOnEditMode(_topic.name)}
                          />
                        </div>
                        <ul className={css.Tree_list}>
                          {drawerLists.state.map((/** @type {Object.<string, ?>} */ _list) => {
                            if (_topic.id === _list.originId) {
                              return (
                                <Fragment key={crypto.randomUUID()}>
                                  <li className={css.Tree_item} onClick={() => selectAnList(_list)}>
                                    <div>
                                      <span className={css.Tree_icon}>
                                        <iconify-icon icon={`material-symbols:folder-outline`}></iconify-icon>
                                      </span>
                                      <p className={css.Tree_text}>{_list.name}</p>
                                      <ButtonBase
                                        pIcon="more-vert"
                                        pStyled="--ghost SectionPane_WQkiS"
                                        pHandleClick={() => enterOnEditMode(_list.name)}
                                      />
                                    </div>
                                  </li>
                                </Fragment>
                              );
                            }
                          })}
                        </ul>
                      </div>
                    </li>
                  </Fragment>
                );
              }
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

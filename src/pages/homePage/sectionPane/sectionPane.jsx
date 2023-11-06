import css from "./sectionPane.module.css";
import { ButtonBase } from "../../../components/index.jsx";
import { DataContext } from "../../../context/index";
import { useContext, useState } from "react";
import { HomePageModalEditMode } from "../homePage-modal-editMode";
import { Fragment } from "react";
import { deleteThisElement } from "../../../utils/common";

export const SectionPane = () => {
  // Importar datos -----------------------------------------------------------

  const {
    dataTopics,
    setDataTopics,
    dataLists,
    setDataLists,
    selectedCollection,
    setSelectedCollection,
    selectedList,
    setSelectedList,
  } = useContext(DataContext);

  /**
   * Al hacer clic a un tema, compara el `parent.id` con el `child.originId` y
   * retona los item que coinciden.
   * @param {Array} _child
   * @param {string} _parentId
   * @returns {Array}
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

  /**
   * Desplegar la lista de un tema
   * @param {HTMLButtonElement} _event
   * @deprecated (FIX:)
   */
  const displayTheListOfTopic = (_event) => {
    let $node = _event.currentTarget;
    if (!$node.classList.contains("--expand")) {
      $node.classList.remove("--expand");
    } else {
      $node.classList.add("--expand");
    }
  };

  /**
   * @param {object} _elementSelected
   */
  const selectAnList = (_elementSelected) => {
    setSelectedList({
      id: _elementSelected.id,
      name: _elementSelected.name,
      number: 0,
    });
  };

  // Activar el modo edicion
  const [editMode, setEditMode] = useState(true);
  const enabledEditMode = () => setEditMode(!editMode);

  const [onModal, setOnModal] = useState(false);
  const [elementData, setElementData] = useState({ name: "", id: "", type: "" });

  /**
   * @param {object} _data ¿Datos del elemento?
   * @param {string} _type ¿Tipo de elemento (collection, topic, ...)?
   */
  const enterOnEditMode = (_data, _type) => {
    setOnModal(!onModal);
    setElementData({
      name: _data.name,
      id: _data.id,
      type: _type,
    });
  };

  return (
    <>
      <HomePageModalEditMode
        pShowModal={onModal}
        pDataElement={elementData}
        pDataSource={elementData.type === "topic" ? [dataTopics, setDataTopics] : [dataLists, setDataLists]}
      />
      <section className={css.Container}>
        <header className={css.Header}>
          <div>
            <h2 className={css.Header_title}>{selectedCollection.name}</h2>
            <p className={css.Header_text}>{selectedCollection.number} Lists</p>
          </div>
          <ButtonBase pIcon="filter-list"/>
        </header>
        <div className={css.List}>
          <ul className={css.List_items}>
            {Array.isArray(dataTopics)
              ? dataTopics.map((/** @type {object} */ _topic) => {
                  if (_topic.originId === selectedCollection.id) {
                    return (
                      <Fragment key={crypto.randomUUID()}>
                        <li>
                          <div className={css.Tree}>
                            <div className={css.Tree_header}>
                              <p className={css.Tree_title}>{_topic.name}</p>
                              <ButtonBase
                                pIcon="more-vert"
                                pStyled="--ghost SectionPane_WQkiS"
                                pHandleClick={() => enterOnEditMode(_topic, "topic")}
                              />
                            </div>
                            <ul className={css.Tree_list}>
                              {Array.isArray(dataLists)
                                ? dataLists.map((/** @type {object} */ _list) => {
                                    if (_topic.id === _list.originId) {
                                      return (
                                        <Fragment key={crypto.randomUUID()}>
                                          <li className={css.Tree_item} onClick={() => selectAnList(_list)}>
                                            <span className={css.Tree_icon}>
                                              <iconify-icon icon={`material-symbols:folder-outline`}></iconify-icon>
                                            </span>
                                            <p className={css.Tree_text}>{_list.name}</p>
                                            <ButtonBase
                                              pIcon="more-vert"
                                              pStyled="--ghost SectionPane_WQkiS"
                                              pHandleClick={() => enterOnEditMode(_list, "list")}
                                            />
                                          </li>
                                        </Fragment>
                                      );
                                    }
                                  })
                                : console.warn("SectionPane > rendering list (dataLists)")}
                            </ul>
                          </div>
                        </li>
                      </Fragment>
                    );
                  }
                })
              : console.warn("SectionPane > rendering list (dataTopics)")}
          </ul>
        </div>
      </section>
    </>
  );
};

import css from "./homePage-modal-addBookmarks.module.css";
import { ButtonBase, ModalBase, WrapBase } from "../../components/index";
import { DataContext } from "../../context/index";
import { useContext } from "react";
import { sortByName } from "../../utils/common";

/**
 * @param {object} prop
 * @param {boolean} prop.pShowModal
 * @returns {HTMLElement}
 */
export const HomePageModalAddBookmarks = ({ pShowModal }) => {
  const { dataCollections, setDataCollections, dataTopics, setDataTopics, dataLists, setDataLists, setDataLinks } =
    useContext(DataContext);

  // Ordenar datos por nombre
  const sortCollections = sortByName(dataCollections);
  const sortTopics = sortByName(dataTopics);
  const sortLists = sortByName(dataLists);

  /**
   * Extrae el valor de un conjunto `<input>` y `<select>` y retorna un objeto
   * @param {string} _inputId
   * @param {string} _selectId
   * @returns {object}
   */
  const extractInputValues = (_inputId, _selectId) => {
    let $nodeInput = document.getElementById(_inputId);
    let $nodeSelect = document.getElementById(_selectId);
    let selectValue = $nodeSelect?.options[$nodeSelect.selectedIndex].value;
    let inputValue = $nodeInput.value === "" ? "_EMPTY_" : $nodeInput.value;
    $nodeInput.value = "";

    return {
      inputValue: inputValue,
      selectValue: selectValue,
    };
  };

  // Añadir nuevos datos ------------------------------------------------------

  const addNewCollection = () => {
    let data = extractInputValues("input_T22VL1iGPC", null);
    let template = {
      id: crypto.randomUUID(),
      name: data.inputValue,
      topics: [],
    };
    setDataCollections((prev) => [template, ...prev]);
    alert("New collection added");
  };

  const addNewTopic = () => {
    let data = extractInputValues("input_a22VL1iGPC", "select_LCAaUzHQdk");
    let template = {
      originId: data.selectValue,
      id: crypto.randomUUID(),
      name: data.inputValue,
      lists: [],
    };
    setDataTopics((prev) => [template, ...prev]);
    alert("New topic added");
  };

  const addNewList = () => {
    let data = extractInputValues("input_ooIRWuISR8", "select_ZTa2FX2bIM");
    let template = {
      originId: data.selectValue,
      id: crypto.randomUUID(),
      name: data.inputValue,
      links: [],
    };
    setDataLists((prev) => [template, ...prev]);
    alert("New list added");
  };

  const addNewLinks = () => {
    let data = extractInputValues("input_ooIRWuISR1", "select_9Ta2F92bIM");
    let template = {
      originId: data.selectValue,
      id: crypto.randomUUID(),
      title: data.inputValue,
      url: data.selectValue,
    };
    setDataLinks((prev) => [template, ...prev]);
    alert("New link added");
  };

  return (
    <ModalBase pIsOpen={pShowModal} pId="modal_AZiStXOUbn">
      <header className={css.Container_header}>
        <p className={css.Container_title}>Add</p>
        <p className={css.Container_text}>Wide your list of bookmarks</p>
      </header>
      <div className={css.Container_box}>
        <div className={css.Form}>
          <p className={css.Form_title}>New collection:</p>
          <WrapBase pStyled="HomePageModalAddBookmarks_AW5eY">
            <input
              className={css.Form_input}
              type="text"
              placeholder="Add collection..."
              id="input_T22VL1iGPC"
              maxLength={23}
            />
          </WrapBase>
          <ButtonBase
            pStyled="HomePageModalAddBookmarks_JqagP"
            pText="Add collection"
            pHandleClick={() => addNewCollection()}
          />
        </div>
        <div className={css.Form}>
          <p className={css.Form_title}>New topic:</p>
          <WrapBase pStyled="HomePageModalAddBookmarks_AW5eY">
            <input
              className={css.Form_input}
              type="text"
              placeholder="Add topic..."
              id="input_a22VL1iGPC"
              maxLength={23}
            />
            <span>for</span>
            <div className={css.Select}>
              <select name="choiceTopics" id="select_LCAaUzHQdk" className={css.Select_input}>
                {sortCollections.map((itemCollection) => (
                  <option key={crypto.randomUUID()} value={itemCollection.id}>
                    {itemCollection.name}
                  </option>
                ))}
              </select>
            </div>
          </WrapBase>
          <ButtonBase
            pStyled="HomePageModalAddBookmarks_JqagP"
            pText="Add topic"
            pHandleClick={(e) => addNewTopic(e)}
          />
        </div>
        <div className={css.Form}>
          <p className={css.Form_title}>New list:</p>
          <WrapBase pStyled="HomePageModalAddBookmarks_AW5eY">
            <input
              className={css.Form_input}
              type="text"
              placeholder="Add list..."
              id="input_ooIRWuISR8"
              maxLength={23}
            />
            <span>for</span>
            <div className={css.Select}>
              <select name="choiceTopics" id="select_ZTa2FX2bIM" className={css.Select_input}>
                {sortTopics.map((itemTopics) => (
                  <option key={crypto.randomUUID()} value={itemTopics.id}>
                    {itemTopics.name}
                  </option>
                ))}
              </select>
            </div>
          </WrapBase>
          <ButtonBase pStyled="HomePageModalAddBookmarks_JqagP" pText="Add list" pHandleClick={(e) => addNewList(e)} />
        </div>
        <div className={css.Form}>
          <p className={css.Form_title}>New links:</p>
          <WrapBase pStyled="HomePageModalAddBookmarks_AW5eY">
            <input
              className={css.Form_input}
              type="text"
              placeholder="Add list..."
              id="input_ooIRWuISR1"
              maxLength={23}
            />
            <span>for</span>
            <div className={css.Select}>
              <select name="choiceTopics" id="select_9Ta2F92bIM" className={css.Select_input}>
                {sortLists.map((item) => (
                  <option key={crypto.randomUUID()} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </WrapBase>
          <ButtonBase pStyled="HomePageModalAddBookmarks_JqagP" pText="Add list" pHandleClick={(e) => addNewLinks(e)} />
        </div>
      </div>
    </ModalBase>
  );
};

import css from "./modalAddBookmarks.module.css";
import { ButtonBase, ButtonSelect, DetailsBase, ModalBase } from "../../../components/index";
import { DataContext } from "../../../context/index";
import { useContext } from "react";
import { sortByName } from "../../../utils/common";
import { extractInputAndSelectValue } from "./modalAddBookmarks.script";

/**
 * @param {object} prop
 * @param {boolean} prop.isOpen
 * @param {Function} prop.handleClick
 * @returns {HTMLElement}
 */
export const ModalAddBookmarks = ({ isOpen, handleClick }) => {
  const { dataCollections, setDataCollections, dataTopics, setDataTopics, dataLists, setDataLists, setDataBookmarks } =
    useContext(DataContext);

  // Ordenar datos por nombre
  const sortCollections = sortByName(dataCollections);
  const sortTopics = sortByName(dataTopics);
  const sortLists = sortByName(dataLists);

  // Añadir nuevos datos ------------------------------------------------------

  const addNewCollection = () => {
    let data = extractInputAndSelectValue("#input_T22VL1iGPC", null);
    let template = {
      id: crypto.randomUUID(),
      title: data.inputValue,
      topics: [],
    };
    setDataCollections((prev) => [template, ...prev]);
    alert("New collection added");
  };

  const addNewTopic = () => {
    let data = extractInputAndSelectValue("#input_a22VL1iGPC", "#select_LCAaUzHQdk");
    let template = {
      origin: data.selectValue,
      id: crypto.randomUUID(),
      title: data.inputValue,
      lists: [],
    };
    setDataTopics((prev) => [template, ...prev]);
    alert("New topic added");
  };

  const addNewList = () => {
    let data = extractInputAndSelectValue("#input_ooIRWuISR8", "#select_ZTa2FX2bIM");
    let template = {
      origin: data.selectValue,
      id: crypto.randomUUID(),
      title: data.inputValue,
      bookmarks: [],
    };
    setDataLists((prev) => [template, ...prev]);
    alert("New list added");
  };

  const addNewBookmarks = () => {
    let data = extractInputAndSelectValue("#input_ooIRWuISR1", "#select_9Ta2F92bIM");
    let $node = document.querySelector("#input_GrLSSVeSuZ");
    let value = $node.value;
    let template = {
      origin: data.selectValue,
      id: crypto.randomUUID(),
      title: data.inputValue,
      url: value,
    };
    setDataBookmarks((prev) => [template, ...prev]);
    alert("New link added");
  };

  return (
    <ModalBase isOpen={isOpen} handleClick={handleClick}>
      <header className={css.Container_header}>
        <p className={css.Container_title}>Add</p>
        <p className={css.Container_text}>Wide your list of bookmarks</p>
      </header>
      <div className={css.Container_box}>
        <DetailsBase title="Add a new collection" icon={<IconifyInventory2Outline/>}>
          <div className={css.Form}>
            <input
              className={css.Form_input}
              type="text"
              placeholder="Add a collection"
              id="input_T22VL1iGPC"
              maxLength={30}
            />
            <ButtonBase styled="ModalAddBookmarks_JqagP" text="Add collection" handleClick={() => addNewCollection()} />
          </div>
        </DetailsBase>
        <DetailsBase title="Add a new topic" icon={<IconifyFolderOpenOutline/>}>
          <div className={css.Form}>
            <input
              className={css.Form_input}
              type="text"
              placeholder="Add a topic"
              id="input_a22VL1iGPC"
              maxLength={30}
            />
            <ButtonSelect id="select_fgh3jwqnkz" styled="ModalAddBookmars_mojxs">
              {sortCollections.map((collection) => (
                <option key={crypto.randomUUID()} value={collection.id}>
                  {collection.title}
                </option>
              ))}
            </ButtonSelect>
            <ButtonBase styled="ModalAddBookmarks_JqagP" text="Add topic" handleClick={() => addNewTopic()} />
          </div>
        </DetailsBase>
        <DetailsBase title="Add a new list" icon={<IconifyBookmarksOutline/>}>
          <div className={css.Form}>
            <input
              className={css.Form_input}
              type="text"
              placeholder="Add a list"
              id="input_ooIRWuISR8"
              maxLength={30}
            />
            <ButtonSelect id="select_ZTa2FX2bIM" styled="ModalAddBookmars_mojxs">
              {sortTopics.map((topic) => (
                <option key={crypto.randomUUID()} value={topic.id}>
                  {topic.title}
                </option>
              ))}
            </ButtonSelect>
            <ButtonBase styled="ModalAddBookmarks_JqagP" text="Add list" handleClick={() => addNewList()} />
          </div>
        </DetailsBase>
        <DetailsBase title="Add a new bookmarks" icon={<IconifyBookmarkOutline/>}>
          <div className={css.Form}>
            <input
              className={css.Form_input}
              type="text"
              placeholder="Add a bookmark"
              id="input_ooIRWuISR1"
              maxLength={30}
            />
            <input className={css.Form_input} type="text" placeholder="Add an URL" id="input_GrLSSVeSuZ" />
            <ButtonSelect id="select_9Ta2F92bIM" styled="ModalAddBookmars_mojxs">
              {sortLists.map((list) => (
                <option key={crypto.randomUUID()} value={list.id}>
                  {list.title}
                </option>
              ))}
            </ButtonSelect>
            <ButtonBase styled="ModalAddBookmarks_JqagP" text="Add list" handleClick={() => addNewBookmarks()} />
          </div>
        </DetailsBase>
      </div>
    </ModalBase>
  );
};

import css from "./modalAddBookmarks.module.css";
import { ButtonBase, ButtonSelect, InputRadio, ModalBase } from "../../../components/index";
import { DataContext, StateContext } from "../../../context/index";
import { useContext, useState } from "react";
import { handleChange, sortByName } from "../../../utils/common";
import { updateStorageAndReturnData } from "./modalAddBookmarks.script";

/**
 * @param {object} prop
 * @param {boolean} prop.isOpen
 * @param {Function} prop.handleClick
 * @returns {HTMLElement}
 */
export const ModalAddBookmarks = ({ isOpen, handleClick }) => {
  const { setShowPopup } = useContext(StateContext);
  const { dataCollections, setDataCollections, dataTopics, setDataTopics, dataLists, setDataLists, setDataBookmarks } =
    useContext(DataContext);

  // Ordenar datos por nombre
  const sortCollections = sortByName(dataCollections);
  const sortTopics = sortByName(dataTopics);
  const sortLists = sortByName(dataLists);

  // useState para el Tabs component
  const [pickTabs, setPickTabs] = useState({ value: "Collection" });

  // useState para los nuevos datos
  const [collectData, setCollectData] = useState({
    collectionTitle: "",
    topicTitle: "",
    listTitle: "",
    bookmarkTitle: "",
    bookmarkUrl: "",
    collection: "",
    topic: "",
    list: "",
  });

  // Resetear los valores de los inputs
  const resetInputValue = () => {
    setCollectData((prev) => ({
      ...prev,
      collectionTitle: "",
      topicTitle: "",
      listTitle: "",
      bookmarkTitle: "",
      bookmarkUrl: "",
    }));
  };

  // Añadir nuevos datos ------------------------------------------------------

  const addNewCollection = (e) => {
    e.preventDefault();
    let data = {
      id: crypto.randomUUID(),
      title: collectData.collectionTitle,
      topics: [],
    };

    setDataCollections((prev) => updateStorageAndReturnData(prev, data, "pagelist_collections"));
    resetInputValue();
    setShowPopup((prev) => ({ ...prev, show: true, message: "Add new collection" }));
  };

  const addNewTopic = (e) => {
    e.preventDefault();
    let data = {
      parent: collectData.collection,
      id: crypto.randomUUID(),
      title: collectData.topicTitle,
      lists: [],
    };

    setDataTopics((prev) => updateStorageAndReturnData(prev, data, "pagelist_topics"));
    resetInputValue();
    setShowPopup((prev) => ({ ...prev, show: true, message: "Add new topic" }));
  };

  const addNewList = (e) => {
    e.preventDefault();
    let data = {
      parent: collectData.topic,
      id: crypto.randomUUID(),
      title: collectData.listTitle,
      bookmarks: [],
    };

    setDataLists((prev) => updateStorageAndReturnData(prev, data, "pagelist_lists"));
    resetInputValue();
    setShowPopup((prev) => ({ ...prev, show: true, message: "Add new list" }));
  };

  const addNewBookmark = (e) => {
    e.preventDefault();
    let data = {
      parent: collectData.list,
      id: crypto.randomUUID(),
      title: collectData.bookmarkTitle,
      url: collectData.bookmarkUrl,
    };

    setDataBookmarks((prev) => updateStorageAndReturnData(prev, data, "pagelist_bookmarks"));
    resetInputValue();
    setShowPopup((prev) => ({ ...prev, show: true, message: "Add new bookmark" }));
  };

  return (
    <ModalBase isOpen={isOpen} handleClick={handleClick}>
      <header className={css.Container_header}>
        <p className={css.Container_title}>Add</p>
        <p className={css.Container_text}>Wide your list of bookmarks</p>
      </header>
      <div className={css.Container_box}>
        <div key={crypto.randomUUID()} className={css.Tabs}>
          <InputRadio
            className={css.Tabs_input}
            id="tab_01"
            group="tabs"
            text="Collection"
            onChange={() => handleChange("value", "Collection", setPickTabs)}
            checked={pickTabs.value === "Collection"}
          />
          <InputRadio
            className={css.Tabs_input}
            id="tab_02"
            group="tabs"
            text={"Topic"}
            onChange={() => handleChange("value", "Topic", setPickTabs)}
            checked={pickTabs.value === "Topic"}
          />
          <InputRadio
            className={css.Tabs_input}
            id="tab_03"
            group="tabs"
            text="List"
            onChange={() => handleChange("value", "List", setPickTabs)}
            checked={pickTabs.value === "List"}
          />
          <InputRadio
            className={css.Tabs_input}
            id="tab_04"
            group="tabs"
            text="Bookmark"
            onChange={() => handleChange("value", "Bookmark", setPickTabs)}
            checked={pickTabs.value === "Bookmark"}
          />
        </div>
        <div className={css.Tabs_content}>
          {pickTabs.value === "Collection" && (
            <div className={css.Form}>
              <form onSubmit={(e) => addNewCollection(e)}>
                <input
                  className={css.Form_input}
                  id="input_T22VL1iGPC"
                  maxLength={50}
                  minLength={2}
                  placeholder="Add a collection"
                  type="text"
                  value={collectData.collectionTitle}
                  onChange={(e) => handleChange("collectionTitle", e.currentTarget.value, setCollectData)}
                  required={true}
                />
                <ButtonBase styled="ModalAddBookmarks_JqagP" text="Add collection" />
              </form>
            </div>
          )}
          {pickTabs.value === "Topic" && (
            <div className={css.Form}>
              <form onSubmit={(e) => addNewTopic(e)}>
                <input
                  className={css.Form_input}
                  id="input_a22VL1iGPC"
                  maxLength={50}
                  minLength={2}
                  placeholder="Add a topic"
                  type="text"
                  value={collectData.topicTitle}
                  onChange={(e) => handleChange("topicTitle", e.currentTarget.value, setCollectData)}
                  required={true}
                />
                <ButtonSelect
                  id="T1"
                  value={collectData.collection}
                  onChange={(e) => handleChange("collection", e.target.value, setCollectData)}
                >
                  <option value="">-- Choose an collection --</option>
                  {sortCollections.map((parent) => (
                    <option key={crypto.randomUUID()} value={parent.id}>
                      {parent.title}
                    </option>
                  ))}
                </ButtonSelect>
                <ButtonBase type="submit" styled="ModalAddBookmarks_JqagP" text="Add topic" />
              </form>
            </div>
          )}
          {pickTabs.value === "List" && (
            <div className={css.Form}>
              <form onSubmit={(e) => addNewList(e)}>
                <input
                  className={css.Form_input}
                  id="input_ooIRWuISR8"
                  maxLength={50}
                  minLength={2}
                  placeholder="Add a list"
                  type="text"
                  value={collectData.listTitle}
                  onChange={(e) => handleChange("listTitle", e.currentTarget.value, setCollectData)}
                  required={true}
                />
                <ButtonSelect
                  id={"L1"}
                  value={collectData.collection}
                  onChange={(e) => handleChange("collection", e.target.value, setCollectData)}
                >
                  <option value="">-- Choose an collection --</option>
                  {sortCollections.map((parent) => (
                    <option key={crypto.randomUUID()} value={parent.id}>
                      {parent.title}
                    </option>
                  ))}
                </ButtonSelect>
                <ButtonSelect
                  id={"L2"}
                  value={collectData.topic}
                  onChange={(e) => handleChange("topic", e.target.value, setCollectData)}
                >
                  <option value="">-- Choose an topic --</option>
                  {sortTopics.map((parent) => {
                    if (parent.parent === collectData.collection) {
                      return (
                        <option key={crypto.randomUUID()} value={parent.id}>
                          {parent.title}
                        </option>
                      );
                    }
                  })}
                </ButtonSelect>
                <ButtonBase type="submit" styled="ModalAddBookmarks_JqagP" text="Add list" />
              </form>
            </div>
          )}
          {pickTabs.value === "Bookmark" && (
            <div className={css.Form}>
              <form onSubmit={(e) => addNewBookmark(e)}>
                <input
                  className={css.Form_input}
                  id="input_ooIRWuISR1"
                  maxLength={50}
                  minLength={2}
                  placeholder="Add a bookmark"
                  type="text"
                  value={collectData.bookmarkTitle}
                  onChange={(e) => handleChange("bookmarkTitle", e.currentTarget.value, setCollectData)}
                  required={true}
                />
                <input
                  className={css.Form_input}
                  id="input_GrLSSVeSuZ"
                  placeholder="Add an URL"
                  type="text"
                  value={collectData.bookmarkUrl}
                  onChange={(e) => handleChange("bookmarkUrl", e.currentTarget.value, setCollectData)}
                  required={true}
                />
                <ButtonSelect
                  id={"B1"}
                  value={collectData.collection}
                  onChange={(e) => handleChange("collection", e.target.value, setCollectData)}
                >
                  <option value="">-- Choose an collection --</option>
                  {sortCollections.map((parent) => (
                    <option key={crypto.randomUUID()} value={parent.id}>
                      {parent.title}
                    </option>
                  ))}
                </ButtonSelect>
                <ButtonSelect
                  id={"B2"}
                  value={collectData.topic}
                  onChange={(e) => handleChange("topic", e.target.value, setCollectData)}
                >
                  <option value="">-- Choose an topic --</option>
                  {sortTopics.map((parent) => {
                    if (parent.parent === collectData.collection) {
                      return (
                        <option key={crypto.randomUUID()} value={parent.id}>
                          {parent.title}
                        </option>
                      );
                    }
                  })}
                </ButtonSelect>
                <ButtonSelect
                  id={"B3"}
                  value={collectData.list}
                  onChange={(e) => handleChange("list", e.target.value, setCollectData)}
                >
                  <option value="">-- Choose an list --</option>
                  {sortLists.map((parent) => {
                    if (parent.parent === collectData.topic) {
                      return (
                        <option key={crypto.randomUUID()} value={parent.id}>
                          {parent.title}
                        </option>
                      );
                    }
                  })}
                </ButtonSelect>
                <ButtonBase type="submit" styled="ModalAddBookmarks_JqagP" text="Add list" />
              </form>
            </div>
          )}
        </div>
      </div>
    </ModalBase>
  );
};

import css from "./modalAddBookmarks.module.css";
import { ButtonBase, ButtonSelect, ModalBase } from "../../../components/index";
import { DataContext, StateContext } from "../../../context/index";
import { useContext, useEffect, useState } from "react";
import { handleChange, sortByName } from "../../../utils/common";
import { addNewElement, updateStorageAndReturnData } from "./modalAddBookmarks.script";
import { TabsBase } from "../../../components/tabs/tabsBase";

/**
 * @param {object} prop
 * @param {boolean} prop.isOpen
 * @param {Function} prop.handleClick
 * @returns {HTMLElement}
 */
export const ModalAddBookmarks = ({ isOpen, handleClick }) => {
  const { $showPopup } = useContext(StateContext);
  const {
    dataCollections,
    $dataCollections,
    dataTopics,
    $dataTopics,
    dataLists,
    $dataLists,
    $dataBookmarks,
    pinData,
    selectedItem,
  } = useContext(DataContext);

  // Ordenar datos por nombre
  const sortCollections = sortByName(dataCollections);
  const sortTopics = sortByName(dataTopics);
  const sortLists = sortByName(dataLists);

  // useState para el Tabs component
  const [pickTabs, $pickTabs] = useState({ value: "Collection" });

  // useState para los nuevos datos
  const [collectData, $collectData] = useState({
    collection: "",
    collectionTitle: "",
    topic: "",
    topicTitle: "",
    list: "",
    listTitle: "",
    bookmarkUrl: "",
    bookmarkTitle: "",
  });

  // Resetear los valores de los inputs
  const resetInputValue = () =>
    $collectData((prev) => ({
      ...prev,
      collectionTitle: "",
      topicTitle: "",
      listTitle: "",
      bookmarkTitle: "",
      bookmarkUrl: "",
    }));

  useEffect(() => {
    $collectData((prev) => ({ ...prev, list: selectedItem.listId }));
  }, [selectedItem.listId]);

  return (
    <ModalBase isOpen={isOpen} handleClick={handleClick}>
      <header className={css.Container_header}>
        <p className={css.Container_title}>Add</p>
        <p className={css.Container_text}>Wide your list of bookmarks</p>
      </header>
      <div className={css.Container_box}>
        <TabsBase
          pickTabs={pickTabs}
          setPickTabs={$pickTabs}
          handleChange={handleChange}
          tabs={[{ text: "Collection" }, { text: "Topic" }, { text: "List" }, { text: "Bookmark" }]}
        />
        <div className={css.Tabs_content}>
          {pickTabs.value === "Collection" && (
            <div className={css.Form}>
              <form
                onSubmit={(e) => {
                  addNewElement(
                    e,
                    collectData,
                    "collection",
                    $dataCollections,
                    "pagelist_collections",
                    "collectionTitle"
                  )
                  resetInputValue()
                }
                }
              >
                <input
                  className={css.Form_input}
                  id="input_T22VL1iGPC"
                  minLength={2}
                  placeholder="Add a collection"
                  type="text"
                  value={collectData.collectionTitle}
                  onChange={(e) => handleChange("collectionTitle", e.currentTarget.value, $collectData)}
                  required={true}
                />
                <ButtonBase styled="ModalAddBookmarks_JqagP" icon={<IconifyDone />} text="Add" />
              </form>
            </div>
          )}
          {pickTabs.value === "Topic" && (
            <div className={css.Form}>
              <form
                onSubmit={(e) =>
                  addNewElement(e, collectData, "topic", $dataTopics, "pagelist_topics", "topicTitle", "collection")
                }
              >
                <input
                  className={css.Form_input}
                  id="input_a22VL1iGPC"
                  minLength={2}
                  placeholder="Add a topic"
                  type="text"
                  value={collectData.topicTitle}
                  onChange={(e) => handleChange("topicTitle", e.currentTarget.value, $collectData)}
                  required={true}
                />
                <ButtonSelect
                  id="T1"
                  value={collectData.collection}
                  onChange={(e) => handleChange("collection", e.target.value, $collectData)}
                >
                  <option value="">-- Choose an collection --</option>
                  {sortCollections.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.title}
                    </option>
                  ))}
                </ButtonSelect>
                <ButtonBase type="submit" styled="ModalAddBookmarks_JqagP" icon={<IconifyDone />} text="Add" />
              </form>
            </div>
          )}
          {pickTabs.value === "List" && (
            <div className={css.Form}>
              <form
                onSubmit={(e) =>
                  addNewElement(e, collectData, "list", $dataLists, "pagelist_lists", "listTitle", "topic")
                }
              >
                <input
                  className={css.Form_input}
                  id="input_ooIRWuISR8"
                  minLength={2}
                  placeholder="Add a list"
                  type="text"
                  value={collectData.listTitle}
                  onChange={(e) => handleChange("listTitle", e.currentTarget.value, $collectData)}
                  required={true}
                />
                <ButtonSelect
                  id={"L1"}
                  value={collectData.collection}
                  onChange={(e) => handleChange("collection", e.target.value, $collectData)}
                >
                  <option value="">-- Choose an collection --</option>
                  {sortCollections.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.title}
                    </option>
                  ))}
                </ButtonSelect>
                <ButtonSelect
                  id={"L2"}
                  value={collectData.topic}
                  onChange={(e) => handleChange("topic", e.target.value, $collectData)}
                >
                  <option value="">-- Choose an topic --</option>
                  {sortTopics.map((parent) => {
                    if (parent.parent === collectData.collection) {
                      return (
                        <option key={parent.id} value={parent.id}>
                          {parent.title}
                        </option>
                      );
                    }
                  })}
                </ButtonSelect>
                <ButtonBase type="submit" icon={<IconifyDone />} styled="ModalAddBookmarks_JqagP" text="Add" />
              </form>
            </div>
          )}
          {pickTabs.value === "Bookmark" && (
            <div className={css.Form}>
              <form
                onSubmit={(e) =>
                  addNewElement(
                    e,
                    collectData,
                    "bookmark",
                    $dataBookmarks,
                    "pagelist_bookmarks",
                    "bookmarkTitle",
                    "list"
                  )
                }
              >
                <input
                  className={css.Form_input}
                  id="input_ooIRWuISR1"
                  maxLength={50}
                  minLength={2}
                  placeholder="Add a bookmark"
                  type="text"
                  value={collectData.bookmarkTitle}
                  onChange={(e) => handleChange("bookmarkTitle", e.currentTarget.value, $collectData)}
                  required={true}
                />
                <input
                  className={css.Form_input}
                  id="input_GrLSSVeSuZ"
                  placeholder="Add an URL"
                  type="text"
                  value={collectData.bookmarkUrl}
                  onChange={(e) => handleChange("bookmarkUrl", e.currentTarget.value, $collectData)}
                  required={true}
                />
                <ButtonSelect
                  id={"B1"}
                  value={collectData.collection}
                  onChange={(e) => handleChange("collection", e.target.value, $collectData)}
                >
                  {pinData === true ? (
                    <option value={selectedItem.collectionId}>-- {selectedItem.collectionTitle} --</option>
                  ) : (
                    <option value="">-- Choose an collection --</option>
                  )}
                  {sortCollections.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.title}
                    </option>
                  ))}
                </ButtonSelect>
                <ButtonSelect
                  id={"B2"}
                  value={collectData.topic}
                  onChange={(e) => handleChange("topic", e.target.value, $collectData)}
                >
                  {pinData === true ? (
                    <option value={selectedItem.topicId}>-- {selectedItem.topicTitle} --</option>
                  ) : (
                    <option value="">-- Choose an topic --</option>
                  )}
                  {sortTopics.map((parent) => {
                    if (parent.parent === collectData.collection) {
                      return (
                        <option key={parent.id} value={parent.id}>
                          {parent.title}
                        </option>
                      );
                    }
                  })}
                </ButtonSelect>
                <ButtonSelect
                  id={"B3"}
                  value={collectData.list}
                  onChange={(e) => handleChange("list", e.target.value, $collectData)}
                >
                  {pinData == true ? (
                    <option value={selectedItem.listId}>-- {selectedItem.listTitle} --</option>
                  ) : (
                    <option value="">-- Choose an list --</option>
                  )}
                  {sortLists.map((parent) => {
                    if (parent.parent === collectData.topic || parent.parent === selectedItem.listId) {
                      console.warn(parent.parent === selectedItem.listId);
                      return (
                        <option key={parent.id} value={parent.id}>
                          {parent.title}
                        </option>
                      );
                    }
                  })}
                </ButtonSelect>
                <ButtonBase type="submit" icon={<IconifyDone />} styled="ModalAddBookmarks_JqagP" text="Add" />
              </form>
            </div>
          )}
        </div>
      </div>
    </ModalBase>
  );
};

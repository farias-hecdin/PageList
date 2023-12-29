import css from "./modalAdd.module.css";
import { ButtonBase, ButtonSelect, ModalBase, TabsBase } from "../../../components/index";
import { DataContext, StateContext } from "../../../context/index";
import { addNew, updateStorageAndReturnData } from "./modalAdd.script";
import { handleChange, sortByName } from "../../../utils/common";

/**
 * @param {object} prop
 * @param {boolean} prop.isOpen
 * @param {Function} prop.handleClick
 * @returns {HTMLElement}
 */
export const ModalAdd = ({ isOpen, handleClick }) => {
  const { $showPopup, pinData, selectedItem } = useContext(StateContext);

  const { dataCollections, $dataCollections, dataTopics, $dataTopics, dataLists, $dataLists, $dataBookmarks } =
    useContext(DataContext);

  // Ordenar datos por nombre
  const sortCollections = sortByName(dataCollections);
  const sortTopics = sortByName(dataTopics);
  const sortLists = sortByName(dataLists);

  // useState para el Tabs component
  const [pickTabs, $pickTabs] = useState({ value: "Collection" });

  // useState para los nuevos datos
  const [collectData, $collectData] = useState({
    collectionId: "",
    collectionName: "",
    topicId: "",
    topicName: "",
    listId: "",
    listName: "",
    bookmarkUrl: "",
    bookmarkName: "",
  });

  // Resetear los valores de los inputs
  const resetInputValue = () =>
    $collectData((prev) => ({
      ...prev,
      collectionName: "",
      topicName: "",
      listName: "",
      bookmarkName: "",
      bookmarkUrl: "",
    }));

  useEffect(() => {
    $collectData((prev) => ({ ...prev, listId: selectedItem.listId }));
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
          funcSet={$pickTabs}
          handleChange={handleChange}
          tabs={[{ text: "Collection" }, { text: "Topic" }, { text: "List" }, { text: "Bookmark" }]}
        />
        <div className={css.Tabs_content}>
          {pickTabs.value === "Collection" && (
            <FormAddElem
              data={collectData}
              type="collection"
              funcSet={$dataCollections}
              storageKey="pagelist_collections"
              titleKey="collectionName"
              parentKey={false}
            >
              <InputField
                id="Form_T22VL1iGPx"
                placeholder="Add a collection"
                value={collectData.collectionName}
                keyword="collectionName"
                funcSet={$collectData}
              />
            </FormAddElem>
          )}
          {pickTabs.value === "Topic" && (
            <FormAddElem
              data={collectData}
              type="topic"
              funcSet={$dataTopics}
              storageKey="pagelist_topics"
              titleKey="topicName"
              parentKey={"collection"}
            >
              <InputField
                id="Input_ingapc1vtb"
                placeholder="Add a topic"
                value={collectData.topicName}
                keyword="topicName"
                funcSet={$collectData}
              />
              <SelectField
                id="Select_ingapc1vtb"
                value={collectData.collectionId}
                keyword="collection"
                funcSet={$collectData}
                type="COLLECTION"
                data={sortCollections}
                conditional={true}
              />
            </FormAddElem>
          )}
          {pickTabs.value === "List" && (
            <div className={css.Form}>
              <form onSubmit={(e) => addNew(e, collectData, "list", $dataLists, "pagelist_lists", "listName", "topic")}>
                <input
                  className={css.Form_input}
                  id="input_ooIRWuISR8"
                  minLength={2}
                  placeholder="Add a list"
                  type="text"
                  value={collectData.listName}
                  onChange={(e) => handleChange("listName", e.currentTarget.value, $collectData)}
                  required={true}
                />
                <ButtonSelect
                  id={"L1"}
                  value={collectData.collectionId}
                  onChange={(e) => handleChange("collection", e.target.value, $collectData)}
                >
                  <option>COLLECTION</option>
                  {sortCollections.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {" "}
                      {parent.title}{" "}
                    </option>
                  ))}
                </ButtonSelect>
                <ButtonSelect
                  id={"L2"}
                  value={collectData.topicId}
                  onChange={(e) => handleChange("topic", e.target.value, $collectData)}
                >
                  <option>TOPIC</option>
                  {sortTopics.map((parent) =>
                    parent.parent === collectData.collection ? (
                      <option key={parent.id} value={parent.id}>
                        {parent.title}
                      </option>
                    ) : null
                  )}
                </ButtonSelect>
                <ButtonBase type="submit" icon={<IconifyDone />} styled="Button_JqagP" text="Add" />
              </form>
            </div>
          )}
          {pickTabs.value === "Bookmark" && (
            <div className={css.Form}>
              <form
                onSubmit={(e) =>
                  addNew(e, collectData, "bookmark", $dataBookmarks, "pagelist_bookmarks", "bookmarkName", "list")
                }
              >
                <input
                  className={css.Form_input}
                  id="input_ooIRWuISR1"
                  maxLength={50}
                  minLength={2}
                  placeholder="Add a bookmark"
                  type="text"
                  value={collectData.bookmarkName}
                  onChange={(e) => handleChange("bookmarkName", e.currentTarget.value, $collectData)}
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
                  value={collectData.collectionId}
                  onChange={(e) => handleChange("collection", e.target.value, $collectData)}
                >
                  {pinData === true ? (
                    <option value={selectedItem.collectionId}>[ {selectedItem.collectionName} ]</option>
                  ) : (
                    <option>COLLECTION</option>
                  )}
                  {sortCollections.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.title}
                    </option>
                  ))}
                </ButtonSelect>
                <ButtonSelect
                  id={"B2"}
                  value={collectData.topicId}
                  onChange={(e) => handleChange("topic", e.target.value, $collectData)}
                >
                  {pinData === true ? (
                    <option value={selectedItem.topicId}>-- {selectedItem.topicName} --</option>
                  ) : (
                    <option value="">TOPIC</option>
                  )}
                  {sortTopics.map((parent) => {
                    if (parent.parent === collectData.collectionId) {
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
                  value={collectData.listId}
                  onChange={(e) => handleChange("list", e.target.value, $collectData)}
                >
                  {pinData == true ? (
                    <option value={selectedItem.listId}>-- {selectedItem.listName} --</option>
                  ) : (
                    <option>LIST</option>
                  )}
                  {sortLists.map((parent) =>
                    parent.parent === collectData.topicId || parent.parent === selectedItem.listId ? (
                      <option key={parent.id} value={parent.id}>
                        {" "}
                        {parent.title}{" "}
                      </option>
                    ) : null
                  )}
                </ButtonSelect>
                <ButtonBase type="submit" icon={<IconifyDone />} styled="Button_JqagP" text="Add" />
              </form>
            </div>
          )}
        </div>
      </div>
    </ModalBase>
  );
};

const FormAddElem = ({ children, data, type, funcSet, storageKey, titleKey, parentKey }) => {
  return (
    <div className={css.Form}>
      <form onSubmit={(e) => addNew(e, data, type, funcSet, storageKey, titleKey, parentKey)}>
        {children}
        <ButtonBase type="submit" styled="Button_JqagP" text="Add" />
      </form>
    </div>
  );
};

const InputField = ({ id, value, placeholder, keyword, funcSet }) => {
  return (
    <input
      className={css.Form_input}
      id={id}
      minLength={2}
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={(e) => handleChange(keyword, e.currentTarget.value, funcSet)}
      required={true}
    />
  );
};

const SelectField = ({ pin, id, value, keyword, funcSet, data, conditional, type }) => {
  return (
    <ButtonSelect id={id} value={value} onChange={(e) => handleChange(keyword, e.currentTarget.value, funcSet)}>
      {pin ? <option value={pin.pinId}>[ {pin.name} ]</option> : <option>{type}</option>}
      {data.map(
        (elem) =>
          conditional && (
            <option key={elem.id} value={elem.id}>
              {` ${elem.title} `}
            </option>
          )
      )}
    </ButtonSelect>
  );
};

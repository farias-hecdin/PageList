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
  const { dataCollection, $dataCollection, dataTopic, $dataTopic, dataList, $dataList, $dataBookmark } =
    useContext(DataContext);

  // Ordenar datos por nombre
  const sortCollections = sortByName(dataCollection);
  const sortTopics = sortByName(dataTopic);
  const sortLists = sortByName(dataList);

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
    $collectData((prev) => ({ ...prev, listId: selectedItem.list.id }));
  }, [selectedItem.list]);

  return (
    <ModalBase isOpen={isOpen} handleClick={handleClick}>
      <div className={css.Container_box}>
        <TabGeneral
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
              funcSet={$dataCollection}
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
              funcSet={$dataTopic}
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
            <FormAddElem
              data={collectData}
              type="list"
              funcSet={$dataList}
              storageKey="pagelist_lists"
              titleKey="listName"
              parentKey={"topic"}
            >
              <InputField
                id="Input_ooIRWuISR8"
                placeholder="Add a list"
                value={collectData.listName}
                keyword="topicName"
                funcSet={$collectData}
              />
              <SelectField
                id="Select_ooIRWuISR8"
                value={collectData.collectionId}
                keyword="collection"
                funcSet={$collectData}
                type="COLLECTION"
                data={sortCollections}
                conditional={true}
              />
              <SelectField
                id="Select_ooIRWuI333"
                value={collectData.topicId}
                keyword="topic"
                funcSet={$collectData}
                type="TOPIC"
                data={sortTopics}
                conditional={parent.parent === collectData.collection}
              />
            </FormAddElem>
          )}
          {pickTabs.value === "Bookmark" && (
            <FormAddElem
              data={collectData}
              type="bookmark"
              funcSet={$dataBookmark}
              storageKey="pagelist_bookmarks"
              titleKey="bookmarkName"
              parentKey={"list"}
            >
              <InputField
                id="Input_ooIRWuISR8"
                placeholder="Add a bookmark"
                value={collectData.bookmarkName}
                keyword="bookmarkName"
                funcSet={$collectData}
              />
              <InputField
                id="Input_ooIRWuISR8"
                placeholder="Add a URL"
                value={collectData.bookmarkUrl}
                keyword="bookmarkUrl"
                funcSet={$collectData}
              />
              <SelectField
                id="Select_ooIRWuI333"
                value={collectData.collectionId}
                keyword="collection"
                funcSet={$collectData}
                type="COLLECTION"
                data={sortCollections}
                conditional={parent.parent === collectData.collection}
                pin={{ name: selectedItem.collection.name, value: selectedItem.collection.id }}
              />
              <SelectField
                id="Select_ooIRWuI333"
                value={collectData.topicId}
                keyword="topic"
                funcSet={$collectData}
                type="TOPIC"
                data={sortTopics}
                conditional={parent.parent === collectData.collection}
                pin={{ name: selectedItem.topic.name, value: selectedItem.topic.name }}
              />
              <SelectField
                id="Select_ooIRWuI333"
                value={collectData.listId}
                keyword="list"
                funcSet={$collectData}
                type="LIST"
                data={sortLists}
                conditional={parent.parent === collectData.topicId || parent.parent === selectedItem.list.id}
                pin={{ name: selectedItem.list.name, value: selectedItem.list.id }}
              />
            </FormAddElem>
          )}
        </div>
      </div>
    </ModalBase>
  );
};

const FormAddElem = ({ children, data, type, funcSet, storageKey, titleKey, parentKey }) => {
  const { $showPopup } = useContext(StateContext);
  return (
    <div className={css.Form}>
      <form onSubmit={(e) => addNew(e, data, type, funcSet, $showPopup, storageKey, titleKey, parentKey)}>
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
      {pin ? <option value={pin.value}>[ {pin.name} ]</option> : <option>{type}</option>}
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

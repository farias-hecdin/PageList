import { useContext } from "react";
import { ButtonBase, ModalBase } from "../../components/Index";
import { DataContext } from "../../context/Index";
import css from "./HomePageModalAddBookmarks.module.css";

/** @param {boolean} pShowModal
*/
export const HomePageModalAddBookmarks = ({ pShowModal }) => {

  const { drawerCollections, drawerTopics, drawerLists, selectedCollectionX } = useContext(DataContext);

  // Añadir nuevos datos ------------------------------------------------------
  const addNewCollection = () => {
    let $nodeInput = document.getElementById("input_T22VL1iGPC");
    let newValue = $nodeInput.value;
    let dataTemplate = {
      id: newValue,
      name: newValue,
      topics: [],
    };
    drawerCollections.set((prev) => [dataTemplate, ...prev]);
    alert("New collection added")
  };

  const addNewTopic = () => {
    let $nodeInput = document.getElementById("input_a22VL1iGPC");
    let newValue = $nodeInput.value;
    let dataTemplate = {
      originId: "SWp26L6EBfqApaQOSkezr",
      id: "x",
      name: newValue,
      lists: [],
    };
    drawerTopics.set((prev) => [dataTemplate, ...prev]);
    alert("New topic added")
  };

  const addNewList = () => {
    let $nodeInput = document.getElementById("input_ooIRWuISR8");
    let newValue = $nodeInput.value;
    let dataTemplate = {
      originId: "x",
      id: nanoid,
      name: newValue,
      links: [],
    };
    drawerLists.set((prev) => [dataTemplate, ...prev]);
    alert("New list added")
  };

  return (
    <ModalBase pIsOpen={pShowModal} pId="modal_AZiStXOUbn">
      <div className={css.Form}>
        <p className={css.Form_text}>Collection</p>
        <input className={css.Form_input} type="text" placeholder="Add collection..." id="input_T22VL1iGPC" />
        <ButtonBase pText="Add collection" pHandleClick={(e) => addNewCollection(e)} />
      </div>
      <div className={css.Form}>
        <p className={css.Form_text}>Topic</p>
        <input className={css.Form_input} type="text" placeholder="Add topic..." id="input_a22VL1iGPC" />
        <select name="choiceTopics">
          {drawerCollections.state.map(itemCollection => (
            <option value={itemCollection.id}>{itemCollection.name}</option>
          ))}
        </select>
        <ButtonBase pText="Add topic" pHandleClick={(e) => addNewTopic(e)} />
      </div>
      <div className={css.Form}>
        <p className={css.Form_text}>List</p>
        <input className={css.Form_input} type="text" placeholder="Add list..." id="input_ooIRWuISR8" />
        <select name="choiceTopics">
          {drawerTopics.state.map(itemTopics => (
            <option value={itemTopics.id}>{itemTopics.name}</option>
          ))}
        </select>
        <ButtonBase pText="Add list" pHandleClick={(e) => addNewList(e)} />
      </div>
    </ModalBase>
  );
};

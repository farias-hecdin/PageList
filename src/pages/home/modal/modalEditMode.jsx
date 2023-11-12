import css from "./modalEditMode.module.css";
import { ButtonBase, DetailsBase, ModalBase } from "../../../components/index.jsx";
import { deleteElementAndUpdateState } from "../../../utils/common";
import { useContext } from "react";
import { DataContext } from "../../../context";

/**
 * @param {object} prop
 * @param {boolean} prop.isOpen
 * @param {Function} prop.handleClick
 * @returns {HTMLElement}
 */
export const ModalEditMode = ({ isOpen, handleClick }) => {
  const { targetItem, dataLists, setDataBookmarks, dataBookmarks } = useContext(DataContext);

  /**
   * Mover un elemento y actualizar el estado
   * @param {string} id_ `string` ¿Id del elemento a mover?
   */
  const moveElementAndUpdateState = (id_) => {
    const $nodeSelect = document.getElementById("select_LCAXUzHOdk");
    const datas = dataBookmarks;
    const value = $nodeSelect.value;

    const newDatas = datas.map((item) => {
      if (id_ === item.id) {
        return {
          ...item,
          originId: value,
        };
      }
      return item;
    });

    setDataBookmarks(newDatas);
  };

  return (
    <ModalBase isOpen={isOpen} handleClick={handleClick}>
      <header className={css.Container_header}>
        <p className={css.Container_title}>Edit</p>
        <p className={css.Container_text}>
          What do you want to do with:
          <span className={css.Container_subtext}>{`"${targetItem.name}"`}</span>
        </p>
      </header>
      <div className={css.Container_box}>
        <DetailsBase title="Delete this element" icon="delete-forever-outline">
          <div className={css.Container_details}>
            <p>
              Do you want delete <b>{targetItem.name}</b>
            </p>
            <ButtonBase
              text="Delete"
              handleClick={() => deleteElementAndUpdateState(targetItem.id, targetItem.state, targetItem.set)}
            />
          </div>
        </DetailsBase>
        <DetailsBase title="Move this element" icon="pan-tool-outline">
          <div className={css.Container_details}>
            <p>In which list would you like to move the bookmark?</p>
            <select name="choiceTopics" id="select_LCAXUzHOdk" className={css.Select_input}>
              {dataLists.map((item) => (
                <option key={crypto.randomUUID()} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <ButtonBase text="Move" handleClick={() => moveElementAndUpdateState(targetItem.id)} />
          </div>
        </DetailsBase>
        <DetailsBase title="Update this element" icon="title">
          <div className={css.Container_details}>
            <ButtonBase text="Update" />
          </div>
        </DetailsBase>
      </div>
    </ModalBase>
  );
};

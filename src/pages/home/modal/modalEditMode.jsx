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
  const { deleteItem } = useContext(DataContext);

  // name: "Move this element",
  // icon: "pan-tool-outline",
  // name: "Update this element",
  // icon: "title",

  return (
    <ModalBase isOpen={isOpen} handleClick={handleClick}>
      <header className={css.Container_header}>
        <p className={css.Container_title}>Edit</p>
        <p className={css.Container_text}>
          What do you want to do with:
          <span className={css.Container_subtext}>{`"${deleteItem.name}"`}</span>
        </p>
      </header>
      <div className={css.Container_box}>
        <DetailsBase title="Delete this element" icon="delete-forever-outline">
          <div className={css.Container_details}>
            <p>
              Do you want delete <b>{deleteItem.name}</b>
            </p>
            <ButtonBase
              text="Accept"
              handleClick={() => deleteElementAndUpdateState(deleteItem.id, deleteItem.state, deleteItem.set)}
            />
          </div>
        </DetailsBase>
      </div>
    </ModalBase>
  );
};

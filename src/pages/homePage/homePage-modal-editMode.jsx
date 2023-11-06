import css from "./homePage-modal-editMode.module.css";
import { Fragment, useState } from "react";
import { ModalBase } from "../../components/index.jsx";
import { deleteThisElement, onClickMissing } from "../../utils/common";

/**
 * @param {object} prop
 * @param {boolean} prop.pShowModal
 * @param {string} prop.pDataElement
 * @param {string} prop.pDataSource
 * @returns {HTMLElement}
 */
export const HomePageModalEditMode = ({ pShowModal, pDataElement, pDataSource }) => {
  const [data, setData] = pDataSource;
  const [isCloseModal, setIsCloseModal] = useState(true)

  const actions = [
    {
      id: 1,
      active: true,
      name: "Delete this element",
      icon: "delete-forever-outline",
      func: () => {
        deleteThisElement(pDataElement.id, data, setData)
        setIsCloseModal(!isCloseModal)
      },
    },
    {
      id: 2,
      active: true,
      name: "Move this element",
      icon: "pan-tool-outline",
      func: null,
    },
    {
      id: 3,
      active: true,
      name: "Update this element",
      icon: "title",
      func: null,
    },
  ];

  return (
    <ModalBase pIsOpen={pShowModal === isCloseModal} pId="modal_AZ555XOUbn">
      <header className={css.Container_header}>
        <p className={css.Container_title}>Edit</p>
        <p className={css.Container_text}>
          What do you want to do with:
          <span className={css.Container_subtext}>{`"${pDataElement.name}"`}</span>
        </p>
      </header>
      <div className={css.Container_box}>
        <ul>
          {actions.map((action) => (
            <Fragment key={crypto.randomUUID()}>
              <button
                className={`${action.active ? css.Button : css.isHidden}`}
                onClick={action.func || onClickMissing}
              >
                <iconify-icon icon={`material-symbols:${action.icon}`}></iconify-icon>
                <span>{action.name}</span>
              </button>
            </Fragment>
          ))}
        </ul>
      </div>
    </ModalBase>
  );
};

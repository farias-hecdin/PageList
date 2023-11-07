import css from "./modalEditMode.module.css";
import { Fragment, useState } from "react";
import { ModalBase } from "../../../components/index.jsx";
import { deleteElementAndUpdateState, onClickMissing } from "../../../utils/common";

/**
 * @param {object} prop
 * @param {boolean} prop.showModal
 * @param {string} prop.dataElement
 * @param {string} prop.dataSource
 * @returns {HTMLElement}
 */
export const ModalEditMode = ({ showModal, dataElement, dataSource = [] }) => {
  const [data, setData] = dataSource;
  const [isCloseModal, setIsCloseModal] = useState(true);

  const actions = [
    {
      id: 1,
      active: true,
      name: "Delete this element",
      icon: "delete-forever-outline",
      func: () => {
        deleteElementAndUpdateState(dataElement.id, data, setData);
        setIsCloseModal(!isCloseModal);
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
    <ModalBase pIsOpen={showModal === isCloseModal} pId="modal_AZ555XOUbn">
      <header className={css.Container_header}>
        <p className={css.Container_title}>Edit</p>
        <p className={css.Container_text}>
          What do you want to do with:
          <span className={css.Container_subtext}>{`"${dataElement.name}"`}</span>
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

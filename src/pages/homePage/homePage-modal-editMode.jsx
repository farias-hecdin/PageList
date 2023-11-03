import css from "./homePage-modal-editMode.module.css";
import { ModalBase } from "../../components/index.jsx";
import { onClickMissing } from "../../utils/common";
import { Fragment } from "react";

/**
 * @param {Object} prop
 * @param {boolean} prop.pShowModal
 * @param {string} prop.pDataElement
 */
export const HomePageModalEditMode = ({ pShowModal, pDataElement }) => {
  const actions = [
    { id: 1, active: true, name: "Delete this element", icon: "delete-forever-outline", func: null },
    { id: 2, active: 1, name: "Move this element", icon: "pan-tool-outline", func: null },
    { id: 3, active: 1, name: "Up this element", icon: "title", func: null },
  ];

  return (
    <ModalBase pIsOpen={pShowModal} pId="modal_AZ555XOUbn">
      <header className={css.Container_header}>
        <p className={css.Container_title}>Edit</p>
        <p className={css.Container_text}>What do you want to do with: {pDataElement}</p>
      </header>
      <div className={css.Container_box}>
        <ul>
          {actions.map((action) => (
            <Fragment key={crypto.randomUUID()}>
              <button
                onClick={action.func || onClickMissing}
                className={`${action.active ? css.Button : css.isHidden}`}
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

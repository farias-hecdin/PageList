import css from "./modalBase.module.css";
import { ButtonBase } from "../index";
import { useState } from "react";

/**
 * @param {object} prop
 * @param {HTMLElement} prop.children
 * @param {boolean} prop.pIsOpen
 * @param {string} prop.pId
 * @returns {HTMLElement}
 */
export const ModalBase = ({ children, pIsOpen, pId }) => {
  const [isCloseModal, setIsCloseModal] = useState(true);
  return (
    <>
      {pIsOpen === isCloseModal && (
        <aside className={css.Modal}>
          <div className={css.Modal_box}>
            {children}
            <footer className={css.Modal_footer}>
              <ButtonBase pText="Cancel" pStyled="--outline" pHandleClick={() => setIsCloseModal(!isCloseModal)} />
            </footer>
          </div>
        </aside>
      )}
    </>
  );
};

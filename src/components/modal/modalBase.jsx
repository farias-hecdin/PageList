import css from "./modalBase.module.css";
import { ButtonBase } from "../index";
import { useState } from "react";

/**
 * @param {Object} prop
 * @param {HTMLElement} prop.children
 * @param {boolean} prop.pIsOpen
 * @param {string} prop.pId
 */
export const ModalBase = ({ children, pIsOpen, pId }) => {
  const [isCloseModal, setIsCloseModal] = useState(true);
  return (
    <>
      {pIsOpen === isCloseModal && pId && (
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

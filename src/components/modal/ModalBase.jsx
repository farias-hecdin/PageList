import css from "./ModalBase.module.css";
import { ButtonBase } from "../Index";
import { useState } from "react";

/**
 * @param {HTMLElement} children
 * @param {boolean} pIsOpen
 * @param {string} pId
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

import css from "./modalBase.module.css";
import { ButtonBase } from "../index";
import { useState } from "react";

/**
 * @param {object} prop
 * @param {HTMLElement} prop.children
 * @param {boolean} prop.isOpen
 * @returns {HTMLElement}
 */
export const ModalBase = ({ children, isOpen }) => {
  const [isCloseModal, setIsCloseModal] = useState(true);
  return (
    <>
      {isOpen === isCloseModal && (
        <aside className={css.Modal}>
          <div className={css.Modal_box}>
            {children}
            <footer className={css.Modal_footer}>
              <ButtonBase text="Cancel" styled="--outline" handleClick={() => setIsCloseModal(!isCloseModal)} />
            </footer>
          </div>
        </aside>
      )}
    </>
  );
};

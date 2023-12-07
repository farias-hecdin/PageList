import css from "./modalBase.module.css";
import { ButtonBase } from "../index";

/**
 * @param {object} prop
 * @param {HTMLElement} prop.children
 * @param {boolean} prop.isOpen
 * @param {Function} prop.handleClick
 * @returns {HTMLElement}
 */
export const ModalBase = ({ children, isOpen, handleClick }) => {
  return (
    <>
      {isOpen && (
        <div className={css.Modal}>
          <div className={css.Modal_box}>
            {children}
            <footer className={css.Modal_footer}>
              <ButtonBase text="Cancel"
                  icon={<IconifyClose/>}
                styled="--outline" handleClick={handleClick} />
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

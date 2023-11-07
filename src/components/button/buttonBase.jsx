import css from "./buttonBase.module.css";
import { onClickMissing } from "../../utils/common.js";

/**
 * @param {object} prop
 * @param {string} prop.icon
 * @param {string} prop.text
 * @param {string} prop.styled
 * @param {Function} prop.handleClick
 * @returns {HTMLElement}
 */
export const ButtonBase = ({ icon, text, handleClick, styled }) => {
  return (
    <button className={`${css.Button} ${styled || ""}`} onClick={handleClick || onClickMissing}>
      {icon && (
        <span className={css.Button_icon}>
          <iconify-icon icon={`material-symbols:${icon}`}></iconify-icon>
        </span>
      )}
      {text && <span className={css.Button_text}>{text}</span>}
    </button>
  );
};

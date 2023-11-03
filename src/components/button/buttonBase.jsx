import css from "./buttonBase.module.css";
import { onClickMissing } from "../../utils/common.js";

/**
 * @param {Object} prop
 * @param {string} prop.pIcon
 * @param {string} prop.pText
 * @param {string} prop.pStyled
 * @param {function} prop.pHandleClick
 */
export const ButtonBase = ({ pIcon, pText, pHandleClick, pStyled }) => {
  return (
    <button className={`${css.Button} ${pStyled || ""}`} onClick={pHandleClick || onClickMissing}>
      {pIcon && (
        <span className={css.Button_icon}>
          <iconify-icon icon={`material-symbols:${pIcon}`}></iconify-icon>
        </span>
      )}
      {pText && <span className={css.Button_text}>{pText}</span>}
    </button>
  );
};

import css from "./cardElement.module.css";
import { ButtonBase } from "../../../components";

/**
 * @param {object} prop
 * @param {Function} prop.handleClick
 * @param {Function} prop.handleClick2
 * @param {HTMLElement} prop.icon
 * @param {string} prop.text
 * @param {string} prop.styled
 * @returns {HTMLElement}
 */
export const CardElement = ({ handleClick, handleClick2, icon, styled, text }) => {
  return (
    <div className={`${css.Container} ${styled || ""}`}>
      <button className={css.Card} onClick={handleClick}>
        {icon}
        <div className={css.Card_box}>
          <p className={css.Card_text}>{text}</p>
          <p className={css.Card_subtext}>{0} elements</p>
        </div>
      </button>
      {handleClick2 && <ButtonBase icon={<IconifyMoreVert />} styled="is-ghost CardElements_WQkiS" handleClick={handleClick2} />}
    </div>
  );
};

import { ButtonBase } from "../../../components";
import css from "./collectionsCard.module.css";

/**
 * @param {object} prop
 * @param {Function} prop.handleClick
 * @param {Function} prop.handleSecondClick
 * @param {string} prop.icon
 * @param {string} prop.id
 * @param {string} prop.styled
 * @param {string} prop.text
 * @returns {HTMLElement}
 */
export const CollectionsCard = ({ handleClick, handleSecondClick, icon, id, styled, text }) => {
  return (
    <div className={`${css.Card} ${styled || ""}`}>
      <button className={css.Card_box} onClick={handleClick} data-id={id}>
        <iconify-icon icon={`material-symbols:${icon}`}></iconify-icon>
        <p className={css.Card_text}>{text}</p>
      </button>
      <ButtonBase icon="more-vert" styled="--ghost CollectionsModal_WQkiS" handleClick={handleSecondClick} />
    </div>
  );
};

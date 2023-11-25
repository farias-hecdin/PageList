import { ButtonBase } from "../../../components";
import css from "./collectionsCard.module.css";

/**
 * @param {object} prop
 * @param {Function} prop.handleClick
 * @param {Function} prop.handle2ndClick
 * @param {HTMLElement} prop.icon
 * @param {string} prop.id
 * @param {string} prop.styled
 * @param {string} prop.text
 * @returns {HTMLElement}
 */
export const CollectionsCard = ({ handleClick, handle2ndClick, icon, id, text, styled = "" }) => {
  return (
    <div className={`${css.Card} ${styled}`}>
      <button className={css.Card_box} onClick={handleClick} data-id={id}>
        {icon}
        <p className={css.Card_text}>{text}</p>
      </button>
      <ButtonBase icon={<IconifyMoreVert />} styled="--ghost CollectionsModal_WQkiS" handleClick={handle2ndClick} />
    </div>
  );
};

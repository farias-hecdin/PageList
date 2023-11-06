import { ButtonBase } from "../../../components";
import css from "./sectionPane-tile.module.css";

/**
 * @param {object} prop
 * @param {Function} prop.handleClick
 * @param {Function} prop.handleSecondClick
 * @param {boolean} prop.hasMenu
 * @param {string} prop.icon
 * @param {string} prop.id
 * @param {string} prop.styled
 * @param {string} prop.text
 * @returns {HTMLElement}
 */
export const SectionPaneModalTile = ({handleClick, handleSecondClick, hasMenu, icon, id, styled, text}) => {
  return (
    <div className={`${css.Tile} ${styled || ""}`}>
      <button className={css.Tile_box} onClick={handleClick} data-id={id}>
        <iconify-icon icon={`material-symbols:${icon}`}></iconify-icon>
        <p className={css.Tile_text}>{text}</p>
      </button>
      {hasMenu && (
      <ButtonBase
        pIcon="more-vert"
        pStyled="--ghost SectionPane_WQkiS"
        pHandleClick={handleSecondClick}
      />
      )}
    </div>
  );
};

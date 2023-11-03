import css from "./sectionPane-tile.module.css";

/**
 * @param {Object} prop
 * @param {string} prop.pIcon
 * @param {string} prop.pText
 * @param {string} prop.pStyled
 * @param {string} prop.pDataId
 * @param {function} prop.pHandleClick
 */
export const SectionPaneModalTile = ({ pHandleClick, pIcon, pText, pStyled, pDataId }) => {
  return (
    <div className={`${css.Tile} ${pStyled || ""}`} onClick={pHandleClick} data-id={pDataId}>
      <iconify-icon icon={`material-symbols:${pIcon}`}></iconify-icon>
      <p className={css.Tile_text}>{pText}</p>
    </div>
  );
};

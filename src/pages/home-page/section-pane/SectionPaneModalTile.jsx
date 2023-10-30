import css from "./SectionPaneModalTile.module.css";

export const SectionPaneModalTile = ({ pHandleClick, pIcon, pText, pStyled, pDataId }) => {
  return (
    <div className={`${css.Tile} ${pStyled || ""}`} onClick={pHandleClick} data-id={pDataId}>
      <iconify-icon icon={`material-symbols:${pIcon}`}></iconify-icon>
      <p className={css.Tile_text}>{pText}</p>
    </div>
  );
};

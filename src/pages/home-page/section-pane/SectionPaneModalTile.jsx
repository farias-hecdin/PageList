import css from "./SectionPaneModalTile.module.css";

export const SectionPaneModalTile = ({ pHandleClick, pText, pStyled, pDataId, pNumber }) => {
  return (
    <div className={`${css.Tile} ${pStyled || null}`} onClick={pHandleClick} data-id={pDataId}>
      <p className={css.Tile_text}>{pText}</p>
      <p>{pNumber || 0}</p>
    </div>
  );
};

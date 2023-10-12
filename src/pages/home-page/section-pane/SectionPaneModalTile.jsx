import css from "./SectionPaneModalTile.module.css";

export const SectionPaneModalTile = ({ pHandleClick, pText, pStyled, pId }) => {
  return (
    <div className={`${css.Tile} ${pStyled || null}`} onClick={pHandleClick} data-id={pId}>
      <p className={css.Tile_text}>{pText}</p>
    </div>
  );
};

import css from "./ButtonBase.module.css";

export const ButtonBase = ({ pIcon, pText, pHandleClick, pStyled }) => {
  return (
    <button className={`${css.Button} ${pStyled || null}`} onClick={pHandleClick}>
      {pIcon && (
        <span className={css.Button_icon}>
          <i className="material-symbols-outlined">{pIcon}</i>
        </span>
      )}
      {pText && <span className={css.Button_text}>{pText}</span>}
    </button>
  );
};

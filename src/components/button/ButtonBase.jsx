import css from "./ButtonBase.module.css";

export const ButtonBase = ({ pIcon, pText, pHandleClick, pStyled }) => {
  // Notificar si el evento onClick no es declarado
  const funcAlert = () => {
    alert("Sorry, this functionality is not available yet.");
  };

  return (
    <button className={`${css.Button} ${pStyled || null}`} onClick={pHandleClick || funcAlert}>
      {pIcon && (
        <span className={css.Button_icon}>
          <i className="material-symbols-outlined">{pIcon}</i>
        </span>
      )}
      {pText && <span className={css.Button_text}>{pText}</span>}
    </button>
  );
};

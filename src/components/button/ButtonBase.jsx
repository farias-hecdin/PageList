import css from "./ButtonBase.module.css";

export const ButtonBase = ({ pIcon, pText, pHandleClick, pStyled }) => {
  // Notificar si el evento onClick no es declarado
  const funcAlert = () => {
    alert("Sorry, this functionality is not available yet.");
  };

  return (
    <button className={`${css.Button} ${pStyled || ""}`} onClick={pHandleClick || funcAlert}>
      {pIcon && (
        <span className={css.Button_icon}>
          <iconify-icon icon={`material-symbols:${pIcon}`}></iconify-icon>
        </span>
      )}
      {pText && <span className={css.Button_text}>{pText}</span>}
    </button>
  );
};

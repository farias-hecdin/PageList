import css from "./ButtonBase.module.css";

const ButtonBase = ({ pIcon, pText, handleClick, styled }) => {
  return (
    <button className={`${css.Button} ${styled || ""}`} onClick={handleClick}>
      {pIcon ? (
        <span className={css.Button_icon}>
          <i className="material-symbols-outlined">{pIcon}</i>
        </span>
      ) : null}
      {pText ? <span className={css.Button_text}>{pText}</span> : null}
    </button>
  );
};

export default ButtonBase;

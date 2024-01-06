import css from "./ButtonBase.module.css";

/**
 * @param {Function} handleClick
 * @param {HTMLElement} icon
 * @param {string} styled
 * @param {string} text
 * @param {string} type
*/
export const ButtonBase = ({ handleClick, icon, styled, text, type }) => {
  return (
    <button className={`${css.Button} ${styled || ""}`} type={type} onClick={handleClick}>
      {icon}
      {text && <span className={css.Button_text}>{text}</span>}
    </button>
  );
};

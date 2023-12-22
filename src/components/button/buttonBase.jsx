import css from "./buttonBase.module.css";

/**
 * @param {object} prop
 * @param {string} prop.handleClick
 * @param {string} prop.icon
 * @param {string} prop.styled
 * @param {string} prop.text
 * @param {string} prop.type
 * @returns {HTMLElement}
 */
export const ButtonBase = ({ handleClick, icon, styled, text, type }) => {
  return (
    <button className={`${css.Button} ${styled || ""}`} type={type} onClick={handleClick}>
      {icon}
      {text && <span className={css.Button_text}>{text}</span>}
    </button>
  );
};

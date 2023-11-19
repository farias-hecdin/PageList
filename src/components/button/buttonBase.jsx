import css from "./buttonBase.module.css";

/**
 * @param {object} prop
 * @param {string} prop.icon
 * @param {string} prop.text
 * @param {string} prop.styled
 * @param {string} prop.type
 * @param {string} prop.handleClick
 * @param {HTMLElement} prop.children
 * @returns {HTMLElement}
 */
export const ButtonBase = ({icon, handleClick, text, type, styled = ""}) => {
  return (
    <button className={`${css.Button} ${styled}`} type={type} onClick={handleClick}>
      {icon}
      {text && <span className={css.Button_text}>{text}</span>}
    </button>
  );
};

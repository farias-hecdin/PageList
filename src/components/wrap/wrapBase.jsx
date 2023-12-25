import css from "./wrapBase.module.css";

/**
 * @param {object} prop
 * @param {HTMLElement} prop.children
 * @param {string} prop.styled
 * @returns {HTMLElement}
 */
export const WrapBase = ({ children, styled }) => {
  return <div className={`${css.Container} ${styled || ""}`}>{children}</div>;
};

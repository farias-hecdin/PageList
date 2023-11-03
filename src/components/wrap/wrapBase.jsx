import css from "./wrapBase.module.css";

/**
 * @param {Object} prop
 * @param {HTMLElement} prop.children
 * @param {pStyled} prop.pStyled
 */
export const WrapBase = ({ children, pStyled }) => {
  return <div className={`${css.Container} ${pStyled || ""}`}>{children}</div>;
};

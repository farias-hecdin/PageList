import css from "./headerSection.module.css";

/**
 * @param {object} prop
 * @param {string} prop.pTitle
 * @param {string} prop.pText
 * @param {HTMLElement} prop.children
 * @returns {HTMLElement}
 */
export const HeaderSection = ({ pTitle, pText, children }) => {
  return (
    <header className={css.Header}>
      <div className={css.Header_box}>
        <h2 className={css.Header_title}>{pTitle}</h2>
        <p className={css.Header_text}>{pText}</p>
      </div>
      {children}
    </header>
  );
};

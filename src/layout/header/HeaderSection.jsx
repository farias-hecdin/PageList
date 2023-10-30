import css from "./HeaderSection.module.css";

/**
 * @param {object} prop
 * @param {string} prop.pTitle
 * @param {string} prop.pText
 * @param {HTMLElement} prop.children
 */
export const HeaderSection = ({ pTitle, pText, children }) => {
  return (
    <header className={css.HeaderSection}>
      <div className={css.HeaderSection_heading}>
        <h2 className={css.HeaderSection_title}>{pTitle}</h2>
        <p className={css.HeaderSection_text}>{pText}</p>
      </div>
      {children}
    </header>
  );
};

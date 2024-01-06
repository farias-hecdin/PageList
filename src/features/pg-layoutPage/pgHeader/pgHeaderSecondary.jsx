import css from "./HeaderSecondary.module.css";

/**
 * @param {object} prop
 * @param {string} prop.title
 * @param {string} prop.text
 * @param {HTMLElement} prop.children
 * @returns {HTMLElement}
 */
export const HeaderSecondary = ({ title, text, children }) => {
  return (
    <header className={css.Container}>
      <div className={css.Header}>
        <h2 className={css.Header_title}>{title}</h2>
        <p className={css.Header_text}>{text}</p>
      </div>
      {children}
    </header>
  );
};

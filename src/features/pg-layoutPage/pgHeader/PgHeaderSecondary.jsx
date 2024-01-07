import css from "./PgHeaderSecondary.module.css";

/**
 * @param {object} prop
 * @param {string} prop.title
 * @param {string} prop.text
 * @param {HTMLElement} prop.children
 */
export const PgHeaderSecondary = ({ title, text, children }) => {
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

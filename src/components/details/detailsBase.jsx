import css from "./detailsBase.module.css";

/**
 * @param {object} prop
 * @param {string} prop.icon
 * @param {string} prop.title
 * @param {HTMLElement} prop.children
 * @returns {HTMLElement}
 */
export const DetailsBase = ({ icon, title, children }) => {
  return (
    <details className={css.Details}>
      <summary className={css.Details_summary}>
        {icon}
        <span>{title}</span>
      </summary>
      {children}
    </details>
  );
};

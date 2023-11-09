import css from "./detailsBase.module.css";

/**
 * @param {string} icon
 * @param {string} title
 * @param {HTMLElement} children
 * @returns {HTMLElement}
 */
export const DetailsBase = ({ icon, title, children }) => {
  return (
    <details className={css.Details}>
      <summary className={css.Details_summary}>
        <iconify-icon icon={`material-symbols:${icon}`}></iconify-icon>
        <span>{title}</span>
      </summary>
      {children}
    </details>
  );
};

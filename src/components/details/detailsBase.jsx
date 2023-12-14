import css from "./detailsBase.module.css";

/**
 * @param {object} prop
 * @param {string} prop.icon
 * @param {string} prop.title
 * @param {string} prop.name
 * @param {HTMLElement} prop.children
 * @returns {HTMLElement}
 */
export const DetailsBase = ({ icon, title, name, children }) => {
  return (
    <details name={name} className={css.Details}>
      <summary className={css.Details_summary}>
        {icon}
        <span>{title}</span>
      </summary>
      {children}
    </details>
  );
};

import css from "./detailsBase.module.css";

/**
 * @param {object} prop
 * @param {HTMLElement} prop.children
 * @param {string} prop.icon
 * @param {string} prop.name
 * @param {string} prop.title
 * @returns {HTMLElement}
 */
export const DetailsBase = ({ children, icon, name, title }) => {
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

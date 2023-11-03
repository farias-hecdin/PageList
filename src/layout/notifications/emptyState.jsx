import css from "./emptyState.module.css";

/**
 * @param {Object} prop
 * @param {string} prop.pTitle
 * @param {string} prop.pText
 * @param {string} prop.pIcon
 */
export const EmptyState = ({ pIcon, pTitle, pText }) => {
  return (
    <div className={css.Container}>
      <p className={css.Container_icon}>
        <iconify-icon icon={`material-symbols:${pIcon}`}></iconify-icon>
      </p>
      <p className={css.Container_title}>{pTitle}</p>
      <p className={css.Container_text}>{pText}</p>
    </div>
  );
};

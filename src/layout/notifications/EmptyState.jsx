import css from "./EmptyState.module.css";

export const EmptyState = ({ pIcon, pTitle, pText }) => {
  return (
    <div className={css.Container}>
      <span className={css.Container_icon}>
        <i className="material-symbols-outlined">{pIcon}</i>
      </span>
      <p className={css.Container_title}>{pTitle}</p>
      <p className={css.Container_text}>{pText}</p>
    </div>
  );
};

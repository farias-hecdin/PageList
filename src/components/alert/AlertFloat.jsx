import css from "./AlertFloat.module.css";

export const AlertFloat = ({ title, text }) => {
  return (
    <aside className={css.Modal}>
      <div className={css.Modal_box}>
        <IconifyTaskAlt />
        <div className={css.Modal_content}>
          {title && <p className={css.Modal_title}>{title || "Done"}</p>}
          {text && <p className={css.Modal_text}>{text}</p>}
        </div>
      </div>
    </aside>
  );
};

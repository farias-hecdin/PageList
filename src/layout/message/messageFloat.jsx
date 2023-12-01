import css from "./messageFloat.module.css";

export const MessageFloat = ({ text }) => {
  return (
    <aside className={css.Modal}>
      <div className={css.Modal_box}>
        <IconifyTaskAlt />
        <div className={css.Modal_content}>
          <p className={css.Modal_title}>Done</p>
          <p className={css.Modal_text}>{text}</p>
        </div>
      </div>
    </aside>
  );
};

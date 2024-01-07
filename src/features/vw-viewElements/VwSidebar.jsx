import css from "./VwSidebar.module.css";

export const VwSidebar = ({ children, counter, title, buttons }) => {
  return (
    <section className={css.Container}>
      <header className={css.Header}>
        <div className={css.Header_content}>
          <h2 className={css.Header_title}>{title}</h2>
          {buttons && <div className={css.Header_btnGroup}>{buttons}</div>}
        </div>
        {counter && <p className={css.Header_text}>{counter > 9 ? `${counter} elements` : `${counter} element`}</p>}
      </header>
      {children}
    </section>
  );
};

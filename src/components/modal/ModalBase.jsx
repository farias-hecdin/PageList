import css from "./ModalBase.module.css";
import * as C from "../index.jsx";

export const ModalBase = ({ buttons, children, onClick, open, text, title }) => {
  return (
    <>
      {open && (
        <div className={css.Modal}>
          <div className={css.Modal_box}>
            <header className={css.Modal_header}>
              {title && <p className={css.Modal_title}>{title}</p>}
              {text && <p className={css.Modal_text}>{text}</p>}
            </header>
            <section>{children}</section>
            <footer className={css.Modal_footer}>
              {buttons ? buttons : <C.ButtonBase text="Cancel" styled="is-outline" handleClick={onClick} />}
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

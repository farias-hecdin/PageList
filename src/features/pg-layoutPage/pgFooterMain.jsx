import css from "./PgFooterMain.module.css";

export const PgFooterMain = () => {
  return (
    <footer className={css.Footer}>
      <p className={css.Footer_author}>
        Made by
        <a href="https://github.com/farias-hecdin/" target="_blank" rel="noopener noreferrer">
          Hecdin Farias
        </a>
      </p>
      <a
        className={css.Footer_github}
        href="https://github.com/farias-hecdin/Pagelist"
        target="_blank"
        rel="noopener noreferrer"
      >
        <iconify-icon icon="mdi:github"></iconify-icon>
      </a>
    </footer>
  );
};

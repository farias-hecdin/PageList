import css from "./LogoBrand.module.css";

export const LogoBrand = () => {
  return (
    <div className={css.Logo}>
      <iconify-icon icon="tabler:bookmarks"></iconify-icon>
      <span className={css.Logo_title}>Pagelist</span>
    </div>
  );
};

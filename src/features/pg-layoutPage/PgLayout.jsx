import css from "./PgLayout.module.css";

export const PgLayout = ({ children }) => {
  return <section className={css.Container}>{children}</section>;
};

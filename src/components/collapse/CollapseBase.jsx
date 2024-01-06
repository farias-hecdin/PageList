import css from "./CollapseBase.module.css";

export const CollapseBase = ({ children, icon, name, title }) => {
  return (
    <details name={name} className={css.Collapse}>
      <summary className={css.Collapse_summary}>
        {icon}
        <span>{title}</span>
      </summary>
      {children}
    </details>
  );
};

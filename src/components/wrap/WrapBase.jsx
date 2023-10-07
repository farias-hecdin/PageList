import css from "./WrapBase.module.css";

export const WrapBase = ({ children, styled }) => {
  return <div className={`${css.Container} ${styled || ""}`}>{children}</div>;
};

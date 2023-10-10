import css from "./WrapBase.module.css";

export const WrapBase = ({ children, pStyled }) => {
  return <div className={`${css.Container} ${pStyled || ""}`}>{children}</div>;
};

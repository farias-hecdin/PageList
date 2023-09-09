import css from "./WrapBase.module.css";

const WrapBase = ({ children, styled }) => {
  return (
    <div className={`${css.Container} ${styled}`}>{children}</div>
  )
};

export default WrapBase;

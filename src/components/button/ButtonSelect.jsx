import css from "./ButtonSelect.module.css";

export const ButtonSelect = ({ children, name, onChange, styled, value }) => {
  return (
    <div className={`${css.Button} ${styled || ""}`}>
      <select className={css.Button_select} name={name} onChange={onChange} value={value} required={true}>
        {children}
      </select>
    </div>
  );
};

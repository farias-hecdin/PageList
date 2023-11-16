import css from "./buttonSelect.module.css";

export const ButtonSelect = ({ children, name, id, styled }) => {
  return (
    <div className={`${css.Button} ${styled || ""}`}>
      <select name={name} id={id} className={css.Button_input}>
        {children}
      </select>
    </div>
  );
};

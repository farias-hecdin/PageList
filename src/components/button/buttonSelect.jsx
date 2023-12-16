import css from "./buttonSelect.module.css";

/**
 * @param {object} prop
 * @param {string} prop.id
 * @param {string} prop.text
 * @param {string} prop.styled
 * @param {string} prop.type
 * @returns {HTMLElement}
 */
export const ButtonSelect = ({ children, id, name, onChange, styled = "", value }) => {
  return (
    <div className={`${css.Button} ${styled}`}>
      <select className={css.Button_input} id={id} name={name} onChange={onChange} value={value} required={true}>
        {children}
      </select>
    </div>
  );
};

import css from "./buttonSelect.module.css";

/**
 * @param {object} prop
 * @param {string} prop.id
 * @param {string} prop.text
 * @param {string} prop.styled
 * @param {string} prop.type
 * @param {string} prop.name
 * @param {string} prop.value
 * @param {Function} prop.onChange
 * @param {HTMLElement} prop.children
 * @returns {HTMLElement}
 */
export const ButtonSelect = ({ children, name, onChange, styled, value }) => {
  return (
    <div className={`${css.Button} ${styled || ""}`}>
      <select className={css.Button_input} name={name} onChange={onChange} value={value} required={true}>
        {children}
      </select>
    </div>
  );
};

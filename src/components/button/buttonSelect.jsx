import css from "./buttonSelect.module.css";

/**
 * @param {object} prop
 * @param {string} prop.id
 * @param {string} prop.text
 * @param {string} prop.styled
 * @param {string} prop.type
 * @returns {HTMLElement}
 */
export const ButtonSelect = ({ children, name, id, styled= "" }) => {
  return (
    <div className={`${css.Button} ${styled}`}>
      <select name={name} id={id} className={css.Button_input}>
        {children}
      </select>
    </div>
  );
};

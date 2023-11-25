/**
 * @param {object} prop
 * @param {string} prop.id
 * @param {string} prop.group
 * @param {string} prop.text
 * @param {Function} prop.onChange
 * @param {any} prop.checked
 */
export const InputRadio = ({ checked, group, id, onChange, text, className }) => (
  <>
    <input type="radio" className={className} id={id} name={group} onChange={onChange} checked={checked} />
    <label htmlFor={id}>{text}</label>
  </>
);

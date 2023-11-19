import css from "./messageFeedback.module.css";

/**
 * @param {object} prop
 * @param {string} prop.title
 * @param {string} prop.text
 * @param {HTMLElement} prop.icon
 * @returns {HTMLElement}
 */
export const MessageFeedback = ({ icon, title, text }) => {
  return (
    <div className={css.Container}>
      <p className={css.Container_icon}>
        {icon}
      </p>
      <p className={css.Container_title}>
        {title}
      </p>
      <p className={css.Container_text}>{text}</p>
    </div>
  );
};

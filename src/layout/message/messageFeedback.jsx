import css from "./messageFeedback.module.css";

/**
 * @param {object} prop
 * @param {string} prop.title
 * @param {string} prop.text
 * @param {string} prop.icon
 * @returns {HTMLElement}
 */
export const MessageFeedback = ({ icon, title, text }) => {
  return (
    <div className={css.Container}>
      <p className={css.Container_icon}>
        <iconify-icon icon={`material-symbols:${icon}`}></iconify-icon>
      </p>
      <p className={css.Container_title}>{title}</p>
      <p className={css.Container_text}>{text}</p>
    </div>
  );
};

import css from "./bookmarksCard.module.css";

/**
 * @param {object} prop
 * @param {string} prop.title
 * @param {string} prop.url
 * @param {HTMLElement} prop.children
 * @returns {HTMLElement}
 */
export const BookmarksCard = ({ title, url, children }) => {
  let titleLinks = title;

  /**
   * Obtener las primeras dos letras de un titulo
   * @param {string} pText
   * @returns {string}
   */
  const getFirstTwoLettersText = (pText) => pText.slice(0, 2);

  /**
   * Convertir en mayuscula un titulo
   * @param {string} pText
   * @returns {string}
   */
  const toUppperCase = (pText) => pText.toUpperCase();

  titleLinks = getFirstTwoLettersText(titleLinks);
  titleLinks = toUppperCase(titleLinks);

  return (
    <article className={css.Card}>
      <div className={css.Card_box}>
        <p className={css.Card_thumb}>{titleLinks}</p>
        <p className={css.Card_content}>
          <a className={css.Card_title} href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
          <span className={css.Card_url}>{url}</span>
        </p>
      </div>
      {children}
    </article>
  );
};

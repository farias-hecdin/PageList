import css from "./cardBookmark.module.css";

/**
 * @param {object} prop
 * @param {string} prop.title
 * @param {string} prop.url
 * @param {HTMLElement} prop.children
 * @returns {HTMLElement}
 */
export const CardBookmark = ({ title, url, children }) => {
  let titleLinks = title;

  /**
   * Obtener las primeras dos caracteres de un texto
   * @param {string} pText
   * @returns {string}
   */
  const getFirstTwoLettersText = (pText) => pText.slice(0, 2);

  /**
   * Convertir en mayuscula un texto
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
        <div className={css.Card_content}>
          <a className={css.Card_title} href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
          <span className={css.Card_url}>{url}</span>
        </div>
      </div>
      {children}
    </article>
  );
};

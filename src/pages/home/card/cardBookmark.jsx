import css from "./cardBookmark.module.css";

/**
 * @param {object} prop
 * @param {string} prop.name
 * @param {string} prop.url
 * @param {HTMLElement} prop.children
 * @returns {HTMLElement}
 */
export const CardBookmark = ({ name, url, children }) => {
  let nameLinks = name;

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

  nameLinks = getFirstTwoLettersText(nameLinks);
  nameLinks = toUppperCase(nameLinks);

  return (
    <article className={css.Card}>
      <div className={css.Card_box}>
        <p className={css.Card_thumb}>{nameLinks}</p>
        <div className={css.Card_content}>
          <a className={css.Card_title} href={url} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
          <span className={css.Card_url}>{url}</span>
        </div>
      </div>
      {children}
    </article>
  );
};

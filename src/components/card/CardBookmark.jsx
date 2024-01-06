import css from "./CardBookmark.module.css";

/**
 @param {object} props
 @param {string} props.name
 @param {string} props.url
 @param {HTMLElement} props.children
*/
export const CardBookmark = ({ name, url, children }) => {
  /**
   * Obtener los primeros dos caracteres de un texto
   * @param {string} text
   * @returns {string}
   */
  const getFirstTwoLettersText = (text) => text.slice(0, 2);

  /**
   * Convertir en mayuscula un texto
   * @param {string} text
   * @returns {string}
   */
  const toUppperCase = (text) => text.toUpperCase();

  let titleBookmark = name;
  titleBookmark = getFirstTwoLettersText(titleBookmark);
  titleBookmark = toUppperCase(titleBookmark);

  return (
    <article className={css.Card}>
      <div className={css.Card_box}>
        <p className={css.Card_thumb}>{titleBookmark}</p>
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

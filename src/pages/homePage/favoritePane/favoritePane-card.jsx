import css from "./favoritePane-card.module.css";

/**
 * @param {object} prop
 * @param {string} prop.pTitle
 * @param {string} prop.pUrl
 * @returns {HTMLElement}
 */
export const FavoritePaneCard = ({ pTitle, pUrl }) => {
  let titleOfLink = pTitle;

  /**
   * Obtener las primeras dos letras de un titulo
   * @param {string} _text
   * @returns {string}
   */
  const funcGetFirstTwoLettersText = (_text) => _text.slice(0, 2);

  /**
   * Convertir en mayuscula un titulo
   * @param {string} _text
   * @returns {string}
   */
  const funcToUppperCase = (_text) => _text.toUpperCase();

  titleOfLink = funcGetFirstTwoLettersText(titleOfLink);
  titleOfLink = funcToUppperCase(titleOfLink);

  return (
    <article className={css.Card}>
      <p className={css.Card_thumb}>{titleOfLink}</p>
      <p className={css.Card_content}>
        <a className={css.Card_title} href={pUrl} target="_blank" rel="noopener noreferrer">
          {pTitle}
        </a>
        <span className={css.Card_text}>{pUrl}</span>
      </p>
    </article>
  );
};

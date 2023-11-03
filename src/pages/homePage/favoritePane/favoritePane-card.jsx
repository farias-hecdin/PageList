import css from "./favoritePane-card.module.css";

/**
 * @param {Object} prop
 * @param {string} prop.pTitle
 * @param {string} prop.pUrl
 */
export const FavoritePaneCard = ({ pTitle, pUrl }) => {
  let titleLink = pTitle;

  /** Obtener las primeras dos letras de un titulo */
  const funcGetFirstTwoLettersText = (_text) => _text.slice(0, 2);

  /** Convertir en mayuscula un titulo */
  const funcToUppperCase = (_text) => _text.toUpperCase();

  titleLink = funcGetFirstTwoLettersText(titleLink);
  titleLink = funcToUppperCase(titleLink);

  return (
    <article className={css.Card}>
      <p className={css.Card_thumb}>{titleLink}</p>
      <p className={css.Card_content}>
        <a className={css.Card_title} href={pUrl} target="_blank" rel="noopener">
          {pTitle}
        </a>
        <span className={css.Card_text}>{pUrl}</span>
      </p>
    </article>
  );
};

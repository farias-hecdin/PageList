import css from "./FavoritePaneCard.module.css";

export const FavoritePaneCard = ({ pTitle, pUrl }) => {
  let title = pTitle

  // Obtener las primeras dos letras del titulo de un link en mayuscula -------
  const funcGetFirstTwoLettersText= (text) => (text.slice(0, 2));
  const funcToUppperCase = (text) => (text.toUpperCase());

  title = funcGetFirstTwoLettersText(title)
  title = funcToUppperCase(title)

  return (
    <article className={css.Card}>
      <p className={css.Card_thumb}>{title}</p>
      <p className={css.Card_content}>
        <a className={css.Card_title} href={pUrl} target="_blank" rel="noopener">{pTitle}</a>
        <span className={css.Card_text}>{pUrl}</span>
      </p>
    </article>
  );
};

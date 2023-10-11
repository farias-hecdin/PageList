import css from "./FavoritePaneCard.module.css";

const FavoritePaneCard = ({ pTitle, pUrl }) => {
  // Obtener las primeras dos letras del titulo de un link en mayuscula -------
  const funcGetFirstTwoLettersTheTitle = () => {
    let title = pTitle;
    let firstTwoLetters = title.slice(0, 2);

    return firstTwoLetters.toUpperCase();
  };

  return (
    <article className={css.Card}>
      <p className={css.Card}>{funcGetFirstTwoLettersTheTitle()}</p>
      <p className={css.Card_content}>
        <span className={css.Card_title}>{pTitle}</span>
        <span className={css.Card_text}>{pUrl}</span>
      </p>
    </article>
  );
};

export default FavoritePaneCard;

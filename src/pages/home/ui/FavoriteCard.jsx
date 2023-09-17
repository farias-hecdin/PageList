import css from "./FavoriteCard.module.css";
import { ButtonBase } from "../../../components/Index.jsx";

const FavoriteCard = () => {
  let pTitle = "Lorem ipsum";
  let pUrl = "https://www.loremipsum.com";

  return (
    <article className={css.Card}>
      <i className="material-symbols-outlined">article</i>
      <p className={css.Card_content}>
        <span className={css.Card_title}>{pTitle}</span>
        <span className={css.Card_text}>{pUrl}</span>
      </p>
      <ButtonBase pIcon="edit" />
    </article>
  );
};

export default FavoriteCard;

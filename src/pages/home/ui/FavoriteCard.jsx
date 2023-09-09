import css from "./FavoriteCard.module.css";
import { ButtonBase } from "../../../components/Index.jsx";

const FavoriteCard = () => {
  let pTitle = "Lorem ipsum";
  let pUrl = "https://www.loremipsum.com";

  return (
    <article className={css.Card}>
      <div className={css.Container}>
        <i className="material-symbols-outlined">article</i>
        <p className={css.Container_content}>
          <span className={css.Container_title}>{pTitle}</span>
          <span className={css.Container_text}>{pUrl}</span>
        </p>
        <ButtonBase pIcon="edit" />
      </div>
    </article>
  );
};

export default FavoriteCard;

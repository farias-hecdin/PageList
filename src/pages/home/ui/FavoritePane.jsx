import FavoriteCard from "./FavoriteCard.jsx";
import css from "./FavoritePane.module.css";

const FavoritePane = () => {
  return (
    <section className={css.Container}>
      <header className={css.Header}>
        <h2 className={css.Header_title}>Javascript</h2>
        <p className={css.Header_text}>35 bookmarks</p>
      </header>
      <ul className={css.List}>
        <li className={css.List_item}>
          <FavoriteCard
            pTitle="Temporary URL"
            pUrl="https://www.temporary-url.com/297F8"
          />
        </li>
        <li className={css.List_item}>
          <FavoriteCard
            pTitle="Temporary URL"
            pUrl="https://www.temporary-url.com/297F8"
          />
        </li>
      </ul>
    </section>
  );
};

export default FavoritePane;

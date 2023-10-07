import FavoritePaneCard from "./FavoritePaneCard.jsx";
import css from "./FavoritePane.module.css";
import { ButtonBase } from "../../../components/Index.jsx";

export const FavoritePane = () => {
  const list_favorite = [
    {
      id: 1,
      title: "Temporary URL 1",
      url: "https://www.temporary-url.com/297F8",
    },
    {
      id: 2,
      title: "Temporary URL 2",
      url: "https://www.temporary-url.com/297F8",
    },
  ];

  return (
    <section className={css.Container}>
      <header className={css.Header}>
        <div>
          <h2 className={css.Header_title}>Javascript</h2>
          <p className={css.Header_text}>35 bookmarks</p>
        </div>
        <ButtonBase pIcon="edit" />
      </header>
      <ul className={css.List}>
        {list_favorite.map((elem) => (
          <li key={elem.id}>
            <FavoritePaneCard pTitle={elem.title} pUrl={elem.url} />
          </li>
        ))}
      </ul>
    </section>
  );
};

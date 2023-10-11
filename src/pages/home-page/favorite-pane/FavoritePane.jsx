import FavoritePaneCard from "./FavoritePaneCard.jsx";
import css from "./FavoritePane.module.css";
import { ButtonBase } from "../../../components/Index.jsx";
import { useContext } from "react";
import { BookmarksContext } from "../../../context/Index.jsx";

export const FavoritePane = () => {
  // Importar datos -----------------------------------------------------------
  const { titleLists, numberOfLinks, arrayLinks } = useContext(BookmarksContext);

  return (
    <section className={css.Container}>
      <header className={css.Header}>
        <div>
          <h2 className={css.Header_title}>{titleLists}</h2>
          <p className={css.Header_text}>{numberOfLinks} bookmarks</p>
        </div>
        <ButtonBase pIcon="edit" />
      </header>
      <ul className={css.List}>
        {arrayLinks.map((links) => (
          <li key={crypto.randomUUID()}>
            <FavoritePaneCard pTitle={links.title} pUrl={links.url} />
          </li>
        ))}
      </ul>
    </section>
  );
};

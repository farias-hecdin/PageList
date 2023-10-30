import css from "./FavoritePane.module.css";
import { BookmarksContext } from "../../../context/Index.jsx";
import { ButtonBase } from "../../../components/Index.jsx";
import { EmptyState } from "../../../layout/Index";
import { FavoritePaneCard } from "./FavoritePaneCard.jsx";
import { useContext } from "react";
import { logConsole } from "../../../logger";

export const FavoritePane = () => {
  // Importar datos -----------------------------------------------------------
  const { titleLists, numberLinks, dataLinks } = useContext(BookmarksContext);

  return (
    <section className={css.Container}>
      {numberLinks.state === 0 ? (
        <EmptyState pIcon="info" pTitle="Nothing here" pText="Choose a list to access your favorite links." />
      ) : (
        <>
          <header className={css.Header}>
            <div>
              <h2 className={css.Header_title}>{titleLists.state}</h2>
              <p className={css.Header_text}>{numberLinks.state} bookmarks</p>
            </div>
            <ButtonBase pIcon="edit" />
          </header>
          <ul className={css.List}>
            {typeof dataLinks.state === "object"
              ? dataLinks.state.map((links) => (
                  <li key={crypto.randomUUID()}>
                    <FavoritePaneCard pTitle={links.title} pUrl={links.url} />
                  </li>
                ))
              : logConsole(dataLinks.state, "FavoritePane (dataLinks)")}
          </ul>
        </>
      )}
    </section>
  );
};

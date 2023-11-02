import css from "./FavoritePane.module.css";
import { BookmarksContext, DataContext } from "../../../context/Index.jsx";
import { ButtonBase } from "../../../components/Index.jsx";
import { EmptyState } from "../../../layout/Index";
import { FavoritePaneCard } from "./FavoritePaneCard.jsx";
import { useContext } from "react";
import { logConsole } from "../../../logger";

export const FavoritePane = () => {
  // Importar datos -----------------------------------------------------------
  const { drawerLinks, selectedList } = useContext(DataContext)
  const { titleLists, numberLinks, dataLinks } = useContext(BookmarksContext);

  return (
    <section className={css.Container}>
      {1 === 0 ? (
        <EmptyState pIcon="info-outline" pTitle="Nothing here" pText="Choose a list to access your favorite links." />
      ) : (
          <>
            <header className={css.Header}>
              <div>
                <h2 className={css.Header_title}>{selectedList.state.name}</h2>
                <p className={css.Header_text}>{selectedList.state.id} bookmarks</p>
              </div>
              <ButtonBase pIcon="edit" />
            </header>
            <ul className={css.List}>
              {drawerLinks.state.map((itemLinks) => {
                if (itemLinks.originId === selectedList.state.id) return (
                <li key={crypto.randomUUID()}>
                  <FavoritePaneCard pTitle={itemLinks.title} pUrl={itemLinks.url} />
                </li>
                )
              })
              }
            </ul>
          </>
        )}
    </section>
  );
};

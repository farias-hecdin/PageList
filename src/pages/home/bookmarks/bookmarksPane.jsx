import css from "./bookmarksPane.module.css";
import { ButtonBase } from "../../../components/index.jsx";
import { DataContext, StateContext } from "../../../context/index.jsx";
import { MessageFeedback } from "../../../layout/index";
import { BookmarksCard } from "./bookmarksCard.jsx";
import { useContext } from "react";

// Nodo previo: ../../home/homePage.jsx

export const BookmarksPane = () => {
  const { dataBookmarks, selectedCollection } = useContext(DataContext);
  const { counterLists } = useContext(StateContext);

  return (
    <section className={css.Container}>
      {selectedCollection.listId === "0" ? (
        <MessageFeedback icon="info-outline" title="Nothing here" text="Choose a list to access your favorite links." />
      ) : (
        <>
          <header className={css.Header}>
            <div>
              <h2 className={css.Header_title}>{selectedCollection.listName}</h2>
              <p className={css.Header_text}>{counterLists} bookmarks</p>
            </div>
            <ButtonBase icon="filter-list" />
          </header>
          <ul className={css.List}>
            {dataBookmarks.map((links) => {
              if (links.originId === selectedCollection.listId) {
                return (
                  <li key={crypto.randomUUID()}>
                    <BookmarksCard title={links.title} url={links.url} />
                  </li>
                );
              }
            })}
          </ul>
        </>
      )}
    </section>
  );
};

import css from "./bookmarksPane.module.css";
import { ButtonBase } from "../../../components/index.jsx";
import { DataContext, StateContext } from "../../../context/index.jsx";
import { MessageFeedback } from "../../../layout/index";
import { BookmarksCard } from "./bookmarksCard.jsx";
import { useContext } from "react";

// Nodo previo: ../../home/homePage.jsx

export const BookmarksPane = () => {
  const { counterLists, openModalEditMode, setOpenModalEditMode } = useContext(StateContext);
  const { dataBookmarks, selectedItem, setTargetItem, setDataBookmarks } = useContext(DataContext);

  return (
    <section className={css.Container}>
      {selectedItem.listId === "0" ? (
        <MessageFeedback
          icon="info-outline"
          title="Nothing here"
          text="Choose a list to access your favorite bookmarks."
        />
      ) : (
        <>
          <header className={css.Header}>
            <div>
              <h2 className={css.Header_title}>{selectedItem.listName}</h2>
              <p className={css.Header_text}>{counterLists} bookmarks</p>
            </div>
            <ButtonBase icon="filter-list" />
          </header>
          <ul className={css.List}>
            {dataBookmarks.map((bookmark) => {
              if (bookmark.originId === selectedItem.listId) {
                return (
                  <li key={crypto.randomUUID()}>
                    <BookmarksCard title={bookmark.name} url={bookmark.url}>
                      <ButtonBase
                        icon="more-vert"
                        styled="--ghost TopicsPane_WQkiS"
                        handleClick={() => {
                          setOpenModalEditMode(!openModalEditMode);
                          setTargetItem({
                            id: bookmark.id,
                            name: bookmark.name,
                            url: bookmark.url,
                            type: "bookmark",
                            state: dataBookmarks,
                            set: setDataBookmarks,
                          });
                        }}
                      />
                    </BookmarksCard>
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
